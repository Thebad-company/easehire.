import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { logger } from './config/logger.js';
import { clerkMiddleware } from './middlewares/auth.js';
import { globalRateLimiter } from './middlewares/rateLimiter.js';
import { errorHandler } from './middlewares/errorHandler.js';

// ── Route Imports ──────────────────────────────────────────────────────────────
import userRoutes from './routes/user.routes.js';
import companyRoutes from './routes/company.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';

const app: Application = express();

// Debug Logger — so we can see what's happening in the terminal
app.use((req, _res, next) => {
  console.log(`📡 [${req.method}] ${req.url}`);
  next();
});

// ─── Security Middlewares ──────────────────────────────────────────────────────

// Sets secure HTTP headers (XSS, clickjacking, etc.)
app.use(helmet());

// CORS — only allow configured origins
app.use(
  cors({
    origin: env.ALLOWED_ORIGINS,
    credentials: true,
  })
);

// Global rate limiter — applied before all routes
app.use(globalRateLimiter);

// ─── Request Parsing ──────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' })); // Prevent large payload attacks
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Logging ──────────────────────────────────────────────────────────────────
const morganStream = { write: (message: string) => logger.http(message.trim()) };
app.use(morgan(env.IS_PRODUCTION ? 'combined' : 'dev', { stream: morganStream }));

// ─── Clerk Auth ───────────────────────────────────────────────────────────────
// Attaches auth state to all requests. Routes still need requireAuthGuard to be protected.
app.use(clerkMiddleware());

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get('/health', (_req: Request, res: Response) => {
  res.json({ success: true, status: 'OK', env: env.NODE_ENV, timestamp: new Date().toISOString() });
});

// ─── API Routes ───────────────────────────────────────────────────────────────
app.use('/api/users', userRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);

// ─── 404 Handler ──────────────────────────────────────────────────────────────
app.use((_req: Request, res: Response) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// ─── Central Error Handler (MUST be last) ─────────────────────────────────────
app.use(errorHandler);

export default app;
