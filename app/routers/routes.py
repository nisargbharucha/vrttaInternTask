from flask import Blueprint, jsonify, request
from ..database import get_db
from ..services.scoring import calculate_score, generate_suggestions
from ..models.product import insert_product, fetch_all_products, fetch_summary, fetch_rating_counts
from ..models.product import insert_product, fetch_all_products, fetch_summary, fetch_rating_counts, fetch_all_suggestions

routes = Blueprint("routes", __name__)

@routes.route("/")
def home():
    return jsonify({"message": "Flask backend is running!"})


@routes.route("/score", methods=['POST'])
def score():
    data = request.get_json()

    required = ["product_name", "materials", "weight_grams", "transport",
                "packaging", "gwp", "cost", "circularity"]
    for field in required:
        if field not in data:
            return jsonify({"error": f"Missing {field}"}), 400

    custom_weights = data.get("weights")
    if custom_weights:
        if not all(k in custom_weights for k in ["gwp", "circularity", "cost"]) or \
           not all(isinstance(v, (int, float)) for v in custom_weights.values()):
            return jsonify({"error": "Invalid weights format. Must include gwp, circularity, and cost as numbers."}), 400

    sustainability_score, rating = calculate_score(data, custom_weights)
    suggestions = generate_suggestions(data)

    # Save to DB
    db = get_db()
    insert_product(
        db,
        data["product_name"],
        sustainability_score,
        rating,
        suggestions
    )

    return jsonify({
        "product_name": data["product_name"],
        "sustainability_score": sustainability_score,
        "rating": rating,
        "suggestions": suggestions
    })


@routes.route("/history", methods=['GET'])
def history():
    db = get_db()
    rows = fetch_all_products(db)
    return jsonify([dict(row) for row in rows])



@routes.route("/score-summary", methods=['GET'])
def summary():
    db = get_db()
    meta = fetch_summary(db)
    ratings = fetch_rating_counts(db)

    # format ratings as dict
    rating_dict = {row["rating"]: row["count"] for row in ratings}

    suggestion_rows = fetch_all_suggestions(db)
    issue_counts = {}
    for row in suggestion_rows:
        issues = row['suggestions'].split(', ')
        for issue in issues:
            if issue: 
                issue_counts[issue] = issue_counts.get(issue, 0) + 1
    
    sorted_issues = sorted(issue_counts.items(), key=lambda item: item[1], reverse=True)
    top_issues = [issue[0] for issue in sorted_issues[:3]]

    return jsonify({
        "total_products": meta["total_products"],
        "average_score": round(meta["average_score"], 2) if meta["average_score"] else 0,
        "ratings": rating_dict,
        "top_issues": top_issues  # 
    })