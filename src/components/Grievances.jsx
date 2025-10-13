import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import fullLogo from '../assets/Images/fulllogo.png';
import apImage from '../assets/Images/AP.png';

// Solid pie chart with SVG paths (closer to screenshot)
const PieChart = ({ size = 200, data = [] }) => {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2;
  let cumulative = 0;

  const arcs = data.map((slice, idx) => {
    const value = slice.value / total;
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2; // start at top
    const endAngle = (cumulative + value) * 2 * Math.PI - Math.PI / 2;
    cumulative += value;

    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
    return <path key={idx} d={d} fill={slice.color} stroke="transparent" />;
  });

  // Labels at slice centroids
  cumulative = 0;
  const labels = data.map((slice, idx) => {
    const value = slice.value / total;
    const midAngle = (cumulative + value / 2) * 2 * Math.PI - Math.PI / 2;
    cumulative += value;
    const lr = r * 0.60; // label radius inward
    const lx = cx + lr * Math.cos(midAngle);
    const ly = cy + lr * Math.sin(midAngle);
    const isDark = ['#6D28D9', '#F97316'].includes(slice.color);
    const fill = isDark ? '#ffffff' : '#111827';
    return (
      <text key={`label-${idx}`} x={lx} y={ly} textAnchor="middle" dominantBaseline="middle" fontSize="10" fill={fill}>{`${slice.label} ${slice.value}`}</text>
    );
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}> 
      {arcs}
      {labels}
    </svg>
  );
};

const Legend = ({ items = [] }) => (
  <div className="flex flex-col gap-2">
    {items.map((it) => (
      <div key={it.label} className="flex items-center gap-2">
        <div className="w-3 h-3 rounded" style={{ backgroundColor: it.color }}></div>
        <span className="text-sm text-gray-700">{it.label} {it.value}</span>
      </div>
    ))}
  </div>
);

const LegendRow = ({ items = [] }) => (
  <div className="flex items-center justify-end gap-4 mb-2">
    {items.map((it) => (
      <div key={it.label} className="flex items-center gap-2">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: it.color }}></div>
        <span className="text-xs text-gray-600">{it.label}</span>
      </div>
    ))}
  </div>
);

