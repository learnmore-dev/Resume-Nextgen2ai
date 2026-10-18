import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Plus, X, Award, Edit3, Check, Sparkles } from 'lucide-react';
import { DomainSelectDropdown } from './DomainSelectDropdown';

const IT_COURSE_DOMAINS = [
  { value: 'Data Analytics', label: '📊 Data Analytics (Python, SQL, Power BI, Excel)' },
  { value: 'Python Full Stack', label: '🐍 Python Full Stack (Django, React, PostgreSQL)' },
  { value: 'Java Full Stack', label: '☕ Java Full Stack (Spring Boot, React, MySQL)' },
  { value: 'MERN Stack Developer', label: '⚛️ MERN Stack (MongoDB, Express, React, Node.js)' },
  { value: 'Data Science & Machine Learning', label: '🤖 Data Science & ML (Python, Scikit-Learn, TensorFlow)' },
  { value: 'DevOps & Cloud Engineer', label: '☁️ DevOps & Cloud (AWS, Docker, Kubernetes, CI/CD)' },
  { value: 'Software Engineer', label: '💻 Software Engineer (DSA, OOP, System Design)' },
  { value: 'Cyber Security Analyst', label: '🛡️ Cyber Security & SOC Analyst (SIEM, Splunk, Network)' },
  { value: 'QA Automation Engineer', label: '🧪 QA Automation Tester (Selenium, PyTest, TestNG)' },
  { value: 'UI/UX Designer', label: '🎨 UI/UX & Product Designer (Figma, Wireframing, UX)' },
  { value: 'Mobile App Developer', label: '📱 Mobile App Developer (Flutter, React Native)' },
  { value: 'Business Analyst', label: '📈 Business Analyst (SQL, Agile/Scrum, JIRA, Power BI)' }
];

const ROLE_ACHIEVEMENT_PRESETS = {
  'Data Analytics': [
    { title: "Ranked in Top 5% in Kaggle Data Analytics & Visualization Challenge 2025.", date: "May 2025" },
    { title: "Microsoft Certified: Power BI Data Analyst Associate (PL-300).", date: "Jan 2025" },
    { title: "Solved 100+ SQL & Data Querying challenges with Gold Badge on HackerRank.", date: "2024 - 2026" }
  ],
  'Python Full Stack': [
    { title: "Top 15 - HackHazards National Hackathon 2025 (Fluvio Track) for DevNest AI.", date: "May 2025" },
    { title: "Solved 500+ DSA & Problem Solving challenges on LeetCode & GeeksforGeeks.", date: "Oct 2024 - Jan 2026" },
    { title: "Built and deployed 5+ production-grade web applications on AWS & Docker.", date: "2025" }
  ],
  'Java Full Stack': [
    { title: "Winner - Smart India Enterprise Hackathon 2025 (Spring Boot Microservices Track).", date: "Apr 2025" },
    { title: "Oracle Certified Professional: Java SE 17 Developer.", date: "Nov 2024" },
    { title: "Solved 450+ Data Structures & Algorithms problems in Java on LeetCode.", date: "2024 - 2026" }
  ],
  'MERN Stack Developer': [
    { title: "1st Place - Full Stack Web Dev Hackathon 2025 for real-time collaboration app.", date: "Jun 2025" },
    { title: "Built full-stack open-source NPM package with 2,000+ weekly downloads.", date: "Feb 2025" },
    { title: "Solved 350+ JavaScript & algorithm problems on LeetCode.", date: "2024 - 2026" }
  ],
  'Data Science & Machine Learning': [
    { title: "Kaggle Competitions Expert with 2x Silver Medals in Predictive Modeling.", date: "Apr 2025" },
    { title: "TensorFlow Developer Certificate - Deep Learning & NLP Specialization.", date: "Dec 2024" },
    { title: "Published technical research article on XGBoost feature optimization (5k+ reads).", date: "2025" }
  ],
  'DevOps & Cloud Engineer': [
    { title: "AWS Certified Solutions Architect – Associate (SAA-C03).", date: "May 2025" },
    { title: "Certified Kubernetes Administrator (CKA) - Cloud Native Computing Foundation.", date: "Jan 2025" },
    { title: "Automated zero-downtime CI/CD deployment pipeline cutting deployment time by 80%.", date: "2025" }
  ],
  'Software Engineer': [
    { title: "Solved 500+ Data Structures & Algorithms challenges (Knight Badge on LeetCode).", date: "2024 - 2026" },
    { title: "Ranked Global Top 2% in Google Code Jam / HashCode preliminary round.", date: "2025" },
    { title: "Open Source Contributor to popular developer tooling repositories on GitHub.", date: "2025" }
  ],
  'Cyber Security Analyst': [
    { title: "CompTIA Security+ (SY0-701) Certified Specialist.", date: "Mar 2025" },
    { title: "Ranked Top 3% on TryHackMe & Hack The Box in Network Defense & SOC modules.", date: "2024 - 2026" },
    { title: "Discovered and responsibly disclosed 3 high-severity security vulnerabilities (CVE).", date: "2025" }
  ],
  'QA Automation Engineer': [
    { title: "ISTQB Certified Tester Foundation Level (CTFL).", date: "Feb 2025" },
    { title: "Created modular test automation framework reducing regression execution from 8hrs to 45mins.", date: "2025" },
    { title: "Postman API Automation Certified Student Expert.", date: "Nov 2024" }
  ],
  'UI/UX Designer': [
    { title: "Featured on Dribbble & Behance for Fintech Mobile Banking Design System (10k+ views).", date: "Apr 2025" },
    { title: "Google UX Design Professional Certificate - 7-course specialization.", date: "Dec 2024" },
    { title: "Winner - Best User Experience Design Award at Inter-College Design Conclave.", date: "2025" }
  ],
  'Mobile App Developer': [
    { title: "Published 3 cross-platform applications on Google Play Store with 10,000+ total downloads.", date: "2025" },
    { title: "Flutter Certified Mobile Application Developer.", date: "Nov 2024" },
    { title: "Maintained 4.8-star rating across published mobile apps with 99.9% crash-free sessions.", date: "2025" }
  ],
  'Business Analyst': [
    { title: "PMI-PBA (Project Management Institute - Professional in Business Analysis).", date: "Mar 2025" },
    { title: "Delivered digital transformation roadmap that improved operational efficiency by 40%.", date: "2025" },
    { title: "Certified ScrumMaster (CSM) - Scrum Alliance.", date: "Dec 2024" }
  ]
};

