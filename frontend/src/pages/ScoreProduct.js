import React, { useState } from 'react';
import { scoreProduct } from '../services/api';

const ScoreProduct = () => {
  const [formData, setFormData] = useState({
    product_name: '',
    materials: [],
    weight_grams: '',
    transport: '',
    packaging: '',
    gwp: '',
    cost: '',
    circularity: '',
    weights: {
      gwp: 0.4,
      circularity: 0.4,
      cost: 0.2
    }
  });

  const [currentMaterial, setCurrentMaterial] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const materialOptions = [
    'aluminum', 'plastic', 'steel', 'glass', 'paper', 'cardboard', 
    'wood', 'cotton', 'leather', 'rubber', 'ceramic', 'composite'
  ];

  const transportOptions = [
    { value: 'air', label: 'Air Transport' },
    { value: 'sea', label: 'Sea Transport' },
    { value: 'road', label: 'Road Transport' },
    { value: 'rail', label: 'Rail Transport' }
  ];

  const packagingOptions = [
    { value: 'recyclable', label: 'Recyclable' },
    { value: 'non-recyclable', label: 'Non-recyclable' },
    { value: 'biodegradable', label: 'Biodegradable' },
    { value: 'minimal', label: 'Minimal Packaging' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      weights: {
        ...prev.weights,
        [name]: parseFloat(value) || 0
      }
    }));
  };

  const addMaterial = () => {
    if (currentMaterial && !formData.materials.includes(currentMaterial)) {
      setFormData(prev => ({
        ...prev,
        materials: [...prev.materials, currentMaterial]
      }));
      setCurrentMaterial('');
    }
  };

  const removeMaterial = (material) => {
    setFormData(prev => ({
      ...prev,
      materials: prev.materials.filter(m => m !== material)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await scoreProduct(formData);
      setResult(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      product_name: '',
      materials: [],
      weight_grams: '',
      transport: '',
      packaging: '',
      gwp: '',
      cost: '',
      circularity: '',
      weights: {
        gwp: 0.4,
        circularity: 0.4,
        cost: 0.2
      }
    });
    setResult(null);
    setError('');
  };

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Score Your Product</h1>
          <p>Calculate the sustainability score for your product and get actionable insights</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="grid grid-2">
            <div className="card">
              <h2 style={{ marginBottom: '24px', color: '#1e293b' }}>Product Information</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Product Name *</label>
                  <input
                    type="text"
                    name="product_name"
                    value={formData.product_name}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., Reusable Water Bottle"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Materials *</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <select
                      value={currentMaterial}
                      onChange={(e) => setCurrentMaterial(e.target.value)}
                      className="form-select"
                      style={{ flex: 1 }}
                    >
                      <option value="">Select a material</option>
                      {materialOptions.map(material => (
                        <option key={material} value={material}>
                          {material.charAt(0).toUpperCase() + material.slice(1)}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={addMaterial}
                      className="btn btn-secondary"
                      style={{ padding: '12px 16px' }}
                    >
                      Add
                    </button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {formData.materials.map(material => (
                      <span
                        key={material}
                        style={{
                          background: '#f0fdf4',
                          color: '#10b981',
                          padding: '4px 12px',
                          borderRadius: '20px',
                          fontSize: '14px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        {material}
                        <button
                          type="button"
                          onClick={() => removeMaterial(material)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#10b981',
                            cursor: 'pointer',
                            fontSize: '16px'
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Weight (grams) *</label>
                  <input
                    type="number"
                    name="weight_grams"
                    value={formData.weight_grams}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., 300"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Transport Method *</label>
                  <select
                    name="transport"
                    value={formData.transport}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select transport method</option>
                    {transportOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Packaging Type *</label>
                  <select
                    name="packaging"
                    value={formData.packaging}
                    onChange={handleInputChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select packaging type</option>
                    {packagingOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Global Warming Potential (GWP) *</label>
                  <input
                    type="number"
                    step="0.1"
                    name="gwp"
                    value={formData.gwp}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., 5.0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Production Cost (per unit) *</label>
                  <input
                    type="number"
                    step="0.1"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., 10.0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Circularity Percentage (0-100) *</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    name="circularity"
                    value={formData.circularity}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="e.g., 80.0"
                    required
                  />
                </div>

                <div className="card" style={{ marginTop: '24px', background: '#f8fafc' }}>
                  <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>Custom Scoring Weights (Optional)</h3>
                  <div className="grid grid-3">
                    <div className="form-group">
                      <label className="form-label">GWP Weight</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        name="gwp"
                        value={formData.weights.gwp}
                        onChange={handleWeightChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Circularity Weight</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        name="circularity"
                        value={formData.weights.circularity}
                        onChange={handleWeightChange}
                        className="form-input"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Cost Weight</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0"
                        max="1"
                        name="cost"
                        value={formData.weights.cost}
                        onChange={handleWeightChange}
                        className="form-input"
                      />
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '12px' }}>
                    Weights should add up to 1.0. Default: GWP (0.4), Circularity (0.4), Cost (0.2)
                  </p>
                </div>

                {error && <div className="error">{error}</div>}

                <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                    style={{ flex: 1 }}
                  >
                    {loading ? 'Calculating...' : 'Calculate Score'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="btn btn-secondary"
                    disabled={loading}
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>

            {result && (
              <div className="card">
                <h2 style={{ marginBottom: '24px', color: '#1e293b' }}>Sustainability Score</h2>
                
                <div className="score-display">
                  {result.sustainability_score}
                </div>
                
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                  <span className={`rating-badge rating-${result.rating.toLowerCase()}`}>
                    {result.rating}
                  </span>
                  <p style={{ marginTop: '12px', color: '#6b7280' }}>
                    {result.rating === 'A' && 'Excellent sustainability performance'}
                    {result.rating === 'B' && 'Good sustainability performance'}
                    {result.rating === 'C' && 'Average sustainability performance'}
                    {result.rating === 'D' && 'Needs improvement in sustainability'}
                  </p>
                </div>

                <div>
                  <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>Product Details</h3>
                  <div style={{ background: '#f8fafc', padding: '16px', borderRadius: '8px', marginBottom: '20px' }}>
                    <p><strong>Product:</strong> {result.product_name}</p>
                  </div>
                </div>

                {result.suggestions && result.suggestions.length > 0 && (
                  <div>
                    <h3 style={{ marginBottom: '16px', color: '#1e293b' }}>Improvement Suggestions</h3>
                    <ul className="suggestions-list">
                      {result.suggestions.map((suggestion, index) => (
                        <li key={index}>{suggestion}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="success" style={{ marginTop: '20px' }}>
                  ✅ Product scored successfully and saved to history!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreProduct;
