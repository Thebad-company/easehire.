import { Router } from 'express';
import { requireAuthGuard } from '../middlewares/auth.js';
import { analyticsController } from '../controllers/analytics.controller.js';

const router = Router();

router.use(requireAuthGuard);

router.get('/overview', analyticsController.getOverview);

export default router;
