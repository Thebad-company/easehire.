import { z } from 'zod';
import { ApplicationStage } from '@prisma/client';

export const createApplicationSchema = z.object({
  jobId: z.string().cuid(),
  candidate: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    resumeUrl: z.string().url().optional(),
    linkedInUrl: z.string().url().optional().or(z.literal('')),
  }),
  source: z.string().optional().default('Direct'),
});

export const updateApplicationStageSchema = z.object({
  stage: z.nativeEnum(ApplicationStage),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationStageInput = z.infer<typeof updateApplicationStageSchema>;
