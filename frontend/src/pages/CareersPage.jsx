import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, Sparkles, Rocket, Heart, Globe, 
  MapPin, Clock, DollarSign, Mail, CheckCircle2, ArrowRight 
} from 'lucide-react';

const OPEN_POSITIONS = [
  {
    id: 'fullstack-sr',
    title: 'Senior Full-Stack Engineer (React + Python/Django)',
    department: 'Engineering',
    location: 'Bangalore / Hybrid (Karnataka)',
    type: 'Full-Time',
    experience: '3 - 6 Years',
    salary: '₹18L - ₹28L PA + Equity',
    description: 'Lead the architecture and scaling of NextGen Resume’s core platform, integrating high-throughput LLM pipelines and low-latency PDF compilation microservices.',
    requirements: [
      'Strong production experience in React.js, modern ES6+, state management, and responsive layouts.',
      'Proficiency in Python, Django REST Framework, PostgreSQL, and Redis caching.',
      'Hands-on knowledge of Docker containerization and AWS infrastructure deployment.'
    ]
  },
  {
    id: 'ai-ml-eng',
    title: 'AI / LLM Research & Systems Engineer',
    department: 'Artificial Intelligence',
    location: 'Bangalore (Karnataka)',
    type: 'Full-Time',
    experience: '2 - 5 Years',
    salary: '₹22L - ₹35L PA + Equity',
    description: 'Design and deploy state-of-the-art semantic resume analysis, ATS scoring algorithms, job description keyword extraction, and automated career narrative generation.',
    requirements: [
      'Deep understanding of Transformer architectures, OpenAI / Anthropic APIs, and RAG pipelines.',
      'Experience with vector embeddings, semantic search, and prompt engineering.',
      'Strong background in Python, PyTorch / HuggingFace, and NLP evaluation benchmarks.'
    ]
  },
  {
    id: 'ui-ux-designer',
    title: 'Senior Product Designer (UI / UX)',
    department: 'Product & Design',
    location: 'Bangalore / Remote',
    type: 'Full-Time',
    experience: '3 - 6 Years',
    salary: '₹15L - ₹24L PA',
    description: 'Craft beautiful, intuitive resume builder experiences and high-conversion SaaS flows that delight thousands of daily job seekers worldwide.',
    requirements: [
      'Portfolio showcasing end-to-end web SaaS product design and design system management.',
      'Proficiency in Figma, design tokens, interactive prototyping, and micro-interactions.',
      'Customer-centric empathy with a keen eye for typography and visual hierarchy.'
    ]
  },
  {
    id: 'devops-architect',
    title: 'DevOps & Cloud Security Architect',
    department: 'Infrastructure',
    location: 'Bangalore / Hybrid',
    type: 'Full-Time',
    experience: '4 - 7 Years',
    salary: '₹20L - ₹32L PA',
    description: 'Own the uptime, automated CI/CD pipelines, Kubernetes deployments, and 256-bit security compliance for NextGen2AI’s global cloud infrastructure.',
    requirements: [
      'Expertise in AWS (ECS/EKS, RDS, CloudFront, Route53, IAM).',
      'Production mastery of Terraform, GitHub Actions, monitoring (Datadog/Prometheus).',
      'Knowledge of SOC 2, GDPR, and enterprise data security standards.'
    ]
  }
];

