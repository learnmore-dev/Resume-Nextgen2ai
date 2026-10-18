"""
Action Verbs Strength Analyzer
Distinguishes High-Impact Power Action Verbs from Weak Passive Verbs.
"""
import re
from typing import List, Dict, Any

STRONG_ACTION_VERBS = {
    'engineered', 'architected', 'spearheaded', 'developed', 'implemented',
    'optimized', 'automated', 'designed', 'built', 'deployed', 'scaled',
    'streamlined', 'orchestrated', 'accelerated', 'reduced', 'increased',
    'analyzed', 'formulated', 'executed', 'integrated', 'refactored',
    'pioneered', 'established', 'delivered', 'overhauled', 'boosted'
}

WEAK_PASSIVE_VERBS = {
    'worked', 'helped', 'responsible for', 'did', 'made', 'used',
    'handled', 'assisted', 'participated', 'involved in', 'supported'
}

def analyze_action_verbs(bullets: List[str]) -> Dict[str, Any]:
    """
    Analyzes bullets to identify strong action verbs vs weak verbs.
    """
    if not bullets:
        return {
            "score": 40.0,
            "strong_count": 0,
            "weak_count": 0,
            "total": 0,
            "ratio_percent": 0.0,
            "weak_bullets": []
        }

    strong_count = 0
    weak_count = 0
    weak_bullets = []

    for b in bullets:
        text = str(b).strip()
        if not text:
            continue
        words = [w.lower() for w in re.findall(r'\b[a-zA-Z]+\b', text)]
        first_few = words[:3] if len(words) >= 3 else words
        
        has_strong = any(w in STRONG_ACTION_VERBS for w in first_few)
        has_weak = any(w in WEAK_PASSIVE_VERBS for w in first_few) or (text.lower().startswith('responsible for') or text.lower().startswith('worked on'))
        
        if has_strong:
            strong_count += 1
        elif has_weak:
            weak_count += 1
            weak_bullets.append(text)

    total = len(bullets)
    ratio = (strong_count / max(total, 1)) * 100.0
    score = min(ratio * 0.9 + 25.0, 100.0) if total > 0 else 40.0

    return {
        "score": round(score, 1),
        "strong_count": strong_count,
        "weak_count": weak_count,
        "total": total,
        "ratio_percent": round(ratio, 1),
        "weak_bullets": weak_bullets
    }
