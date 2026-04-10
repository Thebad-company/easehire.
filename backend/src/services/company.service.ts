import { prisma } from '../config/prisma.js';
import { CreateCompanyInput, UpdateCompanyInput } from '../schemas/company.schema.js';
import { NotFoundError, ConflictError } from '../utils/errors.js';

export class CompanyService {
  /**
   * Creates a new company and links the creator user to it.
   */
  async createCompany(userId: string, input: CreateCompanyInput) {
    // Check if slug is taken
    const existingSlug = await prisma.company.findUnique({
      where: { slug: input.slug },
    });
    if (existingSlug) {
      throw new ConflictError(`Company with slug "${input.slug}" already exists`);
    }

    // Use a transaction to create the company and update the user
    return prisma.$transaction(async (tx) => {
      const company = await tx.company.create({
        data: { ...input },
      });

      await tx.user.update({
        where: { id: userId },
        data: { companyId: company.id },
      });

      return company;
    });
  }

  async getCompanyById(id: string) {
    const company = await prisma.company.findUnique({
      where: { id },
      include: { _count: { select: { jobs: true, users: true } } },
    });
    if (!company) throw new NotFoundError('Company');
    return company;
  }

  async updateCompany(id: string, input: UpdateCompanyInput) {
    const company = await prisma.company.findUnique({ where: { id } });
    if (!company) throw new NotFoundError('Company');

    if (input.slug && input.slug !== company.slug) {
      const existingSlug = await prisma.company.findUnique({
        where: { slug: input.slug },
      });
      if (existingSlug) {
        throw new ConflictError(`Company with slug "${input.slug}" already exists`);
      }
    }

    return prisma.company.update({
      where: { id },
      data: { ...input },
    });
  }
}

export const companyService = new CompanyService();
