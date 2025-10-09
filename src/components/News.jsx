import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './News.css';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';
import fullLogo from '../assets/Images/fulllogo.png';

const News = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [planExpanded, setPlanExpanded] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAddNewsModal, setShowAddNewsModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    title: '',
    description: '',
    photo: null
  });
  const profileRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const togglePlanSubmenu = () => {
    setPlanExpanded(!planExpanded);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const handleAddNews = () => {
    setShowAddNewsModal(true);
  };

  const handleCloseModal = () => {
    setShowAddNewsModal(false);
    setShowSuccessModal(false);
    setFormData({
      date: '',
      time: '',
      title: '',
      description: '',
      photo: null
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      photo: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('News data:', formData);
    
    // Close the form modal and show success modal
    setShowAddNewsModal(false);
    setShowSuccessModal(true);
    
    // Auto close success modal after 3 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`news-container ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      {/* Header/Navbar */}
      <header className="news-header">
        <div className="header-left">
          <div className="header-logo">
            <img src={fullLogo} alt="Logo" className="navbar-logo" />
            
          </div>
        </div>
        <div className="header-right">
          <div className="header-icon notification-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <div className="notification-dot"></div>
          </div>
          <div className="header-icon profile-icon" onClick={toggleProfileDropdown} ref={profileRef}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            
            {showProfileDropdown && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>My Profile</span>
                </div>
                <div className="profile-dropdown-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <span>Settings</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`news-sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
        {/* Hamburger Menu */}
        <div className="sidebar-hamburger" onClick={toggleSidebar}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <Link to="/dashboard" className="sidebar-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className="sidebar-text">Dashboard</span>
          </Link>

          <Link to="/users" className="sidebar-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="sidebar-text">Manage Users</span>
          </Link>

          <Link to="/grievances" className="sidebar-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
            <span className="sidebar-text">Grievances</span>
          </Link>

          <div className="sidebar-item plan-item" onClick={togglePlanSubmenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="sidebar-text">Plan</span>
            {sidebarExpanded && (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className={`plan-arrow ${planExpanded ? 'expanded' : ''}`}
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            )}
          </div>
          
          {planExpanded && sidebarExpanded && (
            <div className="plan-submenu">
              <Link to="/schedule" className="sidebar-item submenu-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span className="sidebar-text">Schedule</span>
              </Link>
              <div className="sidebar-item submenu-item active">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                <span className="sidebar-text">New</span>
              </div>
            </div>
          )}

          <Link to="/development" className="sidebar-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className="sidebar-text">Development</span>
          </Link>
        </nav>

        {/* Logout Button - positioned at bottom */}
        <div className="sidebar-logout">
          <div className="sidebar-item logout">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16,17 21,12 16,7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span className="sidebar-text">Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="news-main">
          {/* News Header */}
          <div className="news-header-section">
            <h1>News</h1>
          </div>

          {/* News Actions */}
          <div className="news-actions-section">
            <button className="add-news-btn" onClick={handleAddNews}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add News
            </button>
          </div>

          {/* Search and Filter */}
          <div className="search-filter-section">
            <div className="search-container">
              <div className="search-bar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="M21 21l-4.35-4.35"></path>
                </svg>
                <input type="text" placeholder="Q Search" />
              </div>
              <button className="filter-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
                </svg>
              </button>
            </div>
          </div>

          {/* Trending News Section */}
          <div className="news-section">
            <h2>Trending News</h2>
            <div className="news-cards vertical">
              <div className="news-card">
                <div className="news-card-image">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23e5e7eb'/%3E%3Ccircle cx='100' cy='55' r='18' fill='%233b82f6'/%3E%3Cpath d='M80 85 L120 85 M100 73 L100 97' stroke='%233b82f6' stroke-width='4'/%3E%3C/svg%3E" alt="News icon" />
                </div>
                <div className="news-card-content">
                  <h3>Water Supply Disruption</h3>
                  <p className="news-location">Location: Ganeshnagar, Tadepalligudem</p>
                  <p className="news-time">Time: 09:00 AM</p>
                </div>
              </div>
              <div className="news-card">
                <div className="news-card-content">
                  <h3>Farmers</h3>
                  <p className="news-time">Time: 09:00 AM - 12:00PM</p>
                </div>
              </div>
              <div className="news-card">
                <div className="news-card-content">
                  <h3>Farmers</h3>
                  <p className="news-time">Time: 09:00 AM - 12:00PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dated News Section */}
          <div className="news-section">
            <h2>07/09/2025</h2>
            <div className="news-cards vertical">
              <div className="news-card">
                <div className="news-card-image">
                  <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23e5e7eb'/%3E%3Ccircle cx='100' cy='55' r='18' fill='%233b82f6'/%3E%3Cpath d='M80 85 L120 85 M100 73 L100 97' stroke='%233b82f6' stroke-width='4'/%3E%3C/svg%3E" alt="News icon" />
                </div>
                <div className="news-card-content">
                  <h3>Water Supply Disruption</h3>
                  <p className="news-location">Location: Ganeshnagar, Tadepalligudem</p>
                  <p className="news-time">Time: 09:00 AM</p>
                </div>
              </div>
              <div className="news-card">
                <div className="news-card-content">
                  <h3>Farmers</h3>
                  <p className="news-time">Time: 09:00 AM - 12:00PM</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Add News Modal */}
        {showAddNewsModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add News</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <div className="input-with-icon">
                    <input
                      type="text"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      placeholder="DD-MM-YYYY"
                      required
                    />
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="input-icon">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="HH:MM:SS"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="title">News Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter News Title"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Detailed Description......"
                  rows="4"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="photo">Upload Photo</label>
                <div className="file-upload-area">
                  <input
                    type="file"
                    id="photo"
                    name="photo"
                    onChange={handleFileChange}
                    accept="image/*"
                    className="file-input"
                  />
                  <div className="file-upload-content">
                    <button type="button" className="browse-btn" onClick={() => document.getElementById('photo').click()}>
                      Browse photo
                    </button>
                    <p>Or Drag or Drop Here</p>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button type="submit" className="add-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add
                </button>
                <button type="button" className="cancel-btn" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="success-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={handleCloseModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <div className="success-content">
              <div className="success-icon">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
              </div>
              <h3>News Added Successfully</h3>
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

export default News;
