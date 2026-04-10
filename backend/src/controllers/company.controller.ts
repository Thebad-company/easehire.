import { Request, Response, NextFunction } from 'express';
import { companyService } from '../services/company.service.js';
import { userService } from '../services/user.service.js';
import { getCurrentUserId } from '../middlewares/auth.js';
import { CreateCompanyInput, UpdateCompanyInput } from '../schemas/company.schema.js';
import { ForbiddenError } from '../utils/errors.js';

export class CompanyController {
  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      const company = await companyService.createCompany(user.id, req.body as CreateCompanyInput);
      res.status(201).json({ success: true, data: company });
    } catch (err) {
      next(err);
    }
  };

  getMine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      if (!user.companyId) {
        res.json({ success: true, data: null });
        return;
      }
      
      const company = await companyService.getCompanyById(user.companyId);
      res.json({ success: true, data: company });
    } catch (err) {
      next(err);
    }
  };

  updateMine = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const clerkId = getCurrentUserId(req);
      const user = await userService.getUserByClerkId(clerkId);
      
      if (!user.companyId) {
        throw new ForbiddenError('You do not belong to a company');
      }
      
      const company = await companyService.updateCompany(user.companyId, req.body as UpdateCompanyInput);
      res.json({ success: true, data: company });
    } catch (err) {
      next(err);
    }
  };
}

export const companyController = new CompanyController();
