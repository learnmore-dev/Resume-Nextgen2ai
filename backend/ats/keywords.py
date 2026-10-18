"""
ATS Keywords Normalization & Synonyms Catalog
"""
import re

SYNONYM_MAP = {
    # Languages & Core
    "python": ["py", "python3", "python 3"],
    "javascript": ["js", "ecmascript", "es6", "es6+", "vanilla js"],
    "typescript": ["ts"],
    "java": ["core java", "java 8", "java 11", "java 17", "java 21"],
    "c++": ["cpp", "c plus plus"],
    "c#": ["csharp", "c sharp", ".net"],
    "golang": ["go", "go language"],
    
    # Frameworks
    "react": ["react.js", "reactjs", "react js"],
    "django": ["django framework", "drf", "django rest framework"],
    "django rest framework": ["drf", "django rest"],
    "flask": ["flask framework"],
    "fastapi": ["fast api"],
    "spring boot": ["spring-boot", "springboot", "spring framework", "spring"],
    "node.js": ["nodejs", "node js", "node"],
    "express.js": ["express", "expressjs"],
    "next.js": ["nextjs", "next js", "next"],
    "vue.js": ["vue", "vuejs"],
    "angular": ["angular.js", "angularjs", "angular 2+"],
    
    # Databases
    "postgresql": ["postgres", "pgsql", "psql"],
    "mysql": ["my sql"],
    "mongodb": ["mongo", "nosql mongodb"],
    "redis": ["redis cache"],
    "sql server": ["mssql", "microsoft sql server"],
    
    # Cloud & DevOps
    "aws": ["amazon web services", "amazon aws"],
    "azure": ["microsoft azure", "azure cloud"],
    "gcp": ["google cloud platform", "google cloud"],
    "docker": ["docker containerization", "docker containers"],
    "kubernetes": ["k8s", "kube"],
    "ci/cd": ["cicd", "continuous integration", "continuous deployment", "github actions", "gitlab ci", "jenkins"],
    "git": ["github", "gitlab", "bitbucket", "git version control"],
    "rest api": ["restful api", "rest", "restful", "web apis", "rest apis"],
    
    # Data & Analytics
    "power bi": ["powerbi", "power-bi", "dax", "power query"],
    "tableau": ["tableau desktop"],
    "excel": ["advanced excel", "ms excel", "vlookup", "pivot tables"],
    "pandas": ["python pandas"],
    "numpy": ["python numpy"],
    "scikit-learn": ["sklearn", "scikit learn"],
    "machine learning": ["ml", "applied ml", "predictive modeling"],
    
    # Methodologies
    "agile": ["scrum", "agile/scrum", "kanban", "sprint planning"],
    "unit testing": ["pytest", "junit", "jest", "unittest", "test automation"]
}

def clean_token(text: str) -> str:
    """Removes non-alphanumeric characters while preserving special tech symbols like +, #, ."""
    return re.sub(r'[^a-zA-Z0-9\+\#\.]', '', text).lower()

def normalize_skill(skill_name: str) -> str:
    """Normalizes skill name to its canonical form using the synonym map."""
    cleaned = skill_name.strip().lower()
    for canonical, synonyms in SYNONYM_MAP.items():
        if cleaned == canonical or cleaned in synonyms:
            return canonical
    return cleaned

def is_skill_matched(required_skill: str, candidate_text_or_skills: set) -> bool:
    """Checks if a required skill or any of its known synonyms exists in candidate data."""
    canon_req = normalize_skill(required_skill)
    req_synonyms = SYNONYM_MAP.get(canon_req, []) + [canon_req, required_skill.lower()]
    
    for syn in req_synonyms:
        syn_clean = clean_token(syn)
        if syn in candidate_text_or_skills or syn_clean in candidate_text_or_skills:
            return True
        for cand in candidate_text_or_skills:
            if syn in cand or syn_clean in cand:
                return True
    return False
