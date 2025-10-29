import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="nav-brand">
            <span className="nav-icon">♻️</span>
            <span className="nav-title">Vrtta Green Solutions</span>
          </Link>
          
          <div className="nav-links">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/score" 
              className={`nav-link ${isActive('/score') ? 'active' : ''}`}
            >
              Score Product
            </Link>
            <Link 
              to="/history" 
              className={`nav-link ${isActive('/history') ? 'active' : ''}`}
            >
              History
            </Link>
            <Link 
              to="/dashboard" 
              className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`}
            >
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
