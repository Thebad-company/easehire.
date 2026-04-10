import { Request, Response, NextFunction } from 'express';
import { analyticsService } from '../services/analytics.service.js';
import { userService } from '../services/user.service.js';
import { getCurrentUserId } from '../middlewares/auth.js';
import { ForbiddenError } from '../utils/errors.js';

export class AnalyticsController {
  getOverview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      if (!user.companyId) {
        throw new ForbiddenError('You do not belong to a company');
      }
      
      const stats = await analyticsService.getOverviewStats(user.companyId);
      res.json({ success: true, data: stats });
    } catch (err) {
      next(err);
    }
  };
}

export const analyticsController = new AnalyticsController();
