from flask import Blueprint, jsonify, request

routes = Blueprint("routes", __name__)

# In-memory storage (will update to sqlLite in later update)
history_store = []

# Default scoring weights
WEIGHTS = {
    "gwp": 0.4,
    "circularity": 0.4,
    "cost": 0.2
}

@routes.route("/")
def home():
    return jsonify({"message": "Backend server is running!"})


# -------------------------------
# POST /score
# -------------------------------
@routes.route("/score", methods=['POST'])
def score():
    data = request.get_json()

    #Validation
    required = ["product_name", "materials", "weight_grams", "transport",
                "packaging", "gwp", "cost", "circularity"]

    for field in required:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    #Catching non numeric data
    try:
        gwp = float(data["gwp"])
        cost = float(data["cost"])
        circularity = float(data["circularity"])
    except ValueError:
        return jsonify({"error": "gwp, cost, circularity must be numeric"}), 400

    # ---- Compute sustainability score ----
    # Subscores normalized to 0–100
    gwp_score = max(0, 100 - gwp * 10)
    cost_score = max(0, 100 - cost * 5)
    circ_score = circularity

    sustainability_score = (
        WEIGHTS["gwp"] * gwp_score +
        WEIGHTS["cost"] * cost_score +
        WEIGHTS["circularity"] * circ_score
    )

    #Rating
    if sustainability_score >= 85:
        rating = "A"
    elif sustainability_score >= 70:
        rating = "B"
    elif sustainability_score >= 55:
        rating = "C"
    else:
        rating = "D"

    #Suggestions
    suggestions = []
    if "plastic" in [m.lower() for m in data["materials"]]:
        suggestions.append("Reduce plastic use")
    if data["transport"].lower() == "air":
        suggestions.append("Avoid air transport")
    if data["packaging"].lower() != "recyclable":
        suggestions.append("Use recyclable packaging")

    #Product summary
    product_summary = {
        "product_name": data["product_name"],
        "sustainability_score": round(sustainability_score, 2),
        "rating": rating,
        "suggestions": suggestions
    }

    #Update History
    entry = {
        **product_summary,
        "issues": suggestions
    }
    history_store.append(entry)

    return jsonify(product_summary)


# -------------------------------
# GET /history
# -------------------------------
@routes.route("/history", methods=['GET'])
def get_history():
    return jsonify(history_store)


# -------------------------------
# GET /score-summary
# -------------------------------
@routes.route("/score-summary", methods=['GET'])
def score_summary():
    if not history_store:
        return jsonify({"message": "No data submitted yet"}), 200

    total = len(history_store)
    avg = sum(p["sustainability_score"] for p in history_store) / total

    # Rating distribution
    ratings = {"A": 0, "B": 0, "C": 0, "D": 0}
    for p in history_store:
        ratings[p["rating"]] += 1

    # Top issues (simple frequency count)
    issue_counts = {}
    for p in history_store:
        for issue in p["issues"]:
            issue_counts[issue] = issue_counts.get(issue, 0) + 1

    top_issues = sorted(issue_counts, key=issue_counts.get, reverse=True)

    summary = {
        "total_products": total,
        "average_score": round(avg, 2),
        "ratings": ratings,
        "top_issues": top_issues
    }

    return jsonify(summary)
