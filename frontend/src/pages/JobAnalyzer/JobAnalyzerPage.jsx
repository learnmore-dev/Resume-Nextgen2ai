import React, { useState, useEffect } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { ATSScoreCard } from './ATSScoreCard';
import { PasteJD } from './PasteJD';
import { ResumeSelector } from './ResumeSelector';
import { UploadResume } from './UploadResume';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText, UploadCloud, ShieldCheck, Target, ArrowRight } from 'lucide-react';

export const JobAnalyzerPage = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [inputMode, setInputMode] = useState('built'); // 'built' | 'upload'
  
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await resumeApi.getResumes();
      setResumes(res.data);
      if (res.data.length > 0) {
        setSelectedResumeId(res.data[0].id);
      }
    } catch (err) {
      console.error('Failed to load resumes', err);
    }
  };

  const handleAnalyze = async (jdData) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Create Job Description
      const jdRes = await resumeApi.createJobDescription(jdData);
      const jdId = jdRes.data.id;

      if (inputMode === 'upload') {
        if (!uploadedFile) {
          setError('Please upload a .pdf or .docx resume file first.');
          setLoading(false);
          return;
        }
        const analyzeRes = await resumeApi.uploadPDFAndAnalyzeATS(uploadedFile, jdId);
        setAnalysis(analyzeRes.data);
      } else {
        if (!selectedResumeId) {
          setError('Please select a built resume to analyze.');
          setLoading(false);
          return;
        }
        const analyzeRes = await resumeApi.analyzeATS(selectedResumeId, jdId);
        setAnalysis(analyzeRes.data);
      }
    } catch (err) {
      console.error('ATS analysis failed', err);
      setError(err.response?.data?.error || 'Failed to analyze resume. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOptimize = async () => {
    if (!selectedResumeId || !analysis) return;
    setOptimizing(true);
    try {
      const jdId = analysis.job_description;
      const res = await resumeApi.optimizeForJob(selectedResumeId, jdId);
      setAnalysis(prev => ({
        ...prev,
        optimizedResult: res.data
      }));
    } catch (err) {
      console.error('Failed to optimize resume', err);
      alert('Optimization failed. Please try again.');
    } finally {
      setOptimizing(false);
    }
  };

  const handleReset = () => {
    setAnalysis(null);
    setUploadedFile(null);
    setError(null);
  };

  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem', maxWidth: '1080px' }}>
      
      {/* 🌟 Top Hero Header */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(37,99,235,0.08)',
          color: '#2563EB',
          padding: '6px 16px',
          borderRadius: '30px',
          fontSize: '0.82rem',
          fontWeight: '800',
          marginBottom: '1rem',
          border: '1px solid rgba(37,99,235,0.2)'
        }}>
          <ShieldCheck size={16} /> REAL ATS SCORING & TAILORING ENGINE
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.5rem',
          fontWeight: '900',
          color: '#0F172A',
          letterSpacing: '-0.03em',
          margin: '0 0 0.8rem'
        }}>
          Free Real-World ATS Resume Checker
        </h1>

        <p style={{
          fontSize: '1.05rem',
          color: '#475569',
          maxWidth: '720px',
          margin: '0 auto',
          lineHeight: '1.6'
        }}>
          Scan your resume against any Job Description to get an instant <strong>0–100% weighted ATS score</strong>, detect missing hard skills, and verify quantifiable metrics.
        </p>
      </div>

      {error && (
        <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', color: '#991B1B', padding: '1rem', borderRadius: '10px', marginBottom: '2rem', fontWeight: '600', fontSize: '0.9rem', textAlign: 'center' }}>
          {error}
        </div>
      )}

      {/* 🌟 1. Source Resume Card */}
      <div className="glass-card" style={{ background: '#FFFFFF', border: '1.5px solid #E2E8F0', borderRadius: '14px', padding: '2rem', marginBottom: '2rem', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
        
        {/* Tab Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '1rem' }}>
          <button
            onClick={() => { setInputMode('built'); setError(null); }}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: inputMode === 'built' ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
              background: inputMode === 'built' ? '#EFF6FF' : '#FFFFFF',
              color: inputMode === 'built' ? '#2563EB' : '#64748B',
              fontWeight: '800',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <FileText size={18} /> Select Built Resume ({resumes.length})
          </button>

          <button
            onClick={() => { setInputMode('upload'); setError(null); }}
            style={{
              padding: '0.65rem 1.25rem',
              borderRadius: '8px',
              border: inputMode === 'upload' ? '1.5px solid #2563EB' : '1px solid #E2E8F0',
              background: inputMode === 'upload' ? '#EFF6FF' : '#FFFFFF',
              color: inputMode === 'upload' ? '#2563EB' : '#64748B',
              fontWeight: '800',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <UploadCloud size={18} /> 📁 Upload External Resume (PDF / DOCX)
          </button>
        </div>

        {inputMode === 'built' ? (
          resumes.length > 0 ? (
            <ResumeSelector
              resumes={resumes}
              selectedId={selectedResumeId}
              onSelect={setSelectedResumeId}
            />
          ) : (
            <div style={{ textAlign: 'center', padding: '1.5rem', background: '#F8FAFC', borderRadius: '10px' }}>
              <p style={{ color: '#64748B', margin: '0 0 1rem', fontSize: '0.9rem' }}>No resumes created yet in the builder.</p>
              <button onClick={() => navigate('/builder')} className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
                Create Master Resume
              </button>
            </div>
          )
        ) : (
          <UploadResume
            file={uploadedFile}
            onFileSelect={setUploadedFile}
            onFileRemove={() => setUploadedFile(null)}
          />
        )}
      </div>

      {/* 🌟 2. Job Description Form */}
      <PasteJD onSubmit={handleAnalyze} loading={loading} />

      {/* 🌟 3. ATS Analysis Scorecard Output */}
      {analysis && (
        <ATSScoreCard
          analysis={analysis}
          onOptimize={handleOptimize}
          optimizing={optimizing}
          isUploadedPdf={inputMode === 'upload'}
          onReset={handleReset}
        />
      )}

    </div>
  );
};

export default JobAnalyzerPage;
