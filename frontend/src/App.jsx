import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { ResumeBuilder } from './pages/ResumeBuilder/ResumeBuilder';
import { JobAnalyzerPage } from './pages/JobAnalyzer/JobAnalyzerPage';
import { Templates } from './pages/Templates';
import { CreateResume } from './pages/CreateResume';

const OpenRoute = ({ children }) => {
  const { loading } = useAuth();
  if (loading) return <div style={{ padding: '4rem', color: '#64748B', textAlign: 'center' }}>Loading Session...</div>;
  return children;
};

export const App = () => {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <main style={{ flex: 1 }}>
              <Routes>
                {/* Main Direct Landing Page */}
                <Route path="/" element={
                  <OpenRoute>
                    <LandingPage />
                  </OpenRoute>
                } />

                {/* Redirect any login/register requests directly to home landing page */}
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="/register" element={<Navigate to="/" replace />} />
                
                {/* Application Pages */}
                <Route path="/dashboard" element={
                  <OpenRoute>
                    <Dashboard />
                  </OpenRoute>
                } />

                <Route path="/builder/:id" element={
                  <OpenRoute>
                    <ResumeBuilder />
                  </OpenRoute>
                } />

                <Route path="/job-analyzer" element={
                  <OpenRoute>
                    <JobAnalyzerPage />
                  </OpenRoute>
                } />

                {/* Template Selection Routes matching user request */}
                <Route path="/templates" element={
                  <Templates />
                } />
                <Route path="/create-resume/templates" element={
                  <Templates />
                } />
                <Route path="/create-resume" element={<CreateResume />} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  );
};

export default App;
