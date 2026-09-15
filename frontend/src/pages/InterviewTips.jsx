import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, MessageSquare, Target, CheckCircle2, XCircle, 
  ArrowRight, Sparkles, TrendingUp, ShieldCheck, Users, 
  HelpCircle, Copy, Check, Briefcase, Award, Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BEHAVIORAL_QUESTIONS = [
  {
    q: "1. 'Tell me about a time you handled a critical production incident or major system outage.'",
    context: "Evaluates your technical composure, systematic debugging, incident triage, and long-term architectural prevention.",
    answer: {
      situation: "During our peak Diwali sale event at an e-commerce platform with 85,000 concurrent users, our primary PostgreSQL database CPU spiked to 100%, causing checkout API response timeouts for 15% of transactions.",
      task: "As the On-Call Senior Backend Engineer, I needed to immediately restore database responsiveness, prevent duplicate payment charges, and identify the root cause without taking the platform offline.",
      action: "I used pg_stat_activity and Datadog telemetry to isolate a rogue analytics query that was executing unindexed table scans across 18 million order rows. I immediately killed the offending PID, spun up an instant read-replica to offload reporting queries, and deployed a quick hotfix patch with an optimized partial composite index.",
      result: "Database CPU dropped back to 34% within 14 minutes, checkout error rates returned to 0%, and zero payment transactions were corrupted.",
      countermeasure: "Post-incident, I authored a comprehensive blameless post-mortem, enforced strict query timeout limits in Django settings, and configured automated Slack alerting for any unindexed query running over 500ms."
    }
  },
  {
    q: "2. 'Tell me about a time you had a strong technical disagreement with a Tech Lead or peer.'",
    context: "Evaluates maturity, collaborative communication, data-driven reasoning, and the ability to disagree and commit.",
    answer: {
      situation: "While designing our new customer notification service, our Tech Lead proposed using synchronous REST calls across our 6 microservices to notify users.",
      task: "I believed synchronous coupling would introduce cascading latency failures if the SMS provider experienced delays, but I needed to present my case respectfully and objectively.",
      action: "Instead of arguing opinions, I benchmarked both architectures. I spun up a load-test simulating 5,000 concurrent webhooks with a simulated 400ms third-party API latency. The benchmark demonstrated that synchronous calls exhausted our HTTP connection pool in 45 seconds, whereas an asynchronous Kafka event queue sustained 12,000 requests/sec with zero thread starvation.",
      result: "After reviewing the load-test metrics, the Tech Lead fully agreed with the asynchronous approach. We implemented the Kafka event queue.",
      countermeasure: "The project launched on time, and our team adopted automated load-test benchmarking as the standard decision framework for architectural debates."
    }
  },
  {
    q: "3. 'Tell me about a time a project was falling behind deadline and how you delivered.'",
    context: "Evaluates prioritization, ruthlessly cutting scope, managing stakeholder expectations, and execution under pressure.",
    answer: {
      situation: "Two weeks before a critical enterprise customer launch, our third-party authentication vendor announced an unexpected breaking API deprecation.",
      task: "We faced a potential 3-week project delay that would have breached our enterprise service contract.",
      action: "I called an immediate sync with the Product Manager. We triaged all deliverables and agreed to decouple non-essential features (custom avatar uploads, dark-mode themes) while focusing 100% of engineering bandwidth on integrating standard OAuth 2.0 with Google and Microsoft.",
      result: "We completed the core authentication integration 2 days ahead of schedule, allowing QA sufficient regression testing time before client sign-off.",
      countermeasure: "The enterprise client successfully onboarded on the committed date, generating ₹24L in upfront annual contract value."
    }
  }
];

const NEGOTIATION_SCRIPTS = [
  {
    scenario: "Script 1: When the Recruiter Asks for Your Current CTC or Target First",
    strategy: "Deflect politely. Avoid anchoring low before they reveal their budgeted level and range.",
    script: "“I am much more focused on finding the right long-term technical alignment and scope of impact here at [Company] than a specific static number. Could you share the budgeted compensation range for this level based on your internal bands?”"
  },
  {
    scenario: "Script 2: When Receiving the Initial Offer Letter",
    strategy: "Express excitement first, ask for the full written breakdown, and never accept or decline on the spot.",
    script: "“Thank you so much! I am genuinely thrilled about the team and the technical roadmap we discussed with [Hiring Manager]. I'd love to review the complete written breakdown (Base, Joining Bonus, Stocks/RSUs, and Benefits). Could you email me the formal letter so I can review it carefully with my family over the next 24-48 hours?”"
  },
  {
    scenario: "Script 3: The Counter-Offer Script (Asking for 15-25% More)",
    strategy: "Anchor your ask against your market value, interview feedback, and competing offers.",
    script: "“Based on my track record leading high-throughput microservices and the technical challenges we discussed, I was expecting closer to [Target Base + Bonus]. If we can adjust the base to [Target] or provide an upfront signing bonus of [Amount] to bridge the equity vesting gap, I am ready to sign the offer immediately and begin my transition.”"
  }
];

