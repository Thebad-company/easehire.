export type UserRole = 'ADMIN' | 'RECRUITER' | 'HIRING_MANAGER';
export type JobStatus = 'DRAFT' | 'ACTIVE' | 'CLOSED' | 'ARCHIVED';
export type ApplicationStage = 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER' | 'HIRED' | 'REJECTED';

export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  role: UserRole;
  avatarUrl?: string | null;
  companyId?: string | null;
  company?: Company | null;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  logoUrl?: string | null;
  website?: string | null;
  industry?: string | null;
  size?: string | null;
  description?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  location?: string | null;
  isRemote: boolean;
  salaryMin?: number | null;
  salaryMax?: number | null;
  status: JobStatus;
  companyId: string;
  postedAt?: string | null;
  createdAt: string;
  updatedAt: string;
  applications?: Application[];
  _count?: {
    applications: number;
  };
}

export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string | null;
  resumeUrl?: string | null;
  linkedInUrl?: string | null;
  aiScore?: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  id: string;
  stage: ApplicationStage;
  notes?: string | null;
  source?: string | null;
  aiSummary?: string | null;
  jobId: string;
  job?: Job;
  candidateId: string;
  candidate?: Candidate;
  appliedAt: string;
  updatedAt: string;
}
