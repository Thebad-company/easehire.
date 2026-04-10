import { prisma } from '../config/prisma.js';
import { CreateApplicationInput } from '../schemas/application.schema.js';
import { ApplicationStage } from '@prisma/client';
import { NotFoundError, ConflictError } from '../utils/errors.js';

export class ApplicationService {
  /**
   * Creates or updates a candidate and links them to a job via an application.
   */
  async createApplication(input: CreateApplicationInput) {
    const { jobId, candidate: candidateData, source } = input;

    // Check if job exists
    const job = await prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundError('Job');

    // Find or create candidate by email
    const candidate = await prisma.candidate.upsert({
      where: { email: candidateData.email },
      update: {
        firstName: candidateData.firstName,
        lastName: candidateData.lastName,
        phone: candidateData.phone,
        resumeUrl: candidateData.resumeUrl,
        linkedInUrl: candidateData.linkedInUrl,
      },
      create: {
        ...candidateData,
        // Mock AI Score for the prototype
        aiScore: Math.floor(Math.random() * 41) + 60, // 60-100
      },
    });

    // Check if application already exists
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
        // Mock AI Summary
        aiSummary: `${candidateData.firstName} shows strong alignment with the ${job.title} role based on their background in similar domains.`,
      },
      include: { candidate: true },
    });
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

  async updateApplicationStage(companyId: string, applicationId: string, stage: ApplicationStage) {
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
      data: { stage },
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
}

export const applicationService = new ApplicationService();
