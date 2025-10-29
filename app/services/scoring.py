WEIGHTS = {"gwp": 0.4, "circularity": 0.4, "cost": 0.2}

def calculate_score(data):
    gwp = float(data["gwp"])
    cost = float(data["cost"])
    circularity = float(data["circularity"])

    gwp_score = max(0, 100 - gwp * 10)
    cost_score = max(0, 100 - cost * 5)

    score = (
        WEIGHTS["gwp"] * gwp_score +
        WEIGHTS["circularity"] * circularity +
        WEIGHTS["cost"] * cost_score
    )

    if score >= 85: rating = "A"
    elif score >= 70: rating = "B"
    elif score >= 55: rating = "C"
    else: rating = "D"

    return round(score, 2), rating

def generate_suggestions(data):
    suggestions = []
    if "plastic" in [m.lower() for m in data["materials"]]:
        suggestions.append("Reduce plastic use")
    if data["transport"].lower() == "air":
        suggestions.append("Avoid air transport")
    if data["packaging"].lower() != "recyclable":
        suggestions.append("Use recyclable packaging")
    return suggestions
