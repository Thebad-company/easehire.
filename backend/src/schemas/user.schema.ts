import { z } from 'zod';
import { UserRole } from '@prisma/client';

/**
 * Schema for syncing a Clerk user to our database after signup.
 * Called by the frontend after Clerk sign-up completes.
 */
export const syncUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  avatarUrl: z.string().url().optional(),
});

/**
 * Schema for updating a user's profile.
 */
export const updateUserSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  avatarUrl: z.string().url().optional(),
  role: z.nativeEnum(UserRole).optional(),
});

export type SyncUserInput = z.infer<typeof syncUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
