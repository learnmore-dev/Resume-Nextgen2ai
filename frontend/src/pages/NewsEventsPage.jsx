import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Cpu, Zap, ShieldAlert, Sparkles, Calendar, 
  ExternalLink, ArrowRight, CheckCircle2, Bookmark, Share2 
} from 'lucide-react';

const NEWS_ARTICLES = [
  {
    id: 'meta-chip',
    tag: 'Hardware & Silicon',
    title: 'Meta Debuts New Generation of Custom Silicon AI Chip',
    subtitle: 'Meta Unveils the MTIA v2: Accelerating AI Model Inference & LLM Training Across Data Centers',
    date: 'Sep 10, 2026',
    author: 'AI Silicon Editorial Desk',
    readTime: '4 min read',
    icon: <Cpu size={24} color="#3B82F6" />,
    summary: 'Meta has officially announced its next-generation proprietary artificial intelligence silicon accelerator, dubbed MTIA (Meta Training and Inference Accelerator). Designed specifically for ranking algorithms and generative AI models, the new processor delivers a 3x compute bandwidth improvement over predecessor hardware while slashing data center power consumption.',
    body: [
      'The custom silicon is built on advanced TSMC process nodes and integrates seamlessly with PyTorch, Meta’s open-source deep learning framework. This tight co-design allows the hardware to maximize compute utilization across recommendation engines, feed algorithms, and multi-modal generative workloads.',
      'By developing custom silicon in-house alongside industry-standard GPUs, Meta achieves significant cost efficiencies and infrastructure autonomy, ensuring high-throughput capabilities for next-generation AI features across billions of active devices.'
    ],
    keyPoints: [
      '3x performance uplift in memory bandwidth and compute efficiency.',
      'Co-designed directly with PyTorch for seamless developer deployment.',
      'Drives lower inference latency across core recommendation systems.'
    ]
  },
  {
    id: 'openai-gpt4',
    tag: 'Generative AI & LLMs',
    title: 'OpenAI Makes GPT-4 Turbo Available for Enterprise Production',
    subtitle: 'Enhanced 128K Context Window, Upgraded Reasoning, and Sub-Second Token Generation',
    date: 'Sep 06, 2026',
    author: 'NextGen2AI Research Team',
    readTime: '5 min read',
    icon: <Zap size={24} color="#10B981" />,
    summary: 'OpenAI has expanded general availability for GPT-4 Turbo across all API tiers. Featuring a massive 128,000-token context window—equivalent to over 300 pages of text in a single prompt—the model introduces superior structured JSON output mode, reproducible outputs, and dramatically reduced token pricing.',
    body: [
      'NextGen Resume integrates these very advancements into our intelligent ATS scoring and resume tailoring engine. By utilizing high-density context windows, our platform can ingest an entire multi-page career portfolio alongside complex 10-page enterprise job descriptions, executing deep semantic alignment without hallucination.',
      'Developers and enterprise teams gain unparalleled prompt fidelity, allowing complex reasoning tasks, code synthesis, and career document restructuring to occur in fractions of a second.'
    ],
    keyPoints: [
      '128k context window allows full document synthesis in a single prompt.',
      'Strict JSON schema validation guarantees zero format deviation.',
      '3x cheaper input tokens and 2x cheaper output tokens for scalable AI apps.'
    ]
  },
  {
    id: 'microsoft-security',
    tag: 'Cybersecurity & Compliance',
    title: 'Microsoft Enterprise AI Security Architecture & Safe Deployment Updates',
    subtitle: 'Comprehensive Guardrails Against Prompt Injection, Hallucination, and Data Leaks',
    date: 'Sep 02, 2026',
    author: 'Cloud Security Council',
    readTime: '4 min read',
    icon: <ShieldAlert size={24} color="#EA580C" />,
    summary: 'Microsoft has rolled out comprehensive enterprise security upgrades across its Azure OpenAI service, introducing real-time prompt injection detection, automated hallucination mitigation, and enterprise data encryption guardrails.',
    body: [
      'The framework implements zero-trust architecture at the AI gateway level, sanitizing all input tokens and verifying that user-provided proprietary data remains strictly confidential and isolated from foundational model retraining cycles.',
      'NextGen2AI adheres to these strict zero-trust standards: your resumes, contact numbers, and employment histories are guarded with 256-bit encryption and are never retained for public model training.'
    ],
    keyPoints: [
      'Automated real-time prompt shield protects against jailbreak attempts.',
      'Enterprise isolation prevents data cross-contamination across client tenants.',
      'End-to-end 256-bit AES encryption at rest and in transit.'
    ]
  }
];

