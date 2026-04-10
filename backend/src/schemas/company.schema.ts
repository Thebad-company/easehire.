import { z } from 'zod';

export const createCompanySchema = z.object({
  name: z.string().min(2, 'Company name must be at least 2 characters').max(100),
  slug: z.string().min(2, 'Slug must be at least 2 characters').max(50)
    .regex(/^[a-z0-9-]+$/, 'Slug must only contain lowercase letters, numbers, and dashes'),
  website: z.string().url('Invalid website URL').optional().or(z.literal('')),
  industry: z.string().max(50).optional(),
  size: z.string().max(50).optional(),
  description: z.string().max(1000).optional(),
  logoUrl: z.string().url('Invalid logo URL').optional().or(z.literal('')),
  brandingColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Invalid hex color').optional().or(z.literal('')),
});

export const updateCompanySchema = createCompanySchema.partial();

export type CreateCompanyInput = z.infer<typeof createCompanySchema>;
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
