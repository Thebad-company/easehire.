import { z } from 'zod';
import { JobStatus } from '@prisma/client';

// Base shape — reusable without .refine() so we can call .partial() on it
const jobBaseSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(200),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  location: z.string().max(200).optional(),
  type: z.string().max(50).optional(),
  isRemote: z.boolean().default(false),
  salaryMin: z.number().int().positive().optional(),
  salaryMax: z.number().int().positive().optional(),
});

const salaryRefine = (data: { salaryMin?: number; salaryMax?: number }) =>
  !data.salaryMin || !data.salaryMax || data.salaryMax >= data.salaryMin;

const salaryRefineMsg = {
  message: 'salaryMax must be greater than or equal to salaryMin',
  path: ['salaryMax'],
};

// Full create schema with cross-field salary validation
export const createJobSchema = jobBaseSchema.refine(salaryRefine, salaryRefineMsg);

// Partial update schema — all fields optional, same refinement
export const updateJobSchema = jobBaseSchema
  .partial()
  .extend({ status: z.nativeEnum(JobStatus).optional() })
  .refine(salaryRefine, salaryRefineMsg);

export const jobQuerySchema = z.object({
  status: z.nativeEnum(JobStatus).optional(),
  page: z.string().optional().transform((v) => (v ? parseInt(v, 10) : 1)),
  limit: z.string().optional().transform((v) => (v ? Math.min(parseInt(v, 10), 50) : 10)),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type JobQueryInput = z.infer<typeof jobQuerySchema>;
