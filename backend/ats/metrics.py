"""
Quantifiable Impact & Outcome Detector (XYZ-Style Impact Check)
Distinguishes real impact metrics (Number + Impact Verb + Outcome) from generic standalone numbers.
"""
import re
from typing import List, Dict, Any

# Pattern for numbers, percentages, currency, multipliers, scale
NUMBER_METRIC_PATTERN = re.compile(
    r'(\b\d+[\+]?%|\$\d+|\b\d+[kKmMbB]\b|\b\d+x\b|\b\d+\.\d+\b|\b\d+\s*(?:ms|sec|min|hours|users|req|requests|times|clients|queries|records|transactions)\b|\b[2-9]\d{2,}\b|\b1\d{3,}\b)',
    re.IGNORECASE
)

# High-Impact Action Verbs and Context Terms
IMPACT_VERBS_PATTERN = re.compile(
    r'\b(increased|reduced|decreased|improved|boosted|optimized|accelerated|saved|scaled|generated|expanded|enhanced|achieved|delivered|automated|cut|streamlined|maximized|minimized|exceeded|ranked|built|served)\b',
    re.IGNORECASE
)

# Outcome & Value Indicators
OUTCOME_INDICATORS_PATTERN = re.compile(
    r'\b(latency|speed|performance|revenue|cost|costs|sales|efficiency|uptime|throughput|users|traffic|conversions|engagement|accuracy|load\s*time|productivity|downtime|queries|requests|roi|scalability)\b',
    re.IGNORECASE
)

def evaluate_bullet_metrics(bullets: List[str]) -> Dict[str, Any]:
    """
    Evaluates bullet points for true measurable impact and quantification.
    Requires Number + (Impact Verb OR Measurable Outcome context).
    """
    if not bullets:
        return {
            "score": 30.0,
            "quantified_count": 0,
            "total_bullets": 0,
            "ratio_percent": 0.0,
            "evaluated_bullets": []
        }

    evaluated = []
    quantified_count = 0

    for b in bullets:
        bullet_str = str(b).strip()
        if not bullet_str or len(bullet_str) < 10:
            continue

        has_number = bool(NUMBER_METRIC_PATTERN.search(bullet_str))
        has_impact_verb = bool(IMPACT_VERBS_PATTERN.search(bullet_str))
        has_outcome = bool(OUTCOME_INDICATORS_PATTERN.search(bullet_str))

        # True impact check: Must contain number and at least an impact verb or measurable outcome
        is_true_impact = has_number and (has_impact_verb or has_outcome)

        if is_true_impact:
            quantified_count += 1

        evaluated.append({
            "text": bullet_str,
            "has_metric": is_true_impact,
            "has_number": has_number,
            "has_impact_context": has_impact_verb or has_outcome
        })

    total = len(evaluated)
    ratio = (quantified_count / max(total, 1)) * 100.0
    # Balanced scoring curve: 50% true impact bullets gets 85-90% ATS impact score
    score = min(ratio * 0.95 + 20.0, 100.0) if total > 0 else 30.0

    return {
        "score": round(score, 1),
        "quantified_count": quantified_count,
        "total_bullets": total,
        "ratio_percent": round(ratio, 1),
        "evaluated_bullets": evaluated
    }
