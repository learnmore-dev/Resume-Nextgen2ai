"""
Entity & Section Extractor for Resumes and Job Descriptions
Extracts: Hard Skills, Soft Skills, Tools, Job Title, Dates, Education, Contact Info.
"""
import re
from typing import Dict, Any, List
from .keywords import normalize_skill, is_skill_matched

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

def extract_entities_from_text(text: str) -> Dict[str, Any]:
    """
    Extracts all technical skills, soft skills, and contact details from any raw text.
    """
    if not text:
        return {"skills": [], "soft_skills": [], "title": "Target Role", "email": None, "phone": None}

    # Extract Tech Skills
    found_tech = []
    for tech in TECH_CATALOG:
        escaped = re.escape(tech)
        pattern = r'(?<![a-zA-Z0-9])' + escaped + r'(?![a-zA-Z0-9])'
        if re.search(pattern, text, re.IGNORECASE):
            if not any(normalize_skill(tech) == normalize_skill(existing) for existing in found_tech):
                found_tech.append(tech)

    # Extract Soft Skills
    found_soft = []
    for soft in SOFT_SKILLS_CATALOG:
        pattern = r'(?<![a-zA-Z0-9])' + re.escape(soft) + r'(?![a-zA-Z0-9])'
        if re.search(pattern, text, re.IGNORECASE):
            found_soft.append(soft)

    # Extract Job Title
    job_title = ""
    role_match = re.search(r'(?:Project\s*Role|Job\s*Title|Role|Position)\s*[:\-]\s*([A-Za-z0-9\s/]+)', text, re.IGNORECASE)
    if role_match:
        job_title = role_match.group(1).split('\n')[0].strip()
    if not job_title:
        title_match = re.search(r'(Senior|Junior|Lead|Principal|Full Stack|Backend|Frontend|Software|Data|DevOps|QA|Cloud|Security)?\s*(Developer|Engineer|Architect|Data Scientist|Analyst|Consultant|Specialist)', text, re.I)
        job_title = title_match.group(0) if title_match else "Software Engineer"

    # Contact Info
    email_match = re.search(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', text)
    phone_match = re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)

    return {
        "skills": found_tech,
        "soft_skills": found_soft,
        "title": job_title,
        "email": email_match.group(0) if email_match else None,
        "phone": phone_match.group(0) if phone_match else None
    }
