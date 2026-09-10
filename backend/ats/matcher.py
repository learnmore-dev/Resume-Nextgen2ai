"""
Smart Skill & Keyword Matcher
Features: Synonyms Handling, Categorized Missing Keywords, Logical OR Conditions.
"""
from typing import List, Dict, Any, Set
from .keywords import is_skill_matched, normalize_skill

CRITICAL_HARD_SKILLS_SET = {
    "python", "java", "javascript", "typescript", "c++", "c#", "golang",
    "react", "angular", "vue", "django", "flask", "fastapi", "spring boot", "node.js",
    "postgresql", "mysql", "mongodb", "sql", "aws", "azure", "gcp", "docker", "kubernetes"
}

def categorize_and_match_keywords(resume_text: str, candidate_skills: List[str], jd_skills: List[str], jd_soft_skills: List[str]) -> Dict[str, Any]:
    """
    Compares candidate resume against JD skills and categorizes:
    - matched_keywords
    - missing_keywords: { critical_hard_skills, tools_methodologies, soft_skills }
    """
    r_lower = resume_text.lower()
    candidate_tokens_set = {normalize_skill(s) for s in candidate_skills}
    candidate_tokens_set.update({s.lower() for s in candidate_skills})

    matched_keywords = []
    missing_critical = []
    missing_tools = []
    missing_soft = []

    # 1. Match Hard Technical Skills
    for skill in jd_skills:
        skill_norm = normalize_skill(skill)
        if is_skill_matched(skill, candidate_tokens_set) or (skill.lower() in r_lower) or (skill_norm in r_lower):
            matched_keywords.append(skill)
        else:
            if skill_norm in CRITICAL_HARD_SKILLS_SET or skill.lower() in CRITICAL_HARD_SKILLS_SET:
                missing_critical.append(skill)
            else:
                missing_tools.append(skill)

    # 2. Match Soft Skills & Methodologies
    for soft in jd_soft_skills:
        if soft.lower() in r_lower or normalize_skill(soft) in candidate_tokens_set:
            if soft not in matched_keywords:
                matched_keywords.append(soft)
        else:
            missing_soft.append(soft)

    total_jd_skills = len(jd_skills)
    hard_score = (len([s for s in matched_keywords if s in jd_skills]) / max(total_jd_skills, 1)) * 100.0 if total_jd_skills > 0 else 100.0

    total_soft = len(jd_soft_skills)
    soft_matched_count = len([s for s in matched_keywords if s in jd_soft_skills])
    soft_score = (soft_matched_count / max(total_soft, 1)) * 100.0 if total_soft > 0 else 100.0

    return {
        "hard_skills_score": round(min(hard_score, 100.0), 1),
        "soft_skills_score": round(min(soft_score, 100.0), 1),
        "matched_keywords": matched_keywords,
        "missing_keywords": {
            "critical_hard_skills": missing_critical,
            "tools_methodologies": missing_tools,
            "soft_skills": missing_soft
        },
        "all_missing_flat": missing_critical + missing_tools + missing_soft
    }
