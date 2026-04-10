import { prisma } from '../config/prisma.js';
import { CreateJobInput, UpdateJobInput, JobQueryInput } from '../schemas/job.schema.js';
import { NotFoundError } from '../utils/errors.js';
import { slugify } from '../utils/slug.js';

export class JobService {
  private async generateUniqueSlug(companyId: string, title: string, excludeJobId?: string) {
    const baseSlug = slugify(title) || 'job';
    let slug = baseSlug;
    let suffix = 2;

    while (true) {
      const existingJob = await prisma.job.findFirst({
        where: {
          companyId,
          slug,
          ...(excludeJobId ? { NOT: { id: excludeJobId } } : {}),
        },
        select: { id: true },
      });

      if (!existingJob) {
        return slug;
      }

      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }
  }

  async createJob(companyId: string, input: CreateJobInput) {
    const slug = await this.generateUniqueSlug(companyId, input.title);

    return prisma.job.create({
      data: {
        ...input,
        slug,
        companyId,
        status: 'ACTIVE', // Default to active for now
        postedAt: new Date(),
      },
    });
  }

  async getJobs(companyId: string, query: JobQueryInput) {
    const { status, page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const where = {
      companyId,
      ...(status && { status }),
    };

    const [total, items] = await Promise.all([
      prisma.job.count({ where }),
      prisma.job.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { _count: { select: { applications: true } } },
      }),
    ]);

    return {
      items,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getJobById(companyId: string, id: string) {
    const job = await prisma.job.findFirst({
      where: { id, companyId },
      include: { 
        company: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
            website: true,
            brandingColor: true,
          },
        },
        _count: { select: { applications: true } },
        applications: {
          include: { candidate: true },
          take: 10,
        }
      },
    });
    if (!job) throw new NotFoundError('Job');
    return job;
  }

  async updateJob(companyId: string, id: string, input: UpdateJobInput) {
    const job = await prisma.job.findFirst({ where: { id, companyId } });
    if (!job) throw new NotFoundError('Job');

    const slug =
      input.title && input.title !== job.title
        ? await this.generateUniqueSlug(companyId, input.title, id)
        : undefined;

    return prisma.job.update({
      where: { id },
      data: { ...input, ...(slug ? { slug } : {}) },
    });
  }

  async deleteJob(companyId: string, id: string) {
    const job = await prisma.job.findFirst({ where: { id, companyId } });
    if (!job) throw new NotFoundError('Job');

    return prisma.job.delete({ where: { id } });
  }
}

export const jobService = new JobService();
