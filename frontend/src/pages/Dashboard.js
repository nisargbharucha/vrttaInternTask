import React, { useState, useEffect } from 'react';
import { getScoreSummary } from '../services/api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const data = await getScoreSummary();
      setSummary(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = {
    A: '#10b981',
    B: '#3b82f6', 
    C: '#f59e0b',
    D: '#ef4444'
  };

  const ratingData = summary?.ratings ? Object.entries(summary.ratings).map(([rating, count]) => ({
    rating,
    count,
    color: COLORS[rating] || '#6b7280'
  })) : [];

  const topIssuesData = summary?.top_issues ? summary.top_issues.map((issue, index) => ({
    issue,
    count: summary.top_issues.length - index, // Simple ranking
    color: COLORS[Object.keys(COLORS)[index % Object.keys(COLORS).length]]
  })) : [];

  if (loading) {
    return (
      <div>
        <div className="page-header">
          <div className="container">
            <h1>Analytics Dashboard</h1>
            <p>Comprehensive insights into your sustainability performance</p>
          </div>
        </div>
        <div className="page-content">
          <div className="container">
            <div className="loading">Loading dashboard data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Analytics Dashboard</h1>
          <p>Comprehensive insights into your sustainability performance</p>
        </div>
      </div>

      <div className="page-content">
        <div className="container">
          {error && <div className="error">{error}</div>}

          {!summary || summary.total_products === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
              <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📊</div>
              <h2 style={{ marginBottom: '16px', color: '#1e293b' }}>No Data Available</h2>
              <p style={{ color: '#6b7280', marginBottom: '24px' }}>
                Start scoring products to see analytics and insights here.
              </p>
              <a href="/score" className="btn btn-primary">
                Score Your First Product
              </a>
            </div>
          ) : (
            <>
              {/* Key Metrics */}
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-number">{summary.total_products}</div>
                  <div className="stat-label">Total Products</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">{summary.average_score}</div>
                  <div className="stat-label">Average Score</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">
                    {summary.ratings?.A || 0}
                  </div>
                  <div className="stat-label">A-Rated Products</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">
                    {summary.top_issues?.length || 0}
                  </div>
                  <div className="stat-label">Common Issues</div>
                </div>
              </div>

              <div className="grid grid-2">
                {/* Rating Distribution Chart */}
                <div className="chart-container">
                  <h3 className="chart-title">Rating Distribution</h3>
                  {ratingData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={ratingData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ rating, count, percent }) => `${rating}: ${count} (${(percent * 100).toFixed(0)}%)`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {ratingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                      No rating data available
                    </div>
                  )}
                </div>

                {/* Top Issues Chart */}
                <div className="chart-container">
                  <h3 className="chart-title">Top Sustainability Issues</h3>
                  {topIssuesData.length > 0 ? (
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={topIssuesData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="issue" 
                          angle={-45}
                          textAnchor="end"
                          height={80}
                          fontSize={12}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
                      No issue data available
                    </div>
                  )}
                </div>
              </div>

              {/* Detailed Rating Breakdown */}
              <div className="card">
                <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>Detailed Rating Breakdown</h3>
                <div className="grid grid-4">
                  {Object.entries(COLORS).map(([rating, color]) => {
                    const count = summary.ratings?.[rating] || 0;
                    const percentage = summary.total_products > 0 ? (count / summary.total_products * 100).toFixed(1) : 0;
                    
                    return (
                      <div key={rating} style={{ textAlign: 'center' }}>
                        <div 
                          className="rating-badge"
                          style={{ 
                            backgroundColor: color,
                            margin: '0 auto 12px auto',
                            fontSize: '24px',
                            width: '60px',
                            height: '60px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {rating}
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>
                          {count}
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '14px' }}>
                          {percentage}% of total
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '12px', marginTop: '4px' }}>
                          {rating === 'A' && 'Excellent'}
                          {rating === 'B' && 'Good'}
                          {rating === 'C' && 'Average'}
                          {rating === 'D' && 'Needs Improvement'}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Issues List */}
              {summary.top_issues && summary.top_issues.length > 0 && (
                <div className="card">
                  <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>Most Common Sustainability Issues</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {summary.top_issues.map((issue, index) => (
                      <div 
                        key={index}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          padding: '12px 16px',
                          background: '#f8fafc',
                          borderRadius: '8px',
                          borderLeft: `4px solid ${Object.values(COLORS)[index % Object.values(COLORS).length]}`
                        }}
                      >
                        <span 
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: Object.values(COLORS)[index % Object.values(COLORS).length],
                            color: 'white',
                            fontSize: '12px',
                            fontWeight: '600',
                            marginRight: '12px'
                          }}
                        >
                          {index + 1}
                        </span>
                        <span style={{ color: '#374151', fontWeight: '500' }}>{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Performance Insights */}
              <div className="card">
                <h3 style={{ marginBottom: '20px', color: '#1e293b' }}>Performance Insights</h3>
                <div className="grid grid-2">
                  <div>
                    <h4 style={{ color: '#10b981', marginBottom: '12px' }}>Strengths</h4>
                    <ul style={{ color: '#6b7280', paddingLeft: '20px' }}>
                      <li>Average score of {summary.average_score} indicates {summary.average_score >= 70 ? 'good' : 'room for improvement in'} overall sustainability</li>
                      <li>{summary.ratings?.A || 0} products achieved excellent A ratings</li>
                      <li>Comprehensive tracking of {summary.total_products} products shows commitment to sustainability</li>
                    </ul>
                  </div>
                  <div>
                    <h4 style={{ color: '#f59e0b', marginBottom: '12px' }}>Areas for Improvement</h4>
                    <ul style={{ color: '#6b7280', paddingLeft: '20px' }}>
                      {summary.top_issues && summary.top_issues.length > 0 ? (
                        summary.top_issues.map((issue, index) => (
                          <li key={index}>Focus on addressing: {issue}</li>
                        ))
                      ) : (
                        <li>Continue monitoring and improving sustainability metrics</li>
                      )}
                      <li>Consider setting targets to increase A and B rated products</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
