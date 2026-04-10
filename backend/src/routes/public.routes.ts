import { Router } from 'express';
import { publicController } from '../controllers/public.controller.js';
import { validate } from '../middlewares/validate.js';
import { createPublicApplicationSchema } from '../schemas/application.schema.js';

const router = Router();

// Public Job Board Endpoints
router.get('/jobs/:companySlug', publicController.getJobsByCompany);
router.get('/jobs/:companySlug/:jobSlug', publicController.getJobBySlug);
router.post(
  '/jobs/:companySlug/:jobSlug/apply',
  validate(createPublicApplicationSchema),
  publicController.createPublicApplication,
);

// XML Feeds for Job Boards
router.get('/feeds/:companySlug/indeed', publicController.getIndeedFeed);
router.get('/feeds/:companySlug/linkedin', publicController.getLinkedInFeed);

export default router;
