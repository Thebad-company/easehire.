import { prisma } from '../config/prisma.js';
import {
  CreateApplicationInput,
  CreatePublicApplicationInput,
  BulkUpdateApplicationsInput,
} from '../schemas/application.schema.js';
import { NotFoundError, ConflictError } from '../utils/errors.js';

export class ApplicationService {
  private normalizeCandidate(candidate: CreateApplicationInput['candidate']) {
    return {
      ...candidate,
      phone: candidate.phone || undefined,
      resumeUrl: candidate.resumeUrl || undefined,
      linkedInUrl: candidate.linkedInUrl || undefined,
    };
  }

  private async upsertCandidate(candidateData: CreateApplicationInput['candidate']) {
    const normalizedCandidate = this.normalizeCandidate(candidateData);

    return prisma.candidate.upsert({
      where: { email: normalizedCandidate.email },
      update: {
        firstName: normalizedCandidate.firstName,
        lastName: normalizedCandidate.lastName,
        phone: normalizedCandidate.phone,
        resumeUrl: normalizedCandidate.resumeUrl,
        linkedInUrl: normalizedCandidate.linkedInUrl,
      },
      create: {
        ...normalizedCandidate,
        aiScore: Math.floor(Math.random() * 41) + 60, // 60-100
      },
    });
  }

  private async createJobApplication(jobId: string, source: string | undefined, candidateData: CreateApplicationInput['candidate']) {
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundError('Job');

    const candidate = await this.upsertCandidate(candidateData);

    const existing = await prisma.application.findUnique({
      where: { jobId_candidateId: { jobId, candidateId: candidate.id } },
    });
    if (existing) throw new ConflictError('Candidate has already applied for this job');

    return prisma.application.create({
      data: {
        jobId,
        candidateId: candidate.id,
        source,
        stage: 'APPLIED',
        aiSummary: `${candidateData.firstName} shows strong alignment with the ${job.title} role based on their background in similar domains.`,
      },
      include: { candidate: true },
    });
  }

  /**
   * Creates or updates a candidate and links them to a job via an application.
   */
  async createApplication(input: CreateApplicationInput) {
    const { jobId, candidate: candidateData, source } = input;
    return this.createJobApplication(jobId, source, candidateData);
  }

  async createPublicApplication(companySlug: string, jobSlug: string, input: CreatePublicApplicationInput) {
    const job = await prisma.job.findFirst({
      where: {
        slug: jobSlug,
        status: 'ACTIVE',
        company: { slug: companySlug },
      },
      select: { id: true },
    });
    if (!job) throw new NotFoundError('Job');

    return this.createJobApplication(job.id, input.source ?? 'External', input.candidate);
  }

  async getApplicationsByJob(companyId: string, jobId: string) {
    // Verify job belongs to company
    const job = await prisma.job.findFirst({
      where: { id: jobId, companyId },
    });
    if (!job) throw new NotFoundError('Job');

    return prisma.application.findMany({
      where: { jobId },
      include: { candidate: true },
      orderBy: { appliedAt: 'desc' },
    });
  }

  async updateApplication(companyId: string, applicationId: string, data: Partial<import('@prisma/client').Application>) {
    // Verify application belongs to a job owned by the company
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        job: { companyId },
      },
    });
    if (!application) throw new NotFoundError('Application');

    return prisma.application.update({
      where: { id: applicationId },
      data,
      include: { candidate: true },
    });
  }

  async getApplicationById(companyId: string, applicationId: string) {
    const application = await prisma.application.findFirst({
      where: {
        id: applicationId,
        job: { companyId },
      },
      include: { candidate: true, job: true },
    });
    if (!application) throw new NotFoundError('Application');
    return application;
  }

  async listAll(companyId: string) {
    return prisma.application.findMany({
      where: {
        job: { companyId },
      },
      include: {
        candidate: true,
        job: { select: { title: true, id: true } },
      },
      orderBy: { appliedAt: 'desc' },
    });
  }

  async bulkUpdateApplications(companyId: string, input: BulkUpdateApplicationsInput) {
    const accessibleApplications = await prisma.application.findMany({
      where: {
        id: { in: input.applicationIds },
        job: { companyId },
      },
      select: { id: true },
    });

    if (accessibleApplications.length === 0) {
      throw new NotFoundError('Applications');
    }

    const ids = accessibleApplications.map((application) => application.id);

    await prisma.application.updateMany({
      where: { id: { in: ids } },
      data: {
        ...(input.stage !== undefined ? { stage: input.stage } : {}),
        ...(input.rating !== undefined ? { rating: input.rating } : {}),
        ...(input.notes !== undefined ? { notes: input.notes } : {}),
      },
    });

    return prisma.application.findMany({
      where: { id: { in: ids } },
      include: { candidate: true },
      orderBy: { appliedAt: 'desc' },
    });
  }
}

export const applicationService = new ApplicationService();
