def calculate_skin_score(
    confidence: str,
    possible_conditions: list,
    visual_observations: list,
):
    score = 100

    text = " ".join(visual_observations).lower()

    penalties = {
        "redness": 12,
        "dryness": 8,
        "scaling": 10,
        "itching": 10,
        "bumps": 10,
        "swelling": 15,
        "rash": 12,
        "lesion": 18,
    }

    for keyword, penalty in penalties.items():
        if keyword in text:
            score -= penalty

    if len(possible_conditions) > 2:
        score -= 10

    if confidence == "low":
        score -= 5
    elif confidence == "high":
        score += 2

    score = max(0, min(score, 100))

    if score >= 85:
        level = "Healthy"
    elif score >= 70:
        level = "Mild Concern"
    elif score >= 50:
        level = "Moderate Concern"
    else:
        level = "Needs Attention"

    return {
        "skin_score": score,
        "skin_level": level,
    }