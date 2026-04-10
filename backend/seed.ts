import { prisma } from './src/config/prisma.js';

async function seed() {
  console.log('🌱 Seeding candidates and applications...');

  try {
    // 1. Find a job to attach applications to
    const job = await prisma.job.findFirst();
    if (!job) {
      console.log('❌ No jobs found. Please create a job in the dashboard first.');
      return;
    }

    const mockCandidates = [
      { firstName: 'Maya', lastName: 'Chen', email: 'maya.chen@example.com', aiScore: 96, summary: 'Exceptional background in design systems and accessible UI. Highly recommended for senior roles.' },
      { firstName: 'Liam', lastName: 'Torres', email: 'liam.t@example.com', aiScore: 91, summary: 'Strong frontend focus with deep React knowledge. Good cultural fit for fast-moving startups.' },
      { firstName: 'Ava', lastName: 'Brooks', email: 'ava.brooks@example.com', aiScore: 88, summary: 'Versatile marketer with a data-driven approach to growth. Strong portfolio.' },
      { firstName: 'Noah', lastName: 'Patel', email: 'noah.p@example.com', aiScore: 72, summary: 'Competent engineer but lacks specialized experience in the target domain.' },
      { firstName: 'Sofia', lastName: 'Kim', email: 'sofia.kim@example.com', aiScore: 65, summary: 'Junior profile. Shows promise but likely requires significant mentorship.' },
    ];

    for (const data of mockCandidates) {
      const candidate = await prisma.candidate.upsert({
        where: { email: data.email },
        update: {},
        create: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          aiScore: data.aiScore,
          resumeUrl: 'https://example.com/resume.pdf',
        },
      });

      await prisma.application.upsert({
        where: { jobId_candidateId: { jobId: job.id, candidateId: candidate.id } },
        update: {},
        create: {
          jobId: job.id,
          candidateId: candidate.id,
          stage: 'APPLIED',
          aiSummary: data.summary,
          source: 'LinkedIn',
        },
      });
    }

    console.log('✅ Successfully seeded mock candidates.');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
