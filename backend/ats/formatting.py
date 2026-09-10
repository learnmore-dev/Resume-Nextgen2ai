"""
Comprehensive ATS Readability & Section Health Checker
Evaluates: Text extraction integrity, section health, contact readability,
special character density, text density, and ATS Parseability flags.
"""
import re
from typing import Dict, Any, List

def evaluate_section_health(resume_text: str, resume_obj=None) -> Dict[str, Any]:
    """
    Evaluates presence of 6 essential resume sections.
    """
    sections = {
        "contact_info": False,
        "summary": False,
        "experience": False,
        "education": False,
        "skills": False,
        "projects": False
    }

    if resume_obj:
        if hasattr(resume_obj, 'personal_info') and resume_obj.personal_info:
            p = resume_obj.personal_info
            sections["contact_info"] = bool(p.full_name and (p.email or p.phone))
            sections["summary"] = bool(p.summary)
        if hasattr(resume_obj, 'experience'):
            sections["experience"] = resume_obj.experience.exists()
        if hasattr(resume_obj, 'education'):
            sections["education"] = resume_obj.education.exists()
        if hasattr(resume_obj, 'skills'):
            sections["skills"] = resume_obj.skills.exists()
        if hasattr(resume_obj, 'projects'):
            sections["projects"] = resume_obj.projects.exists()
    else:
        r_lower = resume_text.lower()
        has_email = bool(re.search(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', resume_text))
        has_phone = bool(re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', resume_text))
        sections["contact_info"] = (has_email or has_phone)
        sections["summary"] = bool(re.search(r'\b(summary|objective|profile|about\s*me|professional\s*summary)\b', r_lower))
        sections["experience"] = bool(re.search(r'\b(experience|work\s*experience|employment|internship)\b', r_lower))
        sections["education"] = bool(re.search(r'\b(education|bachelor|b\.tech|degree|university|college|academic)\b', r_lower))
        sections["skills"] = bool(re.search(r'\b(skills|technical\s*skills|technologies|tools|competencies)\b', r_lower))
        sections["projects"] = bool(re.search(r'\b(projects|personal\s*projects|academic\s*projects)\b', r_lower))

    present_count = sum(1 for v in sections.values() if v)
    score = round((present_count / len(sections)) * 100.0, 1)

    return {
        "score": score,
        "present_count": present_count,
        "total_sections": len(sections),
        "section_status": sections
    }

def evaluate_ats_formatting(resume_text: str, page_count: int = 1) -> Dict[str, Any]:
    """
    Comprehensive ATS readability and document health checker.
    """
    score = 100.0
    issues = []
    text_length = len(resume_text.strip())

    # 1. Text Density & Extraction Check
    if text_length < 80:
        score -= 50
        issues.append("Unreadable or blank document. Parser extracted very little text.")
    elif text_length < 250:
        score -= 20
        issues.append("Low text density. Resume content appears sparse.")

    # 2. Contact Information Readability
    has_email = bool(re.search(r'[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+', resume_text))
    has_phone = bool(re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', resume_text))
    if not (has_email and has_phone):
        score -= 10
        issues.append("Contact info (email or phone) is partially unreadable or missing.")

    # 3. Special Character & Encoding Artifacts
    special_char_count = len(re.findall(r'[^a-zA-Z0-9\s.,;:\-+\'\"()/@#%&]', resume_text))
    special_ratio = special_char_count / max(text_length, 1)
    if special_ratio > 0.08:
        score -= 15
        issues.append("High symbol/encoding artifact ratio. May contain unsupported graphic fonts.")

    # 4. Page Count & Length Health
    if page_count > 3:
        score -= 10
        issues.append(f"Resume is {page_count} pages long. Standard tech resumes should be 1-2 pages.")

    final_score = max(round(score, 1), 30.0)
    is_ats_friendly = final_score >= 75.0 and text_length >= 200

    return {
        "score": final_score,
        "is_ats_friendly": is_ats_friendly,
        "page_count": page_count,
        "text_length": text_length,
        "issues": issues
    }
