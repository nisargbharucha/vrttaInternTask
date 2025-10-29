import React, { useState, useEffect } from 'react';
import { getProductHistory } from '../services/api';

const ProductHistory = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterRating, setFilterRating] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProductHistory();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'A': return '#10b981';
      case 'B': return '#3b82f6';
      case 'C': return '#f59e0b';
      case 'D': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const getRatingDescription = (rating) => {
    switch (rating) {
      case 'A': return 'Excellent';
      case 'B': return 'Good';
      case 'C': return 'Average';
      case 'D': return 'Needs Improvement';
      default: return 'Unknown';
    }
  };

  const sortedAndFilteredProducts = products
    .filter(product => filterRating === 'all' || product.rating === filterRating)
    .sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.sustainability_score - a.sustainability_score;
        case 'name':
          return a.product_name.localeCompare(b.product_name);
        case 'rating':
          return a.rating.localeCompare(b.rating);
        case 'date':
        default:
          return b.id - a.id; // Assuming higher ID means newer
      }
    });

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <div className="container">
            <h1>Product History</h1>
            <p>View all your scored products</p>
          </div>
        </div>
        <div className="page-content">
          <div className="container">
            <div className="loading">Loading products...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Product History</h1>
          <p>View all your scored products and track your sustainability progress</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {error && <div className="error">{error}</div>}

          {products.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📊</div>
              <h2 style={{ marginBottom: '16px', color: '#1e293b' }}>No Products Yet</h2>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                Start by scoring your first product to see it appear here.
              </p>
              <a href="/score" className="btn btn-primary">
                Score Your First Product
              </a>
            </div>
          ) : (
            <>
              <div className="card" style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                  <div>
                    <h2 style={{ margin: 0, color: '#1e293b' }}>All Products ({products.length})</h2>
                    <p style={{ margin: '4px 0 0 0', color: '#6b7280' }}>
                      {sortedAndFilteredProducts.length} products shown
                    </p>
                  </div>
                  
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                        Sort by:
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="form-select"
                        style={{ width: '150px' }}
                      >
                        <option value="date">Date Added</option>
                        <option value="score">Score (High to Low)</option>
                        <option value="name">Product Name</option>
                        <option value="rating">Rating</option>
                      </select>
                    </div>
                    
                    <div>
                      <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                        Filter by rating:
                      </label>
                      <select
                        value={filterRating}
                        onChange={(e) => setFilterRating(e.target.value)}
                        className="form-select"
                        style={{ width: '150px' }}
                      >
                        <option value="all">All Ratings</option>
                        <option value="A">A - Excellent</option>
                        <option value="B">B - Good</option>
                        <option value="C">C - Average</option>
                        <option value="D">D - Needs Improvement</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-2">
                {sortedAndFilteredProducts.map((product) => (
                  <div key={product.id} className="product-card">
                    <div className="product-header">
                      <h3 className="product-name">{product.product_name}</h3>
                      <div className="product-score">
                        <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#10b981' }}>
                          {product.sustainability_score}
                        </span>
                        <span 
                          className={`rating-badge rating-${product.rating.toLowerCase()}`}
                          title={getRatingDescription(product.rating)}
                        >
                          {product.rating}
                        </span>
                      </div>
                    </div>

                    <div className="product-details">
                      <div className="detail-item">
                        <span className="detail-label">Rating</span>
                        <span className="detail-value" style={{ color: getRatingColor(product.rating) }}>
                          {getRatingDescription(product.rating)}
                        </span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Score</span>
                        <span className="detail-value">{product.sustainability_score}/100</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Product ID</span>
                        <span className="detail-value">#{product.id}</span>
                      </div>
                    </div>

                    {product.suggestions && (
                      <div style={{ marginTop: '16px' }}>
                        <h4 style={{ marginBottom: '8px', color: '#374151', fontSize: '14px', fontWeight: '500' }}>
                          Suggestions:
                        </h4>
                        <p style={{ color: '#6b7280', fontSize: '14px', lineHeight: '1.5' }}>
                          {product.suggestions}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {sortedAndFilteredProducts.length === 0 && filterRating !== 'all' && (
                <div className="card" style={{ textAlign: 'center', padding: '40px 24px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
                  <h3 style={{ marginBottom: '8px', color: '#1e293b' }}>No products found</h3>
                  <p style={{ color: '#6b7280' }}>
                    No products match the selected rating filter. Try changing the filter or add more products.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductHistory;
