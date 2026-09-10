import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Target, Sparkles, Briefcase, FileText, CheckCircle2 } from 'lucide-react';
import { SAMPLE_JOB_DESCRIPTIONS } from './sampleJds';

export const PasteJD = ({ onSubmit, onExtracted, loading: parentLoading }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [rawText, setRawText] = useState('');
  const [localLoading, setLocalLoading] = useState(false);
  const [selectedSample, setSelectedSample] = useState('');

  const loading = parentLoading !== undefined ? parentLoading : localLoading;

  const handleSelectSample = (sampleDomain) => {
    setSelectedSample(sampleDomain);
    const item = SAMPLE_JOB_DESCRIPTIONS.find(s => s.domain === sampleDomain);
    if (item) {
      setTitle(item.title);
      setCompany(item.company);
      setRawText(item.raw_text);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;

    if (onSubmit) {
      onSubmit({ title, company, raw_text: rawText });
      return;
    }

    setLocalLoading(true);
    try {
      const res = await resumeApi.createJobDescription({ title, company, raw_text: rawText });
      if (onExtracted) onExtracted(res.data);
    } catch (err) {
      console.error('Failed to parse JD', err);
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '2rem', background: '#FFFFFF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(37,99,235,0.06)' }}>
      {/* 🌟 1-Click Sample IT Job Description Loader */}
      <div style={{ marginBottom: '1.25rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '0.86rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Briefcase size={16} color="#2563EB" /> 1-Click Sample IT Job Descriptions
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748B' }}>Choose an industry role to auto-load real-world job requirements and test instant ATS score</div>
        </div>
        <select
          value={selectedSample}
          onChange={(e) => handleSelectSample(e.target.value)}
          style={{ padding: '0.5rem 0.9rem', borderRadius: '6px', border: '1.5px solid #2563EB', background: '#FFFFFF', fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', cursor: 'pointer', maxWidth: '320px' }}
        >
          <option value="">-- Or Select a Sample Job Posting --</option>
          {SAMPLE_JOB_DESCRIPTIONS.map(s => (
            <option key={s.domain} value={s.domain}>{s.label}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ padding: '0.5rem', borderRadius: '8px', background: '#EFF6FF', color: '#2563EB' }}>
          <Target size={22} />
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0, fontWeight: '800', color: '#0F172A' }}>
            Target Job Description
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.8rem', margin: '2px 0 0' }}>
            Our AI engine extracts core technical skills, required keywords, and target role titles
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Target Job Title (Optional)</label>
            <input type="text" className="form-control" placeholder="e.g. Senior Python Developer / Data Analyst" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Company Name (Optional)</label>
            <input type="text" className="form-control" placeholder="e.g. Google / Amazon / TCS" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: '1.25rem' }}>
          <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0F172A', marginBottom: '4px' }}>Full Job Description Text</label>
          <textarea
            className="form-control"
            rows={8}
            placeholder="Paste the full job posting here (responsibilities, required skills, tools, qualifications)..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            required
            style={{ fontSize: '0.85rem', lineHeight: '1.5' }}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem', fontWeight: '800', fontSize: '0.95rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }} disabled={loading}>
          {loading ? 'Extracting Keywords & Calculating ATS Score...' : <><Sparkles size={18} /> Extract Keywords & Calculate Real ATS Match</>}
        </button>
      </form>
    </div>
  );
};

export default PasteJD;