export const CareersPage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Header */}
      <section className="templates-hero-banner" style={{ padding: '50px 24px 55px', marginBottom: '2.5rem' }}>
        <div className="templates-hero-container" style={{ maxWidth: '960px' }}>
          <div className="templates-breadcrumb" style={{ marginBottom: '14px' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
            <span className="sep">›</span>
            <span className="active">Company</span>
            <span className="sep">›</span>
            <span className="active">Careers</span>
          </div>

          <h1 className="templates-main-heading" style={{ fontSize: '2.8rem', marginBottom: '12px' }}>
            Build the Future of AI Careers at <span className="highlight-noticed">NextGen2AI</span>
          </h1>

          <p className="templates-hero-desc" style={{ fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto 16px', lineHeight: 1.6 }}>
            Join our mission to empower millions of professionals worldwide to land their dream jobs with cutting-edge artificial intelligence.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', padding: '6px 16px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.85rem' }}>
            <Rocket size={15} color="#38BDF8" /> 4 High-Impact Open Roles in Bangalore HQ & Remote
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '3rem' }}>
        
        {/* Culture & Perks Section */}
        <div>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
              Why Build Your Career at NextGen2AI?
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.96rem', margin: 0 }}>
              We foster a high-agency, low-bureaucracy engineering culture built for builder-founders.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#FFF1EE', color: '#ee571d', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Sparkles size={20} />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>Cutting-Edge AI Tech Stack</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                Work directly on frontier LLM architectures, real-time embeddings, and generative UI workflows that impact thousands daily.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <DollarSign size={20} />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>Top-Tier Compensation & ESOPs</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                Above-market salary packages, performance bonuses, and generous company equity so you share directly in our collective growth.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Globe size={20} />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>Flexibility & Autonomy</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                Hybrid Bangalore setup with flexible hours, modern hardware provisions (Apple M-series), and generous wellness coverage.
              </p>
            </div>

            <div style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#FAF5FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Heart size={20} />
              </div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.05rem', fontWeight: 700, color: '#0F172A' }}>Comprehensive Health</h4>
              <p style={{ margin: 0, fontSize: '0.88rem', color: '#64748B', lineHeight: 1.5 }}>
                Full family medical insurance (₹10L coverage), annual wellness stipends, and continuous learning budgets for courses and books.
              </p>
            </div>
          </div>
        </div>

        {/* Open Positions Directory */}
        <div>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.35rem' }}>
              Open Positions ({OPEN_POSITIONS.length})
            </h2>
            <p style={{ color: '#64748B', fontSize: '0.94rem', margin: 0 }}>
              Review the roles below. We welcome passionate engineers, researchers, and designers.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {OPEN_POSITIONS.map(job => (
              <div 
                key={job.id} 
                style={{ 
                  background: '#FFFFFF', 
                  borderRadius: '16px', 
                  border: '1px solid #E2E8F0', 
                  padding: '2rem', 
                  boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                  <span style={{ background: '#EFF6FF', color: '#2563EB', padding: '3px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 700 }}>
                    {job.department}
                  </span>
                  <span style={{ background: '#F1F5F9', color: '#475569', padding: '3px 10px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: 600 }}>
                    {job.type}
                  </span>
                  <span style={{ color: '#059669', fontSize: '0.84rem', fontWeight: 700 }}>
                    {job.salary}
                  </span>
                </div>

                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.3rem', fontWeight: 800, color: '#0F172A' }}>
                  {job.title}
                </h3>
                <p style={{ margin: '0 0 1rem', fontSize: '0.94rem', color: '#475569', lineHeight: 1.6 }}>
                  {job.description}
                </p>

                {/* Key Requirements right inside the card */}
                <div style={{ background: '#F8FAFC', padding: '12px 16px', borderRadius: '10px', border: '1px solid #F1F5F9', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#334155', textTransform: 'uppercase', marginBottom: '6px' }}>
                    Key Role Requirements:
                  </div>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#64748B', lineHeight: 1.6 }}>
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.84rem', color: '#64748B', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <MapPin size={15} color="#ee571d" /> {job.location}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Clock size={15} color="#64748B" /> {job.experience}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Application Instructions Callout Box */}
          <div style={{ background: '#FFFFFF', borderRadius: '18px', border: '1.5px solid #CBD5E1', padding: '2rem', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.25rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
            <div>
              <h4 style={{ margin: '0 0 6px', fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>
                How to Apply for Open Positions
              </h4>
              <p style={{ margin: 0, fontSize: '0.92rem', color: '#64748B', lineHeight: 1.5, maxWidth: '640px' }}>
                Interested candidates are invited to submit their updated resume, LinkedIn profile, and portfolio directly to our engineering team at <strong style={{ color: '#0F172A' }}>office@nextgen2ai.com</strong> with the role title in the subject line.
              </p>
            </div>

            <a
              href="mailto:office@nextgen2ai.com?subject=Job%20Application%20-%20NextGen2AI"
              style={{
                background: '#ee571d',
                color: '#FFFFFF',
                padding: '12px 24px',
                borderRadius: '10px',
                fontWeight: 700,
                textDecoration: 'none',
                fontSize: '0.92rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(238,87,29,0.25)'
              }}
            >
              <Mail size={17} /> Email Your Resume
            </a>
          </div>

        </div>

      </div>
    </div>
  );
};

export default CareersPage;