export const InterviewTips = () => {
  const navigate = useNavigate();
  const { isAuthenticated, openAuthModal } = useAuth();
  const [activeTab, setActiveTab] = useState('behavioral');
  const [copiedScript, setCopiedScript] = useState(null);

  const handleStartBuilding = () => {
    if (!isAuthenticated) {
      openAuthModal('/templates');
      return;
    }
    navigate('/templates');
  };

  const handleCopy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(idx);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingBottom: '5rem' }}>
      {/* Hero Header */}
      <section className="templates-hero-banner" style={{ padding: '50px 24px 55px', marginBottom: '2.5rem' }}>
        <div className="templates-hero-container" style={{ maxWidth: '960px' }}>
          <div className="templates-breadcrumb" style={{ marginBottom: '14px' }}>
            <span onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</span>
            <span className="sep">›</span>
            <span className="active">Career Advice</span>
            <span className="sep">›</span>
            <span className="active">Career & Interview Tips</span>
          </div>

          <h1 className="templates-main-heading" style={{ fontSize: '2.8rem', marginBottom: '12px' }}>
            Career & <span className="highlight-noticed">Interview Tips Masterclass</span>
          </h1>

          <p className="templates-hero-desc" style={{ fontSize: '1.05rem', maxWidth: '780px', margin: '0 auto 18px', lineHeight: 1.6 }}>
            Master behavioral rounds using the STAR-C framework, navigate high-level system design interviews, and negotiate top-tier compensation packages with battle-tested scripts.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.14)', padding: '5px 14px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.82rem' }}>
              <ShieldCheck size={15} color="#34D399" /> The STAR-C Behavioral Blueprint
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.14)', padding: '5px 14px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.82rem' }}>
              <DollarSign size={15} color="#FBBF24" /> Salary Negotiation Scripts
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.14)', padding: '5px 14px', borderRadius: '20px', color: '#E2E8F0', fontSize: '0.82rem' }}>
              <Award size={15} color="#38BDF8" /> FAANG & Tier-1 Ready
            </span>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div style={{ maxWidth: '1160px', margin: '0 auto', padding: '0 1.5rem' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', background: '#FFFFFF', padding: '6px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', flexWrap: 'wrap', gap: '4px' }}>
            <button
              onClick={() => setActiveTab('behavioral')}
              style={{
                background: activeTab === 'behavioral' ? '#0F172A' : 'transparent',
                color: activeTab === 'behavioral' ? '#FFFFFF' : '#64748B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <MessageSquare size={17} /> The STAR-C Method
            </button>

            <button
              onClick={() => setActiveTab('technical')}
              style={{
                background: activeTab === 'technical' ? '#0F172A' : 'transparent',
                color: activeTab === 'technical' ? '#FFFFFF' : '#64748B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Target size={17} /> System Design Framework
            </button>

            <button
              onClick={() => setActiveTab('salary')}
              style={{
                background: activeTab === 'salary' ? '#0F172A' : 'transparent',
                color: activeTab === 'salary' ? '#FFFFFF' : '#64748B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <DollarSign size={17} /> Salary Negotiation Playbook
            </button>

            <button
              onClick={() => setActiveTab('onboarding')}
              style={{
                background: activeTab === 'onboarding' ? '#0F172A' : 'transparent',
                color: activeTab === 'onboarding' ? '#FFFFFF' : '#64748B',
                border: 'none',
                padding: '10px 20px',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '0.92rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <TrendingUp size={17} /> First 90 Days Success
            </button>
          </div>
        </div>

        {/* TAB 1: Behavioral STAR-C */}
        {activeTab === 'behavioral' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                The STAR-C Behavioral Framework
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Standard candidates stop at STAR (Situation, Task, Action, Result). Elite engineering candidates add the <strong>Countermeasure (C)</strong>—demonstrating how you built systemic prevention so the mistake never happened again.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                {BEHAVIORAL_QUESTIONS.map((item, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.2rem', fontWeight: 800, color: '#0F172A' }}>
                      {item.q}
                    </h3>
                    <p style={{ margin: '0 0 1.25rem', fontSize: '0.85rem', color: '#64748B', fontStyle: 'italic' }}>
                      What recruiters are evaluating: {item.context}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                      <div><strong style={{ color: '#2563EB' }}>[S] Situation:</strong> <span style={{ color: '#334155', fontSize: '0.9rem' }}>{item.answer.situation}</span></div>
                      <div><strong style={{ color: '#0D9488' }}>[T] Task:</strong> <span style={{ color: '#334155', fontSize: '0.9rem' }}>{item.answer.task}</span></div>
                      <div><strong style={{ color: '#D97706' }}>[A] Action:</strong> <span style={{ color: '#334155', fontSize: '0.9rem' }}>{item.answer.action}</span></div>
                      <div><strong style={{ color: '#16A34A' }}>[R] Result:</strong> <span style={{ color: '#334155', fontSize: '0.9rem' }}>{item.answer.result}</span></div>
                      <div style={{ background: '#F0FDF4', padding: '8px 12px', borderRadius: '8px', borderLeft: '4px solid #16A34A', marginTop: '4px' }}>
                        <strong style={{ color: '#166534' }}>[C] Countermeasure (Senior Differentiator):</strong> <span style={{ color: '#14532D', fontSize: '0.9rem' }}>{item.answer.countermeasure}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: System Design Framework */}
        {activeTab === 'technical' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                45-Minute System Design Interview Blueprint
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Never start drawing boxes on the whiteboard right away. Follow this 4-step structured framework used by Principal Engineers at Amazon and Google.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#EEF2FF', color: '#4F46E5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '0.75rem' }}>
                    1
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                    Requirements & Scope (5 Mins)
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.86rem', color: '#64748B', lineHeight: 1.6 }}>
                    <li>Clarify functional requirements (e.g. Can users edit posts? Is it global?).</li>
                    <li>Establish non-functional SLA targets (Availability, Latency &lt; 50ms, Read vs Write heavy).</li>
                  </ul>
                </div>

                <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#F0FDF4', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '0.75rem' }}>
                    2
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                    Back-of-the-Envelope Math (5 Mins)
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.86rem', color: '#64748B', lineHeight: 1.6 }}>
                    <li>Calculate Queries Per Second (QPS) = Peak daily active users ÷ 86,400.</li>
                    <li>Estimate storage requirements for 5-year retention (Disk IOPS & bandwidth).</li>
                  </ul>
                </div>

                <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FFF7ED', color: '#EA580C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '0.75rem' }}>
                    3
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                    High-Level Architecture (15 Mins)
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.86rem', color: '#64748B', lineHeight: 1.6 }}>
                    <li>Sketch client, DNS, Load Balancers (Nginx / ALB), API Gateway.</li>
                    <li>Define Database schema and choose SQL vs NoSQL with clear justification.</li>
                  </ul>
                </div>

                <div style={{ background: '#F8FAFC', padding: '1.5rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FAF5FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, marginBottom: '0.75rem' }}>
                    4
                  </div>
                  <h3 style={{ margin: '0 0 8px', fontSize: '1.1rem', fontWeight: 800, color: '#0F172A' }}>
                    Deep Dive Bottlenecks (15 Mins)
                  </h3>
                  <ul style={{ margin: 0, paddingLeft: '1.1rem', fontSize: '0.86rem', color: '#64748B', lineHeight: 1.6 }}>
                    <li>Address single points of failure (SPOF) with replicas and failovers.</li>
                    <li>Implement caching (Redis / Memcached), CDC, and Kafka event streaming.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Salary Negotiation Playbook */}
        {activeTab === 'salary' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                Executive Compensation & Salary Negotiation Scripts
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Never accept the first offer without evaluating the entire total compensation package. Click to copy these proven scripts directly.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {NEGOTIATION_SCRIPTS.map((item, idx) => (
                  <div key={idx} style={{ background: '#F8FAFC', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '1.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '8px' }}>
                      <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>{item.scenario}</h3>
                      <button
                        onClick={() => handleCopy(item.script, idx)}
                        style={{
                          background: copiedScript === idx ? '#DCFCE7' : '#FFFFFF',
                          color: copiedScript === idx ? '#166534' : '#0F172A',
                          border: '1.5px solid #CBD5E1',
                          borderRadius: '8px',
                          padding: '6px 12px',
                          fontSize: '0.82rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        {copiedScript === idx ? <Check size={14} /> : <Copy size={14} />}
                        {copiedScript === idx ? 'Copied!' : 'Copy Script'}
                      </button>
                    </div>

                    <p style={{ margin: '0 0 1rem', fontSize: '0.85rem', color: '#64748B' }}>
                      <strong>Strategic Objective:</strong> {item.strategy}
                    </p>

                    <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderLeft: '4px solid #ee571d', borderRadius: '0 10px 10px 0', padding: '1rem 1.25rem' }}>
                      <p style={{ margin: 0, fontSize: '0.92rem', color: '#1E293B', lineHeight: 1.6, fontStyle: 'italic' }}>
                        {item.script}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: First 90 Days Success */}
        {activeTab === 'onboarding' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '2.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0F172A', marginBottom: '0.5rem' }}>
                The First 90-Day Blueprint for Senior Engineers & Tech Leads
              </h2>
              <p style={{ color: '#64748B', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                How top-performing professionals establish trust, ship early wins, and position themselves for fast-track promotions.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div style={{ background: '#F8FAFC', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase', marginBottom: '4px' }}>Days 1 - 30</div>
                  <h3 style={{ margin: '0 0 10px', fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Listen, Learn & Ship First PR</h3>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                    <li>Understand team deployment cadences and test pipelines.</li>
                    <li>Ship your first small bug fix or test improvement within your first 10 days.</li>
                    <li>Conduct 1-on-1 discovery chats with your Tech Lead, Product Manager, and QA.</li>
                  </ul>
                </div>

                <div style={{ background: '#F8FAFC', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0D9488', textTransform: 'uppercase', marginBottom: '4px' }}>Days 31 - 60</div>
                  <h3 style={{ margin: '0 0 10px', fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Own an End-to-End Feature</h3>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                    <li>Take full technical ownership of a meaningful product feature or bug backlog.</li>
                    <li>Actively participate in code reviews with constructive, high-standard feedback.</li>
                    <li>Identify 1 bottleneck in developer productivity or CI/CD build speeds.</li>
                  </ul>
                </div>

                <div style={{ background: '#F8FAFC', padding: '1.75rem', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#EA580C', textTransform: 'uppercase', marginBottom: '4px' }}>Days 61 - 90</div>
                  <h3 style={{ margin: '0 0 10px', fontSize: '1.15rem', fontWeight: 800, color: '#0F172A' }}>Deliver Architectural Value</h3>
                  <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.88rem', color: '#475569', lineHeight: 1.6 }}>
                    <li>Propose and lead an architectural improvement (e.g. caching, test automation).</li>
                    <li>Document internal best practices and mentor junior developers.</li>
                    <li>Schedule a 90-day review with your manager to align on promotion expectations.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA Block */}
        <div style={{ marginTop: '3.5rem', textAlign: 'center', background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)', borderRadius: '24px', padding: '3.5rem 2rem', color: '#FFFFFF', boxShadow: '0 10px 30px rgba(15,23,42,0.15)' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '0 0 0.85rem', color: '#FFFFFF' }}>
            Ready to Land Your Next Senior Role?
          </h2>
          <p style={{ fontSize: '1.02rem', color: '#94A3B8', margin: '0 auto 2rem', maxWidth: '640px', lineHeight: 1.6 }}>
            Start with an ATS-optimized resume built on proven tech industry templates. NextGen Resume’s AI does the heavy lifting for you.
          </p>
          <button 
            onClick={handleStartBuilding}
            style={{ 
              padding: '14px 32px', 
              fontSize: '1.05rem', 
              fontWeight: 800, 
              borderRadius: '10px', 
              background: '#ee571d', 
              color: '#FFFFFF', 
              border: 'none', 
              cursor: 'pointer', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '10px',
              boxShadow: '0 4px 15px rgba(238,87,29,0.35)'
            }}
          >
            <span>Build Your Interview-Ready Resume</span>
            <ArrowRight size={20} />
          </button>
        </div>

      </div>
    </div>
  );
};

export default InterviewTips;
