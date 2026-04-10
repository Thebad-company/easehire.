import { z } from 'zod';
import { ApplicationStage } from '@prisma/client';

const candidateSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal('')),
  resumeUrl: z.string().url().optional().or(z.literal('')),
  linkedInUrl: z.string().url().optional().or(z.literal('')),
});

export const createApplicationSchema = z.object({
  jobId: z.string().cuid(),
  candidate: candidateSchema,
  source: z.string().optional().default('Direct'),
});

export const createPublicApplicationSchema = z.object({
  candidate: candidateSchema,
  source: z.string().optional().default('External'),
});

export const updateApplicationSchema = z.object({
  stage: z.nativeEnum(ApplicationStage).optional(),
  rating: z.number().min(0).max(5).optional(),
  notes: z.string().optional(),
});

export const bulkUpdateApplicationsSchema = z.object({
  applicationIds: z.array(z.string().cuid()).min(1).max(100),
  stage: z.nativeEnum(ApplicationStage).optional(),
  rating: z.number().min(0).max(5).optional(),
  notes: z.string().optional(),
}).refine((data) => data.stage !== undefined || data.rating !== undefined || data.notes !== undefined, {
  message: 'At least one field must be provided for bulk update',
  path: ['stage'],
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type CreatePublicApplicationInput = z.infer<typeof createPublicApplicationSchema>;
export type UpdateApplicationInput = z.infer<typeof updateApplicationSchema>;
export type BulkUpdateApplicationsInput = z.infer<typeof bulkUpdateApplicationsSchema>;
