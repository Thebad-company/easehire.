import { prisma } from '../config/prisma.js';
import { NotFoundError } from '../utils/errors.js';
import { env } from '../config/env.js';

function wrapCdata(value: string) {
  return `<![CDATA[${value.replace(/]]>/g, ']]]]><![CDATA[>')}]]>`;
}

function getPublicAppUrl() {
  return env.ALLOWED_ORIGINS[0] ?? 'http://localhost:5173';
}

export class FeedService {
  private async getCompanyWithActiveJobs(companySlug: string) {
    const company = await prisma.company.findUnique({
      where: { slug: companySlug },
      select: {
        id: true,
        name: true,
        slug: true,
        website: true,
        jobs: {
          where: { status: 'ACTIVE' },
          orderBy: { postedAt: 'desc' },
          select: {
            id: true,
            title: true,
            slug: true,
            description: true,
            location: true,
            type: true,
            isRemote: true,
            createdAt: true,
            postedAt: true,
          },
        },
      },
    });

    if (!company) {
      throw new NotFoundError('Company');
    }

    return company;
  }

  async getIndeedFeed(companySlug: string) {
    const company = await this.getCompanyWithActiveJobs(companySlug);
    const publicAppUrl = getPublicAppUrl();
    const jobsXml = company.jobs
      .map((job) => {
        const jobUrl = `${publicAppUrl}/j/${company.slug}/${job.slug}`;
        const postedAt = (job.postedAt ?? job.createdAt).toUTCString();

        return [
          '  <job>',
          `    <title>${wrapCdata(job.title)}</title>`,
          `    <date>${wrapCdata(postedAt)}</date>`,
          `    <referencenumber>${wrapCdata(job.id)}</referencenumber>`,
          `    <url>${wrapCdata(jobUrl)}</url>`,
          `    <company>${wrapCdata(company.name)}</company>`,
          `    <city>${wrapCdata(job.isRemote ? 'Remote' : job.location || 'Remote')}</city>`,
          '    <state></state>',
          '    <country>US</country>',
          `    <jobtype>${wrapCdata(job.type || 'Full-time')}</jobtype>`,
          `    <description>${wrapCdata(job.description)}</description>`,
          '  </job>',
        ].join('\n');
      })
      .join('\n');

    return [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<source>',
      `  <publisher>${wrapCdata(company.name)}</publisher>`,
      `  <publisherurl>${wrapCdata(company.website || publicAppUrl)}</publisherurl>`,
      `  <lastBuildDate>${wrapCdata(new Date().toUTCString())}</lastBuildDate>`,
      jobsXml,
      '</source>',
    ].join('\n');
  }

  async getLinkedInFeed(companySlug: string) {
    const company = await this.getCompanyWithActiveJobs(companySlug);
    const publicAppUrl = getPublicAppUrl();
    const jobsXml = company.jobs
      .map((job) => {
        const jobUrl = `${publicAppUrl}/j/${company.slug}/${job.slug}`;
        const location = job.isRemote ? 'Remote' : job.location || 'Remote';

        return [
          '  <job>',
          `    <id>${wrapCdata(job.id)}</id>`,
          `    <title>${wrapCdata(job.title)}</title>`,
          `    <company>${wrapCdata(company.name)}</company>`,
          `    <location>${wrapCdata(location)}</location>`,
          `    <employmentType>${wrapCdata(job.type || 'Full-time')}</employmentType>`,
          `    <description>${wrapCdata(job.description)}</description>`,
          `    <applyUrl>${wrapCdata(jobUrl)}</applyUrl>`,
          '  </job>',
        ].join('\n');
      })
      .join('\n');

    return ['<?xml version="1.0" encoding="UTF-8"?>', '<jobs>', jobsXml, '</jobs>'].join('\n');
  }
}

export const feedService = new FeedService();
