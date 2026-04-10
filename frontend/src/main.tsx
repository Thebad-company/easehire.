import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import { ClerkProvider } from '@clerk/react'

import App from './App.tsx'
import SignInPage from './pages/SignInPage.tsx'
import SignUpPage from './pages/SignUpPage.tsx'
import DashboardPage from './pages/DashboardPage.tsx'
import JobsListPage from './pages/Dashboard/JobsListPage.tsx'
import CreateJobPage from './pages/Dashboard/CreateJobPage.tsx'
import JobDetailsPage from './pages/Dashboard/JobDetailsPage.tsx'
import CandidatesPage from './pages/Dashboard/CandidatesPage.tsx'
import SettingsPage from './pages/Dashboard/SettingsPage.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'
import CompanyCareerPage from './pages/Public/CompanyCareerPage.tsx'
import JobPostingPage from './pages/Public/JobPostingPage.tsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in your .env file')
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <Routes>
          {/* Public — Landing Page */}
          <Route path="/" element={<App />} />

          {/* Clerk Auth Pages */}
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/careers/:companySlug" element={<CompanyCareerPage />} />
          <Route path="/j/:companySlug/:jobSlug" element={<JobPostingPage />} />

          {/* Protected — App Dashboards */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/jobs" element={<JobsListPage />} />
          <Route path="/dashboard/jobs/new" element={<CreateJobPage />} />
          <Route path="/dashboard/jobs/:id" element={<JobDetailsPage />} />
          <Route path="/dashboard/candidates" element={<CandidatesPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          
          {/* Catch-all 404 handler */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
)
