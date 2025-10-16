import React, { useState, useEffect, useRef } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import fullLogo from '../assets/Images/fulllogo.png';
import apImage from '../assets/Images/AP.png';
import filterIcon from '../assets/icons/filter.png'

const Users = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [planExpanded, setPlanExpanded] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchWidth, setSearchWidth] = useState('240px');
  const [showFilter, setShowFilter] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [showRoleOptions, setShowRoleOptions] = useState(false);
  const [showDeptOptions, setShowDeptOptions] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    address: '',
    department: ''
  });
  const [editFormData, setEditFormData] = useState({ id: '', name: '', role: '', email: '', department: '' });
  const [users, setUsers] = useState([
    ['GV101','Surya','surya@gmail.com','Electricity','Lineman'],
    ['user2101','Anil','anil@gmail.com','Water','Incharge'],
    ['user2102','Manohar','manohar@gmail.com','Road','Safety Checker'],
    ['user2103','Revanth','revanth@gmail.com','Electricity','Lineman'],
    ['user2104','Poorna','poorna@gmail.com','Water','Supplier'],
    ['GV101','Karthik','karthik@gmail.com','Road','Safety checker'],
    ['GV101','Praveen','praveen@gmail.com','Water','Supplier'],
    ['GV101','Surya','surya@gmail.com','Electricity','Lineman'],
  ]);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create a new user row and prepend to list
    const newId = `user${Math.floor(1000 + Math.random()*9000)}`;
    const newRow = [newId, formData.name, formData.email, formData.department, formData.role];
    setUsers(prev => [newRow, ...prev]);
    setShowAddUserModal(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
    setFormData({ name: '', role: '', email: '', address: '', department: '' });
  };

  const openEditModalForRow = (row) => {
    const idx = users.indexOf(row);
    if (idx === -1) return;
    setEditIndex(idx);
    setEditFormData({ id: users[idx][0], name: users[idx][1], email: users[idx][2], department: users[idx][3], role: users[idx][4] });
    setShowEditUserModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUsers((prev) => prev.map((u, i) => i === editIndex ? [editFormData.id, editFormData.name, editFormData.email, editFormData.department, editFormData.role] : u));
    setShowEditUserModal(false);
    setEditIndex(-1);
  };

  const handleDeleteRow = (row) => {
    const userName = row[1]; // Get the user's name
    const confirmed = window.confirm(`Are you sure you want to delete ${userName}?`);
    
    if (confirmed) {
      const idx = users.indexOf(row);
      if (idx !== -1) {
        setUsers((prev) => prev.filter((_, i) => i !== idx));
      }
    }
  };

  const handleCloseModal = () => {
    setShowAddUserModal(false);
    setFormData({ name: '', role: '', email: '', address: '', department: '' });
  };

  // Search should be fixed width; no expand on focus

  const sidebarWidthPx = sidebarExpanded ? 200 : 60;

  // Static users list (could be replaced by API later)
  // const usersData = [...]

  const filteredUsers = users.filter((row) => {
    const department = row[3];
    const role = row[4];
    const deptMatch = selectedDepartments.length === 0 || selectedDepartments.includes(department);
    const roleMatch = selectedRoles.length === 0 || selectedRoles.includes(role);
    return deptMatch && roleMatch;
  });

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
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
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
      <aside className="fixed top-0 left-0 h-screen bg-amber-400 z-[1001] transition-all flex flex-col" style={{ width: sidebarWidthPx }}>
        {/* Hamburger Menu */}
        <div className="p-4 cursor-pointer flex flex-col gap-1 items-center justify-center border-b border-black/10" onClick={toggleSidebar}>
          <div className="w-5 h-0.5 bg-gray-800"></div>
          <div className="w-5 h-0.5 bg-gray-800"></div>
          <div className="w-5 h-0.5 bg-gray-800"></div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col py-2">
          <Link to="/dashboard" className="flex items-center p-4 text-gray-800 hover:bg-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Dashboard</span>
          </Link>

          <div className="flex items-center p-4 text-gray-800 bg-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Manage Users</span>
          </div>

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

          <div className="flex items-center p-4 text-gray-800 hover:bg-white/30 cursor-pointer" onClick={togglePlanSubmenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Plan</span>
            {sidebarExpanded && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`ml-auto transition-transform ${planExpanded ? 'rotate-180' : ''}`}>
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
        {/* Users Header */}
        <div className="flex flex-col items-start gap-3 mb-6">
          <h1 className="text-[1.75rem] font-bold text-gray-800 m-0">Manage Users</h1>
          <button className="bg-blue-500 text-white border-0 px-6 py-3 rounded-md text-base font-medium cursor-pointer transition hover:bg-blue-600 flex items-center gap-2 shadow" onClick={() => setShowAddUserModal(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Add Users
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-3 relative">
            <div className="flex items-center rounded-md px-3 py-2 transition overflow-hidden shadow-sm bg-white border border-gray-300" style={{ width: '320px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 mr-2 shrink-0"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
              <input type="text" placeholder="Search" className="border-0 outline-none text-sm text-gray-700 bg-transparent w-full placeholder:text-gray-400" />
            </div>
            <button type="button" onClick={()=>setShowFilter((s)=>!s)} className="w-10 h-10 flex items-center justify-center rounded-md cursor-pointer hover:bg-white/90 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid rgba(209,213,219,0.6)' }}>
              <img src={filterIcon} alt="Filter" className="w-10 h-10" />
            </button>

            {showFilter && (
              <div className="absolute left-[340px] top-12 w-[260px] rounded-md shadow-lg p-3 z-10" style={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid rgba(209,213,219,0.6)' }}>
                <div className="text-sm font-semibold text-gray-700 mb-2">Filter</div>

                <button type="button" className="w-full text-left flex items-center gap-2 text-sm text-gray-700 px-2 py-1.5 rounded hover:bg-gray-50" onClick={() => setShowRoleOptions((s)=>!s)}>
                  <span className="w-3 h-3 rounded-full border border-gray-400"></span>
                  <span>Role</span>
                </button>
                {showRoleOptions && (
                  <div className="pl-6 py-1 flex flex-col gap-2 text-sm text-gray-700">
                    {['Lineman','Incharge','Safety Checker','Supplier'].map((r) => (
                      <label key={r} className="inline-flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-600" checked={selectedRoles.includes(r)} onChange={(e) => {
                          setSelectedRoles((prev) => e.target.checked ? [...prev, r] : prev.filter((x) => x !== r));
                        }} />
                        <span>{r}</span>
                      </label>
                    ))}
                  </div>
                )}

                <button type="button" className="w-full text-left flex items-center gap-2 text-sm text-gray-700 px-2 py-1.5 rounded hover:bg-gray-50" onClick={() => {/* placeholder for future */}}>
                  <span className="w-3 h-3 rounded-full border border-gray-400"></span>
                  <span>Location</span>
                </button>

                <button type="button" className="w-full text-left flex items-center gap-2 text-sm text-gray-700 px-2 py-1.5 rounded hover:bg-gray-50" onClick={() => setShowDeptOptions((s)=>!s)}>
                  <span className="w-3 h-3 rounded-full border border-gray-400"></span>
                  <span>Department</span>
                </button>
                {showDeptOptions && (
                  <div className="pl-6 py-1 flex flex-col gap-2 text-sm text-gray-700">
                    {['Electricity','Water','Road'].map((d) => (
                      <label key={d} className="inline-flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-600" checked={selectedDepartments.includes(d)} onChange={(e) => {
                          setSelectedDepartments((prev) => e.target.checked ? [...prev, d] : prev.filter((x) => x !== d));
                        }} />
                        <span>{d}</span>
                      </label>
                    ))}
            </div>
                )}

                <div className="flex justify-end gap-2 mt-3">
                  <button className="px-3 py-1.5 rounded text-sm text-gray-700 hover:bg-gray-100" onClick={() => { setSelectedRoles([]); setSelectedDepartments([]); }}>Reset</button>
                  <button className="px-3 py-1.5 rounded text-sm text-white bg-blue-600 hover:bg-blue-700" onClick={() => setShowFilter(false)}>Apply</button>
            </div>
              </div>
            )}
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-xl overflow-hidden shadow-lg" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
          <div className="px-6 py-4 border-b border-gray-200" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}><h3 className="text-lg font-semibold text-gray-800 m-0">Users</h3></div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {['ID','Name','Email','Department','Role',''].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b border-gray-200" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/50">
                    {row.map((cell, cidx) => (
                      <td key={cidx} className="px-4 py-3 text-sm text-gray-700 border-b border-gray-100" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>{cell}</td>
                    ))}
                    <td className="px-4 py-3 text-right w-24 border-b border-gray-100" style={{ backgroundColor: 'rgba(255,255,255,0.6)' }}>
                      <div className="flex gap-2 justify-end">
                        <button className="w-8 h-8 rounded bg-blue-100 text-blue-500 flex items-center justify-center hover:bg-blue-200" aria-label="Edit" onClick={() => openEditModalForRow(row)}><FiEdit2 size={16} /></button>
                        <button className="w-8 h-8 rounded bg-red-100 text-red-500 flex items-center justify-center hover:bg-red-200" aria-label="Delete" onClick={() => handleDeleteRow(row)}><FiTrash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Edit User Modal */}
      {showEditUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={() => setShowEditUserModal(false)}>
          <div className="bg-white rounded-lg w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 m-0">Edit User</h2>
              <button className="p-2 rounded text-gray-500 hover:bg-gray-100" onClick={() => setShowEditUserModal(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1">User ID</label>
                  <input value={editFormData.id} disabled className="w-full px-3 py-3 border border-gray-200 rounded-md text-sm text-gray-500 bg-gray-50" />
                </div>
                <div>
                  <label htmlFor="edit_name" className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                  <input id="edit_name" name="name" value={editFormData.name} onChange={handleEditInputChange} required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
                </div>
                <div>
                  <label htmlFor="edit_role" className="block text-xs font-medium text-gray-600 mb-1">Role</label>
                  <input id="edit_role" name="role" value={editFormData.role} onChange={handleEditInputChange} required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="edit_email" className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                  <input type="email" id="edit_email" name="email" value={editFormData.email} onChange={handleEditInputChange} required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="edit_department" className="block text-xs font-medium text-gray-600 mb-1">Department</label>
                  <input id="edit_department" name="department" value={editFormData.department} onChange={handleEditInputChange} required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-blue-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"></polyline></svg>
                  Save Changes
                </button>
                <button type="button" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200" onClick={() => setShowEditUserModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg w-[90%] max-w-[500px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 m-0">Add User</h2>
              <button className="p-2 rounded text-gray-500 hover:bg-gray-100" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-xs font-medium text-gray-600 mb-1">Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter Full Name" required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
                </div>
                <div>
                  <label htmlFor="role" className="block text-xs font-medium text-gray-600 mb-1">Role</label>
                  <input type="text" id="role" name="role" value={formData.role} onChange={handleInputChange} placeholder="Enter Role" required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
              </div>
                <div className="sm:col-span-2">
                  <label htmlFor="email" className="block text-xs font-medium text-gray-600 mb-1">Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter Email" required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
              </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs font-medium text-gray-600 mb-1">Address</label>
                  <input id="address" name="address" value={formData.address} onChange={handleInputChange} placeholder="Street, city" required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
              </div>
                <div className="sm:col-span-2">
                  <label htmlFor="department" className="block text-xs font-medium text-gray-600 mb-1">Department</label>
                  <input id="department" name="department" value={formData.department} onChange={handleInputChange} placeholder="Detailed Description....." required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
              </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-blue-700">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Add User
                </button>
                <button type="button" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

       {/* Success Modal */}
       {showSuccessModal && (
         <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]" onClick={() => setShowSuccessModal(false)}>
           <div className="bg-white rounded-xl p-12 text-center shadow-2xl relative w-96 max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
             <button className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors" onClick={() => setShowSuccessModal(false)}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
             </button>
             <div className="flex flex-col items-center gap-6">
               <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600">
                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"></polyline></svg>
               </div>
               <div className="text-center">
                 <h3 className="text-emerald-600 text-xl font-semibold mb-2">User Added Successfully</h3>
                 <p className="text-gray-600 text-sm">The user has been added to the system</p>
               </div>
             </div>
           </div>
         </div>
       )}
    </div>
  );
};

export default Users;