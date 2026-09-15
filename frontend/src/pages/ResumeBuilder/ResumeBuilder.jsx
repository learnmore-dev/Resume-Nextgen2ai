import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useResume } from '../../context/ResumeContext';
import { resumeApi } from '../../api/resumeApi';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { ProjectsForm } from './ProjectsForm';
import { SkillsForm } from './SkillsForm';
import { AchievementsForm } from './AchievementsForm';
import { ResumePreview } from './ResumePreview';
import { TemplateRenderer } from './templates/TemplateRenderer';
import { ArrowLeft, Download, Target, Layout, Eye, X, User, Briefcase, GraduationCap, FolderGit2, Cpu, Award } from 'lucide-react';
import { PaymentModal } from '../../components/PaymentModal';

export const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeResume, fetchResumeDetail } = useResume();
  const [activeTab, setActiveTab] = useState('personal');
  const [downloading, setDownloading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [loadingResume, setLoadingResume] = useState(() => !activeResume || String(activeResume?.id) !== String(id));
  const [loadError, setLoadError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    if (id) {
      if (!activeResume || String(activeResume.id) !== String(id)) {
        setLoadingResume(true);
      }
      setLoadError(null);
      fetchResumeDetail(id)
        .then(() => {
          if (isMounted) setLoadingResume(false);
        })
        .catch((err) => {
          if (isMounted) {
            console.error('Failed to load resume', err);
            setLoadError('Resume could not be loaded or was not found.');
            setLoadingResume(false);
          }
        });
    }
    return () => { isMounted = false; };
  }, [id]);

  // Restrict direct browser printing (Ctrl+P / Cmd+P)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        alert('⚠️ Direct Browser Printing (Ctrl + P) is Restricted!\n\nTo ensure your resume layout and styling are preserved, please use the official "Download PDF" button at the top.');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleUpdate = () => {
    fetchResumeDetail(id);
  };

  const executeDownload = async () => {
    if (!activeResume) return;
    setDownloading(true);
    try {
      const response = await resumeApi.exportPDF(activeResume.id, activeResume.template_id);
      const fileUrl = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      const link = document.createElement('a');
      link.href = fileUrl;
      link.download = `${activeResume.title.replace(/[^a-z0-9]+/gi, '_') || 'Resume'}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error('PDF export failed', error);
      if (error.response?.status === 402) {
        setShowPaymentModal(true);
      } else {
        window.alert('PDF download failed. Please try again.');
      }
    } finally {
      setDownloading(false);
    }
  };

  const handleDownload = async () => {
    if (!activeResume) return;
    setDownloading(true);
    try {
      // Check if user already paid ₹29 for this resume
      const statusRes = await resumeApi.checkPaymentStatus(activeResume.id);
      if (statusRes.data?.is_paid) {
        await executeDownload();
      } else {
        setDownloading(false);
        setShowPaymentModal(true);
      }
    } catch (err) {
      console.warn('Payment check failed, opening checkout modal', err);
      setDownloading(false);
      setShowPaymentModal(true);
    }
  };

  if (loadError) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>⚠️</div>
        <h3 style={{ fontSize: '1.25rem', color: '#EF4444', marginBottom: '0.5rem' }}>Resume #{id} Not Found</h3>
        <p style={{ color: '#64748B', maxWidth: '400px', marginBottom: '1.5rem' }}>
          We could not load this resume. You can select another resume from your dashboard or create a new one.
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} className="btn btn-primary">
            Go to Dashboard
          </button>
          <button onClick={() => navigate('/create-resume')} className="btn btn-secondary">
            Create New Resume
          </button>
        </div>
      </div>
    );
  }

  if (loadingResume || !activeResume || String(activeResume.id) !== String(id)) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #E2E8F0', borderTopColor: '#4F46E5', borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '1rem' }} />
        <div style={{ fontWeight: '600', color: '#1E293B' }}>Loading Resume #{id}...</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 72px)', background: '#F0F7FF' }}>
      {/* Builder Top Bar */}
      <div style={{ padding: '0.85rem 1.5rem', background: '#FFFFFF', borderBottom: '1px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(37, 99, 235, 0.06)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-display)', color: '#0F172A', fontWeight: '800', margin: 0 }}>{activeResume.title}</h2>
              {activeResume.is_master ? (
                <span className="badge" style={{ background: '#DBEAFE', color: '#1E40AF', border: '1px solid #BFDBFE', fontWeight: '700' }}>Master Base</span>
              ) : (
                <span className="badge" style={{ background: '#DCFCE7', color: '#15803D', border: '1px solid #86EFAC', fontWeight: '700' }}>Job Tailored</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => navigate('/templates')}
            className="btn"
            style={{
              fontSize: '0.85rem',
              background: '#FFFFFF',
              color: '#1E40AF',
              border: '1px solid #93C5FD',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '600'
            }}
          >
            <Layout size={15} /> Change Template
          </button>

          <button
            onClick={() => setShowPreviewModal(true)}
            className="btn"
            style={{
              fontSize: '0.85rem',
              background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
              color: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '700',
              boxShadow: '0 2px 8px rgba(37, 99, 235, 0.25)'
            }}
          >
            <Eye size={15} color="#FFFFFF" /> Preview
          </button>

          <button onClick={() => navigate(`/job-analyzer?resume_id=${activeResume.id}`)} className="btn btn-ai" style={{ fontSize: '0.85rem', fontWeight: '700' }}>
            <Target size={15} /> Check ATS Score
          </button>
          
          <button onClick={handleDownload} disabled={downloading} className="btn btn-primary" style={{ fontSize: '0.85rem', fontWeight: '700' }}>
            <Download size={15} /> {downloading ? 'Preparing PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Split Pane Editor Layout (42% Form / 58% Large Preview) */}
      <div className="builder-layout">
        {/* Left Column: Form Editor */}
        <div className="builder-editor">
          {/* Section Selector Tabs with Modern Hover & Glow Animations */}
          <div className="builder-tabs-container">
            {[
              { id: 'personal', label: 'Personal Info', icon: User },
              { id: 'experience', label: 'Experience', icon: Briefcase },
              { id: 'education', label: 'Education', icon: GraduationCap },
              { id: 'projects', label: 'Projects', icon: FolderGit2 },
              { id: 'skills', label: 'Skills', icon: Cpu },
              { id: 'achievements', label: 'Achievements', icon: Award },
            ].map(tab => {
              const IconComponent = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`builder-tab-btn ${isActive ? 'active' : ''}`}
                >
                  <IconComponent size={15} color={isActive ? '#FFFFFF' : '#2563EB'} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {activeTab === 'personal' && <PersonalInfoForm resume={activeResume} onUpdate={handleUpdate} />}
          {activeTab === 'experience' && <ExperienceForm resume={activeResume} onUpdate={handleUpdate} />}
          {activeTab === 'education' && <EducationForm resume={activeResume} onUpdate={handleUpdate} />}
          {activeTab === 'projects' && <ProjectsForm resume={activeResume} onUpdate={handleUpdate} />}
          {activeTab === 'skills' && <SkillsForm resume={activeResume} onUpdate={handleUpdate} />}
          {activeTab === 'achievements' && <AchievementsForm resume={activeResume} onUpdate={handleUpdate} />}
        </div>

        {/* Right Column: Live Resume Preview (58% Width) */}
        <div className="builder-preview-wrapper">
          <ResumePreview resume={activeResume} />
        </div>
      </div>

      {/* Full Screen Live Document Preview Modal Overlay */}
      {showPreviewModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 9999,
            backgroundColor: 'rgba(15, 23, 42, 0.92)',
            backdropFilter: 'blur(12px)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              padding: '1rem 2rem',
              background: 'rgba(15, 23, 42, 0.95)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#FFFFFF',
              zIndex: 10000
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Eye size={22} color="#38BDF8" />
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontFamily: 'var(--font-display)', fontWeight: 600 }}>
                Full Screen Resume Preview — {activeResume.title}
              </h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="btn btn-primary"
                style={{ fontSize: '0.85rem', padding: '0.45rem 1.1rem' }}
              >
                <Download size={15} /> Download PDF
              </button>
              <button
                onClick={() => setShowPreviewModal(false)}
                className="btn"
                style={{
                  padding: '0.45rem',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  color: '#FFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '2rem 1rem',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setShowPreviewModal(false);
            }}
          >
            <div
              style={{
                width: '100%',
                maxWidth: '850px',
                backgroundColor: '#FFFFFF',
                borderRadius: '8px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
                overflow: 'hidden',
                marginBottom: '3rem',
                color: '#1A1A1A'
              }}
            >
              <TemplateRenderer resume={activeResume} />
            </div>
          </div>
        </div>
      )}

      {/* Razorpay ₹29 Payment Modal */}
      {showPaymentModal && activeResume && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          resume={activeResume}
          onPaymentSuccess={() => {
            executeDownload();
          }}
        />
      )}
    </div>
  );
};

export default ResumeBuilder;
