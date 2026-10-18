import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Plus, X, Sparkles, Edit3, Check, Cpu } from 'lucide-react';
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

const ROLE_SKILL_PRESETS = {
  'Data Analytics': [
    { category: "Languages & Core", skill_name: "Python (Pandas, NumPy, Matplotlib, Seaborn), SQL, Advanced Excel (VLOOKUP, XLOOKUP, Pivot Tables, Macros)" },
    { category: "BI & Data Visualization", skill_name: "Power BI (DAX, Data Modeling, Interactive Dashboards), Tableau" },
    { category: "Data Analysis & Preprocessing", skill_name: "Data Cleaning, Data Preprocessing, Exploratory Data Analysis (EDA), Statistical Analysis" },
    { category: "Databases", skill_name: "MySQL, PostgreSQL" },
    { category: "Development Tools & DevOps", skill_name: "Jupyter Notebook, VS Code, Git, GitHub, Power Query, ETL Pipelines" },
    { category: "Soft Skills", skill_name: "Data Storytelling, Dashboard Design, Business Insight Generation, Problem Solving, Analytical Thinking, Team Collaboration" }
  ],
  'Python Full Stack': [
    { category: "Languages", skill_name: "Python, JavaScript (ES6+), HTML5, CSS3" },
    { category: "Frontend", skill_name: "React.js, Next.js, Tailwind CSS, Shadcn UI, Ant Design" },
    { category: "Backend & Platforms", skill_name: "Django, Django REST Framework, FastAPI, Node.js, REST APIs" },
    { category: "Databases", skill_name: "PostgreSQL, MySQL, SQLite, MongoDB, Redis" },
    { category: "Development Tools & DevOps", skill_name: "VS Code, Git, GitHub, Docker, Postman, CI/CD Pipelines (GitHub Actions)" },
    { category: "AI Tools & Knowledge", skill_name: "Gemini AI, OpenAI API, AI Model Integration, LLM APIs" },
    { category: "CS Fundamentals", skill_name: "DBMS, OOPs, Data Structures & Algorithms, Computer Networks, Agile/Scrum" },
    { category: "Soft Skills", skill_name: "Strong Communication, Technical Documentation, Analytical Thinking, Team Collaboration" }
  ],
  'Java Full Stack': [
    { category: "Languages", skill_name: "Java (Core Java, OOPs, Collections, Multithreading, Streams), JavaScript, TypeScript" },
    { category: "Backend & Frameworks", skill_name: "Spring Boot, Spring MVC, Spring Security, Spring Cloud, Hibernate / JPA, RESTful Web Services" },
    { category: "Frontend", skill_name: "React.js, Angular, HTML5, CSS3, Bootstrap, Tailwind CSS" },
    { category: "Databases", skill_name: "MySQL, PostgreSQL, Oracle DB, MongoDB, Redis" },
    { category: "Messaging & DevOps", skill_name: "Apache Kafka, Docker, Kubernetes, Jenkins, Git, GitHub, Maven" },
    { category: "Testing & Tools", skill_name: "JUnit 5, Mockito, Postman, Swagger / OpenAPI, IntelliJ IDEA, VS Code" },
    { category: "CS Fundamentals", skill_name: "Microservices Architecture, Design Patterns, DBMS, DSA, Agile / Scrum" },
    { category: "Soft Skills", skill_name: "System Design, Problem Solving, Analytical Thinking, Team Leadership" }
  ],
  'MERN Stack Developer': [
    { category: "Frontend", skill_name: "React.js, Next.js, Redux Toolkit, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS" },
    { category: "Backend & APIs", skill_name: "Node.js, Express.js, RESTful APIs, GraphQL, JWT Authentication" },
    { category: "Databases", skill_name: "MongoDB, Mongoose, PostgreSQL, Redis" },
    { category: "Tools & DevOps", skill_name: "Git, GitHub, Docker, Postman, Vercel, AWS EC2" },
    { category: "Soft Skills", skill_name: "Agile / Scrum, Problem Solving, Code Review, Team Collaboration" }
  ],
  'Data Science & Machine Learning': [
    { category: "Programming & Libraries", skill_name: "Python, R, SQL, Pandas, NumPy, Scikit-Learn, TensorFlow, PyTorch" },
    { category: "ML & Analytics", skill_name: "Supervised & Unsupervised Learning, Regression, Classification, NLP, Time Series Analysis, EDA" },
    { category: "Data Viz & BI", skill_name: "Matplotlib, Seaborn, Tableau, Power BI" },
    { category: "Big Data & Tools", skill_name: "Jupyter, Git, Docker, Apache Spark, MLflow" },
    { category: "Soft Skills", skill_name: "Hypothesis Testing, Statistical Reasoning, Business Storytelling" }
  ],
  'DevOps & Cloud Engineer': [
    { category: "Cloud Platforms", skill_name: "AWS (EC2, S3, RDS, ECS, Lambda, IAM, VPC), Azure" },
    { category: "Containerization & Orchestration", skill_name: "Docker, Kubernetes, Helm" },
    { category: "CI/CD & Automation", skill_name: "GitHub Actions, Jenkins, GitLab CI" },
    { category: "Infrastructure as Code", skill_name: "Terraform, Ansible" },
    { category: "Monitoring & Scripting", skill_name: "Prometheus, Grafana, Bash, Python, Linux Administration" }
  ],
  'Software Engineer': [
    { category: "Core Languages", skill_name: "C++, Java, Python, JavaScript, TypeScript, SQL" },
    { category: "CS Fundamentals", skill_name: "Data Structures & Algorithms (500+ Solved), OOP, Operating Systems, DBMS, Computer Networks" },
    { category: "System Design", skill_name: "Low-Level Design (LLD), High-Level Design (HLD), Microservices, REST APIs, Caching" },
    { category: "Tools & Frameworks", skill_name: "Git, GitHub, Docker, Linux, Postman, Unit Testing" },
    { category: "Soft Skills", skill_name: "Problem Solving, Analytical Thinking, Team Collaboration, Agile / Scrum" }
  ],
  'Cyber Security Analyst': [
    { category: "Security & SIEM", skill_name: "Splunk, Wireshark, Nmap, Burp Suite, Metasploit, Nessus" },
    { category: "Network & Protocols", skill_name: "TCP/IP, Firewalls, VPNs, IDS/IPS, DNS, SSL/TLS" },
    { category: "Compliance & Frameworks", skill_name: "OWASP Top 10, NIST, ISO 27001, MITRE ATT&CK" },
    { category: "Scripting & OS", skill_name: "Python, Bash, Kali Linux, Windows Server" }
  ],
  'QA Automation Engineer': [
    { category: "Automation Tools", skill_name: "Selenium WebDriver, Playwright, Cypress, Postman, RestAssured" },
    { category: "Languages & Frameworks", skill_name: "Python (PyTest), Java (TestNG, JUnit), Cucumber (BDD)" },
    { category: "Methodologies & Tools", skill_name: "Manual Testing, Regression Testing, JIRA, Git, Jenkins, SQL" },
    { category: "Soft Skills", skill_name: "Defect Reporting, Test Case Authoring, Cross-Functional Collaboration" }
  ],
  'UI/UX Designer': [
    { category: "Design Tools", skill_name: "Figma, Adobe XD, Sketch, Photoshop, Illustrator" },
    { category: "UI/UX Methods", skill_name: "Wireframing, Prototyping, User Research, Usability Testing, Information Architecture" },
    { category: "Design Systems", skill_name: "Component Libraries, Design Tokens, Responsive Design, WCAG Accessibility" },
    { category: "Frontend Knowledge", skill_name: "HTML5, CSS3, JavaScript basics, Tailwind CSS" },
    { category: "Soft Skills", skill_name: "User Empathy, Visual Storytelling, Stakeholder Presentation, Creative Problem Solving" }
  ],
  'Mobile App Developer': [
    { category: "Mobile Frameworks", skill_name: "Flutter, React Native, Android Studio, Xcode, iOS & Android SDK" },
    { category: "Languages", skill_name: "Dart, JavaScript, TypeScript, Swift (Basics), Kotlin (Basics)" },
    { category: "State Management & Backend", skill_name: "Provider, Bloc, Redux, REST APIs, Firebase, SQLite" },
    { category: "Tools & Testing", skill_name: "Git, Postman, TestFlight, Google Play Console" }
  ],
  'Business Analyst': [
    { category: "Analysis & Documentation", skill_name: "Requirement Gathering, BRD/FRD, User Stories, Acceptance Criteria, BPMN, UML" },
    { category: "Tools & Methodologies", skill_name: "JIRA, Confluence, Agile / Scrum, Kanban, Trello, MS Visio" },
    { category: "Data & BI", skill_name: "SQL, Advanced Excel (VLOOKUP, Pivot), Power BI, Tableau" },
    { category: "Soft Skills", skill_name: "Stakeholder Management, Communication, Gap Analysis, Change Management" }
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

export const SkillsForm = ({ resume, onUpdate }) => {
  const [skillName, setSkillName] = useState('');
  const [category, setCategory] = useState('Languages & Core');
  const [loadingPreset, setLoadingPreset] = useState(false);
  const [selectedDomain, setSelectedDomain] = React.useState(detectRole(resume));

  React.useEffect(() => {
    setSelectedDomain(detectRole(resume));
  }, [resume?.target_job_title, resume?.personal_info?.summary, resume?.title]);

  // Edit state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCategory, setEditCategory] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!skillName.trim()) return;
    try {
      await resumeApi.addSkill(resume.id, { skill_name: skillName.trim(), category });
      setSkillName('');
      onUpdate();
    } catch (err) {
      console.error('Failed to add skill', err);
    }
  };

  const handleLoadPreset = async (domainKey = selectedDomain) => {
    const skillList = ROLE_SKILL_PRESETS[domainKey] || ROLE_SKILL_PRESETS['Data Analytics'];
    if (!skillList) return;
    setLoadingPreset(true);
    try {
      for (const item of resume.skills || []) {
        await resumeApi.deleteSkill(resume.id, item.id);
      }
      for (const sk of skillList) {
        await resumeApi.addSkill(resume.id, sk);
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
      await resumeApi.deleteSkill(resume.id, id);
      onUpdate();
    } catch (err) {
      console.error('Failed to delete skill', err);
    }
  };

  const handleStartEdit = (sk) => {
    setEditingId(sk.id);
    setEditName(sk.skill_name || '');
    setEditCategory(sk.category || 'Technical');
  };

  const handleSaveEdit = async (id) => {
    try {
      await resumeApi.updateSkill(resume.id, id, {
        skill_name: editName.trim(),
        category: editCategory
      });
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error('Failed to save skill edit', err);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem', background: '#FFFFFF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(37,99,235,0.06)' }}>
      {/* 🌟 Top IT Domain Selector Dropdown (White Card Design) */}
      <div style={{ marginBottom: '1.25rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu size={16} color="#2563EB" /> Select IT Domain for Skills
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748B' }}>Choose your course domain to auto-load industry-standard categorized skills</div>
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
        <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0, color: '#0F172A', fontWeight: '800' }}>Skills</h3>
      </div>

      {/* Add Custom Skill Form */}
      <form onSubmit={handleAdd} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr auto', gap: '0.6rem', marginBottom: '1.25rem', alignItems: 'end' }}>
        <div className="form-group" style={{ margin: 0 }}>
          <label style={{ fontSize: '0.8rem' }}>Skill Names / Tools <small style={{ color: '#64748B' }}>(Comma separated)</small></label>
          <input
            type="text"
            className="form-control"
            value={skillName}
            onChange={e => setSkillName(e.target.value)}
            placeholder="e.g. Python (Pandas, NumPy), SQL, Power BI"
            required
          />
        </div>
        <div className="form-group" style={{ margin: 0 }}>
          <label style={{ fontSize: '0.8rem' }}>Category</label>
          <input
            type="text"
            className="form-control"
            value={category}
            onChange={e => setCategory(e.target.value)}
            placeholder="e.g. Languages / BI Tools / Frontend"
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ padding: '0.55rem 1rem', fontSize: '0.82rem', fontWeight: '700' }}>
          <Plus size={14} /> Add
        </button>
      </form>

      {/* Categorized Skills List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {(resume.skills || []).map(sk => (
          <div key={sk.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '0.75rem 1rem' }}>
            {editingId === sk.id ? (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <input type="text" className="form-control" style={{ flex: '1 1 180px' }} value={editCategory} onChange={e => setEditCategory(e.target.value)} placeholder="Category" />
                <input type="text" className="form-control" style={{ flex: '2 1 250px' }} value={editName} onChange={e => setEditName(e.target.value)} placeholder="Skill Names" />
                <button type="button" onClick={() => handleSaveEdit(sk.id)} className="btn btn-primary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.7rem' }}>Save</button>
                <button type="button" onClick={() => setEditingId(null)} className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.4rem 0.7rem' }}>Cancel</button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <div>
                  <span style={{ fontSize: '0.76rem', fontWeight: '800', textTransform: 'uppercase', color: '#2563EB', background: '#DBEAFE', padding: '2px 8px', borderRadius: '4px', marginRight: '8px' }}>
                    {sk.category || 'Technical'}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: '#1E293B', fontWeight: '600' }}>
                    {sk.skill_name}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button onClick={() => handleStartEdit(sk)} className="btn" style={{ padding: '3px 6px', background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', borderRadius: '4px' }} title="Edit">
                    <Edit3 size={13} />
                  </button>
                  <button onClick={() => handleDelete(sk.id)} className="btn" style={{ padding: '3px 6px', background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: '4px' }} title="Delete">
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

export default SkillsForm;
