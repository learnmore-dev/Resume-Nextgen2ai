import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Target, Sparkles, CheckCircle2 } from 'lucide-react';

export const PasteJD = ({ onExtracted }) => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rawText.trim()) return;
    setLoading(true);
    try {
      const res = await resumeApi.createJobDescription({ title, company, raw_text: rawText });
      onExtracted(res.data);
    } catch (err) {
      console.error('Failed to parse JD', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <div style={{ padding: '0.5rem', borderRadius: 'var(--radius-sm)', background: 'rgba(99,102,241,0.2)', color: 'var(--primary)' }}>
          <Target size={24} />
        </div>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem' }}>Paste Job Description</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Our AI engine extracts core technical skills, required keywords, and target role titles</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label>Target Job Title (Optional)</label>
            <input type="text" className="form-control" placeholder="Senior Python Developer" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Company Name (Optional)</label>
            <input type="text" className="form-control" placeholder="Google / Acme Corp" value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label>Full Job Description Text</label>
          <textarea
            className="form-control"
            rows={8}
            placeholder="Paste the full job posting here (responsibilities, required skills, tools, qualifications)..."
            value={rawText}
            onChange={(e) => setRawText(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }} disabled={loading}>
          {loading ? 'Extracting Keywords & Parsing JD...' : <><Sparkles size={18} /> Extract Keywords & Analyze ATS Match</>}
        </button>
      </form>
    </div>
  );
};
