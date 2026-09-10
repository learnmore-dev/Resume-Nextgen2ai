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
    
    # 1. Try OpenAI if API key is present
    open_ai_key = os.getenv('OPENAI_API_KEY')
    if open_ai_key and open_ai_key.startswith('sk-'):
        try:
            from openai import OpenAI
            client = OpenAI(api_key=open_ai_key)
            prompt = f"""You are an expert resume writer. Rewrite the user's raw experience into 2-4 strong, ATS-optimized bullet points.
RULES:
- Start each bullet with a strong action verb (e.g., Engineered, Optimized, Architected, Developed, Spearheaded).
- Never invent fake metrics or numbers.
- Naturally highlight these keywords if relevant: {kw_str}
- Return ONLY a JSON array of strings."""
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "system", "content": prompt},
                    {"role": "user", "content": raw_description}
                ],
                temperature=0.3,
                max_tokens=300
            )
            content = response.choices[0].message.content.strip()
            clean_json = re.sub(r'```json\s*|\s*```', '', content).strip()
            return json.loads(clean_json)
        except Exception:
            pass

    # 2. Try Gemini API key
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
                clean_json = re.sub(r'```json\s*|\s*```', '', text).strip()
                return json.loads(clean_json)
        except Exception:
            pass

    # 3. Smart Rule-Based Engine (Fallback)
    metrics = extract_metrics(raw_description)
    raw_lines = [l.strip() for l in raw_description.split('\n') if l.strip()]
    if not raw_lines:
        raw_lines = [raw_description.strip()] if raw_description.strip() else ["Developed core features and resolved high-priority software issues."]

    improved = []
    verbs = STRONG_ACTION_VERBS.copy()
    
    for idx, line in enumerate(raw_lines[:4]):
        verb = verbs[idx % len(verbs)]
        clean_line = re.sub(r'^[\-\*\•\d\.]+\s*', '', line)
        injected_kw = f" leveraging {keywords[idx % len(keywords)]}" if keywords and idx < len(keywords) else ""
        line_metrics = extract_metrics(clean_line)
        metric_phrase = f" resulting in {line_metrics[0]} improvement" if line_metrics else ""
        bullet = f"{verb} {clean_line.lower()}{injected_kw}{metric_phrase} to enhance system efficiency and scalability."
        bullet = re.sub(r'\.\.', '.', bullet)
        bullet = bullet[0].upper() + bullet[1:]
        improved.append(bullet)

    return improved

def generate_summary_ai(role: str, years: str, skills: List[str], target_job_title: str = "") -> str:
    skills_str = ", ".join(skills[:5])
    
    # 1. Try OpenAI if key is present
    open_ai_key = os.getenv('OPENAI_API_KEY')
    if open_ai_key and open_ai_key.startswith('sk-'):
        try:
            from openai import OpenAI
            client = OpenAI(api_key=open_ai_key)
            prompt = f"Write a 2-3 line professional, ATS-friendly resume summary for a {role or 'Software Engineer'} with {years} experience specializing in {skills_str}. Target title: {target_job_title}. Return plain text only, no preamble."
            response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
                max_tokens=150
            )
            return response.choices[0].message.content.strip()
        except Exception:
            pass

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
    lower_r = (role or "").lower()
    if 'data' in lower_r or 'analytic' in lower_r or 'bi' in lower_r:
        return "Data Analytics Fresher with a strong foundation in Python, SQL, Excel, Power BI, and data visualization. Skilled in data cleaning, data preprocessing, exploratory data analysis (EDA), statistical analysis, and creating interactive dashboards to derive meaningful business insights. Hands-on experience working with real-world datasets and converting raw data into actionable insights. Strong analytical and problem-solving abilities with a keen interest in using data to support business decisions."

    target_phrase = f" targeting {target_job_title} positions" if target_job_title else ""
    exp_phrase = f" with {years} of experience" if years else ""
    skills_phrase = f" specializing in {skills_str}" if skills_str else ""
    
    summary = f"Results-driven {role or 'Software Engineer'}{exp_phrase}{skills_phrase}{target_phrase}. Proven track record in designing scalable architectures, optimizing workflow efficiency, and delivering robust full-stack solutions. Passionate about leveraging modern technologies to drive technical innovation and business growth."
    return summary

