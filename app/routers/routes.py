from flask import Blueprint, jsonify, request
from ..database import get_db
from ..services.scoring import calculate_score, generate_suggestions
from ..models.product import insert_product, fetch_all_products, fetch_summary, fetch_rating_counts

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

    sustainability_score, rating = calculate_score(data)
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

    return jsonify({
        "total_products": meta["total_products"],
        "average_score": round(meta["average_score"], 2) if meta["average_score"] else 0,
        "ratings": rating_dict
    })
