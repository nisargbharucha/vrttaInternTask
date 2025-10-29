# ♻️ Vrtta Green Solutions - Sustainability Scoring API

This project provides a lightweight Python Flask back-end service to compute a **Sustainability Score** for physical products and aggregate the results for dashboard display. This API serves as the core logic for the Vrtta Green Solutions application.

The application uses **SQLite** for simple, in-memory/file-based persistence of product submission history.

---

## 🛠️ Local Setup and Running Instructions

Follow these steps to get the API server running on your local machine.

### Prerequisites

* **Python 3.8+**
* **pip** (Python package installer)

### 1. Clone the Repository

```bash
git clone <YOUR_REPO_URL>
cd Vrtta/
```

### 2. Set up a Virtual Environment

It's best practice to isolate your project dependencies.

```bash
python3 -m venv venv
source venv/bin/activate  
# On Windows, use `venv\Scripts\activate`
```

### 3. Install Dependencies

The core dependencies are Flask and SQLite (which is built into Python).

```bash
pip install Flask
```

(You may also need `pip install Werkzeug` if running into errors, though Flask usually handles this.)

### 4. Run the API Server

Your main.py file uses the create_app factory and runs on port 5000 by default.

```bash
python main.py
```

You should see output similar to:
* Running on [http://127.0.0.1:5000/](http://127.0.0.1:5000/) (Press CTRL+C to quit)

The API is now running and the SQLite database (vrtta.db) will be created in your project's instance/ folder.

---

## ⚙️ API Endpoints Documentation

The backend exposes three primary endpoints for scoring and data retrieval. All endpoints are hosted on the base URL: http://127.0.0.1:5000.

### 1. POST /score

Computes the sustainability score, rating, and AI suggestions for a single product.

| Field | Type | Description | Required |
|-------|------|-------------|----------|
| product_name | String | Name of the product (e.g., "Reusable Bottle") | Yes |
| materials | Array of Strings | Primary materials used (e.g., ["aluminum", "plastic"]) | Yes |
| weight_grams | Integer | Product weight in grams (e.g., 300) | Yes |
| transport | String | Primary transport method (e.g., "air", "sea", "road") | Yes |
| packaging | String | Packaging type (e.g., "recyclable", "non-recyclable") | Yes |
| gwp | Float (String) | Global Warming Potential value (e.g., "5.0") | Yes |
| cost | Float (String) | Production/Unit Cost value (e.g., "10.0") | Yes |
| circularity | Float (String) | Circularity percentage (0-100) (e.g., "80.0") | Yes |
| weights | Object | (Optional) Custom scoring weights for gwp, circularity, cost | No |

**Example Request Payload:**

```json
{
    "product_name": "Reusable Bottle",
    "materials": ["aluminum", "plastic"],
    "weight_grams": 300,
    "transport": "air",
    "packaging": "recyclable",
    "gwp": "5.0",
    "cost": "10.0",
    "circularity": "80.0",
    "weights": {"gwp": 0.5, "circularity": 0.3, "cost": 0.2} 
}
```

**Example Response:**

```json
{
    "product_name": "Reusable Bottle",
    "sustainability_score": 72.5,
    "rating": "B",
    "suggestions": [
        "Avoid air transport",
        "Reduce plastic use"
    ]
}
```

### 2. GET /history

Returns a list of all previously submitted products stored in the database.

**Example Response:**

```json
[
    {
        "id": 1,
        "product_name": "Reusable Bottle",
        "sustainability_score": 72.5,
        "rating": "B",
        "suggestions": "Avoid air transport, Reduce plastic use"
    }
    // ... more products
]
```

### 3. GET /score-summary

Returns aggregated statistics across all submitted products for the main dashboard view.

**Example Response:**

```json
{
    "total_products": 12,
    "average_score": 68.3,
    "ratings": {
        "A": 2,
        "B": 5,
        "C": 4,
        "D": 1
    },
    "top_issues": [
        "Plastic used",
        "Air transport",
        "Non-recyclable packaging"
    ]
}
```