const detectRole = (resume) => {
  const target = (resume?.target_job_title || '').toLowerCase();
  const summary = (resume?.personal_info?.summary || '').toLowerCase();
  const title = (resume?.title || '').toLowerCase();
  const combined = `${target} ${summary} ${title}`;

  for (const item of IT_COURSE_DOMAINS) {
    if (combined.includes(item.value.toLowerCase())) {
      return item.value;
    }
  }
  if (combined.includes('data') || combined.includes('analytic') || combined.includes('bi')) return 'Data Analytics';
  if (combined.includes('java') || combined.includes('spring')) return 'Java Full Stack';
  if (combined.includes('mern') || combined.includes('node') || combined.includes('react')) return 'MERN Stack Developer';
  if (combined.includes('devops') || combined.includes('cloud') || combined.includes('aws')) return 'DevOps & Cloud Engineer';
  if (combined.includes('design') || combined.includes('ui') || combined.includes('ux')) return 'UI/UX Designer';
  if (combined.includes('qa') || combined.includes('test')) return 'QA Automation Engineer';
  if (combined.includes('cyber') || combined.includes('security')) return 'Cyber Security Analyst';
  return 'Data Analytics';
};

export const AchievementsForm = ({ resume, onUpdate }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [loadingPreset, setLoadingPreset] = useState(false);
  const [selectedDomain, setSelectedDomain] = React.useState(detectRole(resume));

  React.useEffect(() => {
    setSelectedDomain(detectRole(resume));
  }, [resume?.target_job_title, resume?.personal_info?.summary, resume?.title]);

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDate, setEditDate] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      await resumeApi.addAchievement(resume.id, { title: title.trim(), date: date.trim() });
      setTitle('');
      setDate('');
      onUpdate();
    } catch (err) {
      console.error('Failed to add achievement', err);
    }
  };

  const handleLoadPreset = async (domainKey = selectedDomain) => {
    const achList = ROLE_ACHIEVEMENT_PRESETS[domainKey] || ROLE_ACHIEVEMENT_PRESETS['Data Analytics'];
    if (!achList) return;
    setLoadingPreset(true);
    try {
      for (const item of resume.achievements || []) {
        await resumeApi.deleteAchievement(resume.id, item.id);
      }
      for (const a of achList) {
        await resumeApi.addAchievement(resume.id, a);
      }
      onUpdate();
    } catch (err) {
      console.error('Failed to load preset', err);
    } finally {
      setLoadingPreset(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await resumeApi.deleteAchievement(resume.id, id);
      onUpdate();
    } catch (err) {
      console.error('Failed to delete achievement', err);
    }
  };

  const handleStartEdit = (ach) => {
    setEditingId(ach.id);
    setEditTitle(ach.title || '');
    setEditDate(ach.date || '');
  };

  const handleSaveEdit = async (id) => {
    try {
      await resumeApi.updateAchievement(resume.id, id, {
        title: editTitle.trim(),
        date: editDate.trim()
      });
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error('Failed to save achievement edit', err);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem', background: '#FFFFFF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(37,99,235,0.06)' }}>
      {/* 🌟 Top IT Domain Selector Dropdown (White Card Design) */}
      <div style={{ marginBottom: '1.25rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Award size={16} color="#2563EB" /> Select IT Domain for Achievements & Certifications
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748B' }}>Choose your course domain to auto-load top certifications & awards</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', minWidth: '280px', flex: '1 1 280px', justifyContent: 'flex-end' }}>
          <div style={{ flex: '1 1 240px', maxWidth: '380px' }}>
            <DomainSelectDropdown
              options={IT_COURSE_DOMAINS}
              value={selectedDomain}
              onChange={(dom) => {
                setSelectedDomain(dom);
                handleLoadPreset(dom);
              }}
              placeholder="-- Select IT Domain --"
            />
          </div>
          <button
            type="button"
            onClick={() => handleLoadPreset(selectedDomain)}
            disabled={loadingPreset}
            className="btn btn-ai"
            style={{ fontSize: '0.8rem', padding: '0.62rem 0.95rem', fontWeight: '700', borderRadius: '8px' }}
          >
            <Sparkles size={14} /> {loadingPreset ? 'Loading...' : 'Auto-Fill'}
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0, color: '#0F172A', fontWeight: '800' }}>Key Achievements & Certifications</h3>
      </div>

      {/* Add Form */}
      <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr auto', gap: '0.6rem', marginBottom: '1.25rem', alignItems: 'end' }}>
        <div className="form-group" style={{ margin: 0 }}>
          <label style={{ fontSize: '0.8rem' }}>Achievement / Certification Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="e.g. Microsoft Certified: Power BI Data Analyst Associate (PL-300)"
            required
          />
        </div>
        <div className="form-group" style={{ margin: 0 }}>
          <label style={{ fontSize: '0.8rem' }}>Date / Year</label>
          <input
            type="text"
            className="form-control"
            value={date}
            onChange={e => setDate(e.target.value)}
            placeholder="e.g. Jan 2025"
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', fontWeight: '700' }}>
          <Plus size={14} /> Add
        </button>
      </form>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {(resume.achievements || []).map(ach => (
          <div key={ach.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.75rem 1rem' }}>
            {editingId === ach.id ? (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <input type="text" className="form-control" style={{ flex: '2 1 250px' }} value={editTitle} onChange={e => setEditTitle(e.target.value)} placeholder="Achievement Title" />
                <input type="text" className="form-control" style={{ flex: '1 1 120px' }} value={editDate} onChange={e => setEditDate(e.target.value)} placeholder="Date" />
                <button type="button" onClick={() => handleSaveEdit(ach.id)} className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.7rem' }}>Save</button>
                <button type="button" onClick={() => setEditingId(null)} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.7rem' }}>Cancel</button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Award size={15} color="#2563EB" />
                  <span style={{ fontSize: '0.85rem', color: '#1E293B', fontWeight: '600' }}>
                    {ach.title}
                  </span>
                  {ach.date && (
                    <span style={{ fontSize: '0.76rem', color: '#94A3B8', marginLeft: '6px' }}>({ach.date})</span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button onClick={() => handleStartEdit(ach)} className="btn" style={{ padding: '3px 6px', background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', borderRadius: '4px' }} title="Edit">
                    <Edit3 size={13} />
                  </button>
                  <button onClick={() => handleDelete(ach.id)} className="btn" style={{ padding: '3px 6px', background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: '4px' }} title="Delete">
                    <X size={13} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsForm;
