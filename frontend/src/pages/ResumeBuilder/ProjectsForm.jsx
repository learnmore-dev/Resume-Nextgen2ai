import React, { useState } from 'react';
import { resumeApi } from '../../api/resumeApi';
import { Plus, Trash2, Edit3, Check, Sparkles, FolderGit2, Calendar } from 'lucide-react';
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

const ROLE_PROJECT_PRESETS = {
  'Data Analytics': [
    {
      name: "E-Commerce Sales & Customer Analytics",
      tech_stack: ["Python", "SQL", "Power BI", "Excel"],
      link: "https://github.com/analyst/ecommerce-sales-analytics",
      date: "Jan 2026 – Feb 2026",
      description: "Analyzed sales and customer data to identify revenue trends, top-performing products, customer segments, and business growth opportunities using interactive Power BI dashboards.",
      bullets: [
        "Analyzed sales and customer data to identify revenue trends, top-performing products, customer segments, and business growth opportunities using interactive Power BI dashboards."
      ]
    },
    {
      name: "Employee HR Analytics & Attrition Analysis",
      tech_stack: ["Python", "SQL", "Power BI", "Excel"],
      link: "https://github.com/analyst/employee-hr-attrition-analytics",
      date: "Oct 2025 – Dec 2025",
      description: "Analyzed employee data to identify attrition patterns, salary trends, department performance, and key factors influencing employee turnover through data-driven dashboards.",
      bullets: [
        "Analyzed employee data to identify attrition patterns, salary trends, department performance, and key factors influencing employee turnover through data-driven dashboards."
      ]
    }
  ],
  'Python Full Stack': [
    {
      name: "Trainer Management System",
      tech_stack: ["Python", "Django", "MySQL"],
      link: "https://github.com/developer/trainer-management-system",
      date: "Jan 2026 – Feb 2026",
      description: "Developed a web-based Trainer Management System for managing trainer profiles, courses, batches, schedules, and trainer assignments.\nImplemented CRUD operations, database relationships, validation, and an admin interface to streamline training operations.",
      bullets: [
        "Developed a web-based Trainer Management System for managing trainer profiles, courses, batches, schedules, and trainer assignments.",
        "Implemented CRUD operations, database relationships, validation, and an admin interface to streamline training operations."
      ]
    },
    {
      name: "Hotel Booking & Management System",
      tech_stack: ["Python", "Django", "REST Framework", "React.js", "PostgreSQL"],
      link: "https://github.com/developer/hotel-booking-system",
      date: "Sep 2025 – Nov 2025",
      description: "Built a full-stack hotel booking platform with real-time room availability, search & advanced filters, online booking flow, and secure payment integration.\nImplemented role-based access control, REST APIs for React-Django communication, customer reviews/ratings, and an admin dashboard.",
      bullets: [
        "Built a full-stack hotel booking platform with real-time room availability, search & advanced filters, online booking flow, and secure payment integration.",
        "Implemented role-based access control, REST APIs for React-Django communication, customer reviews/ratings, and an admin dashboard."
      ]
    }
  ],
  'Java Full Stack': [
    {
      name: "Real-Time Banking Transaction Gateway",
      tech_stack: ["Java 17", "Spring Boot", "Spring Cloud", "Kafka", "MySQL"],
      link: "https://github.com/developer/banking-gateway",
      date: "Dec 2025 – Feb 2026",
      description: "Built a secure, high-throughput microservices-based banking transaction gateway supporting real-time fund transfers, OAuth2 authentication, and audit logging.\nConfigured Apache Kafka event streaming to handle 10k+ concurrent transaction messages with 99.9% uptime.",
      bullets: [
        "Built a secure, high-throughput microservices-based banking transaction gateway supporting real-time fund transfers, OAuth2 authentication, and audit logging.",
        "Configured Apache Kafka event streaming to handle 10k+ concurrent transaction messages with 99.9% uptime."
      ]
    },
    {
      name: "Enterprise ERP & Inventory Dashboard",
      tech_stack: ["Java", "Spring Boot", "Hibernate", "React.js", "PostgreSQL"],
      link: "https://github.com/developer/enterprise-erp",
      date: "Aug 2025 – Nov 2025",
      description: "Designed a multi-tenant enterprise ERP portal for warehouse inventory tracking, role-based access control, and automated billing generation.\nOptimized Hibernate JPA queries and database indexes, accelerating transaction processing speeds by 30%.",
      bullets: [
        "Designed a multi-tenant enterprise ERP portal for warehouse inventory tracking, role-based access control, and automated billing generation.",
        "Optimized Hibernate JPA queries and database indexes, accelerating transaction processing speeds by 30%."
      ]
    }
  ],
  'MERN Stack Developer': [
    {
      name: "E-Commerce Realtime Marketplace",
      tech_stack: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API"],
      link: "https://github.com/developer/mern-ecommerce",
      date: "Jan 2026 – Feb 2026",
      description: "Full-featured shopping platform with product search, cart state management, Stripe payment processing, and admin order tracking dashboard.",
      bullets: [
        "Built responsive e-commerce web platform with React.js, Redux Toolkit, and Tailwind CSS.",
        "Engineered Express.js REST APIs with MongoDB schemas and integrated Stripe payment gateway."
      ]
    },
    {
      name: "Real-Time Collaborative Task Board",
      tech_stack: ["React", "Node.js", "Socket.io", "MongoDB"],
      link: "https://github.com/developer/task-board",
      date: "Oct 2025 – Dec 2025",
      description: "Kanban-style project management app with Socket.io real-time updates, drag-and-drop cards, and role-based permissions.",
      bullets: [
        "Implemented real-time bidirectional events using Socket.io and Express server.",
        "Designed secure JWT authentication and role-based access control."
      ]
    }
  ],
  'Data Science & Machine Learning': [
    {
      name: "Predictive Customer Churn Model",
      tech_stack: ["Python", "Scikit-Learn", "XGBoost", "Pandas", "Streamlit"],
      link: "https://github.com/developer/churn-prediction",
      date: "Dec 2025 – Feb 2026",
      description: "Trained XGBoost and Random Forest classifiers on 100k+ customer records to predict churn probability with 91.5% ROC-AUC score.",
      bullets: [
        "Performed extensive EDA, feature engineering, and hyperparameter tuning using Optuna.",
        "Built an interactive Streamlit web dashboard for marketing stakeholders to simulate churn risk."
      ]
    },
    {
      name: "Financial Market Sentiment Analysis (NLP)",
      tech_stack: ["Python", "PyTorch", "HuggingFace", "BERT", "Flask"],
      link: "https://github.com/developer/nlp-sentiment-analysis",
      date: "Aug 2025 – Nov 2025",
      description: "Fine-tuned BERT transformer model on financial news headlines to classify market sentiment with 88% precision.",
      bullets: [
        "Extracted and preprocessed news feed text using NLTK and HuggingFace Transformers.",
        "Deployed Flask REST API returning sentiment polarity scores in sub-50ms latency."
      ]
    }
  ],
  'DevOps & Cloud Engineer': [
    {
      name: "Automated Multi-Stage CI/CD Pipeline",
      tech_stack: ["GitHub Actions", "Docker", "AWS ECS", "Terraform", "Bash"],
      link: "https://github.com/developer/devops-cicd-pipeline",
      date: "Jan 2026 – Feb 2026",
      description: "Production-grade automated pipeline with linting, unit testing, Docker image building, security scanning, and automated deployment to AWS ECS.",
      bullets: [
        "Designed GitHub Actions workflows with zero-downtime rolling deployment strategies.",
        "Integrated Trivy vulnerability scanning into pipeline steps."
      ]
    },
    {
      name: "High-Availability Kubernetes Cluster Setup",
      tech_stack: ["Kubernetes", "Helm", "Prometheus", "Grafana", "Linux"],
      link: "https://github.com/developer/k8s-cluster",
      date: "Oct 2025 – Dec 2025",
      description: "Configured scalable microservices cluster with Ingress controllers, TLS certificates, and centralized Prometheus/Grafana logging.",
      bullets: [
        "Configured Horizontal Pod Autoscaler (HPA) and resource limits to prevent pod OOM crashes.",
        "Wrote reusable Helm charts for swift application rollouts."
      ]
    }
  ],
  'Software Engineer': [
    {
      name: "Distributed Cache & Key-Value Storage Engine",
      tech_stack: ["C++", "Java", "Redis Protocol", "Multi-Threading"],
      link: "https://github.com/developer/kv-storage-engine",
      date: "Dec 2025 – Feb 2026",
      description: "Designed a fast in-memory key-value store supporting LRU eviction policies, concurrent read-write locks, and disk persistence snapshots.",
      bullets: [
        "Achieved 40k+ operations per second throughput using lock-free data structures.",
        "Implemented crash recovery with Append-Only File (AOF) logging."
      ]
    },
    {
      name: "Algorithm Visualizer & Pathfinding Simulator",
      tech_stack: ["JavaScript", "React.js", "HTML5 Canvas", "Algorithms"],
      link: "https://github.com/developer/algo-visualizer",
      date: "Aug 2025 – Nov 2025",
      description: "Interactive web platform visualizing Dijkstra's, A*, BFS, and DFS graph traversal algorithms with customizable maze generation.",
      bullets: [
        "Visualized step-by-step state execution with adjustable animation speeds.",
        "Used by 5,000+ students for computer science algorithm preparation."
      ]
    }
  ],
  'Cyber Security Analyst': [
    {
      name: "Network Intrusion & Log Analysis System",
      tech_stack: ["Splunk", "Snort IDS", "Wireshark", "Linux", "Python"],
      link: "https://github.com/developer/ids-splunk-monitoring",
      date: "Jan 2026 – Feb 2026",
      description: "Configured Snort IDS and automated log ingestion into Splunk to detect port scans, DDoS attempts, and malware traffic in real-time.",
      bullets: [
        "Wrote custom Snort detection rules for emerging network threats.",
        "Created interactive Splunk dashboards for executive incident reports."
      ]
    },
    {
      name: "Automated Web Vulnerability Scanner",
      tech_stack: ["Python", "OWASP ZAP", "BeautifulSoup", "Requests"],
      link: "https://github.com/developer/vuln-scanner",
      date: "Oct 2025 – Dec 2025",
      description: "Built automated scanner assessing web endpoints for SQL injection, Cross-Site Scripting (XSS), and outdated SSL configurations.",
      bullets: [
        "Generated automated HTML security compliance reports with severity ratings.",
        "Integrated into pre-release security testing checklist."
      ]
    }
  ],
  'QA Automation Engineer': [
    {
      name: "Hybrid Web & API Test Automation Framework",
      tech_stack: ["Selenium WebDriver", "Python", "PyTest", "Postman", "Jenkins"],
      link: "https://github.com/developer/qa-automation-framework",
      date: "Dec 2025 – Feb 2026",
      description: "Developed a modular Page Object Model (POM) automation framework with automated HTML reporting and parallel test execution.",
      bullets: [
        "Automated 200+ test cases covering critical customer checkout and login flows.",
        "Implemented REST API verification tests using Postman and Newman."
      ]
    },
    {
      name: "E-Commerce Load & Performance Testing Suite",
      tech_stack: ["JMeter", "Postman", "Grafana", "Python"],
      link: "https://github.com/developer/performance-testing",
      date: "Aug 2025 – Nov 2025",
      description: "Simulated 5,000+ concurrent user traffic on e-commerce checkout endpoints to detect API bottlenecks and database locks.",
      bullets: [
        "Identified database connection pool bottlenecks, improving load threshold by 40%.",
        "Configured real-time performance telemetry dashboards in Grafana."
      ]
    }
  ],
  'UI/UX Designer': [
    {
      name: "Fintech Mobile Banking App UI/UX Case Study",
      tech_stack: ["Figma", "User Research", "Prototyping", "Design Systems"],
      link: "https://figma.com/@designer/fintech-app",
      date: "Jan 2026 – Feb 2026",
      description: "End-to-end design case study featuring user research, wireframing, high-fidelity prototypes, and usability testing for smart budgeting.",
      bullets: [
        "Conducted 15+ user interviews to identify onboarding friction points.",
        "Built high-fidelity clickable prototype in Figma with smooth micro-interactions."
      ]
    },
    {
      name: "Healthcare Portal & Telemedicine Web App",
      tech_stack: ["Figma", "Design Tokens", "Wireframing", "WCAG 2.1"],
      link: "https://figma.com/@designer/healthcare-portal",
      date: "Sep 2025 – Nov 2025",
      description: "Accessible design system and doctor-patient scheduling dashboard with WCAG 2.1 AA accessibility compliance.",
      bullets: [
        "Designed comprehensive component library with dark/light themes.",
        "Reduced appointment booking drop-off rate by 32% through simplified user journey."
      ]
    }
  ],
  'Mobile App Developer': [
    {
      name: "Fitness Tracker & Workout Planner App",
      tech_stack: ["Flutter", "Dart", "Firebase", "Provider", "SQLite"],
      link: "https://github.com/developer/fitness-flutter-app",
      date: "Dec 2025 – Feb 2026",
      description: "Cross-platform mobile application with offline workout tracking, progress charts, and Firebase cloud authentication.",
      bullets: [
        "Designed 60fps smooth animations and custom charts using Flutter CustomPainter.",
        "Implemented background local push notifications for daily exercise reminders."
      ]
    },
    {
      name: "Food Delivery & Order Tracking App",
      tech_stack: ["React Native", "Redux", "Google Maps API", "Node.js"],
      link: "https://github.com/developer/food-delivery-rn",
      date: "Aug 2025 – Nov 2025",
      description: "Mobile app with live delivery driver tracking, menu filtering, in-app cart management, and Razorpay payment integration.",
      bullets: [
        "Integrated Google Maps API for real-time driver route visualization.",
        "Optimized Redux state persistence for instantaneous app cold starts."
      ]
    }
  ],
  'Business Analyst': [
    {
      name: "Retail Banking Digital Transformation Case Study",
      tech_stack: ["Power BI", "SQL", "JIRA", "BPMN", "Excel"],
      link: "https://github.com/analyst/banking-transformation",
      date: "Jan 2026 – Feb 2026",
      description: "Led business analysis for loan approval digitization, mapping As-Is and To-Be processes and reducing turnaround time by 50%.",
      bullets: [
        "Authored 50+ detailed Epics, User Stories, and Acceptance Criteria in JIRA.",
        "Created interactive executive Power BI dashboards to track loan disbursal KPIs."
      ]
    },
    {
      name: "Supply Chain Inventory Optimization Analysis",
      tech_stack: ["Advanced Excel", "SQL", "Tableau", "Agile / Scrum"],
      link: "https://github.com/analyst/supply-chain-analytics",
      date: "Sep 2025 – Nov 2025",
      description: "Conducted warehouse inventory turnover analysis, identifying $120k in annual carrying cost savings through safety stock optimization.",
      bullets: [
        "Built automated Excel & Tableau models forecasting seasonal demand spikes.",
        "Presented findings directly to senior operations executives."
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

export const ProjectsForm = ({ resume, onUpdate }) => {
  const [adding, setAdding] = useState(false);
  const [loadingPreset, setLoadingPreset] = useState(false);
  const [selectedDomain, setSelectedDomain] = React.useState(detectRole(resume));

  React.useEffect(() => {
    setSelectedDomain(detectRole(resume));
  }, [resume?.target_job_title, resume?.personal_info?.summary, resume?.title]);

  const [newProj, setNewProj] = useState({
    name: '', tech_stack: '', link: '', date: '', description: ''
  });

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editProj, setEditProj] = useState({
    name: '', tech_stack: '', link: '', date: '', bulletsText: ''
  });

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const techArray = newProj.tech_stack.split(',').map(t => t.trim()).filter(t => t.length > 0);
      const bulletsArray = newProj.description.split('\n').map(b => b.trim()).filter(b => b.length > 0);
      
      await resumeApi.addProject(resume.id, {
        name: newProj.name,
        tech_stack: techArray,
        link: newProj.link,
        date: newProj.date,
        description: newProj.description,
        bullets: bulletsArray
      });

      setNewProj({ name: '', tech_stack: '', link: '', date: '', description: '' });
      setAdding(false);
      onUpdate();
    } catch (err) {
      console.error('Failed to add project', err);
    }
  };

  const handleLoadPreset = async (domainKey = selectedDomain) => {
    const projList = ROLE_PROJECT_PRESETS[domainKey] || ROLE_PROJECT_PRESETS['Data Analytics'];
    if (!projList) return;
    setLoadingPreset(true);
    try {
      for (const item of resume.projects || []) {
        await resumeApi.deleteProject(resume.id, item.id);
      }
      for (const p of projList) {
        await resumeApi.addProject(resume.id, p);
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
      await resumeApi.deleteProject(resume.id, id);
      onUpdate();
    } catch (err) {
      console.error('Failed to delete project', err);
    }
  };

  const handleStartEdit = (proj) => {
    setEditingId(proj.id);
    const techStr = Array.isArray(proj.tech_stack) ? proj.tech_stack.join(', ') : (proj.tech_stack || '');
    const bulletsStr = (proj.bullets && proj.bullets.length > 0) ? proj.bullets.join('\n') : (proj.description || '');
    setEditProj({
      name: proj.name || '',
      tech_stack: techStr,
      link: proj.link || '',
      date: proj.date || '',
      bulletsText: bulletsStr
    });
  };

  const handleSaveEdit = async (id) => {
    try {
      const techArray = editProj.tech_stack.split(',').map(t => t.trim()).filter(t => t.length > 0);
      const bulletsArray = editProj.bulletsText.split('\n').map(b => b.trim()).filter(b => b.length > 0);
      await resumeApi.updateProject(resume.id, id, {
        name: editProj.name,
        tech_stack: techArray,
        link: editProj.link,
        date: editProj.date,
        description: editProj.bulletsText,
        bullets: bulletsArray
      });
      setEditingId(null);
      onUpdate();
    } catch (err) {
      console.error('Failed to save project edit', err);
    }
  };

  return (
    <div className="glass-card" style={{ marginBottom: '1.5rem', background: '#FFFFFF', border: '1px solid #BFDBFE', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(37,99,235,0.06)' }}>
      {/* 🌟 Top IT Domain Selector Dropdown (White Card Design) */}
      <div style={{ marginBottom: '1.25rem', background: '#F8FAFC', padding: '1rem', borderRadius: '8px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FolderGit2 size={16} color="#2563EB" /> Select IT Domain for Projects
          </div>
          <div style={{ fontSize: '0.76rem', color: '#64748B' }}>Choose your course domain to auto-load top-rated industry projects with editable dates</div>
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
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', margin: 0, color: '#0F172A', fontWeight: '800' }}>Projects</h3>
          <p style={{ fontSize: '0.78rem', color: '#64748B', margin: '2px 0 0' }}>Highlight real-world projects with dates, tech stack & links.</p>
        </div>
        <button onClick={() => setAdding(!adding)} className="btn btn-secondary" style={{ fontSize: '0.82rem', padding: '0.4rem 0.8rem' }}>
          <Plus size={14} /> Add Project
        </button>
      </div>

      {adding && (
        <form onSubmit={handleAdd} style={{ background: '#F8FAFC', padding: '1.2rem', borderRadius: '8px', border: '1px solid #CBD5E1', marginBottom: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Project Name</label>
              <input type="text" className="form-control" value={newProj.name} onChange={e => setNewProj({ ...newProj, name: e.target.value })} placeholder="e.g. E-Commerce Sales Analytics" required />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Tech Stack <small style={{ color: '#64748B' }}>(Comma separated)</small></label>
              <input type="text" className="form-control" value={newProj.tech_stack} onChange={e => setNewProj({ ...newProj, tech_stack: e.target.value })} placeholder="e.g. Python, SQL, Power BI" required />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem', marginBottom: '0.8rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Project Link / GitHub URL <small style={{ color: '#64748B' }}>(Optional)</small></label>
              <input type="url" className="form-control" value={newProj.link} onChange={e => setNewProj({ ...newProj, link: e.target.value })} placeholder="https://github.com/yourname/project" />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label>Year / Duration</label>
              <input type="text" className="form-control" value={newProj.date} onChange={e => setNewProj({ ...newProj, date: e.target.value })} placeholder="e.g. Jan 2026 – Feb 2026" />
            </div>
          </div>

          <div className="form-group">
            <label>Description & Key Bullet Points</label>
            <textarea className="form-control" rows={3} value={newProj.description} onChange={e => setNewProj({ ...newProj, description: e.target.value })} placeholder="Describe what the project accomplishes and key business impact..." required />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setAdding(false)} className="btn btn-secondary" style={{ fontSize: '0.8rem' }}>Cancel</button>
            <button type="submit" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>Save Project</button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
        {(resume.projects || []).map(p => (
          <div key={p.id} style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '1rem' }}>
            {editingId === p.id ? (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <input type="text" className="form-control" value={editProj.name} onChange={e => setEditProj({ ...editProj, name: e.target.value })} placeholder="Project Name" />
                  <input type="text" className="form-control" value={editProj.tech_stack} onChange={e => setEditProj({ ...editProj, tech_stack: e.target.value })} placeholder="Tech Stack (e.g. Python, SQL)" />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <input type="url" className="form-control" value={editProj.link} onChange={e => setEditProj({ ...editProj, link: e.target.value })} placeholder="Project Link (GitHub / Live)" />
                  <input type="text" className="form-control" value={editProj.date} onChange={e => setEditProj({ ...editProj, date: e.target.value })} placeholder="Year / Duration (e.g. Jan 2026 – Feb 2026)" />
                </div>
                <textarea className="form-control" rows={3} value={editProj.bulletsText} onChange={e => setEditProj({ ...editProj, bulletsText: e.target.value })} placeholder="One bullet point per line..." style={{ marginBottom: '0.6rem' }} />
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                  <button type="button" onClick={() => setEditingId(null)} className="btn btn-secondary" style={{ fontSize: '0.75rem' }}>Cancel</button>
                  <button type="button" onClick={() => handleSaveEdit(p.id)} className="btn btn-primary" style={{ fontSize: '0.75rem' }}>Save Changes</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: '800', color: '#0F172A', fontSize: '0.95rem' }}>{p.name}</span>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.78rem', color: '#2563EB', textDecoration: 'underline', fontWeight: '600' }}>
                        View Link ↗
                      </a>
                    )}
                    {p.date ? (
                      <span style={{ fontSize: '0.78rem', color: '#64748B', fontStyle: 'italic', marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={12} color="#64748B" /> {p.date}
                      </span>
                    ) : (
                      <span style={{ fontSize: '0.78rem', color: '#94A3B8', fontStyle: 'italic', marginLeft: 'auto' }}>
                        {p.name?.includes('E-Commerce') ? 'Jan 2026 – Feb 2026' : (p.name?.includes('HR') ? 'Feb 2026 – Mar 2026' : '2025 – 2026')}
                      </span>
                    )}
                  </div>
                  {p.tech_stack && (
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', margin: '4px 0' }}>
                      {(Array.isArray(p.tech_stack) ? p.tech_stack : (p.tech_stack || '').split(',')).map((t, idx) => (
                        <span key={idx} style={{ fontSize: '0.72rem', background: '#DBEAFE', color: '#1E40AF', padding: '1px 6px', borderRadius: '4px', fontWeight: '600' }}>
                          {String(t).trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  {p.bullets && p.bullets.length > 0 ? (
                    <ul style={{ margin: '0.35rem 0 0', paddingLeft: '1.2rem', color: '#475569', fontSize: '0.82rem', lineHeight: '1.4' }}>
                      {p.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  ) : p.description && (
                    <p style={{ margin: '0.35rem 0 0', color: '#475569', fontSize: '0.82rem', lineHeight: '1.4' }}>{p.description}</p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <button onClick={() => handleStartEdit(p)} className="btn" style={{ padding: '4px 7px', background: '#EFF6FF', color: '#2563EB', border: '1px solid #BFDBFE', borderRadius: '4px' }} title="Edit">
                    <Edit3 size={13} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="btn" style={{ padding: '4px 7px', background: '#FEE2E2', color: '#DC2626', border: '1px solid #FECACA', borderRadius: '4px' }} title="Delete">
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

export default ProjectsForm;
