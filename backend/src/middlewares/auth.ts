import { clerkMiddleware, getAuth, requireAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '../utils/errors.js';

/**
 * Clerk middleware — attaches auth state to every request.
 * MUST be registered before any route that needs auth context.
 */
export { clerkMiddleware };

/**
 * Guard middleware — rejects unauthenticated requests.
 * Use this on any route that requires a logged-in user.
 *
 * @example
 *   router.get('/me', requireAuthGuard, userController.getMe);
 */
export const requireAuthGuard = requireAuth();

/**
 * Helper to safely extract the current user's Clerk ID from a request.
 * Throws UnauthorizedError if auth state is missing.
 */
export const getCurrentUserId = (req: Request): string => {
  const auth = getAuth(req);
  if (!auth?.userId) {
    throw new UnauthorizedError('Authentication required');
  }
  return auth.userId;
};
