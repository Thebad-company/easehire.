import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { AppError } from '../utils/errors.js';
import { logger } from '../config/logger.js';
import { env } from '../config/env.js';

/**
 * Central error-handling middleware.
 * Must be the LAST middleware registered in app.ts.
 */
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void => {
  // ── Zod Validation Errors ───────────────────────────────────────────────────
  if (err instanceof ZodError) {
    const issues = err.issues.map((i) => ({
      field: i.path.join('.'),
      message: i.message,
    }));
    res.status(422).json({
      success: false,
      error: 'Validation failed',
      issues,
    });
    return;
  }

  // ── Known Operational Errors ────────────────────────────────────────────────
  if (err instanceof AppError && err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  // ── Unknown / Programming Errors ────────────────────────────────────────────
  logger.error('💥 Unhandled error:', err);

  res.status(500).json({
    success: false,
    error: env.IS_PRODUCTION ? 'An unexpected error occurred' : err.message,
    ...(env.IS_PRODUCTION ? {} : { stack: err.stack }),
  });
};