export const NewsEventsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Header */}
      <section className="templates-hero-banner" style={{ padding: '50px 24px 55px', marginBottom: '2.5rem' }}>
        <div className="templates-hero-container" style={{ maxWidth: '960px' }}>
          <div className="templates-breadcrumb" style={{ marginBottom: '14px' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
            <span className="sep">›</span>
            <span className="active">Resources</span>
            <span className="sep">›</span>
            <span className="active">Latest Events & AI News</span>
          </div>

          <h1 className="templates-main-heading" style={{ fontSize: '2.8rem', marginBottom: '12px' }}>
            AI Industry Insights & <span className="highlight-noticed">Tech News</span>
          </h1>

          <p className="templates-hero-desc" style={{ fontSize: '1.05rem', maxWidth: '750px', margin: '0 auto 16px', lineHeight: 1.6 }}>
            Stay ahead of frontier developments in AI chips, large language models, enterprise security standards, and NextGen2AI platform breakthroughs.
          </p>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.12)', padding: '6px 16px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.85rem' }}>
            <Sparkles size={15} color="#38BDF8" /> Curated Technology Intelligence for Builders & Job Seekers
          </div>
        </div>
      </section>

      {/* Main Articles Container */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
        
        {NEWS_ARTICLES.map((article, idx) => (
          <article 
            id={article.id} 
            key={article.id}
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #E2E8F0',
              padding: '2.5rem',
              boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              scrollMarginTop: '100px'
            }}
          >
            {/* Header info */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {article.icon}
                </div>
                <span style={{ background: '#EFF6FF', color: '#2563EB', padding: '3px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700 }}>
                  {article.tag}
                </span>
              </div>
              <div style={{ fontSize: '0.82rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span>{article.date}</span>
                <span>•</span>
                <span>{article.readTime}</span>
              </div>
            </div>

            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0F172A', margin: '0 0 0.5rem', lineHeight: 1.3 }}>
              {article.title}
            </h2>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#475569', margin: '0 0 1.25rem', lineHeight: 1.5 }}>
              {article.subtitle}
            </h4>

            {/* Summary Callout Box */}
            <div style={{ background: '#F8FAFC', borderLeft: '4px solid #ee571d', padding: '1rem 1.25rem', borderRadius: '0 10px 10px 0', marginBottom: '1.5rem' }}>
              <p style={{ margin: 0, fontSize: '0.94rem', color: '#334155', lineHeight: 1.6, fontWeight: 500 }}>
                {article.summary}
              </p>
            </div>

            {/* Article Body */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.5rem', color: '#475569', lineHeight: 1.7, fontSize: '0.96rem' }}>
              {article.body.map((p, i) => (
                <p key={i} style={{ margin: 0 }}>{p}</p>
              ))}
            </div>

            {/* Key Takeaways */}
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '1.25rem', marginBottom: '1.5rem' }}>
              <h5 style={{ margin: '0 0 8px', fontSize: '0.88rem', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                Key Technical Takeaways:
              </h5>
              <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {article.keyPoints.map((pt, i) => (
                  <li key={i} style={{ fontSize: '0.9rem', color: '#14532D', lineHeight: 1.5 }}>
                    {pt}
                  </li>
                ))}
              </ul>
            </div>

            {/* Author Footer */}
            <div style={{ borderTop: '1px solid #F1F5F9', paddingTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748B' }}>
              <span>Published by: <strong>{article.author}</strong></span>
              <button
                onClick={() => navigate('/templates')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ee571d',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  fontSize: '0.88rem'
                }}
              >
                <span>Build ATS Resume with NextGen AI</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </article>
        ))}

        {/* Bottom Banner */}
        <div style={{ background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '20px', padding: '2.5rem', color: '#FFFFFF', textAlign: 'center' }}>
          <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.6rem', fontWeight: 800, color: '#FFFFFF' }}>
            Leverage Cutting-Edge AI for Your Career Today
          </h3>
          <p style={{ margin: '0 0 1.5rem', color: '#94A3B8', fontSize: '0.95rem', maxWidth: '550px', marginInline: 'auto' }}>
            NextGen Resume combines frontier LLM semantic analysis with ATS-optimized templates to put you in the top 5% of applicants.
          </p>
          <button
            onClick={() => navigate('/templates')}
            style={{
              background: '#ee571d',
              color: '#FFFFFF',
              padding: '12px 28px',
              borderRadius: '10px',
              fontWeight: 800,
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(238,87,29,0.3)'
            }}
          >
            <span>Start Building for Free</span>
            <ArrowRight size={18} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default NewsEventsPage;
