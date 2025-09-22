import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Reports.css';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';

const Reports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [planExpanded, setPlanExpanded] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const togglePlanSubmenu = () => {
    setPlanExpanded(!planExpanded);
  };

  return (
    <div className="reports-container">
      {/* Header */}
      <header className="reports-header">
        <div className="header-left">
          <div className="hamburger-menu" onClick={toggleSidebar}>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </div>
          <div className="header-logo">
            <img src={logoImage} alt="Logo" className="header-logo-image" />
            <span className="header-brand-name">మన బొలిశెట్టి</span>
          </div>
        </div>
        <div className="header-right">
          <div className="header-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <div className="header-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
          <div className="header-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="sidebar-overlay" onClick={toggleSidebar}>
          <div className="mobile-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-sidebar-header">
              <img src={logoImage} alt="Logo" className="mobile-sidebar-logo" />
              <span className="mobile-sidebar-title">మన బొలిశెట్టి</span>
              <button className="close-sidebar" onClick={toggleSidebar}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="mobile-sidebar-menu">
              <Link to="/dashboard" className="mobile-menu-item active">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Dashboard</span>
              </Link>
              <Link to="/users" className="mobile-menu-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>Manage Users</span>
              </Link>
              <Link to="/grievances" className="mobile-menu-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                <span>Grievances</span>
              </Link>
              <div className="mobile-menu-item" onClick={togglePlanSubmenu}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>Plan</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`submenu-arrow ${planExpanded ? 'expanded' : ''}`}>
                  <polyline points="6,9 12,15 18,9"></polyline>
                </svg>
              </div>
              {planExpanded && (
                <div className="submenu">
                  <Link to="/schedule" className="mobile-menu-item submenu-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    <span>Schedule</span>
                  </Link>
                  <Link to="/news" className="mobile-menu-item submenu-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                    </svg>
                    <span>News</span>
                  </Link>
                </div>
              )}
              <Link to="/development" className="mobile-menu-item">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Development</span>
              </Link>
              <div className="mobile-menu-item logout">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16,17 21,12 16,7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                <span>Logout</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="reports-content">
        {/* Sidebar */}
        <aside className="reports-sidebar">
          <Link to="/dashboard" className="sidebar-icon active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </Link>
          <Link to="/users" className="sidebar-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </Link>
          <Link to="/grievances" className="sidebar-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
          </Link>
          <div className="sidebar-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12,6 12,12 16,14"></polyline>
            </svg>
          </div>
          <Link to="/reports" className="sidebar-icon active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
          </Link>
          <Link to="/development" className="sidebar-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </Link>
          <div className="sidebar-icon logout">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16,17 21,12 16,7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </div>
        </aside>

        {/* Main Content */}
        <main className="reports-main">
          {/* Grievances Header */}
          <div className="grievances-header-section">
            <h1>Grievances</h1>
          </div>

          {/* Grievances Actions */}
          <div className="grievances-actions-section">
            <button className="add-grievances-btn">
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
                <input type="text" placeholder="Search" />
              </div>
              <button className="filter-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon>
                </svg>
              </button>
            </div>
          </div>

          {/* Past Search History */}
          <div className="search-history-section">
            <div className="search-history-card">
              <h3>Past Search History</h3>
              <div className="search-tags">
                <span className="search-tag">Ganeshnagar</span>
                <span className="search-tag">Water Problem</span>
                <span className="search-tag">Water Problem</span>
                <span className="search-tag">Current Problem</span>
              </div>
            </div>
          </div>

          {/* Content Row - Past Search History and Status Cards */}
          <div className="content-row">
            {/* Past Search History - Left Side */}
            <div className="search-history-section">
              <div className="search-history-card">
                <h3>Past Search History</h3>
                <div className="search-tags">
                  <span className="search-tag">Ganeshnagar</span>
                  <span className="search-tag">Water Problem</span>
                  <span className="search-tag">Water Problem</span>
                  <span className="search-tag">Current Problem</span>
                </div>
              </div>
            </div>

            {/* Grievances Status Cards - Right Side */}
            <div className="status-cards">
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

          {/* Grievances Table */}
          <div className="grievances-table-section">
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
                  <tr>
                    <td>GV101</td>
                    <td>Water Supply Disruption</td>
                    <td>Tadepaligudem</td>
                    <td>Water</td>
                    <td><span className="status ongoing">Ongoining</span></td>
                  </tr>
                  <tr>
                    <td>GV101</td>
                    <td>Water Supply Disruption</td>
                    <td>Tadepaligudem</td>
                    <td>Water</td>
                    <td><span className="status not-started">Not Stated Yet</span></td>
                  </tr>
                  <tr>
                    <td>GV101</td>
                    <td>Water Supply Disruption</td>
                    <td>Tadepaligudem</td>
                    <td>Water</td>
                    <td><span className="status completed">Completed</span></td>
                  </tr>
                  <tr>
                    <td>GV101</td>
                    <td>Water Supply Disruption</td>
                    <td>Tadepaligudem</td>
                    <td>Water</td>
                    <td><span className="status completed">Completed</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Reports;
