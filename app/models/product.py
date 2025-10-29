def insert_product(db, product_name, score, rating, suggestions):
    db.execute(
        "INSERT INTO products (product_name, sustainability_score, rating, suggestions) VALUES (?, ?, ?, ?)",
        (product_name, score, rating, ", ".join(suggestions))
    )
    db.commit()

def fetch_all_products(db):
    return db.execute("SELECT * FROM products").fetchall()

def fetch_summary(db):
    return db.execute("""
        SELECT 
            COUNT(*) AS total_products,
            AVG(sustainability_score) AS average_score
        FROM products
    """).fetchone()

def fetch_rating_counts(db):
    return db.execute("""
        SELECT rating, COUNT(*) AS count
        FROM products
        GROUP BY rating
    """).fetchall()
