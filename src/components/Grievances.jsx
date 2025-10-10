import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Grievances.css';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';
import fullLogo from '../assets/Images/fulllogo.png';

const Grievances = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [planExpanded, setPlanExpanded] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchWidth, setSearchWidth] = useState('60px');
  const [showAddGrievanceModal, setShowAddGrievanceModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('');
  const [formData, setFormData] = useState({
    constituency: '',
    department: '',
    address: '',
    title: '',
    description: '',
    photo: null
  });
  
  // Sample grievances data
  const [grievances, setGrievances] = useState([
    { id: 'GV101', grievance: 'Water Supply Disruption', area: 'Tadepaligudem', department: 'Water', status: 'Ongoing' },
    { id: 'GV102', grievance: 'Road Repair Needed', area: 'Ganeshnagar', department: 'Road', status: 'Completed' },
    { id: 'GV103', grievance: 'Electricity Outage', area: 'Rajahmundry', department: 'Electricity', status: 'Current' },
    { id: 'GV104', grievance: 'Street Light Issue', area: 'Vijayawada', department: 'Electricity', status: 'Ongoing' },
    { id: 'GV105', grievance: 'Drainage Problem', area: 'Visakhapatnam', department: 'Water', status: 'Current' },
    { id: 'GV106', grievance: 'Bridge Construction', area: 'Tirupati', department: 'Road', status: 'Completed' }
  ]);

  const [filteredGrievances, setFilteredGrievances] = useState(grievances);
  
  const profileRef = useRef(null);
  const filterRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const togglePlanSubmenu = () => {
    setPlanExpanded(!planExpanded);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const toggleFilterDropdown = () => {
    console.log('Filter dropdown toggled:', !showFilterDropdown);
    setShowFilterDropdown(!showFilterDropdown);
  };

  const handleFilterSelect = (filter) => {
    console.log('Filter selected:', filter);
    setSelectedFilter(filter);
    setShowFilterDropdown(false);
    
    // Apply filter logic
    if (filter === 'Role') {
      // For grievances, we'll sort by status (similar to role)
      const sortedByStatus = [...grievances].sort((a, b) => a.status.localeCompare(b.status));
      setFilteredGrievances(sortedByStatus);
      console.log('Filtered by Status:', sortedByStatus);
    } else if (filter === 'Department') {
      // Sort by department alphabetically
      const sortedByDept = [...grievances].sort((a, b) => a.department.localeCompare(b.department));
      setFilteredGrievances(sortedByDept);
      console.log('Filtered by Department:', sortedByDept);
    } else if (filter === 'Location') {
      // Sort by area (location)
      const sortedByArea = [...grievances].sort((a, b) => a.area.localeCompare(b.area));
      setFilteredGrievances(sortedByArea);
      console.log('Filtered by Area:', sortedByArea);
    } else if (filter === 'Status') {
      // Sort by status
      const sortedByStatus = [...grievances].sort((a, b) => a.status.localeCompare(b.status));
      setFilteredGrievances(sortedByStatus);
      console.log('Filtered by Status:', sortedByStatus);
    } else {
      // Show all grievances
      setFilteredGrievances(grievances);
      console.log('No filter applied, showing all:', grievances);
    }
  };

  const handleAddGrievance = () => {
    setShowAddGrievanceModal(true);
  };

  const handleCloseModal = () => {
    setShowAddGrievanceModal(false);
    setShowSuccessModal(false);
    setFormData({
      constituency: '',
      department: '',
      address: '',
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
    console.log('Grievance data:', formData);
    
    // Close the form modal and show success modal
    setShowAddGrievanceModal(false);
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
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Set responsive search width
  useEffect(() => {
    const updateSearchWidth = () => {
      setSearchWidth(window.innerWidth <= 768 ? '50px' : '60px');
    };
    
    updateSearchWidth();
    window.addEventListener('resize', updateSearchWidth);
    
    return () => window.removeEventListener('resize', updateSearchWidth);
  }, []);

  return (
    <div className={`grievances-container ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      {/* Header/Navbar */}
      <header className="grievances-header">
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
      <aside className={`grievances-sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
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

          <div className="sidebar-item active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
            <span className="sidebar-text">Grievances</span>
          </div>

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
              <Link to="/news" className="sidebar-item submenu-item">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                <span className="sidebar-text">New</span>
              </Link>
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
        <main className="grievances-main">
          {/* Grievances Header */}
          <div className="grievances-header-section">
            <h1>Grievances</h1>
          </div>

          {/* Grievances Actions */}
          <div className="grievances-actions-section">
            <button className="add-grievances-btn" onClick={handleAddGrievance}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Grievances
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
                <input type="text" placeholder="Search" style={{
                  width: searchWidth, 
                  minWidth: searchWidth, 
                  maxWidth: searchWidth
                }} />
              </div>
              {selectedFilter && (
                <div className="active-filter-indicator">
                  <span>Filtered by: {selectedFilter}</span>
                  <button onClick={() => handleFilterSelect('')} style={{marginLeft: '8px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer'}}>×</button>
                </div>
              )}
              <div className="filter-icon" onClick={toggleFilterDropdown} ref={filterRef} style={{ cursor: 'pointer' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
                </svg>
                {showFilterDropdown && <span style={{color: 'red', fontSize: '10px'}}>▼</span>}
                
                {showFilterDropdown && (
                  <div className="filter-dropdown">
                    <div className="filter-option" onClick={() => handleFilterSelect('Role')}>
                      <span className="radio-icon">{selectedFilter === 'Role' ? '●' : 'O'}</span>
                      <span>Role</span>
                    </div>
                    <div className="filter-option" onClick={() => handleFilterSelect('Location')}>
                      <span className="radio-icon">{selectedFilter === 'Location' ? '●' : 'O'}</span>
                      <span>Location</span>
                    </div>
                    <div className="filter-option" onClick={() => handleFilterSelect('Status')}>
                      <span className="radio-icon">{selectedFilter === 'Status' ? '●' : 'O'}</span>
                      <span>Status</span>
                    </div>
                    <div className="filter-option" onClick={() => handleFilterSelect('Department')}>
                      <span className="radio-icon">{selectedFilter === 'Department' ? '●' : 'O'}</span>
                      <span>Department</span>
                    </div>
                    <div className="filter-option" onClick={() => handleFilterSelect('')}>
                      <span className="radio-icon">O</span>
                      <span>Clear Filter</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content Row - Past Search History and Status Cards */}
          <div className="content-row">
            {/* Past Search History - Left Side */}
            <div className="search-history-section">
              <h3>Past Search History</h3>
              <div className="search-tags">
                <span className="search-tag">Ganeshnagar</span>
                <span className="search-tag">Water Problem</span>
                <span className="search-tag">Water Problem</span>
                <span className="search-tag">Current Problem</span>
              </div>
            </div>

            {/* Grievances Status Cards - Right Side */}
            <div className="status-cards-section">
              <div className="status-card">
                <h3>Grievances Status</h3>
                <div className="pie-chart-container">
                  <div className="pie-chart">
                    <div className="pie-segment current" style={{'--percentage': '25%'}}></div>
                    <div className="pie-segment ongoing" style={{'--percentage': '35%'}}></div>
                    <div className="pie-segment completed" style={{'--percentage': '40%'}}></div>
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
                    <div className="pie-segment current" style={{'--percentage': '25%'}}></div>
                    <div className="pie-segment ongoing" style={{'--percentage': '35%'}}></div>
                    <div className="pie-segment completed" style={{'--percentage': '40%'}}></div>
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

          {/* Grievances Table (Unified Card) */}
          <div className="grievances-table-container unified" style={{ marginTop: showFilterDropdown ? '120px' : '0' }}>
            <div className="table-header">
              <h2>Grievances</h2>
            </div>
            <div className="grievances-table">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Grievance</th>
                    <th>Area</th>
                    <th>Department</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGrievances.map((grievance) => (
                    <tr key={grievance.id}>
                      <td>{grievance.id}</td>
                      <td>{grievance.grievance}</td>
                      <td>{grievance.area}</td>
                      <td>{grievance.department}</td>
                      <td>
                        <span className={`status ${grievance.status.toLowerCase()}`}>
                          {grievance.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Create New Grievance Modal */}
        {showAddGrievanceModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Grievance</h2>
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
                  <label htmlFor="constituency">Constituency</label>
                  <input
                    type="text"
                    id="constituency"
                    name="constituency"
                    value={formData.constituency}
                    onChange={handleInputChange}
                    placeholder="Enter Constituency"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    placeholder="Enter Category"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="Street, City, Pin"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="title">Grievance Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Title"
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
                <button type="submit" className="submit-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    <polygon points="22,2 15,22 11,13 2,9 22,2"></polygon>
                  </svg>
                  Submit
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
              <h3>Grievances Added Successfully</h3>
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

export default Grievances;
