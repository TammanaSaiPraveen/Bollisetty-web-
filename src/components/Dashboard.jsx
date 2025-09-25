import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';
import apImage from '../assets/Images/AP.png';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [planExpanded, setPlanExpanded] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const togglePlanSubmenu = () => {
    setPlanExpanded(!planExpanded);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
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
          <div className="header-icon profile-icon" onClick={toggleProfileDropdown} ref={profileRef}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {profileDropdownOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-item">My Profile</div>
                <div className="dropdown-item">My Posts</div>
                <div className="dropdown-item">Settings</div>
              </div>
            )}
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
              <div className="mobile-menu-item active">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Dashboard</span>
              </div>
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

      <div className="dashboard-content">
        {/* Sidebar */}
        <aside className="dashboard-sidebar">
          <div className="sidebar-icon active">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
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
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <div className="sidebar-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </div>
          <Link to="/development" className="sidebar-icon logout">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </Link>
        </aside>

        {/* Main Content */}
        <main className="dashboard-main">
          <div className="dashboard-title">
            <h1>Dashboard</h1>
          </div>

          {/* Top Row */}
          <div className="dashboard-top-row">
            {/* Left Side - Stats Cards and Notifications */}
            <div className="left-column">
              {/* Stats Cards */}
              <div className="left-stats">
                {/* Active Voters Card */}
                <div className="stats-card active-voters">
                  <div className="stats-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="stats-content">
                    <h3>Active Voters</h3>
                    <div className="stats-number">30000</div>
                  </div>
                </div>

                {/* Ongoing Process Card */}
                <div className="stats-card ongoing-process">
                  <div className="stats-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10,9 9,9 8,9"></polyline>
                    </svg>
                  </div>
                  <div className="stats-content">
                    <h3>Ongoing Process</h3>
                    <div className="stats-number">10+</div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="notifications-section">
                <div className="section-header">
                  <div className="section-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <h2>Notifications</h2>
                  </div>
                </div>
                <div className="notifications-list">
                  <div className="notification-item">
                    <div className="notification-image">
                      <div className="image-placeholder"></div>
                    </div>
                    <div className="notification-content">
                      <h4>StreetLight Not Working</h4>
                      <p>Submitted on 29 Jul 2025</p>
                    </div>
                  </div>
                  <div className="notification-item">
                    <div className="notification-image">
                      <div className="image-placeholder"></div>
                    </div>
                    <div className="notification-content">
                      <h4>Water Supply Disruption</h4>
                      <p>Submitted on 02 Aug 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Calendar and Schedule */}
            <div className="right-column">
              {/* Calendar Widget */}
              <div className="calendar-widget">
                <div className="calendar-header">
                  <h3>September</h3>
                  <div className="calendar-nav">
                    <button>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15,18 9,12 15,6"></polyline>
                      </svg>
                    </button>
                    <button>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6"></polyline>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="calendar-grid">
                  <div className="calendar-weekdays">
                    <div>Mo</div>
                    <div>Tu</div>
                    <div>We</div>
                    <div>Th</div>
                    <div>Fr</div>
                    <div>Sa</div>
                    <div>Su</div>
                  </div>
                  <div className="calendar-dates">
                    <div className="calendar-week">
                      <div className="week-number">36</div>
                      <div className="date">1</div>
                      <div className="date">2</div>
                      <div className="date">3</div>
                      <div className="date">4</div>
                      <div className="date">5</div>
                      <div className="date">6</div>
                      <div className="date">7</div>
                    </div>
                    <div className="calendar-week">
                      <div className="week-number">37</div>
                      <div className="date">8</div>
                      <div className="date">9</div>
                      <div className="date">10</div>
                      <div className="date">11</div>
                      <div className="date">12</div>
                      <div className="date current">13</div>
                      <div className="date">14</div>
                    </div>
                    <div className="calendar-week">
                      <div className="week-number">38</div>
                      <div className="date">15</div>
                      <div className="date">16</div>
                      <div className="date">17</div>
                      <div className="date">18</div>
                      <div className="date">19</div>
                      <div className="date">20</div>
                      <div className="date">21</div>
                    </div>
                    <div className="calendar-week">
                      <div className="week-number">39</div>
                      <div className="date">22</div>
                      <div className="date">23</div>
                      <div className="date">24</div>
                      <div className="date">25</div>
                      <div className="date">26</div>
                      <div className="date">27</div>
                      <div className="date">28</div>
                    </div>
                    <div className="calendar-week">
                      <div className="week-number">40</div>
                      <div className="date">29</div>
                      <div className="date">30</div>
                      <div className="date"></div>
                      <div className="date"></div>
                      <div className="date"></div>
                      <div className="date"></div>
                      <div className="date"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Schedule */}
              <div className="schedule-section">
                <div className="section-header">
                  <h2>Today's Schedule</h2>
                  <a href="#" className="view-more">View More</a>
                </div>
                <div className="schedule-list">
                  <div className="schedule-item">
                    <div className="schedule-content">
                      <h4>Meet at CM Camp Office</h4>
                      <p className="schedule-location">Location: Velangapudi, Amaravathi, AP</p>
                      <p className="schedule-time">Time: 09:00 AM - 12:00PM</p>
                    </div>
                  </div>
                  <div className="schedule-item">
                    <div className="schedule-content">
                      <h4>Farmers</h4>
                      <p className="schedule-time">Time: 09:00 AM - 12:00PM</p>
                    </div>
                  </div>
                  <div className="schedule-item">
                    <div className="schedule-content">
                      <h4>Farmers</h4>
                      <p className="schedule-time">Time: 09:00 AM - 12:00PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* News Section */}
          <div className="news-section">
            <div className="section-header">
              <h2>News</h2>
              <a href="#" className="view-more">View More</a>
            </div>
            <div className="news-list">
              <div className="news-item">
                <div className="news-image">
                  <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=120&h=120&fit=crop&crop=center" alt="Water Supply" />
                </div>
                <div className="news-content">
                  <h4>Water Supply Disruption</h4>
                  <p>Submitted on 02 Aug 2025</p>
                </div>
              </div>
              <div className="news-item">
                <div className="news-image">
                  <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=120&h=120&fit=crop&crop=center" alt="Road Construction" />
                </div>
                <div className="news-content">
                  <h4>Road Construction Update</h4>
                  <p>Submitted on 01 Aug 2025</p>
                </div>
              </div>
              <div className="news-item">
                <div className="news-image">
                  <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=120&h=120&fit=crop&crop=center" alt="Electricity" />
                </div>
                <div className="news-content">
                  <h4>Power Grid Maintenance</h4>
                  <p>Submitted on 31 Jul 2025</p>
                </div>
              </div>
              <div className="news-item">
                <div className="news-image">
                  <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=120&h=120&fit=crop&crop=center" alt="Healthcare" />
                </div>
                <div className="news-content">
                  <h4>New Health Center Opening</h4>
                  <p>Submitted on 30 Jul 2025</p>
                </div>
              </div>
            </div>
          </div>

          {/* Grievances Table */}
          <div className="grievances-section">
            <div className="section-header">
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
                    <td><span className="status ongoing">Ongoing</span></td>
                  </tr>
                  <tr>
                    <td>GV102</td>
                    <td>Water Supply Disruption</td>
                    <td>Tadepaligudem</td>
                    <td>Water</td>
                    <td><span className="status completed">Completed</span></td>
                  </tr>
                  <tr>
                    <td>GV103</td>
                    <td>Water Supply Disruption</td>
                    <td>Tadepaligudem</td>
                    <td>Water</td>
                    <td><span className="status ongoing">Ongoing</span></td>
                  </tr>
                  <tr>
                    <td>GV104</td>
                    <td>Water Supply Disruption</td>
                    <td>Tadepaligudem</td>
                    <td>Water</td>
                    <td><span className="status completed">Completed</span></td>
                  </tr>
                  <tr>
                    <td>GV105</td>
                    <td>Water Supply Disruption</td>
                    <td>Tadepaligudem</td>
                    <td>Water</td>
                    <td><span className="status ongoing">Ongoing</span></td>
                  </tr>
                  <tr>
                    <td>GV106</td>
                    <td>Water Supply Disruption</td>
                    <td>Tadepaligudem</td>
                    <td>Water</td>
                    <td><span className="status not-started">Not started Yet</span></td>
                  </tr>
                  <tr>
                    <td>GV107</td>
                    <td>Water Supply Disruption</td>
                    <td>Tadepaligudem</td>
                    <td>Water</td>
                    <td><span className="status completed">Completed</span></td>
                  </tr>
                  <tr>
                    <td>GV108</td>
                    <td>Water Supply Disruption</td>
                    <td>Tadepaligudem</td>
                    <td>Water</td>
                    <td><span className="status not-started">Not started Yet</span></td>
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

export default Dashboard;
