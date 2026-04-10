import { prisma } from '../config/prisma.js';

export class AnalyticsService {
  async getOverviewStats(companyId: string) {
    const [
      activeJobsCount,
      totalCandidatesCount,
      applicationsByStage,
      recentApplications,
    ] = await Promise.all([
      // 1. Count active jobs
      prisma.job.count({
        where: { companyId, status: 'ACTIVE' },
      }),
      // 2. Count total unique candidates for this company
      prisma.candidate.count({
        where: {
          applications: {
            some: { job: { companyId } },
          },
        },
      }),
      // 3. Aggregate applications by stage
      prisma.application.groupBy({
        by: ['stage'],
        where: { job: { companyId } },
        _count: { id: true },
      }),
      // 4. Get recent applications
      prisma.application.findMany({
        where: { job: { companyId } },
        include: {
          candidate: {
            select: { firstName: true, lastName: true, email: true },
          },
          job: {
            select: { title: true },
          },
        },
        orderBy: { appliedAt: 'desc' },
        take: 5,
      }),
    ]);

    // Format pipeline stats for the frontend
    const pipeline = applicationsByStage.reduce((acc, curr) => {
      acc[curr.stage] = curr._count.id;
      return acc;
    }, {} as Record<string, number>);

    return {
      activeJobsCount,
      totalCandidatesCount,
      pipeline,
      recentApplications,
    };
  }
}

export const analyticsService = new AnalyticsService();
