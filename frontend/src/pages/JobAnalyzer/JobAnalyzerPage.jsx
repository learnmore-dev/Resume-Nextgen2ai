import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { resumeApi } from '../../api/resumeApi';
import { PasteJD } from './PasteJD';
import { ATSScoreCard } from './ATSScoreCard';
import { Target, FileText, ArrowRight } from 'lucide-react';

export const JobAnalyzerPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { resumes, fetchResumes } = useResume();

  const preselectedId = searchParams.get('resume_id');
  const [selectedResumeId, setSelectedResumeId] = useState(preselectedId || '');
  const [activeJd, setActiveJd] = useState(null);
  const [atsAnalysis, setAtsAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [optimizing, setOptimizing] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  useEffect(() => {
    if (resumes.length > 0 && !selectedResumeId) {
      const master = resumes.find(r => r.is_master) || resumes[0];
      setSelectedResumeId(master.id);
    }
  }, [resumes]);

  const handleJdExtracted = async (jdData) => {
    setActiveJd(jdData);
    if (!selectedResumeId) {
      alert('Please select a resume to match against.');
      return;
    }
    setAnalyzing(true);
    try {
      const res = await resumeApi.analyzeATS(selectedResumeId, jdData.id);
      setAtsAnalysis(res.data);
    } catch (err) {
      console.error('ATS analysis failed', err);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleOptimize = async () => {
    if (!selectedResumeId || !activeJd) return;
    setOptimizing(true);
    try {
      const res = await resumeApi.optimizeForJob(selectedResumeId, activeJd.id);
      navigate(`/builder/${res.data.id}`);
    } catch (err) {
      console.error('Optimization failed', err);
    } finally {
      setOptimizing(false);
    }
  };

  return (
    <div style={{ padding: '2.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Target className="text-indigo-400" /> ATS Job Description Matcher
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>Compare your resume against any target job description to get instant keyword match scores & AI job tailoring.</p>
      </div>

      {/* Select Source Master Resume */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', padding: '1.25rem 1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={16} /> Select Base Resume to Analyze & Tailor:
            </label>
          </div>
          <select
            className="form-control"
            style={{ maxWidth: '360px' }}
            value={selectedResumeId}
            onChange={(e) => setSelectedResumeId(e.target.value)}
          >
            {resumes.map(r => (
              <option key={r.id} value={r.id}>
                {r.title} {r.is_master ? '(Master)' : '(Tailored)'}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Paste JD Component */}
      <PasteJD onExtracted={handleJdExtracted} />

      {/* Loading Indicator */}
      {analyzing && (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Analyzing Resume against Job Description...</div>
          <p style={{ color: 'var(--text-muted)' }}>Evaluating keyword density, skill coverage, title alignment, and formatting structure...</p>
        </div>
      )}

      {/* ATS Scorecard Report */}
      {atsAnalysis && !analyzing && (
        <ATSScoreCard analysis={atsAnalysis} onOptimize={handleOptimize} optimizing={optimizing} />
      )}
    </div>
  );
};
