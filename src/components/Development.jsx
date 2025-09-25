import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Development.css';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';
import fullLogo from '../assets/Images/fulllogo.png';

const Development = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [showAddProjectsModal, setShowAddProjectsModal] = useState(false);
  const [showCompletedProjects, setShowCompletedProjects] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState('current');
  const [formData, setFormData] = useState({
    launchDate: '',
    launchTime: '',
    title: '',
    description: '',
    photo: null
  });

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const handleAddProjects = () => {
    setShowAddProjectsModal(true);
  };

  const handleCloseModal = () => {
    setShowAddProjectsModal(false);
    setShowSuccessModal(false);
    setFormData({
      launchDate: '',
      launchTime: '',
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
    console.log('Project data:', formData);
    
    // Close the form modal and show success modal
    setShowAddProjectsModal(false);
    setShowSuccessModal(true);
    
    // Auto close success modal after 3 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
    }, 3000);
  };

  const toggleProjectsView = () => {
    setShowCompletedProjects(prev => !prev);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const selectProjectType = (type) => {
    setSelectedProjectType(type);
    setShowDropdown(false);
    if (type === 'completed') {
      setShowCompletedProjects(true);
    } else {
      setShowCompletedProjects(false);
    }
  };

  const getProjectTypeLabel = () => {
    switch(selectedProjectType) {
      case 'completed': return 'Completed Projects';
      case 'proposed': return 'Proposed Projects';
      default: return 'Current Projects';
    }
  };

  return (
    <div className={`development-container ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      {/* Header/Navbar */}
      <header className="development-header">
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
          <div className="header-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`development-sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
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

          <Link to="/schedule" className="sidebar-item">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="sidebar-text">Plan</span>
          </Link>

          <div className="sidebar-item active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className="sidebar-text">Development</span>
          </div>
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
      <main className="development-main">
        {/* Development Header */}
        <div className="development-header-section">
          <h1>Development</h1>
        </div>

        {/* Development Actions */}
        <div className="development-actions-section">
          <button className="add-projects-btn" onClick={handleAddProjects}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Projects
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
              <input type="text" placeholder="Q Search" style={{width: '60px', minWidth: '60px', maxWidth: '60px'}} />
            </div>
            <button className="filter-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
              </svg>
            </button>
          </div>
        </div>

        {/* Content Row - match Grievances template */}
        <div className="content-row">
          {/* Past Search History (Left) */}
          <div className="search-history-section">
            <div className="search-history-card">
              <h3>Past Search History</h3>
              <div className="search-history-items">
                <span className="search-history-item">Ganeshnagar</span>
                <span className="search-history-item">Water Problem</span>
                <span className="search-history-item">Water Problem</span>
                <span className="search-history-item">Current Problem</span>
              </div>
            </div>
          </div>

          {/* Status Cards (Right) */}
          <div className="status-cards-section">
            <div className="status-card">
              <h3>Project Status</h3>
              <div className="pie-chart-container">
                <div className="pie-chart">
                  <div className="pie-slice completed" style={{'--percentage': '40%'}}></div>
                  <div className="pie-slice ongoing" style={{'--percentage': '35%'}}></div>
                  <div className="pie-slice current" style={{'--percentage': '25%'}}></div>
                </div>
                <div className="pie-legend">
                  <div className="legend-item">
                    <div className="legend-color current"></div>
                    <span>Current 25</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color ongoing"></div>
                    <span>Ongoing 35</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color completed"></div>
                    <span>Completed 40</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="status-card">
              <h3>Grievances Status</h3>
              <div className="pie-chart-container">
                <div className="pie-chart">
                  <div className="pie-slice completed" style={{'--percentage': '40%'}}></div>
                  <div className="pie-slice ongoing" style={{'--percentage': '35%'}}></div>
                  <div className="pie-slice current" style={{'--percentage': '25%'}}></div>
                </div>
                <div className="pie-legend">
                  <div className="legend-item">
                    <div className="legend-color current"></div>
                    <span>Current 25</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color ongoing"></div>
                    <span>Ongoing 35</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color completed"></div>
                    <span>Completed 40</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Current/Completed Projects toggle */}
        <div className="projects-section">
          <div className="projects-header">
            <div className="project-type-selector">
              <h2 onClick={toggleDropdown} style={{cursor: 'pointer'}}>
                {getProjectTypeLabel()}
              </h2>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" 
                   style={{transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease'}}
                   onClick={toggleDropdown}>
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
              {showDropdown && (
                <div className="project-dropdown">
                  <div className="dropdown-item" onClick={() => selectProjectType('current')}>
                    Current Projects
                  </div>
                  <div className="dropdown-separator"></div>
                  <div className="dropdown-item" onClick={() => selectProjectType('completed')}>
                    Completed Projects
                  </div>
                  <div className="dropdown-separator"></div>
                  <div className="dropdown-item" onClick={() => selectProjectType('proposed')}>
                    Proposed Projects
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="project-group-card">
            {selectedProjectType === 'completed' ? (
              <>
                <div className="project-item">
                  <div className="project-card-content">
                    <h3>Street Lights Upgrade</h3>
                    <p className="project-location">Location: Ward-12</p>
                    <p className="project-time">Completed: 02:30 PM</p>
                  </div>
                </div>
                <div className="project-item">
                  <div className="project-card-content">
                    <h3>Drainage Clean-up</h3>
                    <p className="project-location">Location: Market Road</p>
                    <p className="project-time">Completed: 11:10 AM</p>
                  </div>
                </div>
              </>
            ) : selectedProjectType === 'proposed' ? (
              <>
                <div className="project-item">
                  <div className="project-card-content">
                    <h3>New Community Center</h3>
                    <p className="project-location">Location: Central Area</p>
                    <p className="project-time">Proposed: Q2 2024</p>
                  </div>
                </div>
                <div className="project-item">
                  <div className="project-card-content">
                    <h3>Road Widening Project</h3>
                    <p className="project-location">Location: Main Highway</p>
                    <p className="project-time">Proposed: Q3 2024</p>
                  </div>
                </div>
                <div className="project-item">
                  <div className="project-card-content">
                    <h3>Digital Library Setup</h3>
                    <p className="project-location">Location: Educational Zone</p>
                    <p className="project-time">Proposed: Q4 2024</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="project-item">
                  <div className="project-card-image">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 120'%3E%3Crect width='200' height='120' fill='%23e5e7eb'/%3E%3Ccircle cx='50' cy='40' r='15' fill='%233b82f6'/%3E%3Cpath d='M30 60 L70 60 M50 50 L50 70' stroke='%233b82f6' stroke-width='3'/%3E%3Ccircle cx='120' cy='40' r='15' fill='%233b82f6'/%3E%3Cpath d='M100 60 L140 60 M120 50 L120 70' stroke='%233b82f6' stroke-width='3'/%3E%3Ccircle cx='150' cy='40' r='15' fill='%233b82f6'/%3E%3Cpath d='M130 60 L170 60 M150 50 L150 70' stroke='%233b82f6' stroke-width='3'/%3E%3C/svg%3E" alt="Water collection" />
                  </div>
                  <div className="project-card-content">
                    <h3>Water Supply Disruption</h3>
                    <p className="project-location">Location: Ganeshnagar, Tadepalligudem</p>
                    <p className="project-time">Time: 09:00 AM</p>
                  </div>
                </div>
                <div className="project-item">
                  <div className="project-card-content">
                    <h3>Farmers</h3>
                    <p className="project-time">Time: 09:00 AM - 12:00PM</p>
                  </div>
                </div>
                <div className="project-item">
                  <div className="project-card-content">
                    <h3>Farmers</h3>
                    <p className="project-time">Time: 09:00 AM - 12:00PM</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {/* Add Projects Modal */}
      {showAddProjectsModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add Projects</h2>
              <button className="close-btn" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-group">
                <label htmlFor="launchDate">Launch Date</label>
                <div className="input-with-icon">
                  <input
                    type="text"
                    id="launchDate"
                    name="launchDate"
                    value={formData.launchDate}
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
                <label htmlFor="launchTime">Launch Time</label>
                <input
                  type="text"
                  id="launchTime"
                  name="launchTime"
                  value={formData.launchTime}
                  onChange={handleInputChange}
                  placeholder="HH:MM:SS"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Project Title</label>
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
                <label htmlFor="description">Project Description</label>
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
                  + Add
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
              <h3>Project Added Successfully</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Development;
