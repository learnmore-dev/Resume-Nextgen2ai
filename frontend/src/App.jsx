import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { PageLoader } from './components/PageLoader';

// Landing page loaded statically for instant 0ms initial load
import { LandingPage } from './pages/LandingPage';

// Route-based code splitting for secondary pages to ensure lightning-fast initial bundle
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const ResumeBuilder = lazy(() => import('./pages/ResumeBuilder/ResumeBuilder').then(m => ({ default: m.ResumeBuilder })));
const JobAnalyzerPage = lazy(() => import('./pages/JobAnalyzer/JobAnalyzerPage').then(m => ({ default: m.JobAnalyzerPage })));
const Templates = lazy(() => import('./pages/Templates').then(m => ({ default: m.Templates })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const ObjectivesSummaries = lazy(() => import('./pages/ObjectivesSummaries').then(m => ({ default: m.ObjectivesSummaries })));
const ResumeWritingGuide = lazy(() => import('./pages/ResumeWritingGuide').then(m => ({ default: m.ResumeWritingGuide })));
const InterviewTips = lazy(() => import('./pages/InterviewTips').then(m => ({ default: m.InterviewTips })));
const TermsAndConditions = lazy(() => import('./pages/TermsAndConditions').then(m => ({ default: m.TermsAndConditions })));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy').then(m => ({ default: m.PrivacyPolicy })));
const ContactUs = lazy(() => import('./pages/ContactUs').then(m => ({ default: m.ContactUs })));
const CareersPage = lazy(() => import('./pages/CareersPage').then(m => ({ default: m.CareersPage })));
const NewsEventsPage = lazy(() => import('./pages/NewsEventsPage').then(m => ({ default: m.NewsEventsPage })));
const SeoLandingPage = lazy(() => import('./pages/SeoLandingPage').then(m => ({ default: m.SeoLandingPage })));

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export const App = () => {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <div className="app-container">
            <Navbar />
            <main style={{ flex: 1 }}>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  {/* Public Landing Page */}
                  <Route path="/" element={<LandingPage />} />
                  {/* SEO Landing Pages — keyword-targeted routes */}
                  <Route path="/ats-resume-builder" element={<SeoLandingPage pageKey="ats" />} />
                  <Route path="/resume-builder-for-freshers" element={<SeoLandingPage pageKey="freshers" />} />
                  <Route path="/free-resume-templates" element={<SeoLandingPage pageKey="templates" />} />
                  {/* legacy redirect for old /resume-templates path */}
                  <Route path="/resume-templates" element={<SeoLandingPage pageKey="templates" />} />
                  <Route path="/student-resume-builder" element={<SeoLandingPage pageKey="students" />} />
                  <Route path="/resume-builder-for-experienced" element={<SeoLandingPage pageKey="experienced" />} />
                  <Route path="/resume-examples" element={<SeoLandingPage pageKey="examples" />} />
                  <Route path="/resume-builder-pdf" element={<SeoLandingPage pageKey="pdf" />} />
                  <Route path="/resume-maker-pdf" element={<SeoLandingPage pageKey="pdf" />} />
                  <Route path="/professional-resume-builder" element={<SeoLandingPage pageKey="professional" />} />
                  <Route path="/free-resume-builder" element={<SeoLandingPage pageKey="nopay" />} />
                  <Route path="/resume-builder-no-pay" element={<SeoLandingPage pageKey="nopay" />} />
                  <Route path="/resume-builder-microsoft-word" element={<SeoLandingPage pageKey="word" />} />
                  <Route path="/google-docs-resume-templates" element={<SeoLandingPage pageKey="googledocs" />} />
                  <Route path="/ai-resume-builder" element={<SeoLandingPage pageKey="ai" />} />
                  <Route path="/best-ai-resume-builder" element={<SeoLandingPage pageKey="ai" />} />
                  <Route path="/create-resume-online-free" element={<SeoLandingPage pageKey="createonline" />} />
                  <Route path="/edit-resume-online" element={<SeoLandingPage pageKey="editresume" />} />
                  <Route path="/kickresume-alternative" element={<SeoLandingPage pageKey="kickresume" />} />

                  {/* Public Corporate & Legal Pages */}
                  <Route path="/terms" element={<TermsAndConditions />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/contact" element={<ContactUs />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/news" element={<NewsEventsPage />} />
                  <Route path="/events" element={<NewsEventsPage />} />

                  {/* Redirect any login/register requests directly to home */}
                  <Route path="/login" element={<Navigate to="/" replace />} />
                  <Route path="/register" element={<Navigate to="/" replace />} />
                  
                  {/* Protected User Dashboard */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />

                  {/* Protected Admin Dashboard (Admins Only) */}
                  <Route path="/admin-dashboard" element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  } />
                  <Route path="/admin" element={<Navigate to="/admin-dashboard" replace />} />

                  {/* Protected Resume Builder */}
                  <Route path="/builder/:id" element={
                    <ProtectedRoute>
                      <ResumeBuilder />
                    </ProtectedRoute>
                  } />

                  {/* Protected ATS Resume Checker */}
                  <Route path="/job-analyzer" element={
                    <ProtectedRoute>
                      <JobAnalyzerPage />
                    </ProtectedRoute>
                  } />

                  {/* Public Educational & Career Resources */}
                  <Route path="/objectives-summaries" element={<ObjectivesSummaries />} />
                  <Route path="/resume-writing-guide" element={<ResumeWritingGuide />} />
                  <Route path="/resume-guide" element={<ResumeWritingGuide />} />
                  <Route path="/career-interview-tips" element={<InterviewTips />} />
                  <Route path="/interview-tips" element={<InterviewTips />} />
                  <Route path="/career-advice" element={<ResumeWritingGuide />} />

                  {/* Protected Template Selection Routes */}
                  <Route path="/templates" element={
                    <ProtectedRoute>
                      <Templates />
                    </ProtectedRoute>
                  } />
                  <Route path="/create-resume" element={
                    <ProtectedRoute>
                      <Templates />
                    </ProtectedRoute>
                  } />
                  <Route path="/create-resume/templates" element={
                    <ProtectedRoute>
                      <Templates />
                    </ProtectedRoute>
                  } />

                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
};

export default App;
