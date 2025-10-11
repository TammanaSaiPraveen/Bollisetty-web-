import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Calendar from './Calendar';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';
import fullLogo from '../assets/Images/fulllogo.png';
import apImage from '../assets/Images/AP.png';
import streetLightImg from '../assets/Images/Street_Light.png';
import waterSupplyImg from '../assets/Images/Water_Supply1.png';
import potholesImg from '../assets/Images/potholes.png';
import activeVotersIcon from '../assets/icons/Frame 1321318358.png';
import ongoingProcessIcon from '../assets/icons/Frame 1321318358 (1).png';
import notificationIconImg from '../assets/icons/Vector.png';
import profileIconImg from '../assets/icons/Vector (1).png';

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
    <div className={`min-h-screen bg-gray-100 font-inter ${sidebarExpanded ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      {/* Header/Navbar */}
      <header className={`bg-white bg-opacity-80 h-15 flex items-center justify-between px-6 shadow-sm fixed top-0 z-50 transition-all duration-300 ${sidebarExpanded ? 'left-50' : 'left-15'}`}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <img src={fullLogo} alt="Logo" className="w-50 h-auto object-contain" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center text-gray-700 cursor-pointer rounded-md transition-colors duration-200 relative hover:bg-white hover:bg-opacity-10">
            <img src={notificationIconImg} alt="Notifications" className="w-5 h-5 object-contain" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white border-opacity-80"></div>
          </div>
          <div className="w-10 h-10 flex items-center justify-center text-gray-700 cursor-pointer rounded-md transition-colors duration-200 relative hover:bg-white hover:bg-opacity-10" onClick={toggleProfileDropdown} ref={profileRef}>
            <img src={profileIconImg} alt="Profile" className="w-5 h-5 object-contain" />
            
            {showProfileDropdown && (
              <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-2 min-w-40 overflow-hidden">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer transition-colors duration-200 text-sm font-medium hover:bg-gray-50 hover:text-gray-900" onClick={() => setShowProfileDropdown(false)}>
                  <span>My Profile</span>
                </Link>
                <Link to="/settings" className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer transition-colors duration-200 text-sm font-medium hover:bg-gray-50 hover:text-gray-900" onClick={() => setShowProfileDropdown(false)}>
                  <span>Settings</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`bg-amber-400 fixed top-0 left-0 h-screen z-50 transition-all duration-300 flex flex-col ${sidebarExpanded ? 'w-50' : 'w-15'}`}>
        {/* Hamburger Menu */}
        <div className="p-4 cursor-pointer flex flex-col gap-1 items-center justify-center border-b border-black border-opacity-10" onClick={toggleSidebar}>
          <div className="w-5 h-0.5 bg-gray-800 transition-all duration-300"></div>
          <div className="w-5 h-0.5 bg-gray-800 transition-all duration-300"></div>
          <div className="w-5 h-0.5 bg-gray-800 transition-all duration-300"></div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col py-2">
          <div className="flex items-center p-4 text-gray-800 no-underline transition-all duration-200 relative border-none bg-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 w-6 h-6">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>Dashboard</span>
          </div>

          <Link to="/users" className="flex items-center p-4 text-gray-800 no-underline transition-all duration-200 relative border-none hover:bg-white hover:bg-opacity-30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 w-6 h-6">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>Manage Users</span>
          </Link>

          <Link to="/grievances" className="flex items-center p-4 text-gray-800 no-underline transition-all duration-200 relative border-none hover:bg-white hover:bg-opacity-30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 w-6 h-6">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>Grievances</span>
          </Link>

          <div className="flex items-center p-4 text-gray-800 cursor-pointer relative border-none hover:bg-white hover:bg-opacity-30" onClick={togglePlanSubmenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 w-6 h-6">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>Plan</span>
            {sidebarExpanded && (
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                className={`ml-auto transition-transform duration-200 ${planExpanded ? 'rotate-180' : ''}`}
              >
                <polyline points="6,9 12,15 18,9"></polyline>
              </svg>
            )}
          </div>
          
          {planExpanded && sidebarExpanded && (
            <div className="ml-5 mt-1 flex flex-col gap-1">
              <Link to="/schedule" className="flex items-center p-3 text-sm bg-white bg-opacity-10 rounded-md mx-2 hover:bg-white hover:bg-opacity-20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 w-5 h-5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span className="ml-3 text-sm font-medium">Schedule</span>
              </Link>
              <Link to="/news" className="flex items-center p-3 text-sm bg-white bg-opacity-10 rounded-md mx-2 hover:bg-white hover:bg-opacity-20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 w-5 h-5">
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

          <Link to="/development" className="flex items-center p-4 text-gray-800 no-underline transition-all duration-200 relative border-none hover:bg-white hover:bg-opacity-30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 w-6 h-6">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>Development</span>
          </Link>
        </nav>

        {/* Logout Button - positioned at bottom */}
        <div className="mt-auto p-2">
          <div className="flex items-center p-4 text-gray-800 cursor-pointer rounded-md justify-center border-none bg-transparent m-0 hover:bg-white hover:bg-opacity-30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 w-6 h-6">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16,17 21,12 16,7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>Logout</span>
          </div>
        </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 p-8 bg-cover bg-center bg-no-repeat min-h-screen relative z-10 ml-15 pt-20 transition-all duration-300 ${sidebarExpanded ? 'ml-50' : 'ml-15'}`} style={{ backgroundImage: `url(${apImage})` }}>
        {/* Dashboard Header */}
        <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800 m-0">Dashboard</h1>
          </div>

        {/* Dashboard Content */}
        <div className="mb-8">
          {/* Three-Section Layout */}
          <div className="grid grid-cols-2 gap-8 min-h-96">
            {/* Top Left Section - Summary Cards + Notifications (First Image) */}
            <div className="flex flex-col gap-4">
              {/* Summary Cards */}
              <div className="flex gap-5 mb-4">
                <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-green-500 text-white">
                    <img src={activeVotersIcon} alt="Active Voters" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 m-0 mb-2">Active Voters</h3>
                    <p className="text-3xl font-bold m-0 leading-none text-green-500">30000</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-red-500 text-white">
                    <img src={ongoingProcessIcon} alt="Ongoing Process" className="w-10 h-10 object-contain" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 m-0 mb-2">Ongoing Process</h3>
                    <p className="text-3xl font-bold m-0 leading-none text-red-500">10+</p>
                  </div>
                </div>
              </div>

              {/* Notifications Section */}
              <div className="bg-white bg-opacity-60 rounded-xl p-6 shadow-xl mb-8 backdrop-blur-sm border border-white border-opacity-80">
                <div className="mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <h2 className="text-2xl font-bold text-black m-0">Notifications</h2>
                  </div>
                  <div className="h-px bg-gray-200 w-full"></div>
                </div>
                
                <div className="flex flex-col gap-4">
                <div className="bg-white bg-opacity-95 rounded-2xl p-4 shadow-lg flex items-center gap-4 border border-black border-opacity-6 backdrop-blur-sm">
                    <div className="w-15 h-15 rounded-lg overflow-hidden">
                      <img src={streetLightImg} alt="Street Light" className="w-full h-full object-cover block" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-black m-0 mb-1">StreetLight Not Working</h4>
                      <p className="text-sm text-gray-500 m-0">Submitted on 29 Jul 2025</p>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-95 rounded-2xl p-4 shadow-lg flex items-center gap-4 border border-black border-opacity-6 backdrop-blur-sm">
                    <div className="w-15 h-15 rounded-lg overflow-hidden">
                      <img src={waterSupplyImg} alt="Water Supply" className="w-full h-full object-cover block" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-black m-0 mb-1">Water Supply Disruption</h4>
                      <p className="text-sm text-gray-500 m-0">Submitted on 02 Aug 2025</p>
                    </div>
                  </div>
                  
                  <div className="bg-white bg-opacity-95 rounded-2xl p-4 shadow-lg flex items-center gap-4 border border-black border-opacity-6 backdrop-blur-sm">
                    <div className="w-15 h-15 rounded-lg overflow-hidden">
                      <img src={potholesImg} alt="Potholes" className="w-full h-full object-cover block" />
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
             <div className="grid grid-cols-2 grid-rows-2 gap-8 h-auto">
               {/* Calendar Widget */}
               <div className="col-span-1 row-span-1">
                 <Calendar 
                   events={calendarEvents}
                   onDateSelect={handleDateSelect}
                 />
               </div>

               {/* Today's Schedule Section */}
               <div className="bg-white rounded-xl p-6 shadow-lg h-70 flex flex-col">
                 <div className="flex items-center justify-between mb-4">
                   <h2 className="text-xl font-bold text-gray-800 m-0">Today's Schedule</h2>
                   <span className="text-sm text-gray-500 cursor-pointer">View More</span>
                 </div>
                 
                 <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
                   <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                     <h4 className="text-base font-semibold text-gray-800 m-0 mb-2">Meet at CM Camp Office</h4>
                     <p className="text-sm text-gray-500 m-0 mb-1">Velangapudi, Amaravathi, AP</p>
                     <p className="text-sm text-gray-500 m-0">09:00 AM - 12:00PM</p>
                   </div>
                   
                   <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                     <h4 className="text-base font-semibold text-gray-800 m-0 mb-2">Farmers</h4>
                     <p className="text-sm text-gray-500 m-0">09:00 AM - 12:00PM</p>
                   </div>
                   
                   <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                     <h4 className="text-base font-semibold text-gray-800 m-0 mb-2">Farmers</h4>
                     <p className="text-sm text-gray-500 m-0">09:00 AM - 12:00PM</p>
                   </div>
                 </div>
               </div>

               {/* News Section */}
               <div className="col-span-2 row-span-1 bg-white bg-opacity-65 rounded-xl p-6 shadow-none mb-8 backdrop-blur-sm">
                 <div className="flex items-center justify-between mb-4">
                   <h2 className="text-xl font-bold text-gray-800 m-0">News</h2>
                   <span className="text-sm text-gray-500 cursor-pointer">View More</span>
                 </div>
                 
                <div className="bg-white rounded-lg p-4 shadow-sm flex items-center gap-4 border border-gray-100">
                  <div className="w-15 h-15 rounded-lg overflow-hidden">
                    <img src={waterSupplyImg} alt="Water Supply" className="w-full h-full object-cover block" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-gray-800 m-0 mb-1">Water Supply Disruption</h4>
                    <p className="text-sm text-gray-500 m-0">Submitted on 02 Aug 2025</p>
                  </div>
                </div>
               </div>
             </div>

            {/* Bottom Section - Grievances Table (Third Image) */}
            <div className="col-span-2 flex flex-col">
              <div className="bg-white bg-opacity-65 rounded-xl p-6 shadow-none mb-8 backdrop-blur-sm">
                <div className="mb-4">
                  <h2 className="text-xl font-bold text-gray-800 m-0">Grievances</h2>
                </div>
                
                <div className="bg-transparent rounded-xl overflow-hidden">
                  <table className="w-full border-collapse bg-transparent">
                    <thead>
                      <tr>
                        <th className="bg-white bg-opacity-65 p-4 text-left font-semibold text-gray-700 border-b border-gray-200 backdrop-blur-sm">ID</th>
                        <th className="bg-white bg-opacity-65 p-4 text-left font-semibold text-gray-700 border-b border-gray-200 backdrop-blur-sm">Grievance</th>
                        <th className="bg-white bg-opacity-65 p-4 text-left font-semibold text-gray-700 border-b border-gray-200 backdrop-blur-sm">Area</th>
                        <th className="bg-white bg-opacity-65 p-4 text-left font-semibold text-gray-700 border-b border-gray-200 backdrop-blur-sm">Department</th>
                        <th className="bg-white bg-opacity-65 p-4 text-left font-semibold text-gray-700 border-b border-gray-200 backdrop-blur-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-4 border-b border-gray-200 text-gray-700 bg-white bg-opacity-65 backdrop-blur-sm">GV101</td>
                        <td className="p-4 border-b border-gray-200 text-gray-700 bg-white bg-opacity-65 backdrop-blur-sm">Water Supply Disruption</td>
                        <td className="p-4 border-b border-gray-200 text-gray-700 bg-white bg-opacity-65 backdrop-blur-sm">Tadepaligudem</td>
                        <td className="p-4 border-b border-gray-200 text-gray-700 bg-white bg-opacity-65 backdrop-blur-sm">Water</td>
                        <td className="p-4 border-b border-gray-200 text-gray-700 bg-white bg-opacity-65 backdrop-blur-sm">Ongoing</td>
                      </tr>
                      <tr>
                        <td className="p-4 text-gray-700 bg-white bg-opacity-65 backdrop-blur-sm">GV101</td>
                        <td className="p-4 text-gray-700 bg-white bg-opacity-65 backdrop-blur-sm">Water Supply Disruption</td>
                        <td className="p-4 text-gray-700 bg-white bg-opacity-65 backdrop-blur-sm">Tadepaligudem</td>
                        <td className="p-4 text-gray-700 bg-white bg-opacity-65 backdrop-blur-sm">Water</td>
                        <td className="p-4 text-gray-700 bg-white bg-opacity-65 backdrop-blur-sm">Completed</td>
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
