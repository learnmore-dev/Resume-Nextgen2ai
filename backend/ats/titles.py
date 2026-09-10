"""
Job Title & Seniority Gap Analyzer
"""
import re
from typing import List, Dict, Any

def extract_title_and_seniority(text: str) -> Dict[str, Any]:
    """Extracts base role and seniority level from title text."""
    clean = text.strip()
    seniority = "Mid"
    if re.search(r'\b(senior|sr|lead|principal|staff|architect|sme)\b', clean, re.IGNORECASE):
        seniority = "Senior / SME"
    elif re.search(r'\b(junior|jr|intern|internship|trainee|associate|entry)\b', clean, re.IGNORECASE):
        seniority = "Entry-Level / Intern"

    return {
        "raw_title": clean,
        "seniority": seniority
    }

def calculate_job_title_alignment(target_title: str, candidate_roles: List[str]) -> Dict[str, Any]:
    """
    Computes title match score and detects seniority mismatches.
    """
    if not target_title:
        return {"score": 100.0, "match_label": "Standard Alignment", "seniority_mismatch": False}

    target_tokens = {w.lower() for w in re.findall(r'\b[A-Za-z0-9\+\#]+\b', target_title) if len(w) > 1}
    target_info = extract_title_and_seniority(target_title)
    
    max_score = 40.0
    best_candidate_role = ""
    best_candidate_seniority = "Entry-Level / Intern"

    for role in candidate_roles:
        role_str = str(role).strip()
        if not role_str:
            continue
        role_tokens = {w.lower() for w in re.findall(r'\b[A-Za-z0-9\+\#]+\b', role_str) if len(w) > 1}
        intersection = target_tokens & role_tokens
        score = (len(intersection) / max(len(target_tokens), 1)) * 100.0
        if score > max_score:
            max_score = score
            best_candidate_role = role_str
            best_candidate_seniority = extract_title_and_seniority(role_str)["seniority"]

    # Check for seniority mismatch (e.g. Senior/Lead JD vs Intern/Junior Candidate)
    is_mismatch = (target_info["seniority"] == "Senior / SME" and best_candidate_seniority == "Entry-Level / Intern")

    return {
        "score": round(min(max_score, 100.0), 1),
        "target_seniority": target_info["seniority"],
        "candidate_seniority": best_candidate_seniority,
        "seniority_mismatch": is_mismatch,
        "best_matching_role": best_candidate_role
    }
