import { Router } from 'express';
import { requireAuthGuard } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { jobController } from '../controllers/job.controller.js';
import { createJobSchema, updateJobSchema, jobQuerySchema } from '../schemas/job.schema.js';

const router = Router();

router.use(requireAuthGuard);

router.post('/', validate(createJobSchema), jobController.create);
router.get('/', validate(jobQuerySchema, 'query'), jobController.list);
router.get('/:id', jobController.get);
router.patch('/:id', validate(updateJobSchema), jobController.update);
router.delete('/:id', jobController.delete);

export default router;
