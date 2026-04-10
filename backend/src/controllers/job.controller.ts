import { Request, Response, NextFunction } from 'express';
import { jobService } from '../services/job.service.js';
import { userService } from '../services/user.service.js';
import { getCurrentUserId } from '../middlewares/auth.js';
import { CreateJobInput, UpdateJobInput, JobQueryInput } from '../schemas/job.schema.js';
import { ForbiddenError } from '../utils/errors.js';

export class JobController {
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      if (!user.companyId) {
        throw new ForbiddenError('You must create a company before posting jobs');
      }
      
      const job = await jobService.createJob(user.companyId, req.body as CreateJobInput);
      res.status(201).json({ success: true, data: job });
    } catch (err) {
      next(err);
    }
  };

  list = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      if (!user.companyId) {
        res.json({ success: true, data: { items: [], pagination: { total: 0 } } });
        return;
      }
      
      const result = await jobService.getJobs(user.companyId, req.query as unknown as JobQueryInput);
      res.json({ success: true, ...result });
    } catch (err) {
      next(err);
    }
  };

  get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      if (!user.companyId) throw new ForbiddenError('Access denied');
      
      const job = await jobService.getJobById(user.companyId, req.params.id);
      res.json({ success: true, data: job });
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      if (!user.companyId) throw new ForbiddenError('Access denied');
      
      const job = await jobService.updateJob(user.companyId, req.params.id, req.body as UpdateJobInput);
      res.json({ success: true, data: job });
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      if (!user.companyId) throw new ForbiddenError('Access denied');
      
      await jobService.deleteJob(user.companyId, req.params.id);
      res.json({ success: true, message: 'Job deleted successfully' });
    } catch (err) {
      next(err);
    }
  };
}

export const jobController = new JobController();
