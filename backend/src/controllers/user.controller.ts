import { Request, Response, NextFunction } from 'express';
import { userService } from '../services/user.service.js';
import { getCurrentUserId } from '../middlewares/auth.js';
import { SyncUserInput, UpdateUserInput } from '../schemas/user.schema.js';

/**
 * UserController — handles HTTP concerns ONLY.
 * No business logic here. Delegates all work to UserService.
 */
export class UserController {
  /**
   * POST /api/users/sync
   * Called by the frontend after Clerk sign-up to persist the user in our DB.
   */
  sync = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.syncUser(clerkId, req.body as SyncUserInput);
      res.status(201).json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  };

  /**
   * GET /api/users/me
   * Returns the current authenticated user's full profile.
   */
  getMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  };

  /**
   * PATCH /api/users/me
   * Updates the current authenticated user's profile.
   */
  updateMe = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.updateUser(clerkId, req.body as UpdateUserInput);
      res.json({ success: true, data: user });
    } catch (err) {
      next(err);
    }
  };
}

export const userController = new UserController();
