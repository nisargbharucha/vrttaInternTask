WEIGHTS = {"gwp": 0.4, "circularity": 0.4, "cost": 0.2}

def calculate_score(data, custom_weights=None):
    # Use custom weights if provided, otherwise use default 
    weights = custom_weights if custom_weights else WEIGHTS
    
    gwp = float(data["gwp"])
    cost = float(data["cost"])
    circularity = float(data["circularity"])

    gwp_score = max(0, 100 - gwp * 10)
    cost_score = max(0, 100 - cost * 5)

    # Basic validation that weights structure is correct
    if not all(k in weights for k in ["gwp", "circularity", "cost"]):
        weights = WEIGHTS # Fallback to default

    score = (
        weights["gwp"] * gwp_score +
        weights["circularity"] * circularity +
        weights["cost"] * cost_score
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
