import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Plus, Trash2, Sparkles, Check, Edit3, X, Briefcase } from 'lucide-react';
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

const ROLE_EXPERIENCE_PRESETS = {
  'Data Analytics': [
    {
      company: "Analytics Insights Labs",
      role: "Data Analyst Intern",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      is_current: false,
      raw_description: "Developed interactive Power BI & Tableau dashboards tracking key business KPIs, reducing monthly reporting preparation time by ~40%.\nConducted exploratory data analysis (EDA) and data preprocessing on 100k+ customer records using Python (Pandas, NumPy).\nFormulated complex SQL queries, CTEs, and window functions to extract clean datasets from relational databases.\nCollaborated with cross-functional teams to translate business problems into actionable analytical solutions.",
      bullets: [
        "Developed interactive Power BI & Tableau dashboards tracking key business KPIs, reducing monthly reporting preparation time by ~40%.",
        "Conducted exploratory data analysis (EDA) and data preprocessing on 100k+ customer records using Python (Pandas, NumPy).",
        "Formulated complex SQL queries, CTEs, and window functions to extract clean datasets from relational databases.",
        "Collaborated with cross-functional teams to translate business problems into actionable analytical solutions."
      ]
    }
  ],
  'Python Full Stack': [
    {
      company: "Groot Technologies",
      role: "Python Full Stack Developer Intern",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      is_current: false,
      raw_description: "Built scalable web applications using Django, FastAPI, React.js, and PostgreSQL.\nDeveloped secure RESTful APIs with JWT authentication, role-based authorization, and Celery background task queues.\nDesigned responsive user interfaces using React.js and Tailwind CSS.\nWorked in an Agile sprint environment utilizing Docker, Git, and CI/CD pipelines.",
      bullets: [
        "Built scalable web applications using Django, FastAPI, React.js, and PostgreSQL.",
        "Developed secure RESTful APIs with JWT authentication, role-based authorization, and Celery background task queues.",
        "Designed responsive user interfaces using React.js and Tailwind CSS.",
        "Worked in an Agile sprint environment utilizing Docker, Git, and CI/CD pipelines."
      ]
    }
  ],
  'Java Full Stack': [
    {
      company: "Global Enterprise Systems",
      role: "Java Full Stack Developer Intern",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      is_current: false,
      raw_description: "Developed scalable REST microservices using Spring Boot 3, Hibernate JPA, and MySQL database.\nBuilt reusable frontend UI components using React.js and Tailwind CSS with Axios API communication.\nImplemented JWT authentication and Spring Security for secure endpoints access control.\nWrote JUnit 5 test cases and participated in weekly Agile sprint retrospectives.",
      bullets: [
        "Developed scalable REST microservices using Spring Boot 3, Hibernate JPA, and MySQL database.",
        "Built reusable frontend UI components using React.js and Tailwind CSS with Axios API communication.",
        "Implemented JWT authentication and Spring Security for secure endpoints access control.",
        "Wrote JUnit 5 test cases and participated in weekly Agile sprint retrospectives."
      ]
    }
  ],
  'MERN Stack Developer': [
    {
      company: "CloudScale Web Labs",
      role: "MERN Stack Developer Intern",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      is_current: false,
      raw_description: "Built full-stack single page web applications using MongoDB, Express.js, React.js, and Node.js.\nDesigned and integrated RESTful APIs with JWT authentication and Redux state management.\nOptimized MongoDB schemas and aggregation pipelines, improving API response speed by 35%.\nCollaborated in Git-based team workflow with continuous deployment to Vercel and AWS.",
      bullets: [
        "Built full-stack single page web applications using MongoDB, Express.js, React.js, and Node.js.",
        "Designed and integrated RESTful APIs with JWT authentication and Redux state management.",
        "Optimized MongoDB schemas and aggregation pipelines, improving API response speed by 35%.",
        "Collaborated in Git-based team workflow with continuous deployment to Vercel and AWS."
      ]
    }
  ],
  'Data Science & Machine Learning': [
    {
      company: "Neural AI Labs",
      role: "Data Science Intern",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      is_current: false,
      raw_description: "Trained and evaluated machine learning models (XGBoost, Random Forest, Logistic Regression) on customer datasets.\nEngineered predictive features and conducted exploratory data analysis using Pandas, NumPy, and Seaborn.\nDeployed model inference REST endpoints using FastAPI and Docker containers.\nVisualized model metrics and feature importance for technical and executive stakeholders.",
      bullets: [
        "Trained and evaluated machine learning models (XGBoost, Random Forest, Logistic Regression) on customer datasets.",
        "Engineered predictive features and conducted exploratory data analysis using Pandas, NumPy, and Seaborn.",
        "Deployed model inference REST endpoints using FastAPI and Docker containers.",
        "Visualized model metrics and feature importance for technical and executive stakeholders."
      ]
    }
  ],
  'DevOps & Cloud Engineer': [
    {
      company: "CloudMatrix Infra",
      role: "DevOps & Cloud Engineer Intern",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      is_current: false,
      raw_description: "Configured automated CI/CD deployment pipelines using GitHub Actions and Docker.\nProvisioned AWS cloud infrastructure (EC2, S3, RDS, IAM) using Terraform Infrastructure as Code.\nMonitored server health and container metrics using Prometheus and Grafana dashboards.\nManaged Linux server configurations, shell scripting, and SSL/TLS certificate renewals.",
      bullets: [
        "Configured automated CI/CD deployment pipelines using GitHub Actions and Docker.",
        "Provisioned AWS cloud infrastructure (EC2, S3, RDS, IAM) using Terraform Infrastructure as Code.",
        "Monitored server health and container metrics using Prometheus and Grafana dashboards.",
        "Managed Linux server configurations, shell scripting, and SSL/TLS certificate renewals."
      ]
    }
  ],
  'Software Engineer': [
    {
      company: "Apex Tech Innovations",
      role: "Software Engineering Intern",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      is_current: false,
      raw_description: "Implemented core backend algorithms and optimized database access patterns in an Agile sprint environment.\nDeveloped modular, unit-tested software components with 90%+ test code coverage.\nParticipated in daily standups, code reviews, and system design discussions.\nSolved 500+ Data Structures and Algorithms problems demonstrating strong problem-solving skills.",
      bullets: [
        "Implemented core backend algorithms and optimized database access patterns in an Agile sprint environment.",
        "Developed modular, unit-tested software components with 90%+ test code coverage.",
        "Participated in daily standups, code reviews, and system design discussions.",
        "Solved 500+ Data Structures and Algorithms problems demonstrating strong problem-solving skills."
      ]
    }
  ],
  'Cyber Security Analyst': [
    {
      company: "CyberShield Security Labs",
      role: "Cyber Security / SOC Analyst Intern",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      is_current: false,
      raw_description: "Monitored SIEM security logs in Splunk to detect unauthorized intrusion attempts and anomalous network activity.\nConducted vulnerability assessments and port scanning using Nessus, Nmap, and Wireshark.\nDocumented incident response playbooks aligned with OWASP Top 10 and NIST frameworks.\nAssisted in security patch management and endpoint protection compliance.",
      bullets: [
        "Monitored SIEM security logs in Splunk to detect unauthorized intrusion attempts and anomalous network activity.",
        "Conducted vulnerability assessments and port scanning using Nessus, Nmap, and Wireshark.",
        "Documented incident response playbooks aligned with OWASP Top 10 and NIST frameworks.",
        "Assisted in security patch management and endpoint protection compliance."
      ]
    }
  ],
  'QA Automation Engineer': [
    {
      company: "QualityCraft Software",
      role: "QA Automation Test Intern",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      is_current: false,
      raw_description: "Automated 150+ end-to-end regression test cases using Selenium WebDriver, Python, and PyTest.\nTested RESTful APIs for authentication, payload validation, and status codes using Postman and Newman.\nLogged and tracked software defects in JIRA with detailed reproduction steps.\nIntegrated automated test suites into Jenkins CI pipeline triggering on every code commit.",
      bullets: [
        "Automated 150+ end-to-end regression test cases using Selenium WebDriver, Python, and PyTest.",
        "Tested RESTful APIs for authentication, payload validation, and status codes using Postman and Newman.",
        "Logged and tracked software defects in JIRA with detailed reproduction steps.",
        "Integrated automated test suites into Jenkins CI pipeline triggering on every code commit."
      ]
    }
  ],
  'UI/UX Designer': [
    {
      company: "PixelCraft Design Studio",
      role: "UI/UX Design Intern",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      is_current: false,
      raw_description: "Created wireframes, user personas, interactive prototypes, and design systems in Figma for web and mobile apps.\nConducted usability testing sessions with 15+ users to gather qualitative feedback and refine user flows.\nDesigned responsive component libraries with autolayout and design tokens for developer handoff.\nCollaborated closely with frontend developers to ensure pixel-perfect implementation.",
      bullets: [
        "Created wireframes, user personas, interactive prototypes, and design systems in Figma for web and mobile apps.",
        "Conducted usability testing sessions with 15+ users to gather qualitative feedback and refine user flows.",
        "Designed responsive component libraries with autolayout and design tokens for developer handoff.",
        "Collaborated closely with frontend developers to ensure pixel-perfect implementation."
      ]
    }
  ],
  'Mobile App Developer': [
    {
      company: "AppVenture Studios",
      role: "Mobile App Developer Intern",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      is_current: false,
      raw_description: "Built cross-platform iOS and Android mobile applications using Flutter / React Native and Dart/JavaScript.\nIntegrated REST APIs, local SQLite storage, and Firebase Push Notifications.\nOptimized app startup time and UI rendering performance across multiple screen sizes.\nParticipated in test releases using TestFlight and Google Play Internal Testing.",
      bullets: [
        "Built cross-platform iOS and Android mobile applications using Flutter / React Native and Dart/JavaScript.",
        "Integrated REST APIs, local SQLite storage, and Firebase Push Notifications.",
        "Optimized app startup time and UI rendering performance across multiple screen sizes.",
        "Participated in test releases using TestFlight and Google Play Internal Testing."
      ]
    }
  ],
  'Business Analyst': [
    {
      company: "StratEdge Business Solutions",
      role: "Business Analyst Intern",
      start_date: "Aug 2025",
      end_date: "Dec 2025",
      is_current: false,
      raw_description: "Gathered business requirements from stakeholders and authored detailed User Stories and Acceptance Criteria in JIRA.\nCreated interactive KPI dashboards in Power BI and Excel to track sprint delivery and operational efficiency.\nModeled As-Is and To-Be business process workflows using BPMN diagrams.\nFacilitated sprint planning and backlog grooming sessions in an Agile/Scrum environment.",
      bullets: [
        "Gathered business requirements from stakeholders and authored detailed User Stories and Acceptance Criteria in JIRA.",
        "Created interactive KPI dashboards in Power BI and Excel to track sprint delivery and operational efficiency.",
        "Modeled As-Is and To-Be business process workflows using BPMN diagrams.",
        "Facilitated sprint planning and backlog grooming sessions in an Agile/Scrum environment."
      ]
    }
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

export const ExperienceForm = ({ resume, onUpdate }) => {
  const [adding, setAdding] = useState(false);
  const [loadingPreset, setLoadingPreset] = useState(false);
  const [aiLoadingId, setAiLoadingId] = useState(null);
  const [selectedDomain, setSelectedDomain] = React.useState(detectRole(resume));

  React.useEffect(() => {
    setSelectedDomain(detectRole(resume));
  }, [resume?.target_job_title, resume?.personal_info?.summary, resume?.title]);

  const activePreset = ROLE_EXPERIENCE_PRESETS[selectedDomain] || ROLE_EXPERIENCE_PRESETS['Data Analytics'];

  const [newExp, setNewExp] = useState({
    company: '', role: '', start_date: '', end_date: '', is_current: false, raw_description: ''
  });

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editExp, setEditExp] = useState({
    company: '', role: '', start_date: '', end_date: '', is_current: false, bulletsText: ''
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await resumeApi.addExperience(resume.id, newExp);
      setNewExp({ company: '', role: '', start_date: '', end_date: '', is_current: false, raw_description: '' });
      setAdding(false);
      onUpdate();
    } catch (err) {
      console.error('Failed to add experience', err);
    }
  };

  const handleLoadPreset = async (domainKey = selectedDomain) => {
    const expList = ROLE_EXPERIENCE_PRESETS[domainKey] || ROLE_EXPERIENCE_PRESETS['Data Analytics'];
    if (!expList) return;
    setLoadingPreset(true);
    try {
      for (const item of resume.experience || []) {
        await resumeApi.deleteExperience(resume.id, item.id);
      }
      for (const exp of expList) {
        await resumeApi.addExperience(resume.id, exp);
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
      await resumeApi.deleteExperience(resume.id, id);
      onUpdate();
    } catch (err) {
      console.error('Failed to delete experience', err);
    }
  };

  const handleStartEdit = (exp) => {
    setEditingId(exp.id);
    setEditExp({
      company: exp.company || '',
      role: exp.role || '',
      start_date: exp.start_date || '',
      end_date: exp.end_date || '',
      is_current: exp.is_current || false,
      bulletsText: (exp.bullets && exp.bullets.length > 0) ? exp.bullets.join('\n') : (exp.raw_description || '')
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      const bulletsArray = editExp.bulletsText.split('\n').map(b => b.trim()).filter(b => b.length > 0);
      await resumeApi.updateExperience(resume.id, id, {
        company: editExp.company,
        role: editExp.role,
        start_date: editExp.start_date,
        end_date: editExp.end_date,
        is_current: editExp.is_current,
        raw_description: editExp.bulletsText,
        bullets: bulletsArray
      });
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error('Failed to save experience edit', err);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem', background: '#FFFFFF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(37,99,235,0.06)' }}>
      {/* 🌟 Top IT Domain Selector Dropdown (White Card Design) */}
      <div style={{ marginBottom: '1.25rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Briefcase size={16} color="#2563EB" /> Select IT Domain for Experience
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748B' }}>Choose your course domain to auto-load industry-standard work history</div>
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

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0, color: '#0F172A', fontWeight: '800' }}>Work Experience</h3>
          <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '2px 0 0' }}>Optional for freshers. Click + Add or use domain dropdown above.</p>
        </div>
        <button onClick={() => setAdding(!adding)} className="btn btn-secondary" style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}>
          <Plus size={14} /> Add Experience
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} style={{ background: '#F8FAFC', padding: '1.2rem', borderRadius: '8px', border: '1px solid #CBD5E1', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Company Name</label>
              <input type="text" className="form-control" value={newExp.company} onChange={e => setNewExp({ ...newExp, company: e.target.value })} placeholder="e.g. Google" required />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Job Title / Role</label>
              <input type="text" className="form-control" value={newExp.role} onChange={e => setNewExp({ ...newExp, role: e.target.value })} placeholder="e.g. Software Engineer" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Start Date</label>
              <input type="text" className="form-control" value={newExp.start_date} onChange={e => setNewExp({ ...newExp, start_date: e.target.value })} placeholder="e.g. Jan 2024" required />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>End Date</label>
              <input type="text" className="form-control" value={newExp.end_date} onChange={e => setNewExp({ ...newExp, end_date: e.target.value })} placeholder="e.g. Present" />
            </div>
          </div>

          <div className="form-group">
            <label>Description / Key Responsibilities</label>
            <textarea className="form-control" rows={3} value={newExp.raw_description} onChange={e => setNewExp({ ...newExp, raw_description: e.target.value })} placeholder="Describe what you built, optimized, or automated..." required />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setAdding(false)} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Save Experience</button>
          </div>
        </form>
      )}

      {/* Experience Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {(resume.experience || []).map(exp => (
          <div key={exp.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem' }}>
            {editingId === exp.id ? (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <input type="text" className="form-control" value={editExp.company} onChange={e => setEditExp({ ...editExp, company: e.target.value })} placeholder="Company" />
                  <input type="text" className="form-control" value={editExp.role} onChange={e => setEditExp({ ...editExp, role: e.target.value })} placeholder="Role" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <input type="text" className="form-control" value={editExp.start_date} onChange={e => setEditExp({ ...editExp, start_date: e.target.value })} placeholder="Start Date" />
                  <input type="text" className="form-control" value={editExp.end_date} onChange={e => setEditExp({ ...editExp, end_date: e.target.value })} placeholder="End Date" />
                </div>
                <textarea className="form-control" rows={4} value={editExp.bulletsText} onChange={e => setEditExp({ ...editExp, bulletsText: e.target.value })} placeholder="One bullet point per line..." style={{ marginBottom: '0.6rem' }} />
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setEditingId(null)} className="btn btn-secondary" style={{ fontSize: '0.75rem' }}>Cancel</button>
                  <button type="button" onClick={() => handleSaveEdit(exp.id)} className="btn btn-primary" style={{ fontSize: '0.75rem' }}>Save Changes</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.92rem' }}>{exp.role}</span>
                    <span style={{ color: '#64748B', fontSize: '0.85rem' }}>at</span>
                    <span style={{ fontWeight: '700', color: '#2563EB', fontSize: '0.9rem' }}>{exp.company}</span>
                    <span style={{ fontSize: '0.78rem', color: '#94A3B8', marginLeft: 'auto' }}>{exp.start_date} – {exp.is_current ? 'Present' : exp.end_date}</span>
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul style={{ margin: '0.5rem 0 0', paddingLeft: '1.2rem', color: '#475569', fontSize: '0.82rem', lineHeight: '1.4' }}>
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button onClick={() => handleStartEdit(exp)} className="btn" style={{ padding: '4px 7px', background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', borderRadius: '4px' }} title="Edit">
                    <Edit3 size={13} />
                  </button>
                  <button onClick={() => handleDelete(exp.id)} className="btn" style={{ padding: '4px 7px', background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: '4px' }} title="Delete">
                    <Trash2 size={13} />
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

export default ExperienceForm;
