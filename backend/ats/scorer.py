"""
Deterministic ATS Weighted Scoring Engine
Computes 0-100 score based on 7 core dimensions totaling 100%.
"""
from typing import Dict, Any

ATS_WEIGHTS = {
    "hard_skills": 0.30,        # 30%
    "soft_skills": 0.10,        # 10%
    "title_alignment": 0.15,    # 15%
    "impact_metrics": 0.15,     # 15%
    "action_verbs": 0.10,       # 10%
    "section_health": 0.10,     # 10%
    "formatting": 0.10          # 10%
}

def compute_ats_score(breakdown: Dict[str, float]) -> Dict[str, Any]:
    """
    Computes overall score from breakdown and assigns rating status.
    """
    total_score = 0.0
    for dim, weight in ATS_WEIGHTS.items():
        val = breakdown.get(dim, 75.0)
        total_score += val * weight

    overall = round(min(max(total_score, 0.0), 100.0), 1)

    if overall >= 80.0:
        status_label = "HIGH CALLBACK CHANCE"
        status_color = "#10B981"
    elif overall >= 60.0:
        status_label = "NEEDS OPTIMIZATION"
        status_color = "#F59E0B"
    else:
        status_label = "ATS BLOCKED / HIGH RISK"
        status_color = "#EF4444"

    return {
        "overall_score": overall,
        "status_label": status_label,
        "status_color": status_color,
        "weights": ATS_WEIGHTS,
        "breakdown": {k: round(breakdown.get(k, 0.0), 1) for k in ATS_WEIGHTS}
    }