const Grievances = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [planExpanded, setPlanExpanded] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [searchWidth, setSearchWidth] = useState('360px');
  const [showFilter, setShowFilter] = useState(false);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [showAddGrievanceModal, setShowAddGrievanceModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState({
    constituency: '',
    department: '',
    address: '',
    title: '',
    description: '',
    photo: null
  });
  
  const profileRef = useRef(null);

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);
  const togglePlanSubmenu = () => setPlanExpanded(!planExpanded);
  const toggleProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);

  const handleAddGrievance = () => setShowAddGrievanceModal(true);

  const handleCloseModal = () => {
    setShowAddGrievanceModal(false);
    setShowSuccessModal(false);
    setFormData({ constituency: '', department: '', address: '', title: '', description: '', photo: null });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, photo: file }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Grievance data:', formData);
    setShowAddGrievanceModal(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 3000);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set responsive search width
  useEffect(() => {
    const updateSearchWidth = () => setSearchWidth(window.innerWidth <= 768 ? '220px' : '360px');
    updateSearchWidth();
    window.addEventListener('resize', updateSearchWidth);
    return () => window.removeEventListener('resize', updateSearchWidth);
  }, []);

  const sidebarWidthPx = sidebarExpanded ? 200 : 60;
  const [searchTerm, setSearchTerm] = useState('');
  const PIE_COLORS = { current: '#6D28D9', ongoing: '#F97316', completed: '#22D3EE' };

  // Table data and filtering
  const grievancesData = [
    ['GV101','Water Supply Disruption','Tadepaligudem','Water','Ongoing'],
    ['GV101','Water Supply Disruption','Tadepaligudem','Water','Not Stated Yet'],
    ['GV101','Water Supply Disruption','Tadepaligudem','Water','Completed'],
    ['GV101','Water Supply Disruption','Tadepaligudem','Water','Completed'],
  ];

  const filteredGrievances = grievancesData
    .filter((row) => row.some((cell) => String(cell).toLowerCase().includes(searchTerm.toLowerCase())))
    .filter((row) => selectedLocations.length === 0 || selectedLocations.includes(row[2]))
    .filter((row) => selectedStatuses.length === 0 || selectedStatuses.includes(row[4]));

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-[Inter,Segoe_UI,Tahoma,Geneva,Verdana,sans-serif]">
      {/* Header/Navbar */}
      <header className="fixed top-0 right-0 h-[60px] flex items-center justify-between px-6 bg-white/80 shadow z-[1000] transition-all" style={{ left: sidebarWidthPx }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <img src={fullLogo} alt="Logo" className="w-[200px] h-auto object-contain" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center text-gray-800 cursor-pointer rounded-md transition relative hover:bg-white/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white/80"></div>
          </div>
          <div className="w-10 h-10 flex items-center justify-center text-gray-800 cursor-pointer rounded-md transition relative hover:bg-white/10" onClick={toggleProfileDropdown} ref={profileRef}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            {showProfileDropdown && (
              <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-[1000] mt-2 min-w-40 overflow-hidden">
                <div className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <span>My Profile</span>
                </div>
                <div className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Dashboard</span>
          </Link>

          <Link to="/users" className="flex items-center p-4 text-gray-800 hover:bg:white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Manage Users</span>
          </Link>

          <div className="flex items-center p-4 text-gray-800 bg-white">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Grievances</span>
          </div>

          <div className="flex items-center p-4 text-gray-800 hover:bg-white/30 cursor-pointer" onClick={togglePlanSubmenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Plan</span>
            {sidebarExpanded && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`ml-auto transition-transform ${planExpanded ? 'rotate-180' : ''}`}><polyline points="6,9 12,15 18,9"></polyline></svg>
            )}
          </div>
          
          {planExpanded && sidebarExpanded && (
            <div className="ml-5 mt-1 flex flex-col gap-1">
              <Link to="/schedule" className="flex items-center px-4 py-3 text-sm bg-white/10 rounded-md mx-2 hover:bg-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span className="ml-3 text-sm font-medium">Schedule</span>
              </Link>
              <Link to="/news" className="flex items-center px-4 py-3 text-sm bg-white/10 rounded-md mx-2 hover:bg-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>
                <span className="ml-3 text-sm font-medium">New</span>
              </Link>
            </div>
          )}

          <Link to="/development" className="flex items-center p-4 text-gray-800 hover:bg-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Development</span>
          </Link>
        </nav>

        {/* Logout Button - positioned at bottom */}
        <div className="mt-auto p-2">
          <div className="flex items-center justify-center p-4 text-gray-800 rounded-md hover:bg-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16,17 21,12 16,7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Logout</span>
          </div>
        </div>
        </aside>

        {/* Main Content */}
      <main className="relative z-[1] min-h-screen p-8 pt-20 transition-all" style={{ marginLeft: sidebarWidthPx, backgroundImage: `url(${apImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          {/* Grievances Header */}
        <div className="mb-6">
          <h1 className="text-[1.75rem] font-bold text-gray-800 m-0">Grievances</h1>
          </div>

          {/* Grievances Actions */}
        <div className="mb-6">
          <button className="bg-blue-500 text-white border-0 px-6 py-3 rounded-md text-base font-medium cursor-pointer transition hover:bg-blue-600 flex items-center gap-2 shadow" onClick={handleAddGrievance}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Grievances
            </button>
          </div>

          {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-3 relative">
            <div className="flex items-center rounded-md px-3 py-2 transition overflow-hidden shadow-sm" style={{ width: searchWidth, minWidth: searchWidth, maxWidth: searchWidth, backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid rgba(209,213,219,0.6)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 mr-2 shrink-0"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
              <input type="text" placeholder="Search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="border-0 outline-none text-sm text-gray-700 bg-transparent w-full placeholder:text-gray-400" />
            </div>
            <button type="button" onClick={()=>setShowFilter((s)=>!s)} className="w-10 h-10 flex items-center justify-center rounded-md cursor-pointer hover:bg-white/90 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid rgba(209,213,219,0.6)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon></svg>
            </button>

            {showFilter && (
              <div className="absolute left-[380px] top-12 w-[240px] rounded-md shadow-lg p-3 z-10" style={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid rgba(209,213,219,0.6)' }}>
                <div className="text-sm font-semibold text-gray-700 mb-2">Filter</div>
                <button type="button" className="w-full text-left flex items-center gap-2 text-sm text-gray-700 px-2 py-1.5 rounded hover:bg-gray-50">
                  <span className="w-3 h-3 rounded-full border border-gray-400"></span>
                  <span>Role</span>
                </button>
                <button type="button" onClick={()=>setShowLocationOptions((s)=>!s)} className="w-full text-left flex items-center gap-2 text-sm text-gray-700 px-2 py-1.5 rounded hover:bg-gray-50">
                  <span className="w-3 h-3 rounded-full border border-gray-400"></span>
                  <span>Location</span>
                </button>
                {showLocationOptions && (
                  <div className="pl-6 py-1 flex flex-col gap-2 text-sm text-gray-700">
                    {['Tadepaligudem'].map((loc)=> (
                      <label key={loc} className="inline-flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-600" checked={selectedLocations.includes(loc)} onChange={(e)=> setSelectedLocations((prev)=> e.target.checked ? [...prev, loc] : prev.filter((x)=> x!==loc))} />
                        <span>{loc}</span>
                      </label>
                    ))}
              </div>
                )}
                <button type="button" onClick={()=>setShowStatusOptions((s)=>!s)} className="w-full text-left flex items-center gap-2 text-sm text-gray-700 px-2 py-1.5 rounded hover:bg-gray-50">
                  <span className="w-3 h-3 rounded-full border border-gray-400"></span>
                  <span>Status</span>
              </button>
                {showStatusOptions && (
                  <div className="pl-6 py-1 flex flex-col gap-2 text-sm text-gray-700">
                    {['Ongoing','Not Stated Yet','Completed'].map((st)=> (
                      <label key={st} className="inline-flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-600" checked={selectedStatuses.includes(st)} onChange={(e)=> setSelectedStatuses((prev)=> e.target.checked ? [...prev, st] : prev.filter((x)=> x!==st))} />
                        <span>{st}</span>
                      </label>
                    ))}
                  </div>
                )}
                <div className="flex justify-end gap-2 mt-3">
                  <button className="px-3 py-1.5 rounded text-sm text-gray-700 hover:bg-gray-100" onClick={()=>{setSelectedLocations([]); setSelectedStatuses([]);}}>Reset</button>
                  <button className="px-3 py-1.5 rounded text-sm text-white bg-blue-600 hover:bg-blue-700" onClick={()=>setShowFilter(false)}>Apply</button>
                </div>
              </div>
            )}
            </div>
          </div>

          {/* Content Row - Past Search History and Status Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[520px_1fr] gap-6 mb-8">
            {/* Past Search History - Left Side */}
          <div className="rounded-xl p-4 backdrop-saturate-[1.2] backdrop-blur-[2px]" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
            <h3 className="text-base font-semibold text-gray-800 m-0 mb-2">Past Search History</h3>
            <div className="flex flex-col">
              {['Ganeshnagar','Water Problem','Water Problem','Current Problem'].map((t, idx) => (
                <div key={t+idx} className="px-3 py-2 text-sm text-gray-700 border-t first:border-t-0" style={{ borderColor: 'rgba(229,231,235,1)' }}>{t}</div>
              ))}
              </div>
            </div>

            {/* Grievances Status Cards - Right Side */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[0,1].map((i) => (
              <div key={i} className="rounded-xl p-6 shadow-md" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                <h3 className="text-lg font-semibold text-gray-800 m-0 mb-4">Grievances Status</h3>
                <LegendRow items={[
                  { label: 'Current', color: PIE_COLORS.current },
                  { label: 'Ongoing', color: PIE_COLORS.ongoing },
                  { label: 'Completed', color: PIE_COLORS.completed },
                ]} />
                <div className="flex items-center gap-6">
                  <PieChart
                    size={180}
                    thickness={28}
                    data={[
                      { label: 'Current', value: 25, color: PIE_COLORS.current },
                      { label: 'Ongoing', value: 35, color: PIE_COLORS.ongoing },
                      { label: 'Completed', value: 40, color: PIE_COLORS.completed },
                    ]}
                  />
                  <Legend items={[
                    { label: 'Current', value: 25, color: PIE_COLORS.current },
                    { label: 'Ongoing', value: 35, color: PIE_COLORS.ongoing },
                    { label: 'Completed', value: 40, color: PIE_COLORS.completed },
                  ]} />
                    </div>
                  </div>
            ))}
            </div>
          </div>

          {/* Grievances Table (Unified Card) */}
        <div className="rounded-xl overflow-hidden backdrop-saturate-[1.2] backdrop-blur-[2px]" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
          <div className="px-6 py-4 border-b border-gray-200" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}><h2 className="text-xl font-bold text-gray-800 m-0">Grievances</h2></div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
                <thead>
                  <tr>
                  {['ID','Grievance','Area','Department','Status'].map((h) => (
                    <th key={h} className="px-4 py-4 text-left font-semibold text-gray-700 border-b border-gray-200 backdrop-saturate-[1.2] backdrop-blur-[2px]" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>{h}</th>
                  ))}
                  </tr>
                </thead>
                <tbody>
                {filteredGrievances.map((row, idx) => (
                  <tr key={idx}>
                    {row.map((cell, cidx) => (
                      <td key={cidx} className="px-4 py-4 border-b border-gray-200 text-gray-700 backdrop-saturate-[1.2] backdrop-blur-[2px]" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>{cidx===4 ? <span className={`px-2 py-1 rounded text-xs ${cell.includes('Completed') ? 'bg-emerald-100 text-emerald-700' : cell.includes('Ongoing') ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{cell}</span> : cell}</td>
                    ))}
                  </tr>
                ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Create New Grievance Modal */}
        {showAddGrievanceModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 m-0">Create New Grievance</h2>
              <button className="p-2 rounded text-gray-500 hover:bg-gray-100" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="constituency" className="block text-xs font-medium text-gray-600 mb-1">Constituency</label>
                  <input id="constituency" name="constituency" type="text" value={formData.constituency || ''} onChange={handleInputChange} placeholder="Enter Constituency" required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
                </div>
                <div>
                  <label htmlFor="department" className="block text-xs font-medium text-gray-600 mb-1">Department</label>
                  <input id="department" name="department" type="text" value={formData.department || ''} onChange={handleInputChange} placeholder="Enter Category" required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
              </div>
                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs font-medium text-gray-600 mb-1">Address</label>
                  <input id="address" name="address" type="text" value={formData.address || ''} onChange={handleInputChange} placeholder="Street, City, Pin" required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
              </div>
                <div className="sm:col-span-2">
                  <label htmlFor="title" className="block text-xs font-medium text-gray-600 mb-1">Grievance Title</label>
                  <input id="title" name="title" type="text" value={formData.title || ''} onChange={handleInputChange} placeholder="Title" required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
              </div>
                <div className="sm:col-span-2">
                  <label htmlFor="description" className="block text-xs font-medium text-gray-600 mb-1">Description</label>
                  <input id="description" name="description" type="text" value={formData.description || ''} onChange={handleInputChange} placeholder="Detailed Description....." required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
              </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-600 mb-1">Upload Photo</label>
                <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center gap-2">
                  <input type="file" id="photo" name="photo" onChange={handleFileChange} accept="image/*" className="hidden" />
                  <button type="button" className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={() => document.getElementById('photo').click()}>Browse photo</button>
                  <span className="text-xs text-gray-500">Or</span>
                  <p className="text-sm text-gray-500">Drag or Drop Here</p>
                  </div>
                </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700">Submit</button>
                <button type="button" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg p-8 text-center shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-3 right-3 p-2 rounded text-gray-500 hover:bg-gray-100" onClick={handleCloseModal}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 text-emerald-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"></polyline></svg>
              </div>
              <p className="text-emerald-600 text-base m-0">Grievances Added Successfully</p>
            </div>
          </div>
        </div>
        )}
    </div>
  );
};

export default Grievances;
