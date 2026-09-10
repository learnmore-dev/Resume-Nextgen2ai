"""
Master ATS Engine Orchestrator
Coordinates parsing, entity extraction, requirement matching, metrics evaluation,
action verb checks, deterministic scoring, and structured reporting.
"""
from typing import Dict, Any, List
from .extractor import extract_entities_from_text
from .matcher import categorize_and_match_keywords
from .scorer import compute_ats_score, ATS_WEIGHTS
from .metrics import evaluate_bullet_metrics
from .verbs import analyze_action_verbs
from .titles import calculate_job_title_alignment
from .formatting import evaluate_section_health, evaluate_ats_formatting
from .openai_service import semantic_explain_match

def analyze_resume_data(raw_resume_text: str, jd_text: str, candidate_roles: List[str] = None, candidate_skills: List[str] = None, candidate_bullets: List[str] = None, resume_obj = None) -> Dict[str, Any]:
    """
    Main entrypoint for both built resumes and uploaded external PDF/DOCX resumes.
    """
    # 1. Extract Entities
    if not candidate_skills:
        extracted_res = extract_entities_from_text(raw_resume_text)
        candidate_skills = extracted_res["skills"]
    if not candidate_roles:
        extracted_res = extract_entities_from_text(raw_resume_text)
        candidate_roles = [extracted_res["title"]]
    if candidate_bullets is None:
        candidate_bullets = [line.strip() for line in raw_resume_text.split('\n') if len(line.strip()) > 20 and not line.strip().endswith(':')]

    jd_entities = extract_entities_from_text(jd_text)
    jd_skills = jd_entities["skills"]
    jd_soft_skills = jd_entities["soft_skills"]
    target_title = jd_entities["title"]

    # 2. Match Skills & Keywords
    match_result = categorize_and_match_keywords(raw_resume_text, candidate_skills, jd_skills, jd_soft_skills)

    # 3. Job Title & Seniority Alignment
    title_eval = calculate_job_title_alignment(target_title, candidate_roles)

    # 4. Quantifiable Impact & Metrics
    metrics_eval = evaluate_bullet_metrics(candidate_bullets)

    # 5. Action Verbs Strength
    verbs_eval = analyze_action_verbs(candidate_bullets)

    # 6. Section Health & Formatting
    section_eval = evaluate_section_health(raw_resume_text, resume_obj)
    fmt_eval = evaluate_ats_formatting(raw_resume_text)

    # 7. Compute Deterministic 100% Weighted Score
    breakdown = {
        "hard_skills": match_result["hard_skills_score"],
        "soft_skills": match_result["soft_skills_score"],
        "title_alignment": title_eval["score"],
        "impact_metrics": metrics_eval["score"],
        "action_verbs": verbs_eval["score"],
        "section_health": section_eval["score"],
        "formatting": fmt_eval["score"]
    }

    score_result = compute_ats_score(breakdown)

    # 8. Actionable Advice
    ai_suggestions = semantic_explain_match(match_result["missing_keywords"], jd_text, raw_resume_text[:400])

    return {
        "overall_score": score_result["overall_score"],
        "status_label": score_result["status_label"],
        "status_color": score_result["status_color"],
        "breakdown": score_result["breakdown"],
        "weights": ATS_WEIGHTS,
        "matched_keywords": match_result["matched_keywords"],
        "missing_keywords": match_result["missing_keywords"],
        "all_missing": match_result["all_missing_flat"],
        "metrics": {
            "total_bullets": metrics_eval["total_bullets"],
            "quantified_bullets": metrics_eval["quantified_count"],
            "ratio_percent": metrics_eval["ratio_percent"],
            "score": metrics_eval["score"]
        },
        "action_verbs": {
            "strong_count": verbs_eval["strong_count"],
            "weak_count": verbs_eval["weak_count"],
            "score": verbs_eval["score"],
            "weak_bullets": verbs_eval["weak_bullets"][:3]
        },
        "title_alignment": title_eval,
        "section_health": section_eval,
        "formatting": fmt_eval,
        "suggestions": ai_suggestions
    }

def analyze_resume(resume_obj, job_description_obj) -> Dict[str, Any]:
    """
    Adapter for existing built Resume models.
    """
    resume_text_parts = []
    all_bullets = []
    candidate_roles = []
    candidate_skills = []

    if hasattr(resume_obj, 'personal_info') and resume_obj.personal_info:
        p = resume_obj.personal_info
        resume_text_parts.extend([p.full_name, p.summary, p.location])

    if hasattr(resume_obj, 'experience'):
        for exp in resume_obj.experience.all():
            candidate_roles.append(exp.role)
            resume_text_parts.extend([exp.company, exp.role, exp.raw_description])
            if exp.bullets:
                resume_text_parts.extend(exp.bullets)
                all_bullets.extend(exp.bullets)

    if hasattr(resume_obj, 'skills'):
        candidate_skills = [s.skill_name for s in resume_obj.skills.all()]
        resume_text_parts.extend(candidate_skills)

    if hasattr(resume_obj, 'education'):
        for ed in resume_obj.education.all():
            resume_text_parts.extend([ed.institution, ed.degree, ed.field_of_study])

    if hasattr(resume_obj, 'projects'):
        for proj in resume_obj.projects.all():
            resume_text_parts.extend([proj.name, proj.description])
            if proj.tech_stack:
                if isinstance(proj.tech_stack, list):
                    resume_text_parts.extend(proj.tech_stack)
                else:
                    resume_text_parts.append(str(proj.tech_stack))
            if proj.bullets:
                resume_text_parts.extend(proj.bullets)
                all_bullets.extend(proj.bullets)

    full_resume_text = " ".join(filter(None, resume_text_parts))
    jd_raw = job_description_obj.raw_text or ""

    return analyze_resume_data(
        raw_resume_text=full_resume_text,
        jd_text=jd_raw,
        candidate_roles=candidate_roles,
        candidate_skills=candidate_skills,
        candidate_bullets=all_bullets,
        resume_obj=resume_obj
    )
