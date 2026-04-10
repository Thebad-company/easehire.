import { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';
import { NotFoundError } from '../utils/errors.js';
import { feedService } from '../services/feed.service.js';
import { applicationService } from '../services/application.service.js';
import { CreatePublicApplicationInput } from '../schemas/application.schema.js';

export class PublicController {
  /**
   * Returns all active jobs for a company (public view)
   */
  getJobsByCompany = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { companySlug } = req.params;
      
      const company = await prisma.company.findUnique({
        where: { slug: companySlug },
        select: {
          id: true,
          name: true,
          slug: true,
          logoUrl: true,
          brandingColor: true,
          description: true,
          website: true,
          jobs: {
            where: { status: 'ACTIVE' },
            select: {
              id: true,
              title: true,
              slug: true,
              location: true,
              type: true,
              isRemote: true,
              postedAt: true,
              createdAt: true,
            }
          },
        },
      });

      if (!company) throw new NotFoundError('Company');

      res.json({
        success: true,
        data: {
          company: {
            id: company.id,
            name: company.name,
            slug: company.slug,
            logoUrl: company.logoUrl,
            brandingColor: company.brandingColor,
            description: company.description,
            website: company.website,
          },
          jobs: company.jobs,
        }
      });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Returns a single job for the landing page
   */
  getJobBySlug = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { companySlug, jobSlug } = req.params;

      const job = await prisma.job.findFirst({
        where: { 
          slug: jobSlug,
          company: { slug: companySlug },
          status: 'ACTIVE'
        },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          location: true,
          type: true,
          isRemote: true,
          salaryMin: true,
          salaryMax: true,
          postedAt: true,
          createdAt: true,
          company: {
            select: {
              id: true,
              name: true,
              slug: true,
              logoUrl: true,
              brandingColor: true,
              website: true,
              description: true,
            }
          }
        },
      });

      if (!job) throw new NotFoundError('Job');

      res.json({ success: true, data: job });
    } catch (err) {
      next(err);
    }
  };

  /**
   * Generates a basic Indeed-compatible XML feed
   */
  getIndeedFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { companySlug } = req.params;
      const xml = await feedService.getIndeedFeed(companySlug);
      res.header('Content-Type', 'application/xml');
      res.status(200).send(xml);
    } catch (err) {
      next(err);
    }
  };

  getLinkedInFeed = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { companySlug } = req.params;
      const xml = await feedService.getLinkedInFeed(companySlug);
      res.header('Content-Type', 'application/xml');
      res.status(200).send(xml);
    } catch (err) {
      next(err);
    }
  };

  createPublicApplication = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { companySlug, jobSlug } = req.params;
      const application = await applicationService.createPublicApplication(
        companySlug,
        jobSlug,
        req.body as CreatePublicApplicationInput,
      );

      res.status(201).json({ success: true, data: application });
    } catch (err) {
      next(err);
    }
  };
}

export const publicController = new PublicController();
