import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';
import fullLogo from '../assets/Images/fulllogo.png';
import apImage from '../assets/Images/AP.png';
import streetLightImg from '../assets/Images/Street_Light.png';
import waterSupplyImg from '../assets/Images/Water_Supply1.png';
import potholesImg from '../assets/Images/potholes.png';
import activeVotersIcon from '../assets/icons/Frame 1321318358.png';
import ongoingProcessIcon from '../assets/icons/Frame 1321318358 (2).png';

const Dashboard = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [planExpanded, setPlanExpanded] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
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

  const sidebarWidthPx = sidebarExpanded ? 200 : 60; // match legacy CSS widths
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth()); // 0-11
  const todayDate = now.getDate();
  const isViewingCurrentMonth = viewYear === now.getFullYear() && viewMonth === now.getMonth();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay(); // 0 (Sun) - 6 (Sat)
  const monthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(viewYear, viewMonth, 1));

  const goPrevMonth = () => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1);
        return 11;
      }
      return m - 1;
    });
  };

  const goNextMonth = () => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1);
        return 0;
      }
      return m + 1;
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-[Inter,Segoe_UI,Tahoma,Geneva,Verdana,sans-serif]">
      {/* Header/Navbar */}
      <header
        className="fixed top-0 right-0 h-[60px] flex items-center justify-between px-6 bg-white/80 shadow z-[1000] transition-all"
        style={{ left: sidebarWidthPx }}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <img src={fullLogo} alt="Logo" className="w-[200px] h-auto object-contain" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center text-gray-800 cursor-pointer rounded-md transition relative hover:bg-white/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white/80"></div>
          </div>
          <div
            className="w-10 h-10 flex items-center justify-center text-gray-800 cursor-pointer rounded-md transition relative hover:bg-white/10"
            onClick={toggleProfileDropdown}
            ref={profileRef}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            {showProfileDropdown && (
              <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-[1000] mt-2 min-w-48 overflow-hidden">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>My Profile</span>
                </Link>
                <Link to="/posts" className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14,2 14,8 20,8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10,9 9,9 8,9"></polyline>
                  </svg>
                  <span>My Posts</span>
                </Link>
                <div className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500">
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
      <aside
        className="fixed top-0 left-0 h-screen bg-amber-400 z-[1001] transition-all flex flex-col"
        style={{ width: sidebarWidthPx }}
      >
        {/* Hamburger Menu */}
        <div className="p-4 cursor-pointer flex flex-col gap-1 items-center justify-center border-b border-black/10" onClick={toggleSidebar}>
          <div className="w-5 h-0.5 bg-gray-800"></div>
          <div className="w-5 h-0.5 bg-gray-800"></div>
          <div className="w-5 h-0.5 bg-gray-800"></div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col py-2">
          <div className="flex items-center p-4 text-gray-800 relative border-none bg-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Dashboard</span>
          </div>

          <Link to="/users" className="flex items-center p-4 text-gray-800 hover:bg-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Manage Users</span>
          </Link>

          <Link to="/grievances" className="flex items-center p-4 text-gray-800 hover:bg-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Grievances</span>
          </Link>

          <div className="flex items-center p-4 text-gray-800 hover:bg-white/30 cursor-pointer relative" onClick={togglePlanSubmenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Plan</span>
            {sidebarExpanded && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`ml-auto transition-transform ${planExpanded ? 'rotate-180' : ''}`}
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            )}
          </div>

          {planExpanded && sidebarExpanded && (
            <div className="ml-5 mt-1 flex flex-col gap-1">
              <Link to="/schedule" className="flex items-center px-4 py-3 text-sm bg-white/10 rounded-md mx-2 hover:bg-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span className="ml-3 text-sm font-medium">Schedule</span>
              </Link>
              <Link to="/news" className="flex items-center px-4 py-3 text-sm bg-white/10 rounded-md mx-2 hover:bg-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
                <span className="ml-3 text-sm font-medium">New</span>
              </Link>
            </div>
          )}

          <Link to="/development" className="flex items-center p-4 text-gray-800 hover:bg-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Development</span>
          </Link>
        </nav>

        {/* Logout Button - positioned at bottom */}
        <div className="mt-auto p-2">
          <div className="flex items-center justify-center p-4 text-gray-800 rounded-md hover:bg-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16,17 21,12 16,7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className="relative z-[1] min-h-screen p-8 pt-20 transition-all"
        style={{ marginLeft: sidebarWidthPx, backgroundImage: `url(${apImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
      >
        {/* Dashboard Header */}
        <div className="mb-6">
          <h1 className="text-[1.75rem] font-bold text-gray-800 m-0">Dashboard</h1>
        </div>

        {/* Dashboard Content */}
        <div className="mb-8">
          {/* Three-Section Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto] gap-8 min-h-[60vh]">
            {/* Top Left Section - Summary Cards + Notifications */}
            <div className="flex flex-col gap-8">
              {/* Summary Cards */}
              <div className="flex flex-col md:flex-row gap-6 mb-4">
                <div className="rounded-xl p-6 shadow-md flex items-center gap-4 flex-1" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                  <div className="flex items-center justify-center">
                    <img src={activeVotersIcon} alt="Active Voters" className="w-12 h-12 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 m-0 mb-2">Active Voters</h3>
                    <p className="text-2xl font-bold text-emerald-500 m-0 leading-none">30000</p>
                  </div>
                </div>

                <div className="rounded-xl p-6 shadow-md flex items-center gap-4 flex-1" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                  <div className="flex items-center justify-center">
                    <img src={ongoingProcessIcon} alt="Ongoing Process" className="w-12 h-12 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 m-0 mb-2">Ongoing Process</h3>
                    <p className="text-2xl font-bold text-red-500 m-0 leading-none">10+</p>
                  </div>
                </div>
              </div>

              {/* Notifications Section */}
              <div className="rounded-xl p-6 backdrop-saturate-[1.2] backdrop-blur-[2px] mb-8" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black w-5 h-5">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <h2 className="text-black text-xl font-bold m-0">Notifications</h2>
                  </div>
                  <div className="h-px bg-gray-200 w-full"></div>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="rounded-xl p-4 shadow-sm flex items-center gap-4 border border-gray-100" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                    <div className="w-15 h-15 rounded-lg overflow-hidden">
                      <img src={streetLightImg} alt="Street Light" className="w-[60px] h-[60px] object-cover block rounded" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-black m-0 mb-1">StreetLight Not Working</h4>
                      <p className="text-sm text-gray-500 m-0">Submitted on 29 Jul 2025</p>
                    </div>
                  </div>

                  <div className="rounded-xl p-4 shadow-sm flex items-center gap-4 border border-gray-100" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                    <div className="w-15 h-15 rounded-lg overflow-hidden">
                      <img src={waterSupplyImg} alt="Water Supply" className="w-[60px] h-[60px] object-cover block rounded" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-black m-0 mb-1">Water Supply Disruption</h4>
                      <p className="text-sm text-gray-500 m-0">Submitted on 02 Aug 2025</p>
                    </div>
                  </div>

                  <div className="rounded-xl p-4 shadow-sm flex items-center gap-4 border border-gray-100" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                    <div className="w-15 h-15 rounded-lg overflow-hidden">
                      <img src={potholesImg} alt="Potholes" className="w-[60px] h-[60px] object-cover block rounded" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-black m-0 mb-1">Potholes on MG Road</h4>
                      <p className="text-sm text-gray-500 m-0">Submitted on 30 Jul 2025</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Right Section - Calendar + Schedule + News */}
            <div className="grid grid-cols-1 md:grid-cols-2 grid-rows-[auto_auto] gap-8">
              {/* Calendar Widget */}
              <div className="bg-gray-900 rounded-xl p-6 text-white relative h-[300px] overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <button onClick={goPrevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10" aria-label="Previous Month">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15,18 9,12 15,6"></polyline></svg>
                  </button>
                  <h3 className="text-2xl font-bold m-0">{monthName} {viewYear}</h3>
                  <button onClick={goNextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10" aria-label="Next Month">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9,18 15,12 9,6"></polyline></svg>
                  </button>
                </div>
                <div className="h-[calc(100%-2.5rem)] overflow-hidden">
                  <div className="grid grid-cols-7 gap-1 mb-1 text-[10px] md:text-xs text-gray-300">
                    {['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].map((d) => (
                      <div key={`wd-${d}`} className="text-center font-medium leading-none py-1">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: firstWeekday }).map((_, i) => (
                      <div key={`lead-${i}`} className="aspect-square" />
                    ))}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const isToday = isViewingCurrentMonth && dayNum === todayDate;
                      return (
                        <div
                          key={`day-${dayNum}`}
                          className={`text-center p-2 text-[11px] md:text-sm rounded-md aspect-square flex items-center justify-center ${isToday ? 'bg-blue-500 text-white ring-2 ring-white' : 'text-white/90 hover:bg-white/10'}`}
                        >
                          {dayNum}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Today's Schedule Section */}
              <div className="border border-white/60 rounded-2xl p-4 shadow-lg flex flex-col backdrop-blur-sm h-[300px] overflow-hidden" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-800 m-0">Today's Schedule</h2>
                  <Link to="/schedule" className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">View More</Link>
                </div>
                <div className="flex flex-col gap-2 justify-start">
                  <div className="rounded-xl shadow-md border border-gray-200 px-3 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                    <h4 className="text-[14px] font-semibold text-gray-900 m-0 mb-0.5">Meet at CM Camp Office</h4>
                    <p className="text-[11px] text-gray-500 m-0">Location: Velangapudi, Amaravathi, AP</p>
                    <p className="text-[11px] text-gray-500 m-0 mt-0.5">09:00 AM - 12:00PM</p>
                  </div>
                  <div className="rounded-xl shadow-md border border-gray-200 px-3 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                    <h4 className="text-[14px] font-semibold text-gray-900 m-0 mb-0.5">Farmers</h4>
                    <p className="text-[11px] text-gray-500 m-0">09:00 AM - 12:00PM</p>
                  </div>
                  <div className="rounded-xl shadow-md border border-gray-200 px-3 py-2" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                    <h4 className="text-[14px] font-semibold text-gray-900 m-0 mb-0.5">Farmers</h4>
                    <p className="text-[11px] text-gray-500 m-0">09:00 AM - 12:00PM</p>
                  </div>
                </div>
              </div>

              {/* News Section */}
              <div className="rounded-xl p-4 backdrop-saturate-[1.2] backdrop-blur-[2px] md:col-span-2 mb-0" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-800 m-0">News</h2>
                  <Link to="/news" className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">View More</Link>
                </div>
                <div className="rounded-lg p-3 shadow-sm flex items-center gap-4 border border-gray-100 mb-0" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                  <div className="w-[60px] h-[60px] rounded-lg overflow-hidden">
                    <img src={waterSupplyImg} alt="Water Supply" className="w-full h-full object-cover block" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 m-0 mb-1">Water Supply Disruption</h4>
                    <p className="text-sm text-gray-500 m-0">Submitted on 02 Aug 2025</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Grievances Table */}
            <div className="md:col-span-2 flex flex-col">
              <div className="rounded-xl p-6 backdrop-saturate-[1.2] backdrop-blur-[2px] mb-8" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800 m-0">Grievances</h2>
                  <Link to="/grievances" className="text-sm text-gray-500 cursor-pointer hover:text-gray-700 transition-colors">View More</Link>
                </div>
                <div className="rounded-xl overflow-hidden">
                  <table className="w-full border-collapse bg-transparent">
                    <thead>
                      <tr>
                        {['ID','Grievance','Area','Department','Status'].map((th) => (
                          <th key={th} className="px-4 py-4 text-left font-semibold text-gray-700 border-b border-gray-200 backdrop-saturate-[1.2] backdrop-blur-[2px]" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>{th}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['GV101','Water Supply Disruption','Tadepaligudem','Water','Ongoing'],
                        ['GV102','Street Light Not Working','Ganeshnagar','Electricity','Completed'],
                        ['GV103','Potholes on MG Road','Amaravathi','Roads','Ongoing'],
                        ['GV104','Garbage Collection Issue','Velangapudi','Sanitation','Pending'],
                        ['GV105','Drainage Problem','Tadepaligudem','Public Works','Ongoing'],
                        ['GV106','Power Outage','Ganeshnagar','Electricity','Completed'],
                        ['GV107','Road Repair Required','Amaravathi','Roads','Pending'],
                        ['GV108','Water Pipeline Leak','Velangapudi','Water','Ongoing'],
                      ].map((row, idx) => (
                        <tr key={idx}>
                          {row.map((cell, cidx) => (
                            <td key={cidx} className="px-4 py-4 border-b border-gray-200 text-gray-700 backdrop-saturate-[1.2] backdrop-blur-[2px]" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>{cell}</td>
                          ))}
                        </tr>
                      ))}
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
