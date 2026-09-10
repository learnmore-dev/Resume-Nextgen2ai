"""
Backend-Only OpenAI Service for Semantic Resume Understanding & Tailoring.
Strict Principle: AI is used for semantic explanations and bullet polishing, NOT for score calculation or inventing false experience.
"""
import os
import json
from typing import Dict, Any, List

def get_openai_client():
    api_key = os.environ.get("OPENAI_API_KEY")
    if not api_key:
        return None
    try:
        from openai import OpenAI
        return OpenAI(api_key=api_key)
    except Exception:
        return None

def semantic_explain_match(missing_keywords: Dict[str, List[str]], raw_jd: str, resume_summary: str) -> List[str]:
    """
    Generates intelligent advice for candidate based on missing keywords.
    Never suggests inventing fake skills.
    """
    client = get_openai_client()
    if not client:
        # Fallback intelligent rule-based suggestions
        suggestions = []
        crit = missing_keywords.get("critical_hard_skills", [])
        tools = missing_keywords.get("tools_methodologies", [])
        
        if crit:
            suggestions.append(f"Add missing core skills ({', '.join(crit)}) only if you have practical hands-on experience with them.")
        if tools:
            suggestions.append(f"Highlight any relevant project experience using secondary tools ({', '.join(tools)}).")
        return suggestions

    try:
        prompt = f"""You are a senior technical recruiter and ATS specialist.
Given the following missing requirements from a job description:
Critical Hard Skills Missing: {missing_keywords.get('critical_hard_skills', [])}
Tools & Methodologies Missing: {missing_keywords.get('tools_methodologies', [])}

Candidate Context: {resume_summary[:500]}

Provide 2-3 concise, highly actionable ATS recommendations.
Rule: Never advise making up fake skills. Advise how to ethically highlight transferable skills or clarify existing experience. Return JSON list of strings."""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=300
        )
        content = response.choices[0].message.content.strip()
        data = json.loads(content)
        if isinstance(data, list):
            return data
        return [content]
    except Exception:
        return ["Tailor your resume bullet points to emphasize matching technologies and quantify your accomplishments."]

def ai_tailor_resume_bullets(original_bullets: List[str], target_keywords: List[str]) -> List[str]:
    """
    Polishes bullets by applying strong action verbs and highlighting matching frameworks without hallucinating.
    """
    client = get_openai_client()
    if not client:
        # Local deterministic bullet enhancement
        enhanced = []
        for b in original_bullets:
            b_str = str(b).strip()
            if b_str.lower().startswith("worked on"):
                b_str = "Developed and engineered " + b_str[10:]
            elif b_str.lower().startswith("helped with"):
                b_str = "Collaborated on " + b_str[12:]
            enhanced.append(b_str)
        return enhanced

    try:
        prompt = f"""You are a professional resume writer.
Enhance the following bullet points by using strong action verbs (e.g., Engineered, Optimized, Implemented) and emphasizing target skills ({', '.join(target_keywords[:5])}).
Do NOT invent new companies or fake metrics.
Original bullets:
{json.dumps(original_bullets)}

Return as a JSON array of strings."""

        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=400
        )
        content = response.choices[0].message.content.strip()
        data = json.loads(content)
        if isinstance(data, list):
            return data
        return original_bullets
    except Exception:
        return original_bullets
