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
import { ArrowLeft, Download, Target, Layout, Eye, X } from 'lucide-react';

export const ResumeBuilder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { activeResume, fetchResumeDetail } = useResume();
  const [activeTab, setActiveTab] = useState('personal');
  const [downloading, setDownloading] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    fetchResumeDetail(id);
  }, [id]);

  const handleUpdate = () => {
    fetchResumeDetail(id);
  };

  const handleDownload = async () => {
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
      window.alert('PDF download failed. Please try again.');
    } finally {
      setDownloading(false);
    }
  };

  if (!activeResume) {
    return (
      <div style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        Loading Resume Builder...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 72px)' }}>
      {/* Builder Top Bar */}
      <div style={{ padding: '0.85rem 1.5rem', background: 'rgba(18, 24, 38, 0.95)', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/dashboard')} className="btn btn-secondary" style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem' }}>
            <ArrowLeft size={16} /> Back
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontFamily: 'var(--font-display)', color: '#FFFFFF' }}>{activeResume.title}</h2>
              {activeResume.is_master ? (
                <span className="badge badge-master">Master Base</span>
              ) : (
                <span className="badge badge-tailored">Job Tailored</span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons with High Contrast Visibility */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => navigate('/templates')}
            className="btn"
            style={{
              fontSize: '0.85rem',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#FFFFFF',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Layout size={15} /> Change Template
          </button>

          {/* Bright High-Contrast Preview Button */}
          <button
            onClick={() => setShowPreviewModal(true)}
            className="btn"
            style={{
              fontSize: '0.85rem',
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.2), rgba(37, 99, 235, 0.3))',
              color: '#38BDF8',
              border: '1px solid #38BDF8',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontWeight: '600',
              boxShadow: '0 0 12px rgba(56, 189, 248, 0.25)'
            }}
          >
            <Eye size={15} color="#38BDF8" /> Preview
          </button>

          <button onClick={() => navigate(`/job-analyzer?resume_id=${activeResume.id}`)} className="btn btn-ai" style={{ fontSize: '0.85rem' }}>
            <Target size={15} /> Check ATS Score
          </button>
          
          <button onClick={handleDownload} disabled={downloading} className="btn btn-primary" style={{ fontSize: '0.85rem' }}>
            <Download size={15} /> {downloading ? 'Preparing PDF...' : 'Download PDF'}
          </button>
        </div>
      </div>

      {/* Split Pane Editor Layout */}
      <div className="builder-layout">
        {/* Left Column: Form Editor */}
        <div className="builder-editor">
          {/* Section Selector Tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', overflowX: 'auto', paddingBottom: '0.25rem' }}>
            {[
              { id: 'personal', label: 'Personal Info' },
              { id: 'experience', label: 'Experience' },
              { id: 'education', label: 'Education' },
              { id: 'projects', label: 'Projects' },
              { id: 'skills', label: 'Skills' },
              { id: 'achievements', label: 'Achievements' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}`}
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === 'personal' && <PersonalInfoForm resume={activeResume} onUpdate={handleUpdate} />}
          {activeTab === 'experience' && <ExperienceForm resume={activeResume} onUpdate={handleUpdate} />}
          {activeTab === 'education' && <EducationForm resume={activeResume} onUpdate={handleUpdate} />}
          {activeTab === 'projects' && <ProjectsForm resume={activeResume} onUpdate={handleUpdate} />}
          {activeTab === 'skills' && <SkillsForm resume={activeResume} onUpdate={handleUpdate} />}
          {activeTab === 'achievements' && <AchievementsForm resume={activeResume} onUpdate={handleUpdate} />}
        </div>

        {/* Right Column: Live Resume Preview */}
        <div>
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
          {/* Modal Fixed Sticky Header Control Bar */}
          <div
            style={{
              padding: '1rem 2rem',
              background: 'rgba(15, 23, 42, 0.95)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
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

          {/* Modal Scrollable Container displaying 100% of Document */}
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
    </div>
  );
};
