import os
import json
import re
import requests
from typing import Dict, List, Any

# Environment keys
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')

STRONG_ACTION_VERBS = [
    "Spearheaded", "Architected", "Engineered", "Automated", "Optimized",
    "Streamlined", "Orchestrated", "Implemented", "Designed", "Delivered"
]

def extract_metrics(text: str) -> List[str]:
    """Find any numbers, percentages, dollar amounts in original text."""
    if not text:
        return []
    pattern = r'(\d+[\d\.,%]*\s*(?:%|\+|\$|k|M|users|clients|ms|seconds|hours|x|devs|engineers|team members)?)'
    return re.findall(pattern, text, re.IGNORECASE)

def improve_bullets_ai(raw_description: str, keywords: List[str] = None) -> List[str]:
    keywords = keywords or []
    kw_str = ", ".join(keywords)
    
    # 1. If Gemini API key is available
    if GEMINI_API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            prompt = f"""System: You are a resume writing assistant. Rewrite the user's raw job description into 2-4 strong, ATS-friendly bullet points.
RULES:
- Use strong action verbs (Led, Built, Reduced, Automated, Designed)
- Only use numbers/metrics the user explicitly provided. NEVER invent percentages, dollar amounts, or team sizes.
- If the user provided a metric, feature it prominently.
- Keep each bullet under 25 words.
- Naturally include these keywords if truthful and relevant: {kw_str}
- Return ONLY a JSON array of strings, no preamble.

User's raw input: "{raw_description}"
"""
            payload = {"contents": [{"parts": [{"text": prompt}]}]}
            res = requests.post(url, json=payload, timeout=10)
            if res.status_code == 200:
                data = res.json()
                text = data['candidates'][0]['content']['parts'][0]['text']
                # parse JSON from markdown codeblock if present
                clean_json = re.sub(r'```json\s*|\s*```', '', text).strip()
                return json.loads(clean_json)
        except Exception:
            pass  # Fallback to local rule engine

    # 2. Smart Rule-Based Engine (Fallback)
    metrics = extract_metrics(raw_description)
    raw_lines = [l.strip() for l in raw_description.split('\n') if l.strip()]
    if not raw_lines:
        raw_lines = [raw_description.strip()] if raw_description.strip() else ["Developed core features and resolved high-priority software issues."]

    improved = []
    verbs = STRONG_ACTION_VERBS.copy()
    
    for idx, line in enumerate(raw_lines[:4]):
        verb = verbs[idx % len(verbs)]
        # Remove leading bullets or dashes
        clean_line = re.sub(r'^[\-\*\•\d\.]+\s*', '', line)
        
        # Inject JD keyword if available and not present
        injected_kw = f" leveraging {keywords[idx % len(keywords)]}" if keywords and idx < len(keywords) else ""
        
        # Check if line has metric
        line_metrics = extract_metrics(clean_line)
        metric_phrase = f" resulting in {line_metrics[0]} improvement" if line_metrics else ""
        
        bullet = f"{verb} {clean_line.lower()}{injected_kw}{metric_phrase} to enhance system efficiency and scalability."
        # Clean up double periods or duplicate wording
        bullet = re.sub(r'\.\.', '.', bullet)
        bullet = bullet[0].upper() + bullet[1:]
        improved.append(bullet)

    return improved

def generate_summary_ai(role: str, years: str, skills: List[str], target_job_title: str = "") -> str:
    skills_str = ", ".join(skills[:5])
    
    if GEMINI_API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            prompt = f"""System: Write a 2-3 line professional summary for a resume based on the candidate's role, years of experience, and top skills. No invented facts. Return plain text only, no markdown.

Role: {role}
Years of experience: {years}
Top skills: {skills_str}
Target job title (if tailoring): {target_job_title}"""
            payload = {"contents": [{"parts": [{"text": prompt}]}]}
            res = requests.post(url, json=payload, timeout=10)
            if res.status_code == 200:
                text = res.json()['candidates'][0]['content']['parts'][0]['text']
                return text.strip()
        except Exception:
            pass

    # Rule-Based Fallback
    target_phrase = f" targeting {target_job_title} positions" if target_job_title else ""
    exp_phrase = f" with {years} of experience" if years else ""
    skills_phrase = f" specializing in {skills_str}" if skills_str else ""
    
    summary = f"Results-driven {role or 'Software Engineer'}{exp_phrase}{skills_phrase}{target_phrase}. Proven track record in designing scalable architectures, optimizing workflow efficiency, and delivering robust full-stack solutions. Passionate about leveraging modern technologies to drive technical innovation and business growth."
    return summary

