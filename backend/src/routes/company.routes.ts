import { Router } from 'express';
import { requireAuthGuard } from '../middlewares/auth.js';
import { validate } from '../middlewares/validate.js';
import { companyController } from '../controllers/company.controller.js';
import { createCompanySchema, updateCompanySchema } from '../schemas/company.schema.js';

const router = Router();

router.use(requireAuthGuard);

router.post('/', validate(createCompanySchema), companyController.create);
router.get('/mine', companyController.getMine);
router.patch('/mine', validate(updateCompanySchema), companyController.updateMine);

export default router;
