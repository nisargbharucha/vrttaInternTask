import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>♻️ Vrtta Green Solutions</h1>
          <p>
            Calculate sustainability scores for your products and make informed 
            decisions about environmental impact. Our AI-powered platform helps 
            you understand and improve your product's sustainability.
          </p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Score Products</h3>
              <p className="feature-description">
                Calculate comprehensive sustainability scores based on materials, 
                transport, packaging, and environmental impact metrics.
              </p>
              <Link to="/score" className="btn btn-primary" style={{ marginTop: '20px' }}>
                Score a Product
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3 className="feature-title">Track Progress</h3>
              <p className="feature-description">
                View detailed history of all scored products and track your 
                sustainability improvements over time.
              </p>
              <Link to="/history" className="btn btn-outline" style={{ marginTop: '20px' }}>
                View History
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3 className="feature-title">Analytics Dashboard</h3>
              <p className="feature-description">
                Get insights with comprehensive analytics, rating distributions, 
                and top sustainability issues across your product portfolio.
              </p>
              <Link to="/dashboard" className="btn btn-outline" style={{ marginTop: '20px' }}>
                View Dashboard
              </Link>
            </div>
          </div>

          <div className="card" style={{ marginTop: '60px' }}>
            <h2 style={{ marginBottom: '20px', color: '#1e293b' }}>How It Works</h2>
            <div className="grid grid-2">
              <div>
                <h3 style={{ color: '#10b981', marginBottom: '12px' }}>1. Input Product Data</h3>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                  Provide details about your product including materials, weight, 
                  transport method, packaging type, and environmental metrics.
                </p>
                
                <h3 style={{ color: '#10b981', marginBottom: '12px' }}>2. AI-Powered Analysis</h3>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                  Our algorithm calculates a sustainability score based on Global 
                  Warming Potential, circularity, and cost efficiency.
                </p>
              </div>
              
              <div>
                <h3 style={{ color: '#10b981', marginBottom: '12px' }}>3. Get Actionable Insights</h3>
                <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                  Receive a sustainability rating (A-D) and specific suggestions 
                  to improve your product's environmental impact.
                </p>
                
                <h3 style={{ color: '#10b981', marginBottom: '12px' }}>4. Track & Improve</h3>
                <p style={{ color: '#6b7280' }}>
                  Monitor your progress over time and make data-driven decisions 
                  to enhance your sustainability efforts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
