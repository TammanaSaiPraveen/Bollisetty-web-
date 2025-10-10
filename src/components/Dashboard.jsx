import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';
import Calendar from './Calendar';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';
import fullLogo from '../assets/Images/fulllogo.png';
import apImage from '../assets/Images/AP.png';
import streetLightImg from '../assets/Images/Street_Light.png';
import waterSupplyImg from '../assets/Images/Water_Supply1.png';
import potholesImg from '../assets/Images/potholes.png';

const Dashboard = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [planExpanded, setPlanExpanded] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const profileRef = useRef(null);

  // Sample events for the calendar
  const calendarEvents = [
    {
      id: 1,
      title: "CM Camp Office Meeting",
      date: new Date().toISOString(),
      type: "meeting"
    },
    {
      id: 2,
      title: "Public Hearing",
      date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      type: "public"
    },
    {
      id: 3,
      title: "Infrastructure Review",
      date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
      type: "review"
    }
  ];

  const handleDateSelect = (selectedDate) => {
    console.log('Selected date:', selectedDate);
    // You can add logic here to show events for the selected date
  };

  const toggleSidebar = () => {
    setSidebarExpanded(!sidebarExpanded);
  };

  const togglePlanSubmenu = () => {
    setPlanExpanded(!planExpanded);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
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
    <div className={`dashboard-container ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      {/* Header/Navbar */}
      <header className="dashboard-header">
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
                <Link to="/profile" className="profile-dropdown-item" onClick={() => setShowProfileDropdown(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>My Profile</span>
                </Link>
                <Link to="/settings" className="profile-dropdown-item" onClick={() => setShowProfileDropdown(false)}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <span>Settings</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarExpanded ? 'expanded' : 'collapsed'}`}>
        {/* Hamburger Menu */}
        <div className="sidebar-hamburger" onClick={toggleSidebar}>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
            </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          <div className="sidebar-item active">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
            <span className="sidebar-text">Dashboard</span>
              </div>

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
        <main className="dashboard-main">
        {/* Dashboard Header */}
        <div className="dashboard-header-section">
            <h1>Dashboard</h1>
          </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          {/* Three-Section Layout */}
          <div className="three-section-layout">
            {/* Top Left Section - Summary Cards + Notifications (First Image) */}
            <div className="top-left-section">
              {/* Summary Cards */}
              <div className="summary-cards-row">
                <div className="summary-card active-voters">
                  <div className="card-icon green">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3>Active Voters</h3>
                    <p className="card-number green">30000</p>
                  </div>
                </div>
                
                <div className="summary-card ongoing-process">
                  <div className="card-icon red">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                      <polyline points="14,2 14,8 20,8"></polyline>
                      <line x1="16" y1="13" x2="8" y2="13"></line>
                      <line x1="16" y1="17" x2="8" y2="17"></line>
                      <polyline points="10,9 9,9 8,9"></polyline>
                    </svg>
                  </div>
                  <div className="card-content">
                    <h3>Ongoing Process</h3>
                    <p className="card-number red">10+</p>
                  </div>
                </div>
              </div>

              {/* Notifications Section */}
              <div className="notifications-section">
                <div className="notifications-header">
                  <div className="notifications-title">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <h2>Notifications</h2>
                  </div>
                  <div className="notifications-divider"></div>
                </div>
                
                <div className="notification-cards">
                <div className="notification-card">
                    <div className="notification-image">
                      <img src={streetLightImg} alt="Street Light" />
                    </div>
                    <div className="notification-content">
                      <h4>StreetLight Not Working</h4>
                      <p>Submitted on 29 Jul 2025</p>
                    </div>
                  </div>
                  
                  <div className="notification-card">
                    <div className="notification-image">
                      <img src={waterSupplyImg} alt="Water Supply" />
                    </div>
                    <div className="notification-content">
                      <h4>Water Supply Disruption</h4>
                      <p>Submitted on 02 Aug 2025</p>
                    </div>
                  </div>
                  
                  <div className="notification-card">
                    <div className="notification-image">
                      <img src={potholesImg} alt="Potholes" />
                    </div>
                    <div className="notification-content">
                      <h4>Potholes on MG Road</h4>
                      <p>Submitted on 30 Jul 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

             {/* Top Right Section - Calendar + Schedule + News */}
             <div className="top-right-section">
               {/* Calendar Widget */}
               <Calendar 
                 events={calendarEvents}
                 onDateSelect={handleDateSelect}
               />

               {/* Today's Schedule Section */}
               <div className="schedule-section">
                 <div className="section-header">
                   <h2>Today's Schedule</h2>
                   <span className="view-more">View More</span>
                 </div>
                 
                 <div className="schedule-cards">
                   <div className="schedule-card">
                     <h4>Meet at CM Camp Office</h4>
                     <p className="location">Velangapudi, Amaravathi, AP</p>
                     <p className="time">09:00 AM - 12:00PM</p>
                   </div>
                   
                   <div className="schedule-card">
                     <h4>Farmers</h4>
                     <p className="time">09:00 AM - 12:00PM</p>
                   </div>
                   
                   <div className="schedule-card">
                     <h4>Farmers</h4>
                     <p className="time">09:00 AM - 12:00PM</p>
                   </div>
                 </div>
               </div>

               {/* News Section */}
               <div className="news-section">
                 <div className="section-header">
                   <h2>News</h2>
                   <span className="view-more">View More</span>
                 </div>
                 
                <div className="news-card">
                  <div className="news-image">
                    <img src={waterSupplyImg} alt="Water Supply" />
                  </div>
                  <div className="news-content">
                    <h4>Water Supply Disruption</h4>
                    <p>Submitted on 02 Aug 2025</p>
                  </div>
                </div>
               </div>
             </div>

            {/* Bottom Section - Grievances Table (Third Image) */}
            <div className="bottom-section">
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
                        <td>Ongoing</td>
                      </tr>
                      <tr>
                        <td>GV101</td>
                        <td>Water Supply Disruption</td>
                        <td>Tadepaligudem</td>
                        <td>Water</td>
                        <td>Completed</td>
                      </tr>
                    </tbody>
                  </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    </div>
  );
};

export default Dashboard;