def extract_jd_keywords_ai(jd_text: str) -> Dict[str, Any]:
    if GEMINI_API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            prompt = f"""System: Extract all technical skills, tools, frameworks, and job-relevant keywords from this job description. Group them into: required_skills, nice_to_have_skills, soft_skills, job_title.
Return ONLY valid JSON, no explanation.

Job description: {jd_text}"""
            payload = {"contents": [{"parts": [{"text": prompt}]}]}
            res = requests.post(url, json=payload, timeout=10)
            if res.status_code == 200:
                text = res.json()['candidates'][0]['content']['parts'][0]['text']
                clean_json = re.sub(r'```json\s*|\s*```', '', text).strip()
                return json.loads(clean_json)
        except Exception:
            pass

    # Rule-based fallback keyword extractor
    known_tech = [
        "Python", "Django", "React", "JavaScript", "TypeScript", "Node.js", "PostgreSQL",
        "SQL", "Redis", "Celery", "Docker", "Kubernetes", "AWS", "Azure", "GCP", "REST API",
        "GraphQL", "CI/CD", "Git", "HTML5", "CSS3", "Tailwind", "System Design", "Microservices",
        "Unit Testing", "Pytest", "Jest", "FastAPI", "Flask", "Java", "Spring Boot", "C++"
    ]
    
    soft = ["Leadership", "Communication", "Problem Solving", "Agile", "Scrum", "Teamwork", "Time Management"]
    
    found_req = [tech for tech in known_tech if re.search(r'\b' + re.escape(tech) + r'\b', jd_text, re.I)]
    found_soft = [s for s in soft if re.search(r'\b' + re.escape(s) + r'\b', jd_text, re.I)]
    
    # Infer Job Title
    title_match = re.search(r'(Senior|Junior|Lead|Principal|Full Stack|Backend|Frontend|Software)?\s*(Developer|Engineer|Architect|Data Scientist)', jd_text, re.I)
    job_title = title_match.group(0) if title_match else "Software Engineer"
    
    return {
        "job_title": job_title,
        "required_skills": found_req[:8] if found_req else ["Python", "REST API", "Database Design"],
        "nice_to_have_skills": found_req[8:12] if len(found_req) > 8 else ["Docker", "Redis"],
        "soft_skills": found_soft if found_soft else ["Problem Solving", "Team Collaboration"]
    }


