import re
from typing import Dict, List, Set, Any

WEIGHTS = {
    "keyword_match": 0.30,
    "skills_match": 0.25,
    "job_title_match": 0.10,
    "experience_relevance": 0.15,
    "education": 0.05,
    "structure": 0.10,
    "formatting": 0.05,
}

def clean_token(text: str) -> str:
    return re.sub(r'[^a-zA-Z0-9\+\#]', '', text).lower()

def extract_tokens(text: str) -> Set[str]:
    if not text:
        return set()
    words = re.findall(r'\b[A-Za-z0-9\+\#\.\-]+\b', text)
    return {clean_token(w) for w in words if len(w) > 1}

def calculate_keyword_match(resume_text: str, jd_keywords: List[str]) -> tuple[float, List[str], List[str]]:
    if not jd_keywords:
        return 100.0, [], []
    
    resume_tokens = extract_tokens(resume_text)
    matched = []
    missing = []
    
    for kw in jd_keywords:
        kw_tokens = extract_tokens(kw)
        if kw_tokens and kw_tokens.issubset(resume_tokens):
            matched.append(kw)
        elif clean_token(kw) in resume_tokens:
            matched.append(kw)
        elif any(clean_token(kw) in t for t in resume_tokens):
            matched.append(kw)
        else:
            missing.append(kw)
            
    score = round((len(matched) / len(jd_keywords)) * 100.0, 2)
    return min(score, 100.0), matched, missing

def calculate_skills_match(resume_skills: List[str], jd_skills: List[str]) -> float:
    if not jd_skills:
        return 100.0
    if not resume_skills:
        return 0.0
    
    res_set = {clean_token(s) for s in resume_skills if s}
    matched_count = 0
    for s in jd_skills:
        tok = clean_token(s)
        if tok in res_set or any(tok in r for r in res_set):
            matched_count += 1
            
    return round(min((matched_count / len(jd_skills)) * 100.0, 100.0), 2)

def calculate_job_title_match(target_title: str, candidate_roles: List[str]) -> float:
    if not target_title:
        return 100.0
    if not candidate_roles:
        return 20.0
    
    target_tokens = extract_tokens(target_title)
    max_score = 0.0
    
    for role in candidate_roles:
        role_tokens = extract_tokens(role)
        if not role_tokens:
            continue
        intersection = target_tokens & role_tokens
        score = (len(intersection) / max(len(target_tokens), 1)) * 100.0
        if score > max_score:
            max_score = score
            
    return round(max_score, 2)

def calculate_structure_score(resume_obj) -> float:
    score = 0.0
    # Has personal info
    if hasattr(resume_obj, 'personal_info') and resume_obj.personal_info.full_name:
        score += 20.0
    # Has experience
    if resume_obj.experience.exists():
        score += 30.0
    # Has education
    if resume_obj.education.exists():
        score += 20.0
    # Has skills
    if resume_obj.skills.exists():
        score += 20.0
    # Has summary
    if hasattr(resume_obj, 'personal_info') and resume_obj.personal_info.summary:
        score += 10.0
        
    return min(score, 100.0)

def calculate_formatting_score(resume_obj) -> float:
    score = 100.0
    # Penalize empty bullets or missing dates
    for exp in resume_obj.experience.all():
        if not exp.bullets or len(exp.bullets) == 0:
            score -= 10
        if not exp.start_date:
            score -= 5
    return max(score, 40.0)

def generate_suggestions(missing_keywords: List[str], scores: Dict[str, float]) -> List[str]:
    suggestions = []
    
    if missing_keywords:
        top_missing = ", ".join(missing_keywords[:5])
        suggestions.append(f"Incorporate key missing keywords into your experience bullet points: {top_missing}.")
        
    if scores.get("job_title_match", 0) < 70:
        suggestions.append("Align your target role or experience position titles closer to the job description title.")
        
    if scores.get("skills_match", 0) < 60:
        suggestions.append("Add missing core technical skills explicitly in your Skills section.")
        
    if scores.get("structure", 0) < 90:
        suggestions.append("Ensure all major sections (Professional Summary, Experience, Education, Skills) are populated.")
        
    if not suggestions:
        suggestions.append("Great job! Your resume aligns very well with this job description.")
        
    return suggestions

def analyze_resume(resume_obj, job_description_obj) -> Dict[str, Any]:
    # Gather full resume text
    resume_text_parts = []
    if hasattr(resume_obj, 'personal_info'):
        p = resume_obj.personal_info
        resume_text_parts.extend([p.full_name, p.summary, p.location])
        
    candidate_roles = []
    for exp in resume_obj.experience.all():
        candidate_roles.append(exp.role)
        resume_text_parts.extend([exp.company, exp.role, exp.raw_description])
        if exp.bullets:
            resume_text_parts.extend(exp.bullets)
            
    resume_skills = [s.skill_name for s in resume_obj.skills.all()]
    resume_text_parts.extend(resume_skills)
    
    for ed in resume_obj.education.all():
        resume_text_parts.extend([ed.institution, ed.degree, ed.field_of_study])
        
    for proj in resume_obj.projects.all():
        resume_text_parts.extend([proj.name, proj.description])
        if proj.bullets:
            resume_text_parts.extend(proj.bullets)
            
    full_resume_text = " ".join(filter(None, resume_text_parts))
    
    # Extract JD info
    jd_extracted = job_description_obj.extracted_keywords or {}
    jd_req_skills = jd_extracted.get("required_skills", [])
    jd_nice_skills = jd_extracted.get("nice_to_have_skills", [])
    all_jd_keywords = jd_req_skills + jd_nice_skills
    if not all_jd_keywords and job_description_obj.raw_text:
        # Fallback keyword extraction from JD raw text
        all_jd_keywords = list(extract_tokens(job_description_obj.raw_text))[:15]
        
    target_title = job_description_obj.title or jd_extracted.get("job_title", "")
    
    # Compute Sub-Scores
    kw_score, matched_kws, missing_kws = calculate_keyword_match(full_resume_text, all_jd_keywords)
    skills_score = calculate_skills_match(resume_skills, jd_req_skills or all_jd_keywords)
    title_score = calculate_job_title_match(target_title, candidate_roles)
    exp_rel_score = min(kw_score * 0.9 + 10.0, 100.0)
    edu_score = 100.0 if resume_obj.education.exists() else 50.0
    struct_score = calculate_structure_score(resume_obj)
    fmt_score = calculate_formatting_score(resume_obj)
    
    sub_scores = {
        "keyword_match": kw_score,
        "skills_match": skills_score,
        "job_title_match": title_score,
        "experience_relevance": exp_rel_score,
        "education": edu_score,
        "structure": struct_score,
        "formatting": fmt_score,
    }
    
    overall = sum(sub_scores[k] * WEIGHTS[k] for k in WEIGHTS)
    overall_score = round(overall, 2)
    
    suggestions = generate_suggestions(missing_kws, sub_scores)
    
    return {
        "overall_score": overall_score,
        "keyword_match_score": kw_score,
        "skills_match_score": skills_score,
        "job_title_match_score": title_score,
        "experience_relevance_score": exp_rel_score,
        "education_score": edu_score,
        "structure_score": struct_score,
        "formatting_score": fmt_score,
        "matched_keywords": matched_kws,
        "missing_keywords": missing_kws,
        "suggestions": suggestions,
    }
