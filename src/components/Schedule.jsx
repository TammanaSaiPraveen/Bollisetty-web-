import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import fullLogo from '../assets/Images/fulllogo.png';
import apImage from '../assets/Images/AP.png';
import filterIcon from '../assets/icons/filter.png'
import { getSchedules, createSchedule, getScheduleEvents, createScheduleEvent, getScheduleEventById, updateScheduleEvent, deleteScheduleEvent, getUpcomingScheduleEvents } from '../utils/auth';

const Schedule = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [planExpanded, setPlanExpanded] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showAddScheduleModal, setShowAddScheduleModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [showDateOptions, setShowDateOptions] = useState(false);
  const [showTimeOptions, setShowTimeOptions] = useState(false);
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedTimes, setSelectedTimes] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    location: '',
    reason: '',
    photo: null
  });
  const [events, setEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [todaySchedules, setTodaySchedules] = useState([]);
  const [yesterdaySchedules, setYesterdaySchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    event_time: '',
    location: '',
    event_type: 'meeting',
    priority: 'medium',
    photo: null
  });
  const [skip, setSkip] = useState(0);
  const [eventsSkip, setEventsSkip] = useState(0);
  const [limit, setLimit] = useState(25);
  const [eventsLimit, setEventsLimit] = useState(25);
  const [totalEvents, setTotalEvents] = useState(0);
  const [activeTab, setActiveTab] = useState('schedules'); // 'schedules' or 'events'
  
  const profileRef = useRef(null);

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);
  const togglePlanSubmenu = () => setPlanExpanded(!planExpanded);
  const toggleProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);

  const handleAddSchedule = () => setShowAddScheduleModal(true);
  const handleAddEvent = () => setShowAddEventModal(true);

  const handleCloseModal = () => {
    setShowAddScheduleModal(false);
    setShowAddEventModal(false);
    setShowEditEventModal(false);
    setShowSuccessModal(false);
    setShowDeleteConfirmModal(false);
    setFormData({ date: '', time: '', location: '', reason: '', photo: null });
    setEventFormData({ title: '', description: '', event_date: '', event_time: '', location: '', event_type: 'meeting', priority: 'medium', photo: null });
    setEditingEvent(null);
    setEventToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEventInputChange = (e) => {
    const { name, value } = e.target;
    setEventFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({ ...prev, photo: file }));
  };

  const handleEventFileChange = (e) => {
    const file = e.target.files[0];
    setEventFormData(prev => ({ ...prev, photo: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      const payload = {
        title: formData.reason,
        scheduledDate: formData.date,
        scheduledTime: formData.time,
        location: formData.location
      };
      const created = await createSchedule(payload);
      const newItem = {
        title: created.title || formData.reason,
        loc: created.location ? `Location: ${created.location}` : undefined,
        time: created.scheduledTime ? `Time:${created.scheduledTime}` : (formData.time ? `Time:${formData.time}` : 'Time:TBD')
      };
      setTodaySchedules((prev) => [newItem, ...prev]);
    setShowAddScheduleModal(false);
    setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
      setFormData({ date: '', time: '', location: '', reason: '', photo: null });
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setLoading(false);
    }
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

  const sidebarWidthPx = sidebarExpanded ? 200 : 60;

  // Fetch schedules and split into today/yesterday groups
  const fetchSchedules = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await getSchedules({ skip, limit });
      const items = Array.isArray(data) ? data : data.items || [];
      const today = [];
      const yesterday = [];
      const now = new Date();
      const todayStr = now.toISOString().slice(0,10);
      const yDate = new Date(now.getTime() - 24*60*60*1000).toISOString().slice(0,10);
      items.forEach((s) => {
        const dateStr = (s.scheduledDate || s.date || '').slice(0,10) || todayStr;
        const obj = {
          title: s.title || 'Scheduled Event',
          loc: s.location ? `Location: ${s.location}` : undefined,
          time: s.scheduledTime ? `Time:${s.scheduledTime}` : 'Time:TBD'
        };
        if (dateStr === todayStr) today.push(obj); else if (dateStr === yDate) yesterday.push(obj);
      });
      setTodaySchedules(today);
      setYesterdaySchedules(yesterday);
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchSchedules(); /* eslint-disable-next-line */ }, [skip, limit]);

  // Fetch schedule events (separate view/list)
  const fetchEvents = async () => {
    try {
      setEventsLoading(true);
      const data = await getScheduleEvents({ skip: eventsSkip, limit: eventsLimit });
      const items = Array.isArray(data) ? data : data.items || [];
      setEvents(items);
      setTotalEvents(data.total || items.length);
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setEventsLoading(false);
    }
  };

  // Fetch upcoming events
  const fetchUpcomingEvents = async () => {
    try {
      const data = await getUpcomingScheduleEvents({ days: 7 });
      setUpcomingEvents(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      // ignore optional errors
    }
  };

  // Event form submission
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    try {
      setEventsLoading(true);
      const payload = { ...eventFormData };
      if (editingEvent) {
        await updateScheduleEvent(editingEvent.id, payload);
      } else {
        await createScheduleEvent(payload);
      }
      setShowAddEventModal(false);
      setShowEditEventModal(false);
      setShowSuccessModal(true);
      fetchEvents();
      fetchUpcomingEvents();
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setEventsLoading(false);
    }
  };

  // Edit event
  const handleEditEvent = async (eventId) => {
    try {
      const event = await getScheduleEventById(eventId);
      setEventFormData({
        title: event.title || '',
        description: event.description || '',
        event_date: event.event_date || '',
        event_time: event.event_time || '',
        location: event.location || '',
        event_type: event.event_type || 'meeting',
        priority: event.priority || 'medium',
        photo: null
      });
      setEditingEvent(event);
      setShowEditEventModal(true);
    } catch (err) {
      setError(String(err.message || err));
    }
  };

  // Delete event confirmation
  const handleDeleteEvent = (event) => {
    setEventToDelete(event);
    setShowDeleteConfirmModal(true);
  };

  // Confirm delete event
  const confirmDeleteEvent = async () => {
    if (!eventToDelete) return;
    try {
      setEventsLoading(true);
      await deleteScheduleEvent(eventToDelete.id);
      setShowDeleteConfirmModal(false);
      setShowSuccessModal(true);
      fetchEvents();
      fetchUpcomingEvents();
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setEventsLoading(false);
    }
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteConfirmModal(false);
    setEventToDelete(null);
  };

  useEffect(() => { fetchEvents(); /* eslint-disable-next-line */ }, [eventsSkip, eventsLimit]);
  useEffect(() => { fetchUpcomingEvents(); }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] font-[Inter,Segoe_UI,Tahoma,Geneva,Verdana,sans-serif]">
      {/* Header/Navbar */}
      <header className="fixed top-0 right-0 h-[60px] flex items-center justify-between px-6 bg-white/80 shadow z-[1000] transition-all" style={{ left: sidebarWidthPx }}>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4">
            <img src={fullLogo} alt="Logo" className="w-[200px] h-auto object-contain" />
          </div>
          {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center text-gray-800 cursor-pointer rounded-md transition relative hover:bg-white/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white/80"></div>
          </div>
          <div className="w-10 h-10 flex items-center justify-center text-gray-800 cursor-pointer rounded-md transition relative hover:bg-white/10" onClick={toggleProfileDropdown} ref={profileRef}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            {showProfileDropdown && (
              <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-[1000] mt-2 min-w-48 overflow-hidden">
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
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
          <Link to="/users" className="flex items-center p-4 text-gray-800 hover:bg-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Manage Users</span>
              </Link>
          <Link to="/grievances" className="flex items-center p-4 text-gray-800 hover:bg-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Grievances</span>
              </Link>
          <div className="flex items-center p-4 text-gray-800 hover:bg-white/30 cursor-pointer" onClick={togglePlanSubmenu}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Plan</span>
            {sidebarExpanded && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`ml-auto transition-transform ${planExpanded ? 'rotate-180' : ''}`}><polyline points="6,9 12,15 18,9"></polyline></svg>
            )}
              </div>
          {planExpanded && sidebarExpanded && (
            <div className="ml-5 mt-1 flex flex-col gap-1">
              <div className="flex items-center px-4 py-3 text-sm bg-white mx-2 rounded-md">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span className="ml-3 text-sm font-medium">Schedule</span>
              </div>
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

        {/* Logout Button */}
        <div className="mt-auto p-2">
          <div className="flex items-center justify-center p-4 text-gray-800 rounded-md hover:bg-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16,17 21,12 16,7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Logout</span>
          </div>
        </div>
        </aside>

        {/* Main Content */}
      <main className="relative z-[1] min-h-screen p-8 pt-20 transition-all" style={{ marginLeft: sidebarWidthPx, backgroundImage: `url(${apImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          {/* Schedule Header */}
        <div className="mb-6"><h1 className="text-[1.75rem] font-bold text-gray-800 m-0">Schedule</h1></div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="flex space-x-1 bg-white/60 rounded-lg p-1 backdrop-blur-sm">
              <button
                onClick={() => setActiveTab('schedules')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'schedules'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Schedules
              </button>
              <button
                onClick={() => setActiveTab('events')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'events'
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Events
              </button>
            </div>
          </div>

          {/* Actions */}
        <div className="mb-6 flex gap-3">
          {activeTab === 'schedules' ? (
            <button className="bg-blue-500 text-white border-0 px-6 py-3 rounded-md text-base font-medium cursor-pointer transition hover:bg-blue-600 flex items-center gap-2" onClick={handleAddSchedule}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Plan
            </button>
          ) : (
            <button className="bg-green-500 text-white border-0 px-6 py-3 rounded-md text-base font-medium cursor-pointer transition hover:bg-green-600 flex items-center gap-2" onClick={handleAddEvent}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Add Event
            </button>
          )}
          <button 
            onClick={() => activeTab === 'schedules' ? fetchSchedules() : fetchEvents()}
            className="bg-gray-500 text-white border-0 px-6 py-3 rounded-md text-base font-medium cursor-pointer transition hover:bg-gray-600 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M3 21v-5h5"></path></svg>
            Refresh
          </button>
        </div>

          {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex items-center gap-3 relative">
            <div className="flex items-center rounded-md px-3 py-2 transition overflow-hidden shadow-sm bg-white border border-gray-300" style={{ width: '320px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 mr-2 shrink-0"><circle cx="11" cy="11" r="8"></circle><path d="M21 21l-4.35-4.35"></path></svg>
              <input type="text" placeholder="Search" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} className="border-0 outline-none text-sm text-gray-700 bg-transparent w-full placeholder:text-gray-400" />
            </div>
            <button type="button" onClick={()=>setShowFilter((s)=>!s)} className="w-10 h-10 flex items-center justify-center rounded-md cursor-pointer hover:bg-white/90 shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.6)', border: '1px solid rgba(209,213,219,0.6)' }}>
              <img src={filterIcon} alt="Filter" className="w-10 h-10" />
            </button>

            {showFilter && (
              <div className="absolute left-[340px] top-12 w-[240px] rounded-md shadow-lg p-3 z-10" style={{ backgroundColor: 'rgba(255,255,255,0.95)', border: '1px solid rgba(209,213,219,0.6)' }}>
                <div className="text-sm font-semibold text-gray-700 mb-2">Filter</div>
                <button type="button" onClick={()=>setShowDateOptions((s)=>!s)} className="w-full text-left flex items-center gap-2 text-sm text-gray-700 px-2 py-1.5 rounded hover:bg-gray-50">
                  <span className="w-3 h-3 rounded-full border border-gray-400"></span>
                  <span>Date</span>
                </button>
                {showDateOptions && (
                  <div className="pl-6 py-1 flex flex-col gap-2 text-sm text-gray-700">
                    {['Today','Yesterday'].map((d) => (
                      <label key={d} className="inline-flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-600" checked={selectedDates.includes(d)} onChange={(e)=> setSelectedDates((prev)=> e.target.checked ? [...prev, d] : prev.filter((x)=> x!==d))} />
                        <span>{d}</span>
                      </label>
                    ))}
                  </div>
                )}
                <button type="button" onClick={()=>setShowTimeOptions((s)=>!s)} className="w-full text-left flex items-center gap-2 text-sm text-gray-700 px-2 py-1.5 rounded hover:bg-gray-50">
                  <span className="w-3 h-3 rounded-full border border-gray-400"></span>
                  <span>Time</span>
                </button>
                {showTimeOptions && (
                  <div className="pl-6 py-1 flex flex-col gap-2 text-sm text-gray-700">
                    {['Morning','Afternoon'].map((t) => (
                      <label key={t} className="inline-flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-600" checked={selectedTimes.includes(t)} onChange={(e)=> setSelectedTimes((prev)=> e.target.checked ? [...prev, t] : prev.filter((x)=> x!==t))} />
                        <span>{t}</span>
                      </label>
                    ))}
              </div>
                )}
                <button type="button" onClick={()=>setShowLocationOptions((s)=>!s)} className="w-full text-left flex items-center gap-2 text-sm text-gray-700 px-2 py-1.5 rounded hover:bg-gray-50">
                  <span className="w-3 h-3 rounded-full border border-gray-400"></span>
                  <span>Location</span>
              </button>
                {showLocationOptions && (
                  <div className="pl-6 py-1 flex flex-col gap-2 text-sm text-gray-700">
                    {['Velangapudi, Amaravathi, AP'].map((loc) => (
                      <label key={loc} className="inline-flex items-center gap-2">
                        <input type="checkbox" className="accent-blue-600" checked={selectedLocations.includes(loc)} onChange={(e)=> setSelectedLocations((prev)=> e.target.checked ? [...prev, loc] : prev.filter((x)=> x!==loc))} />
                        <span>{loc}</span>
                      </label>
                    ))}
                  </div>
                )}
                <div className="flex justify-end gap-2 mt-3">
                  <button className="px-3 py-1.5 rounded text-sm text-gray-700 hover:bg-gray-100" onClick={()=>{setSelectedDates([]); setSelectedTimes([]); setSelectedLocations([]);}}>Reset</button>
                  <button className="px-3 py-1.5 rounded text-sm text-white bg-blue-600 hover:bg-blue-700" onClick={()=>setShowFilter(false)}>Apply</button>
                </div>
              </div>
            )}
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'schedules' ? (
            <>
              {/* Today's Schedule */}
              <div className="mb-8 rounded-xl border shadow-lg" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800 m-0">Today's Schedule</h2>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 text-sm rounded bg-white border border-gray-300 hover:bg-gray-50" onClick={fetchSchedules}>Refresh</button>
                    <label className="text-sm text-gray-600">Page size:
                      <select className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm" value={limit} onChange={(e)=> setLimit(Number(e.target.value))}>
                        {[10,25,50,100].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-4">
                  {loading ? (
                    <div className="p-4 text-center text-sm text-gray-600">Loading...</div>
                  ) : todaySchedules.length === 0 ? (
                    <div className="p-4 text-center text-sm text-gray-600">No items</div>
                  ) : todaySchedules.map((it, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <h3 className="text-base font-semibold text-gray-800 m-0 mb-1">{it.title}</h3>
                      {it.loc && <p className="text-sm text-gray-500 m-0 mb-1">{it.loc}</p>}
                      <p className="text-sm text-gray-500 m-0">{it.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Yesterday Schedule */}
              <div className="mb-8 rounded-xl border shadow-lg" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                <div className="px-4 py-3 border-b border-gray-200"><h2 className="text-xl font-bold text-gray-800 m-0">Yesterday Schedule</h2></div>
                <div className="flex flex-col gap-3 p-4">
                  {yesterdaySchedules.map((it, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <h3 className="text-base font-semibold text-gray-800 m-0 mb-1">{it.title}</h3>
                      {it.loc && <p className="text-sm text-gray-500 m-0 mb-1">{it.loc}</p>}
                      <p className="text-sm text-gray-500 m-0">{it.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Events List */}
              <div className="mb-8 rounded-xl border shadow-lg" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800 m-0">All Events</h2>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-2 text-sm rounded bg-white border border-gray-300 hover:bg-gray-50" onClick={fetchEvents}>Refresh</button>
                    <label className="text-sm text-gray-600">Page size:
                      <select className="ml-2 border border-gray-300 rounded px-2 py-1 text-sm" value={eventsLimit} onChange={(e)=> setEventsLimit(Number(e.target.value))}>
                        {[10,25,50,100].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-3 p-4">
                  {eventsLoading ? (
                    <div className="p-4 text-center text-sm text-gray-600">Loading...</div>
                  ) : events.length === 0 ? (
                    <div className="p-4 text-center text-sm text-gray-600">No events found</div>
                  ) : events.map((event, idx) => (
                    <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-base font-semibold text-gray-800 m-0 mb-1">{event.title}</h3>
                          <p className="text-sm text-gray-600 m-0 mb-2">{event.description}</p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>📅 {event.event_date}</span>
                            <span>🕐 {event.event_time}</span>
                            <span>📍 {event.location}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              event.event_type === 'meeting' ? 'bg-blue-100 text-blue-800' :
                              event.event_type === 'conference' ? 'bg-purple-100 text-purple-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {event.event_type}
                            </span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              event.priority === 'high' ? 'bg-red-100 text-red-800' :
                              event.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-green-100 text-green-800'
                            }`}>
                              {event.priority}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => handleEditEvent(event.id)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                            title="Edit Event"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteEvent(event)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                            title="Delete Event"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div className="mb-8 rounded-xl border shadow-lg" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
                  <div className="px-4 py-3 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 m-0">Upcoming Events (Next 7 Days)</h2>
                  </div>
                  <div className="flex flex-col gap-3 p-4">
                    {upcomingEvents.map((event, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                        <h3 className="text-base font-semibold text-gray-800 m-0 mb-1">{event.title}</h3>
                        <p className="text-sm text-gray-600 m-0 mb-2">{event.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>📅 {event.event_date}</span>
                          <span>🕐 {event.event_time}</span>
                          <span>📍 {event.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </main>

        {/* Add Schedule Modal */}
        {showAddScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 m-0">Add Schedule</h2>
              <button className="p-2 rounded text-gray-500 hover:bg-gray-100" onClick={handleCloseModal}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
            </div>
            <form onSubmit={handleSubmit} className="px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-xs font-medium text-gray-600 mb-1">Date</label>
                  <div className="relative">
                    <input type="date" id="date" name="date" value={formData.date} onChange={handleInputChange} required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
                </div>
              </div>
                <div>
                  <label htmlFor="time" className="block text-xs font-medium text-gray-600 mb-1">Time</label>
                  <div className="relative">
                    <input type="time" id="time" name="time" value={formData.time} onChange={handleInputChange} required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
              </div>
              </div>
                <div className="sm:col-span-2">
                  <label htmlFor="location" className="block text-xs font-medium text-gray-600 mb-1">Location</label>
                  <input type="text" id="location" name="location" value={formData.location} onChange={handleInputChange} placeholder="Street, City, Pin" required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
              </div>
                <div className="sm:col-span-2">
                  <label htmlFor="reason" className="block text-xs font-medium text-gray-600 mb-1">Reason</label>
                  <input id="reason" name="reason" value={formData.reason} onChange={handleInputChange} placeholder="Detailed Description....." required className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" />
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
                <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium">+ Add</button>
                <button type="button" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 m-0">Add Event</h2>
              <button className="p-2 rounded text-gray-500 hover:bg-gray-100" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleEventSubmit} className="px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="title">Event Title</label>
                  <input className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="title" name="title" value={eventFormData.title} onChange={handleEventInputChange} placeholder="Enter Event Title" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="event_type">Event Type</label>
                  <select className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="event_type" name="event_type" value={eventFormData.event_type} onChange={handleEventInputChange} required>
                    <option value="meeting">Meeting</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="event_date">Event Date</label>
                  <input type="date" className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="event_date" name="event_date" value={eventFormData.event_date} onChange={handleEventInputChange} required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="event_time">Event Time</label>
                  <input type="time" className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="event_time" name="event_time" value={eventFormData.event_time} onChange={handleEventInputChange} required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="location">Location</label>
                  <input className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="location" name="location" value={eventFormData.location} onChange={handleEventInputChange} placeholder="Enter Location" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="priority">Priority</label>
                  <select className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="priority" name="priority" value={eventFormData.priority} onChange={handleEventInputChange} required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="description">Description</label>
                  <textarea className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="description" name="description" value={eventFormData.description} onChange={handleEventInputChange} placeholder="Enter Event Description" rows="3" required />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="event_photo">Upload Photo</label>
                <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center gap-2">
                  <input type="file" id="event_photo" name="photo" onChange={handleEventFileChange} accept="image/*" className="hidden" />
                  <button type="button" className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={() => document.getElementById('event_photo').click()}>Browse photo</button>
                  <span className="text-xs text-gray-500">Or</span>
                  <p className="text-sm text-gray-500">Drag or Drop Here</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-medium" disabled={eventsLoading}>
                  {eventsLoading ? 'Adding...' : '+ Add Event'}
                </button>
                <button type="button" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Event Modal */}
      {showEditEventModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 m-0">Edit Event</h2>
              <button className="p-2 rounded text-gray-500 hover:bg-gray-100" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleEventSubmit} className="px-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="edit_title">Event Title</label>
                  <input className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="edit_title" name="title" value={eventFormData.title} onChange={handleEventInputChange} placeholder="Enter Event Title" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="edit_event_type">Event Type</label>
                  <select className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="edit_event_type" name="event_type" value={eventFormData.event_type} onChange={handleEventInputChange} required>
                    <option value="meeting">Meeting</option>
                    <option value="conference">Conference</option>
                    <option value="workshop">Workshop</option>
                    <option value="seminar">Seminar</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="edit_event_date">Event Date</label>
                  <input type="date" className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="edit_event_date" name="event_date" value={eventFormData.event_date} onChange={handleEventInputChange} required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="edit_event_time">Event Time</label>
                  <input type="time" className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="edit_event_time" name="event_time" value={eventFormData.event_time} onChange={handleEventInputChange} required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="edit_location">Location</label>
                  <input className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="edit_location" name="location" value={eventFormData.location} onChange={handleEventInputChange} placeholder="Enter Location" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="edit_priority">Priority</label>
                  <select className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="edit_priority" name="priority" value={eventFormData.priority} onChange={handleEventInputChange} required>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="edit_description">Description</label>
                  <textarea className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="edit_description" name="description" value={eventFormData.description} onChange={handleEventInputChange} placeholder="Enter Event Description" rows="3" required />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="edit_event_photo">Upload Photo</label>
                <div className="border border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center gap-2">
                  <input type="file" id="edit_event_photo" name="photo" onChange={handleEventFileChange} accept="image/*" className="hidden" />
                  <button type="button" className="px-3 py-1.5 rounded bg-blue-600 text-white hover:bg-blue-700" onClick={() => document.getElementById('edit_event_photo').click()}>Browse photo</button>
                  <span className="text-xs text-gray-500">Or</span>
                  <p className="text-sm text-gray-500">Drag or Drop Here</p>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium" disabled={eventsLoading}>
                  {eventsLoading ? 'Updating...' : 'Update Event'}
                </button>
                <button type="button" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={cancelDelete}>
          <div className="bg-white rounded-lg shadow-2xl relative w-96 max-w-[90vw] mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-600">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Delete Event</h3>
                  <p className="text-sm text-gray-600">
                    Are you sure you want to delete <strong>{eventToDelete?.title}</strong>? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={cancelDelete}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteEvent}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                  disabled={eventsLoading}
                >
                  {eventsLoading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[1000]" onClick={handleCloseModal}>
          <div className="bg-white rounded-xl p-12 text-center shadow-2xl relative w-96 max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors" onClick={handleCloseModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"></polyline></svg>
              </div>
              <div className="text-center">
                <h3 className="text-emerald-600 text-xl font-semibold mb-2">
                  {activeTab === 'schedules' ? 'Schedule Added Successfully' : 'Event Updated Successfully'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {activeTab === 'schedules' ? 'The schedule has been created and saved' : 'The event has been updated and saved'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Schedule;
