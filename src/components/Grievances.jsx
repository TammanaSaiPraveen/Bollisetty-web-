import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import fullLogo from '../assets/Images/fulllogo.png';
import apImage from '../assets/Images/AP.png';

const Grievances = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [planExpanded, setPlanExpanded] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAddGrievanceModal, setShowAddGrievanceModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [formData, setFormData] = useState({
    constituency: '',
    department: '',
    address: '',
    title: '',
    description: '',
    photo: null
  });
  
  // Sample grievances data
  const [grievances] = useState([
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
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white border-opacity-80"></div>
          </div>
          <div className="w-10 h-10 flex items-center justify-center text-gray-700 cursor-pointer rounded-md transition-colors duration-200 relative hover:bg-white hover:bg-opacity-10" onClick={toggleProfileDropdown} ref={profileRef}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>

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
          <Link to="/dashboard" className="flex items-center p-4 text-gray-800 no-underline transition-all duration-200 relative border-none hover:bg-white hover:bg-opacity-30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 w-6 h-6">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>Dashboard</span>
          </Link>

          <Link to="/users" className="flex items-center p-4 text-gray-800 no-underline transition-all duration-200 relative border-none hover:bg-white hover:bg-opacity-30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 w-6 h-6">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>Manage Users</span>
          </Link>

          <div className="flex items-center p-4 text-gray-800 no-underline transition-all duration-200 relative border-none bg-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="flex-shrink-0 w-6 h-6">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14,2 14,8 20,8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10,9 9,9 8,9"></polyline>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all duration-300 ${sidebarExpanded ? 'opacity-100 w-auto' : 'opacity-0 w-0 overflow-hidden'}`}>Grievances</span>
          </div>

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
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 m-0">Grievances</h1>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={handleAddGrievance}
            className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-600 transition-colors duration-200"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Grievances
          </button>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-64"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="M21 21l-4.35-4.35"></path>
              </svg>
            </div>

            <div className="relative" ref={filterRef}>
              <button
                onClick={toggleFilterDropdown}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                Filter
              </button>

              {showFilterDropdown && (
                <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-2 min-w-40 overflow-hidden">
                  <button
                    onClick={() => handleFilterSelect('Status')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200"
                  >
                    Status
                  </button>
                  <button
                    onClick={() => handleFilterSelect('Department')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200"
                  >
                    Department
                  </button>
                  <button
                    onClick={() => handleFilterSelect('Area')}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors duration-200"
                  >
                    Area
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Past Search History */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Past Search History</h3>
          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Ganeshnagar</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Water Problem</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Water Problem</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Current Problem</span>
          </div>
        </div>

        {/* Grievances Status Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Grievances Status</h3>
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="8" strokeDasharray="25 75" strokeDashoffset="0"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray="35 65" strokeDashoffset="-25"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="8" strokeDasharray="40 60" strokeDashoffset="-60"/>
                </svg>
              </div>
              <div className="ml-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Current: 25</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Ongoing: 35</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Completed: 40</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Grievances Status</h3>
            <div className="flex items-center justify-center">
              <div className="w-32 h-32 relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" strokeWidth="8" strokeDasharray="25 75" strokeDashoffset="0"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="8" strokeDasharray="35 65" strokeDashoffset="-25"/>
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="8" strokeDasharray="40 60" strokeDashoffset="-60"/>
                </svg>
              </div>
              <div className="ml-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Current: 25</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Ongoing: 35</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Completed: 40</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Grievances Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 m-0">Grievances</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Grievance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Area</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGrievances.map((grievance, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                    <td className="px-6 py-4 text-sm text-gray-700">{grievance.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{grievance.grievance}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{grievance.area}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{grievance.department}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        grievance.status === 'Ongoing' ? 'bg-yellow-500 text-white' :
                        grievance.status === 'Completed' ? 'bg-green-500 text-white' :
                        'bg-gray-400 text-white'
                      }`}>
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

      {/* Add Grievance Modal */}
      {showAddGrievanceModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 w-11/12 max-w-lg relative shadow-2xl">
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Grievance</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Area</label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Water">Water</option>
                  <option value="Electricity">Electricity</option>
                  <option value="Road">Road</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                >
                  Add Grievance
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md text-center shadow-2xl">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22,4 12,14.01 9,11.01"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Grievance Added Successfully!</h3>
            <p className="text-gray-600">The new grievance has been added to the system.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Grievances;
