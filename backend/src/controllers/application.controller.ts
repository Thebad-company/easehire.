import { Request, Response, NextFunction } from 'express';
import { applicationService } from '../services/application.service.js';
import { userService } from '../services/user.service.js';
import { getCurrentUserId } from '../middlewares/auth.js';
import {
  CreateApplicationInput,
  BulkUpdateApplicationsInput,
} from '../schemas/application.schema.js';
import { ForbiddenError } from '../utils/errors.js';

export class ApplicationController {
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // In a real public application portal, this wouldn't requireAuthGuard.
      // But for our internal workspace management tool, we'll keep it protected for now
      // or implement a public route later.
      const application = await applicationService.createApplication(req.body as CreateApplicationInput);
      res.status(201).json({ success: true, data: application });
    } catch (err) {
      next(err);
    }
  };

  listByJob = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      if (!user.companyId) throw new ForbiddenError('Access denied');
      
      const applications = await applicationService.getApplicationsByJob(user.companyId, req.params.jobId);
      res.json({ success: true, data: applications });
    } catch (err) {
      next(err);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      if (!user.companyId) throw new ForbiddenError('Access denied');
      
      const application = await applicationService.getApplicationById(user.companyId, req.params.id);
      res.json({ success: true, data: application });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      if (!user.companyId) throw new ForbiddenError('Access denied');
      
      const application = await applicationService.updateApplication(user.companyId, req.params.id, req.body);
      res.json({ success: true, data: application });
    } catch (err) {
      next(err);
    }
  };

  listAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      if (!user.companyId) throw new ForbiddenError('Access denied');
      
      const applications = await applicationService.listAll(user.companyId);
      res.json({ success: true, data: applications });
    } catch (err) {
      next(err);
    }
  };

  bulkUpdate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);

      if (!user.companyId) throw new ForbiddenError('Access denied');

      const applications = await applicationService.bulkUpdateApplications(
        user.companyId,
        req.body as BulkUpdateApplicationsInput,
      );

      res.json({ success: true, data: applications });
    } catch (err) {
      next(err);
    }
  };
}

export const applicationController = new ApplicationController();
