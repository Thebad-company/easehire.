import { Router } from 'express';
import { requireAuthGuard } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { userController } from '../controllers/user.controller.js';
import { syncUserSchema, updateUserSchema } from '../schemas/user.schema.js';

const router = Router();

// All user routes require authentication
router.use(requireAuthGuard);

router.post('/sync', validate(syncUserSchema), userController.sync);
router.get('/me', userController.getMe);
router.patch('/me', validate(updateUserSchema), userController.updateMe);

export default router;