def autofill_role_resume_ai(role_name: str, experience_level: str = "3+ Years") -> Dict[str, Any]:
    """Generates complete summary, skills, experience, and projects tailored to any specified role."""
    clean_role = role_name.strip()
    
    if GEMINI_API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            prompt = f"""System: Generate a complete professional resume payload for candidate role: "{clean_role}" with experience level: "{experience_level}".
Return ONLY valid JSON matching this schema:
{{
  "target_job_title": "{clean_role}",
  "summary": "2-3 sentence overview...",
  "skills": ["Skill1", "Skill2", "Skill3", "Skill4", "Skill5", "Skill6", "Skill7", "Skill8"],
  "experience": [
    {{
      "company": "Company Name",
      "role": "Role Title",
      "start_date": "Jan 2022",
      "end_date": "Present",
      "is_current": true,
      "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"]
    }}
  ],
  "projects": [
    {{
      "name": "Project Name",
      "description": "Project summary...",
      "tech_stack": ["Tech1", "Tech2"],
      "link": "https://github.com/example/project"
    }}
  ]
}}"""
            payload = {"contents": [{"parts": [{"text": prompt}]}]}
            res = requests.post(url, json=payload, timeout=12)
            if res.status_code == 200:
                text = res.json()['candidates'][0]['content']['parts'][0]['text']
                clean_json = re.sub(r'```json\s*|\s*```', '', text).strip()
                return json.loads(clean_json)
        except Exception:
            pass

    lower_role = clean_role.lower()

    if 'python' in lower_role or 'django' in lower_role or 'fresher' in lower_role:
        return {
            "target_job_title": "Python Full Stack Developer",
            "summary": "Full Stack Developer with strong foundations in JavaScript, HTML, CSS, and React.js, and hands-on experience building scalable applications using React, Next.js, Node.js, and PostgreSQL. Experienced in developing RESTful APIs and client–server architectures through internship and full-stack projects. Built AI-powered applications with exposure to Agile development and Git workflows. Solved 500+ DSA problems demonstrating strong problem-solving skills. Collaborative team player eager to learn, take feedback, and grow in fast-paced environments.",
            "skills": [
                {"category": "Languages", "skill_name": "Java (Core, OOP, Collections), Python, JavaScript (ES6)"},
                {"category": "Frontend", "skill_name": "React.js, Next.js, HTML5, CSS3, Tailwind CSS, Shadcn UI, Ant Design"},
                {"category": "Backend & Platforms", "skill_name": "Node.js, Express.js, REST APIs"},
                {"category": "Databases", "skill_name": "MySQL, PostgreSQL, MongoDB, Mongoose, Prisma"},
                {"category": "Development Tools & DevOps", "skill_name": "VS Code, Git, GitHub, Docker, CI/CD Pipelines (GitHub Actions), Postman"},
                {"category": "AI Tools & Knowledge", "skill_name": "Gemini AI, Groq API, AI Model Integration, AI-powered application development"},
                {"category": "CS Fundamentals", "skill_name": "DBMS, Computer Network, SDLC (Agile, Scrum), DSA, OOPs, LLD(Basics)"},
                {"category": "Soft Skills", "skill_name": "Strong Communication, Technical Documentation, Analytical Thinking, Team Collaboration"}
            ],
            "experience": [
                {
                    "company": "Tech Logix Solutions",
                    "role": "Python Full Stack Developer",
                    "start_date": "Jan 2022",
                    "end_date": "Present",
                    "is_current": True,
                    "bullets": [
                        "Architected scalable backend microservices using Django REST Framework & FastAPI, reducing API response times by 35%.",
                        "Developed responsive frontend UI with React.js and Redux Toolkit, handling state management for 100k+ monthly active users.",
                        "Configured CI/CD deployment pipelines using Docker, GitHub Actions, and AWS ECS for seamless releases."
                    ]
                },
                {
                    "company": "Nexus Code Labs",
                    "role": "Software Developer",
                    "start_date": "Jun 2020",
                    "end_date": "Dec 2021",
                    "is_current": False,
                    "bullets": [
                        "Designed SQL database schemas and optimized PostgreSQL query execution plans, reducing database latency by 40%.",
                        "Built asynchronous task processing pipelines with Celery and Redis to process background job queues."
                    ]
                }
            ],
            "projects": [
                {
                    "name": "Trainer Management System",
                    "description": "Developed a web-based Trainer Management System for managing trainer profiles, courses, batches, schedules, and trainer assignments.\nImplemented CRUD operations, database relationships, validation, and an admin interface to streamline training operations.",
                    "bullets": [
                        "Developed a web-based Trainer Management System for managing trainer profiles, courses, batches, schedules, and trainer assignments.",
                        "Implemented CRUD operations, database relationships, validation, and an admin interface to streamline training operations."
                    ],
                    "tech_stack": ["Python", "Django", "MySQL"],
                    "link": "https://github.com/manisha/trainer-management-system"
                },
                {
                    "name": "Hotel Booking & Management System",
                    "description": "Built a full-stack hotel booking platform with real-time room availability, search & advanced filters, online booking flow, and secure payment integration.\nImplemented role-based access control, REST APIs for React-Django communication, customer reviews/ratings, and an admin dashboard.",
                    "bullets": [
                        "Built a full-stack hotel booking platform with real-time room availability, search & advanced filters, online booking flow, and secure payment integration.",
                        "Implemented role-based access control, REST APIs for React-Django communication, customer reviews/ratings, and an admin dashboard."
                    ],
                    "tech_stack": ["Python", "Django", "REST Framework", "React.js", "PostgreSQL"],
                    "link": "https://github.com/manisha/hotel-booking-system"
                }
            ]
        }

    elif 'java' in lower_role or 'spring' in lower_role:
        return {
            "target_job_title": "Java Full Stack Engineer",
            "summary": f"High-performing Java Full Stack Engineer with {experience_level} experience engineering enterprise software with Java 17, Spring Boot, Microservices, Angular/React, and MySQL. Proven success in cloud architecture and Agile environments.",
            "skills": ["Java 17", "Spring Boot", "Spring Cloud", "Hibernate/JPA", "React.js", "Angular", "RESTful Web Services", "MySQL", "Kafka", "Docker", "Maven", "JUnit"],
            "experience": [
                {
                    "company": "Global Enterprise Systems",
                    "role": "Java Full Stack Developer",
                    "start_date": "Feb 2022",
                    "end_date": "Present",
                    "is_current": True,
                    "bullets": [
                        "Engineered fault-tolerant Spring Boot microservices with Kafka messaging, handling over 2M daily transaction requests.",
                        "Built dynamic enterprise portals using Angular/React and Bootstrap, ensuring 100% responsive design across devices.",
                        "Implemented secure OAuth2 authentication and Spring Security protocols across multi-tenant applications."
                    ]
                },
                {
                    "company": "Fintech Solutions Corp",
                    "role": "Associate Java Developer",
                    "start_date": "Jul 2020",
                    "end_date": "Jan 2022",
                    "is_current": False,
                    "bullets": [
                        "Optimized Hibernate JPA queries and database indexes, accelerating transaction processing speeds by 30%.",
                        "Wrote comprehensive unit and integration tests using JUnit 5 and Mockito, maintaining 90%+ code coverage."
                    ]
                }
            ],
            "projects": [
                {
                    "name": "Real-Time Banking Transaction Gateway",
                    "description": "Secure microservices-based banking transaction gateway supporting multi-currency transfers and audit logging.",
                    "tech_stack": ["Java 17", "Spring Boot", "Spring Cloud", "Kafka", "MySQL"],
                    "link": "https://github.com/developer/banking-gateway"
                },
                {
                    "name": "Enterprise ERP Dashboard",
                    "description": "Full-stack dashboard for inventory management, user permission administration, and real-time sales reports.",
                    "tech_stack": ["Java", "Spring Boot", "React", "PostgreSQL"],
                    "link": "https://github.com/developer/enterprise-erp"
                }
            ]
        }

    elif 'data' in lower_role or 'analytic' in lower_role or 'bi' in lower_role:
        return {
            "target_job_title": "Data Analytics Specialist",
            "summary": f"Analytical Data Specialist with {experience_level} experience transforming complex datasets into actionable business insights using SQL, Python, Tableau, and Power BI. Expert in ETL pipelines and predictive metrics.",
            "skills": ["Python", "SQL", "Pandas", "NumPy", "PowerBI", "Tableau", "Statistical Analysis", "ETL Pipelines", "Data Visualization", "BigQuery", "Excel (VBA)", "Snowflake"],
            "experience": [
                {
                    "company": "Analytics Insights Inc",
                    "role": "Data Analyst",
                    "start_date": "Mar 2022",
                    "end_date": "Present",
                    "is_current": True,
                    "bullets": [
                        "Designed interactive Power BI & Tableau executive dashboards, reducing monthly reporting preparation time by 60%.",
                        "Wrote complex SQL queries and window functions to extract metrics from multi-terabyte Snowflake database.",
                        "Built automated Python ETL pipelines using Pandas to clean and aggregate incoming customer interaction data."
                    ]
                },
                {
                    "company": "Metrics Operations Group",
                    "role": "Junior Data Analyst",
                    "start_date": "Aug 2020",
                    "end_date": "Feb 2022",
                    "is_current": False,
                    "bullets": [
                        "Conducted exploratory data analysis (EDA) to identify churn patterns, boosting customer retention by 18%.",
                        "Created automated weekly KPI reports and statistical summaries for senior management."
                    ]
                }
            ],
            "projects": [
                {
                    "name": "Customer Churn Prediction Model",
                    "description": "Machine learning regression & classification model identifying high-risk customer accounts with 88% accuracy.",
                    "tech_stack": ["Python", "Pandas", "Scikit-Learn", "Tableau"],
                    "link": "https://github.com/analyst/churn-prediction"
                },
                {
                    "name": "Executive E-Commerce Sales Dashboard",
                    "description": "Interactive Power BI dashboard tracking revenue growth, regional sales distribution, and customer lifetime value.",
                    "tech_stack": ["PowerBI", "SQL", "BigQuery", "Excel"],
                    "link": "https://github.com/analyst/sales-dashboard"
                }
            ]
        }

    else:
        return {
            "target_job_title": clean_role,
            "summary": f"Dedicated and results-oriented {clean_role} with {experience_level} experience driving technical solutions, workflow optimization, and high-impact deliverables. Adept at cross-functional team collaboration, problem solving, and modern industry standards.",
            "skills": [clean_role, "Problem Solving", "System Design", "Project Management", "Team Collaboration", "Agile / Scrum", "Data Analysis", "REST APIs", "Git", "Process Optimization"],
            "experience": [
                {
                    "company": "Apex Global Solutions",
                    "role": clean_role,
                    "start_date": "Jan 2022",
                    "end_date": "Present",
                    "is_current": True,
                    "bullets": [
                        f"Spearheaded key initiatives as a {clean_role}, delivering project milestones 20% ahead of schedule.",
                        "Collaborated with cross-functional teams to streamline operational workflows and improve quality standards.",
                        "Implemented modern tools and best practices, enhancing productivity and stakeholder satisfaction."
                    ]
                }
            ],
            "projects": [
                {
                    "name": f"{clean_role} Core Project",
                    "description": f"Comprehensive project showcasing expertise in {clean_role} methodologies, implementation, and optimization.",
                    "tech_stack": [clean_role, "Agile", "Analytics"],
                    "link": "https://github.com/user/project"
                }
            ]
        }

