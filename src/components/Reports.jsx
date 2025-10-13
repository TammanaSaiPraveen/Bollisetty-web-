import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';
import apImage from '../assets/Images/AP.png';

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
    <div className="min-h-screen bg-[#f5f5f5] font-[Inter,Segoe_UI,Tahoma,Geneva,Verdana,sans-serif]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm shadow px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 rounded hover:bg-gray-100" onClick={toggleSidebar} aria-label="Toggle sidebar">
              <div className="w-5 h-0.5 bg-gray-800 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-800 mb-1"></div>
              <div className="w-5 h-0.5 bg-gray-800"></div>
            </button>
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Logo" className="w-10 h-10 object-contain bg-white rounded-full p-1 shadow" />
              <span className="text-base font-semibold text-gray-800">మన బొలిశెట్టి</span>
          </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-700" aria-label="bell">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-700" aria-label="user">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-700" aria-label="more">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={toggleSidebar}>
          <div className="bg-white w-72 h-full p-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <img src={logoImage} alt="Logo" className="w-8 h-8 object-contain bg-white rounded-full p-1 shadow" />
                <span className="text-base font-semibold text-gray-800">మన బొలిశెట్టి</span>
              </div>
              <button className="p-2 rounded hover:bg-gray-100" onClick={toggleSidebar} aria-label="Close">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <nav className="flex flex-col">
              <Link to="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-800 font-medium"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> Dashboard</Link>
              <Link to="/users" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-800 font-medium"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg> Manage Users</Link>
              <Link to="/grievances" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-800 font-medium"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg> Grievances</Link>
              <button className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-800 font-medium" onClick={togglePlanSubmenu}> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg> Plan <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`ml-auto transition-transform ${planExpanded ? 'rotate-180' : ''}`}> <polyline points="6,9 12,15 18,9"></polyline> </svg></button>
              {planExpanded && (
                <div className="ml-6 my-2 flex flex-col gap-1">
                  <Link to="/schedule" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-800"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></svg> <span>Schedule</span></Link>
                  <Link to="/news" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-800"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg> <span>News</span></Link>
                </div>
              )}
              <Link to="/development" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-50 text-gray-800 font-medium"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg> Development</Link>
              <div className="flex items-center gap-3 px-3 py-2 rounded text-red-600 hover:bg-red-50"> <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16,17 21,12 16,7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg> <span>Logout</span></div>
            </nav>
          </div>
        </div>
      )}

      <div className="flex" style={{ backgroundImage: `url(${apImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-col md:w-16 md:py-4 md:gap-3 md:items-center bg-white/80 backdrop-blur-sm border-r border-gray-200 sticky top-0 h-[calc(100vh-0px)]">
          {[
            { to: '/dashboard', svg: (<><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></>) },
            { to: '/users', svg: (<><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></>) },
            { to: '/grievances', svg: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></>) },
            { to: '/schedule', svg: (<><circle cx="12" cy="12" r="10"></circle><polyline points="12,6 12,12 16,14"></polyline></>) },
            { to: '/reports', svg: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></>) },
            { to: '/development', svg: (<><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></>) },
          ].map((item, idx) => (
            <Link key={idx} to={item.to} className={`w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 ${item.to === '/reports' ? 'bg-gray-100' : ''}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{item.svg}</svg>
          </Link>
          ))}
          <div className="mt-auto pb-4"><div className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-red-50 text-gray-700"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16,17 21,12 16,7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg></div></div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8">
          {/* Grievances Header */}
          <div className="mb-4"><h1 className="text-[1.75rem] font-bold text-gray-800 m-0">Grievances</h1></div>

          {/* Grievances Actions */}
          <div className="mb-6"><button className="bg-blue-500 text-white border-0 px-6 py-3 rounded-md text-base font-medium cursor-pointer transition hover:bg-blue-600 flex items-center gap-2"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add Grievances</button></div>

          {/* Search and Filter */}
          <div className="mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-2 transition overflow-hidden w-[200px]">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 mr-2 shrink-0"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
                <input type="text" placeholder="Search" className="border-0 outline-none text-sm text-gray-700 bg-transparent w-full placeholder:text-gray-400" />
              </div>
              <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"></polygon></svg></button>
            </div>
          </div>

          {/* Past Search History */}
          <div className="mb-6">
            <div className="bg-white/65 rounded-xl p-6 backdrop-saturate-[1.2] backdrop-blur-[2px]">
              <h3 className="text-lg font-semibold text-gray-800 m-0 mb-3">Past Search History</h3>
              <div className="flex flex-wrap gap-2">
                {['Ganeshnagar','Water Problem','Water Problem','Current Problem'].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Content Row - Past Search History and Status Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="bg-white/65 rounded-xl p-6 backdrop-saturate-[1.2] backdrop-blur-[2px]">
              <h3 className="text-lg font-semibold text-gray-800 m-0 mb-3">Past Search History</h3>
              <div className="flex flex-wrap gap-2">
                {['Ganeshnagar','Water Problem','Water Problem','Current Problem'].map((t) => (
                  <span key={t} className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm">{t}</span>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[0,1].map((i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 m-0 mb-4">Grievances Status</h3>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-yellow-500"></div><span className="text-sm text-gray-700">Current 25</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-blue-500"></div><span className="text-sm text-gray-700">Ongoing 35</span></div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-emerald-500"></div><span className="text-sm text-gray-700">Completed 40</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grievances Table */}
          <div className="bg-white/65 rounded-xl overflow-hidden backdrop-saturate-[1.2] backdrop-blur-[2px]">
            <div className="px-6 py-4 border-b border-gray-200 bg-white/65 backdrop-saturate-[1.2] backdrop-blur-[2px]"><h2 className="text-xl font-bold text-gray-800 m-0">Grievances</h2></div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    {['ID','Grievance','Area','Department','Status'].map((h) => (
                      <th key={h} className="bg-white/65 px-4 py-4 text-left font-semibold text-gray-700 border-b border-gray-200 backdrop-saturate-[1.2] backdrop-blur-[2px]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['GV101','Water Supply Disruption','Tadepaligudem','Water','Ongoining'],
                    ['GV101','Water Supply Disruption','Tadepaligudem','Water','Not Stated Yet'],
                    ['GV101','Water Supply Disruption','Tadepaligudem','Water','Completed'],
                    ['GV101','Water Supply Disruption','Tadepaligudem','Water','Completed'],
                  ].map((row, idx) => (
                    <tr key={idx}>
                      {row.map((cell, cidx) => (
                        <td key={cidx} className="px-4 py-4 border-b border-gray-200 text-gray-700 bg-white/65 backdrop-saturate-[1.2] backdrop-blur-[2px]">{cidx===4 ? <span className={`px-2 py-1 rounded text-xs ${cell.includes('Completed') ? 'bg-emerald-100 text-emerald-700' : cell.includes('Ongoining') ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'}`}>{cell}</span> : cell}</td>
                      ))}
                  </tr>
                  ))}
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
