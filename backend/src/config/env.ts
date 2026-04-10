import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

// Validate environment variables at startup — fail fast if something is missing.
const envSchema = z.object({
  PORT: z.string().default('8000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  CLERK_SECRET_KEY: z.string({ required_error: 'CLERK_SECRET_KEY is required' }),
  CLERK_PUBLISHABLE_KEY: z.string({ required_error: 'CLERK_PUBLISHABLE_KEY is required' }),
  DATABASE_URL: z.string({ required_error: 'DATABASE_URL is required' }),
  RATE_LIMIT_WINDOW_MS: z.string().default('900000'),
  RATE_LIMIT_MAX: z.string().default('100'),
  ALLOWED_ORIGINS: z.string().default('http://localhost:5173'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:\n', _env.error.format());
  process.exit(1);
}

export const env = {
  PORT: parseInt(_env.data.PORT, 10),
  NODE_ENV: _env.data.NODE_ENV,
  IS_PRODUCTION: _env.data.NODE_ENV === 'production',
  CLERK_SECRET_KEY: _env.data.CLERK_SECRET_KEY,
  CLERK_PUBLISHABLE_KEY: _env.data.CLERK_PUBLISHABLE_KEY,
  DATABASE_URL: _env.data.DATABASE_URL,
  RATE_LIMIT_WINDOW_MS: parseInt(_env.data.RATE_LIMIT_WINDOW_MS, 10),
  RATE_LIMIT_MAX: parseInt(_env.data.RATE_LIMIT_MAX, 10),
  ALLOWED_ORIGINS: _env.data.ALLOWED_ORIGINS.split(',').map((o) => o.trim()),
};