def extract_jd_keywords_ai(jd_text: str) -> Dict[str, Any]:
    """
    Dynamically extracts job title, hard skills, soft skills, and experience requirement
    from the actual text of ANY Job Description without hardcoded fallback hallucinations.
    """
    if not jd_text:
        return {"job_title": "Target Role", "required_skills": [], "nice_to_have_skills": [], "soft_skills": []}

    # 1. Try Gemini AI with explicit structured extraction if API key is active
    if GEMINI_API_KEY:
        try:
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
            prompt = f"""You are an ATS Keyword Extraction Bot. Extract ONLY keywords that are explicitly mentioned in this job description.
DO NOT add or hallucinate any technologies that are not present in the text.

Job Description:
{jd_text}

Return ONLY valid JSON matching this schema:
{{
  "job_title": "extracted job title or role from text",
  "required_skills": ["Skill1", "Skill2"],
  "nice_to_have_skills": ["SkillA"],
  "soft_skills": ["SoftSkill1"],
  "min_experience_years": "5"
}}"""
            payload = {"contents": [{"parts": [{"text": prompt}]}]}
            res = requests.post(url, json=payload, timeout=8)
            if res.status_code == 200:
                text = res.json()['candidates'][0]['content']['parts'][0]['text']
                clean_json = re.sub(r'```json\s*|\s*```', '', text).strip()
                parsed = json.loads(clean_json)
                if isinstance(parsed, dict) and (parsed.get("required_skills") or parsed.get("nice_to_have_skills")):
                    return parsed
        except Exception:
            pass

    # 2. High-Precision Real NLP Extractor (Strictly extracts actual keywords found in the JD text)
    TECH_CATALOG = [
        # Languages
        "Python", "Java", "JavaScript", "TypeScript", "C++", "C#", "Go", "Rust", "PHP", "Ruby", "SQL", "R", "Dart", "Kotlin", "Swift", "Scala", "Bash", "Shell",
        # Frameworks & Backend
        "Django", "Flask", "FastAPI", "Spring Boot", "Spring", "Hibernate", "Node.js", "Express", "Express.js", "NestJS", "ASP.NET", "Laravel", "Ruby on Rails",
        # Frontend
        "React", "React.js", "Angular", "Vue", "Vue.js", "Next.js", "Nuxt.js", "HTML", "HTML5", "CSS", "CSS3", "Tailwind CSS", "Bootstrap", "Redux", "GraphQL", "REST API", "RESTful", "REST",
        # Databases & Storage
        "PostgreSQL", "MySQL", "MongoDB", "Redis", "Oracle", "Cassandra", "DynamoDB", "SQLite", "Elasticsearch", "SQL Server", "MariaDB",
        # Cloud & DevOps
        "AWS", "Azure", "GCP", "Cloud", "Docker", "Kubernetes", "CI/CD", "Git", "GitHub", "GitLab", "Terraform", "Jenkins", "Ansible", "Linux", "Microservices", "Kafka", "RabbitMQ", "Celery",
        # Data & AI
        "Pandas", "NumPy", "Power BI", "Tableau", "Excel", "Data Analysis", "EDA", "ETL", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "Scikit-Learn", "NLP", "Computer Vision",
        # Testing & QA
        "Selenium", "PyTest", "JUnit", "Postman", "Swagger", "Jira", "Unit Testing", "TestNG", "Cypress"
    ]

    SOFT_SKILLS_CATALOG = [
        "Leadership", "Communication", "Problem Solving", "Agile", "Scrum", "Teamwork", "Collaboration", "Mentoring", "SME", "Analytical Thinking", "Critical Thinking", "Project Management"
    ]

    # Find ALL skills that ACTUALLY appear in the text
    found_tech = []
    for tech in TECH_CATALOG:
        escaped = re.escape(tech)
        pattern = r'(?<![a-zA-Z0-9])' + escaped + r'(?![a-zA-Z0-9])'
        if re.search(pattern, jd_text, re.IGNORECASE):
            if not any(tech.lower() == existing.lower() for existing in found_tech):
                found_tech.append(tech)

    found_soft = []
    for soft in SOFT_SKILLS_CATALOG:
        pattern = r'(?<![a-zA-Z0-9])' + re.escape(soft) + r'(?![a-zA-Z0-9])'
        if re.search(pattern, jd_text, re.IGNORECASE):
            found_soft.append(soft)

    # 3. Dynamic Job Title Detection from text
    job_title = ""
    role_match = re.search(r'(?:Project\s*Role|Job\s*Title|Role|Position)\s*[:\-]\s*([A-Za-z0-9\s/]+)', jd_text, re.IGNORECASE)
    if role_match:
        job_title = role_match.group(1).split('\n')[0].strip()
    
    if not job_title:
        title_match = re.search(r'(Senior|Junior|Lead|Principal|Full Stack|Backend|Frontend|Software|Data|DevOps|QA|Cloud|Security)?\s*(Developer|Engineer|Architect|Data Scientist|Analyst|Consultant|Specialist)', jd_text, re.I)
        job_title = title_match.group(0) if title_match else "Software Engineer"

    # 4. Check for Experience requirement (e.g., "5 years of experience")
    exp_match = re.search(r'(\d+)\+?\s*years?(?:\s*of)?\s*experience', jd_text, re.IGNORECASE)
    min_exp = exp_match.group(1) if exp_match else None

    # Separate into primary required vs secondary
    must_have_skills = []
    must_have_match = re.search(r'Must\s*(?:to\s*)?have\s*skills?\s*[:\-]?\s*([^\n]+)', jd_text, re.IGNORECASE)
    if must_have_match:
        must_text = must_have_match.group(1)
        for t in found_tech:
            if re.search(r'\b' + re.escape(t) + r'\b', must_text, re.I):
                must_have_skills.append(t)

    if not must_have_skills:
        must_have_skills = found_tech
        nice_have_skills = []
    else:
        nice_have_skills = [t for t in found_tech if t not in must_have_skills]

    return {
        "job_title": job_title,
        "required_skills": must_have_skills if must_have_skills else found_tech,
        "nice_to_have_skills": nice_have_skills,
        "soft_skills": found_soft,
        "min_experience_years": min_exp
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
    is_fresher = experience_level.strip().lower() in ['fresher', '0', '0 yrs', '0 years', '0+ years', 'none']

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
            "experience": [] if is_fresher else [
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
            "summary": "Motivated Java Full Stack Developer with strong foundations in Core Java, Object-Oriented Programming (OOP), Data Structures & Algorithms, and Spring Boot. Hands-on experience building full-stack web applications with Spring Boot REST APIs and modern React frontends. Solved 400+ DSA problems and eager to contribute to enterprise-scale applications." if is_fresher else f"High-performing Java Full Stack Engineer with {experience_level} experience engineering enterprise software with Java 17, Spring Boot, Microservices, Angular/React, and MySQL.",
            "skills": [
                {"category": "Languages", "skill_name": "Java (Core, OOP, Collections, Streams, Multithreading), JavaScript, TypeScript"},
                {"category": "Backend & Frameworks", "skill_name": "Spring Boot, Spring MVC, Spring Security, Spring Cloud, Hibernate / JPA, RESTful Web Services"},
                {"category": "Frontend", "skill_name": "React.js, Next.js, HTML5, CSS3, Bootstrap, Tailwind CSS"},
                {"category": "Databases", "skill_name": "MySQL, PostgreSQL, Oracle DB, MongoDB, Redis"},
                {"category": "Messaging & DevOps", "skill_name": "Apache Kafka, Docker, Kubernetes, Jenkins, Git, GitHub, Maven"},
                {"category": "Testing & Tools", "skill_name": "JUnit 5, Mockito, Postman, Swagger / OpenAPI, IntelliJ IDEA, VS Code"},
                {"category": "CS Fundamentals", "skill_name": "Microservices Architecture, Design Patterns, DBMS, Computer Networks, DSA (400+ Solved), Agile / Scrum"},
                {"category": "Soft Skills", "skill_name": "Strong Communication, Technical Documentation, System Design, Team Collaboration"}
            ],
            "experience": [] if is_fresher else [
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
            "summary": "Data Analytics Fresher with a strong foundation in Python, SQL, Excel, Power BI, and data visualization. Skilled in data cleaning, data preprocessing, exploratory data analysis (EDA), statistical analysis, and creating interactive dashboards to derive meaningful business insights. Hands-on experience working with real-world datasets and converting raw data into actionable insights. Strong analytical and problem-solving abilities with a keen interest in using data to support business decisions." if is_fresher else f"Senior Data Analyst with {experience_level} experience in business intelligence, advanced SQL data warehousing, predictive analytics, and executive Power BI dashboards.",
            "skills": [
                {"category": "Languages & Core", "skill_name": "Python (Pandas, NumPy, Matplotlib, Seaborn), SQL, Advanced Excel (VLOOKUP, XLOOKUP, Pivot Tables, Macros)"},
                {"category": "BI & Data Visualization", "skill_name": "Power BI (DAX, Data Modeling, Interactive Dashboards), Tableau"},
                {"category": "Data Analysis & Preprocessing", "skill_name": "Data Cleaning, Data Preprocessing, Exploratory Data Analysis (EDA), Statistical Analysis"},
                {"category": "Databases", "skill_name": "MySQL, PostgreSQL"},
                {"category": "Development Tools & DevOps", "skill_name": "Jupyter Notebook, VS Code, Git, GitHub, Power Query, ETL Pipelines"},
                {"category": "Soft Skills", "skill_name": "Data Storytelling, Dashboard Design, Business Insight Generation, Problem Solving, Analytical Thinking, Team Collaboration"}
            ],
            "experience": [] if is_fresher else [
                {
                    "company": "Analytics Insights Inc",
                    "role": "Data Analyst",
                    "start_date": "Mar 2022",
                    "end_date": "Present",
                    "is_current": True,
                    "bullets": [
                        "Designed interactive Power BI & Tableau executive dashboards, reducing monthly reporting preparation time by 60%.",
                        "Wrote complex SQL queries and window functions to extract metrics and build analytical datasets.",
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
                    "name": "E-Commerce Sales & Customer Analytics",
                    "description": "Analyzed sales and customer data to identify revenue trends, top-performing products, customer segments, and business growth opportunities using interactive Power BI dashboards.",
                    "bullets": [
                        "Analyzed sales and customer data to identify revenue trends, top-performing products, customer segments, and business growth opportunities using interactive Power BI dashboards."
                    ],
                    "tech_stack": ["Python", "SQL", "Power BI", "Excel"],
                    "link": "https://github.com/analyst/ecommerce-sales-analytics"
                },
                {
                    "name": "Employee HR Analytics & Attrition Analysis",
                    "description": "Analyzed employee data to identify attrition patterns, salary trends, department performance, and key factors influencing employee turnover through data-driven dashboards.",
                    "bullets": [
                        "Analyzed employee data to identify attrition patterns, salary trends, department performance, and key factors influencing employee turnover through data-driven dashboards."
                    ],
                    "tech_stack": ["Python", "SQL", "Power BI", "Excel"],
                    "link": "https://github.com/analyst/employee-hr-attrition-analytics"
                }
            ]
        }

    elif 'mern' in lower_role or 'react' in lower_role or 'node' in lower_role:
        return {
            "target_job_title": "MERN Stack Developer",
            "summary": "MERN Stack Developer with solid fundamentals in MongoDB, Express.js, React.js, and Node.js. Skilled in developing responsive user interfaces, designing RESTful APIs, and implementing JWT authentication. Strong problem-solving abilities with experience building full-stack web applications." if is_fresher else f"Senior MERN Stack Engineer with {experience_level} experience building high-scale Single Page Applications with Next.js, React, Node.js, and MongoDB.",
            "skills": [
                {"category": "Frontend", "skill_name": "React.js, Next.js, Redux Toolkit, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS"},
                {"category": "Backend & APIs", "skill_name": "Node.js, Express.js, RESTful APIs, GraphQL, JWT Authentication"},
                {"category": "Databases", "skill_name": "MongoDB, Mongoose, PostgreSQL, Redis"},
                {"category": "Tools & DevOps", "skill_name": "Git, GitHub, Docker, Postman, Vercel, AWS EC2"},
                {"category": "Soft Skills", "skill_name": "Agile / Scrum, Problem Solving, Code Review, Team Collaboration"}
            ],
            "experience": [] if is_fresher else [
                {
                    "company": "CloudScale Web Labs",
                    "role": "MERN Stack Developer",
                    "start_date": "Jan 2022",
                    "end_date": "Present",
                    "is_current": True,
                    "bullets": [
                        "Architected full-stack React-Node web platforms handling 50k+ daily transactions with 99.9% uptime.",
                        "Optimized MongoDB indexing and aggregation queries, improving API throughput by 45%."
                    ]
                }
            ],
            "projects": [
                {
                    "name": "E-Commerce Realtime Marketplace",
                    "description": "Full-featured shopping platform with product search, cart state management, Stripe payment processing, and admin order tracking dashboard.",
                    "bullets": [
                        "Built responsive e-commerce web platform with React.js, Redux Toolkit, and Tailwind CSS.",
                        "Engineered Express.js REST APIs with MongoDB schemas and integrated Stripe payment gateway."
                    ],
                    "tech_stack": ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API"],
                    "link": "https://github.com/developer/mern-ecommerce"
                },
                {
                    "name": "Real-Time Collaborative Task Board",
                    "description": "Kanban-style project management app with Socket.io real-time updates, drag-and-drop cards, and role-based permissions.",
                    "bullets": [
                        "Implemented real-time bidirectional events using Socket.io and Express server.",
                        "Designed secure JWT authentication and role-based access control."
                    ],
                    "tech_stack": ["React", "Node.js", "Socket.io", "MongoDB"],
                    "link": "https://github.com/developer/task-board"
                }
            ]
        }

    elif 'science' in lower_role or 'machine learning' in lower_role or 'ml' in lower_role or 'ai' in lower_role:
        return {
            "target_job_title": "Data Scientist & ML Engineer",
            "summary": "Aspiring Data Scientist with strong expertise in Python, Machine Learning algorithms, statistical modeling, and data visualization. Hands-on experience building predictive models using Scikit-Learn, Pandas, and TensorFlow." if is_fresher else f"Data Scientist with {experience_level} experience deploying predictive ML models, deep learning architectures, and automated data pipelines.",
            "skills": [
                {"category": "Programming & Libraries", "skill_name": "Python, R, SQL, Pandas, NumPy, Scikit-Learn, TensorFlow, PyTorch"},
                {"category": "ML & Analytics", "skill_name": "Supervised & Unsupervised Learning, Regression, Classification, NLP, Time Series Analysis, EDA"},
                {"category": "Data Viz & BI", "skill_name": "Matplotlib, Seaborn, Tableau, Power BI"},
                {"category": "Big Data & Tools", "skill_name": "Jupyter, Git, Docker, Apache Spark, MLflow"},
                {"category": "Soft Skills", "skill_name": "Hypothesis Testing, Statistical Reasoning, Business Storytelling"}
            ],
            "experience": [] if is_fresher else [
                {
                    "company": "Neural Analytics Corp",
                    "role": "Data Scientist",
                    "start_date": "Feb 2022",
                    "end_date": "Present",
                    "is_current": True,
                    "bullets": [
                        "Engineered gradient-boosted ML pipelines achieving 92% classification accuracy on customer churn prediction.",
                        "Collaborated with data engineers to deploy real-time inference microservices with Docker and FastAPI."
                    ]
                }
            ],
            "projects": [
                {
                    "name": "Predictive Customer Churn Model",
                    "description": "Trained XGBoost and Random Forest classifiers on 100k+ customer records to predict churn probability with 91.5% ROC-AUC score.",
                    "bullets": [
                        "Performed extensive EDA, feature engineering, and hyperparameter tuning using Optuna.",
                        "Built an interactive Streamlit web dashboard for marketing stakeholders to simulate churn risk."
                    ],
                    "tech_stack": ["Python", "Scikit-Learn", "XGBoost", "Pandas", "Streamlit"],
                    "link": "https://github.com/developer/churn-prediction"
                },
                {
                    "name": "Financial Market Sentiment Analysis (NLP)",
                    "description": "Fine-tuned BERT transformer model on financial news headlines to classify market sentiment with 88% precision.",
                    "bullets": [
                        "Extracted and preprocessed news feed text using NLTK and HuggingFace Transformers.",
                        "Deployed Flask REST API returning sentiment polarity scores in sub-50ms latency."
                    ],
                    "tech_stack": ["Python", "PyTorch", "HuggingFace", "BERT", "Flask"],
                    "link": "https://github.com/developer/nlp-sentiment-analysis"
                }
            ]
        }

    elif 'devops' in lower_role or 'cloud' in lower_role or 'aws' in lower_role:
        return {
            "target_job_title": "DevOps & Cloud Engineer",
            "summary": "DevOps Engineer with strong expertise in Linux administration, Docker containerization, CI/CD automation with GitHub Actions / Jenkins, and AWS cloud infrastructure management." if is_fresher else f"Senior DevOps & Cloud Engineer with {experience_level} experience architecting Kubernetes clusters, Terraform infrastructure, and robust CI/CD pipelines.",
            "skills": [
                {"category": "Cloud Platforms", "skill_name": "AWS (EC2, S3, RDS, ECS, Lambda, IAM, VPC), Azure"},
                {"category": "Containerization & Orchestration", "skill_name": "Docker, Kubernetes, Helm"},
                {"category": "CI/CD & Automation", "skill_name": "GitHub Actions, Jenkins, GitLab CI"},
                {"category": "Infrastructure as Code", "skill_name": "Terraform, Ansible"},
                {"category": "Monitoring & Scripting", "skill_name": "Prometheus, Grafana, Bash, Python, Linux Administration"}
            ],
            "experience": [] if is_fresher else [
                {
                    "company": "CloudMatrix Systems",
                    "role": "DevOps Engineer",
                    "start_date": "Jan 2022",
                    "end_date": "Present",
                    "is_current": True,
                    "bullets": [
                        "Automated multi-environment infrastructure provisioning with Terraform and AWS, cutting setup time from 3 days to 20 minutes.",
                        "Implemented Kubernetes cluster autoscaling and Prometheus monitoring, maintaining 99.95% system reliability."
                    ]
                }
            ],
            "projects": [
                {
                    "name": "Automated Multi-Stage CI/CD Pipeline",
                    "description": "Production-grade automated pipeline with linting, unit testing, Docker image building, security scanning, and automated deployment to AWS ECS.",
                    "bullets": [
                        "Designed GitHub Actions workflows with zero-downtime rolling deployment strategies.",
                        "Integrated Trivy vulnerability scanning into pipeline steps."
                    ],
                    "tech_stack": ["GitHub Actions", "Docker", "AWS ECS", "Terraform", "Bash"],
                    "link": "https://github.com/developer/devops-cicd-pipeline"
                },
                {
                    "name": "High-Availability Kubernetes Cluster Setup",
                    "description": "Configured scalable microservices cluster with Ingress controllers, TLS certificates, and centralized Prometheus/Grafana logging.",
                    "bullets": [
                        "Configured Horizontal Pod Autoscaler (HPA) and resource limits to prevent pod OOM crashes.",
                        "Wrote reusable Helm charts for swift application rollouts."
                    ],
                    "tech_stack": ["Kubernetes", "Helm", "Prometheus", "Grafana", "Linux"],
                    "link": "https://github.com/developer/k8s-cluster"
                }
            ]
        }

    elif 'cyber' in lower_role or 'security' in lower_role or 'soc' in lower_role:
        return {
            "target_job_title": "Cyber Security Analyst",
            "summary": "Cyber Security Analyst with knowledge of network security, threat detection, vulnerability assessment, SIEM tools, and security incident response. Committed to safeguarding enterprise assets." if is_fresher else f"Information Security Analyst with {experience_level} experience in vulnerability management, SOC monitoring (Splunk/QRadar), and penetration testing.",
            "skills": [
                {"category": "Security & SIEM", "skill_name": "Splunk, Wireshark, Nmap, Burp Suite, Metasploit, Nessus"},
                {"category": "Network & Protocols", "skill_name": "TCP/IP, Firewalls, VPNs, IDS/IPS, DNS, SSL/TLS"},
                {"category": "Compliance & Frameworks", "skill_name": "OWASP Top 10, NIST, ISO 27001, MITRE ATT&CK"},
                {"category": "Scripting & OS", "skill_name": "Python, Bash, Kali Linux, Windows Server"}
            ],
            "experience": [] if is_fresher else [
                {
                    "company": "SecureGuard Cyber Labs",
                    "role": "SOC Analyst",
                    "start_date": "Feb 2022",
                    "end_date": "Present",
                    "is_current": True,
                    "bullets": [
                        "Monitored 24/7 SIEM alerts using Splunk, triaging over 100+ daily security events and mitigating false positives.",
                        "Performed regular vulnerability assessments using Nessus and coordinated remediation across DevOps teams."
                    ]
                }
            ],
            "projects": [
                {
                    "name": "Network Intrusion & Log Analysis System",
                    "description": "Configured Snort IDS and automated log ingestion into Splunk to detect port scans, DDoS attempts, and malware traffic in real-time.",
                    "bullets": [
                        "Wrote custom Snort detection rules for emerging network threats.",
                        "Created interactive Splunk dashboards for executive incident reports."
                    ],
                    "tech_stack": ["Splunk", "Snort IDS", "Wireshark", "Linux", "Python"],
                    "link": "https://github.com/developer/ids-splunk-monitoring"
                }
            ]
        }

    elif 'qa' in lower_role or 'test' in lower_role or 'automation' in lower_role:
        return {
            "target_job_title": "QA Automation Engineer",
            "summary": "QA Automation Engineer skilled in Selenium WebDriver, Python/Java, TestNG, REST API testing with Postman, and CI/CD integration. Passionate about software reliability and test automation." if is_fresher else f"QA Lead & Automation Engineer with {experience_level} experience building hybrid automation frameworks (Selenium/Playwright) and API testing suites.",
            "skills": [
                {"category": "Automation Tools", "skill_name": "Selenium WebDriver, Playwright, Cypress, Postman, RestAssured"},
                {"category": "Languages & Frameworks", "skill_name": "Python (PyTest), Java (TestNG, JUnit), Cucumber (BDD)"},
                {"category": "Methodologies & Tools", "skill_name": "Manual Testing, Regression Testing, JIRA, Git, Jenkins, SQL"},
                {"category": "Soft Skills", "skill_name": "Defect Reporting, Test Case Authoring, Cross-Functional Collaboration"}
            ],
            "experience": [] if is_fresher else [
                {
                    "company": "QualityCraft Technologies",
                    "role": "QA Automation Engineer",
                    "start_date": "Jan 2022",
                    "end_date": "Present",
                    "is_current": True,
                    "bullets": [
                        "Built end-to-end regression automation suite with Selenium and PyTest, reducing manual regression testing time by 75%.",
                        "Integrated automated test runs into Jenkins CI/CD pipeline triggering on every pull request."
                    ]
                }
            ],
            "projects": [
                {
                    "name": "Hybrid Web & API Test Automation Framework",
                    "description": "Developed a modular Page Object Model (POM) automation framework with automated HTML reporting and parallel test execution.",
                    "bullets": [
                        "Automated 200+ test cases covering critical customer checkout and login flows.",
                        "Implemented REST API verification tests using Postman and Newman."
                    ],
                    "tech_stack": ["Selenium WebDriver", "Python", "PyTest", "Postman", "Jenkins"],
                    "link": "https://github.com/developer/qa-automation-framework"
                }
            ]
        }

    elif 'ui' in lower_role or 'ux' in lower_role or 'design' in lower_role:
        return {
            "target_job_title": "UI/UX & Product Designer",
            "summary": "Creative UI/UX Designer with a strong portfolio of user-centered design projects, wireframes, interactive prototypes, and modern design systems using Figma." if is_fresher else f"Senior Product Designer with {experience_level} experience delivering responsive web/mobile interfaces, user research, and comprehensive design systems.",
            "skills": [
                {"category": "Design Tools", "skill_name": "Figma, Adobe XD, Photoshop, Illustrator"},
                {"category": "UX & Research", "skill_name": "User Personas, Journey Mapping, Wireframing, Interactive Prototyping, Usability Testing"},
                {"category": "Design Systems", "skill_name": "Component Libraries, Typography, Color Theory, Responsive Layouts"},
                {"category": "Collaboration", "skill_name": "Design Handoff, Zeplin, Agile / Scrum, HTML/CSS Basics"}
            ],
            "experience": [] if is_fresher else [
                {
                    "company": "PixelCraft Design Studio",
                    "role": "UI/UX Designer",
                    "start_date": "Mar 2022",
                    "end_date": "Present",
                    "is_current": True,
                    "bullets": [
                        "Redesigned SaaS web application dashboard, increasing task completion rate by 28% and user satisfaction score by 35%.",
                        "Created comprehensive Figma design system with 150+ reusable components and variants."
                    ]
                }
            ],
            "projects": [
                {
                    "name": "Fintech Mobile Banking App UI/UX Case Study",
                    "description": "End-to-end design case study featuring user research, wireframing, high-fidelity prototypes, and usability testing for smart budgeting.",
                    "bullets": [
                        "Conducted 15+ user interviews to identify onboarding friction points.",
                        "Built high-fidelity clickable prototype in Figma with smooth micro-interactions."
                    ],
                    "tech_stack": ["Figma", "User Research", "Prototyping", "Design Systems"],
                    "link": "https://figma.com/@designer/fintech-app"
                }
            ]
        }

    else:
        return {
            "target_job_title": clean_role,
            "summary": f"Dedicated and results-oriented {clean_role} with {experience_level} experience driving technical solutions, workflow optimization, and high-impact deliverables. Adept at cross-functional team collaboration, problem solving, and modern industry standards.",
            "skills": [
                {"category": "Core & Role Specialization", "skill_name": f"{clean_role}, System Architecture, Core Methodologies"},
                {"category": "Frameworks & Technical Tools", "skill_name": "REST APIs, Database Management, Git, GitHub, Cloud Basics"},
                {"category": "Industry Best Practices", "skill_name": "Agile / Scrum, SDLC, Code Reviews, Process Optimization"},
                {"category": "Soft Skills", "skill_name": "Analytical Thinking, Problem Solving, Cross-Functional Collaboration, Documentation"}
            ],
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


