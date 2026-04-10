import { Router, Request, Response } from 'express';
import { requireAuthGuard } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { applicationController } from '../controllers/application.controller.js';
import { createApplicationSchema, updateApplicationStageSchema } from '../schemas/application.schema.js';

const router = Router();

// Create application is public-ish, but for now we protect it with req auth
// Later we can move it to a public endpoint for actual candidates
router.use(requireAuthGuard);

router.get('/', applicationController.listAll);
router.get('/debug', (_req: Request, res: Response) => res.json({ success: true, message: 'Applications API is alive' }));
router.post('/', validate(createApplicationSchema), applicationController.create);
router.get('/job/:jobId', applicationController.listByJob);
router.get('/:id', applicationController.get);
router.patch('/:id/stage', validate(updateApplicationStageSchema), applicationController.updateStage);

export default router;
