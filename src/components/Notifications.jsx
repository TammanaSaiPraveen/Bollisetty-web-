import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import fullLogo from '../assets/Images/fulllogo.png';
import apImage from '../assets/Images/AP.png';
import { useUser } from '../contexts/UserContext';
import { 
  getMyNotifications, 
  getPublicNotifications, 
  getNotificationById, 
  updateNotification, 
  deleteNotification, 
  createNotification, 
  markNotificationRead, 
  markAllNotificationsRead 
} from '../utils/auth';

const Notifications = () => {
  const { user, loading: userLoading, handleLogout } = useUser();
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [planExpanded, setPlanExpanded] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [publicNotifications, setPublicNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState(null);
  const [editingNotification, setEditingNotification] = useState(null);
  const [activeTab, setActiveTab] = useState('my'); // 'my', 'public', 'admin'
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(25);
  const [unreadOnly, setUnreadOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    isRead: false,
    userId: ''
  });

  const profileRef = useRef(null);

  const toggleSidebar = () => setSidebarExpanded(!sidebarExpanded);
  const togglePlanSubmenu = () => setPlanExpanded(!planExpanded);
  const toggleProfileDropdown = () => setShowProfileDropdown(!showProfileDropdown);

  const handleCloseModal = () => {
    setShowCreateModal(false);
    setShowEditModal(false);
    setShowDeleteConfirmModal(false);
    setShowSuccessModal(false);
    setFormData({ title: '', description: '', isRead: false, userId: '' });
    setEditingNotification(null);
    setNotificationToDelete(null);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  // Fetch notifications based on active tab
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError('');
      
      if (activeTab === 'my') {
        const data = await getMyNotifications({ skip, limit, unread_only: unreadOnly });
        setNotifications(Array.isArray(data) ? data : data.items || []);
      } else if (activeTab === 'public') {
        const data = await getPublicNotifications({ skip, limit });
        setPublicNotifications(Array.isArray(data) ? data : data.items || []);
      }
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setLoading(false);
    }
  };

  // Create notification
  const handleCreateNotification = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await createNotification(formData);
      setShowCreateModal(false);
      setShowSuccessModal(true);
      fetchNotifications();
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setLoading(false);
    }
  };

  // Edit notification
  const handleEditNotification = async (notificationId) => {
    try {
      const notification = await getNotificationById(notificationId);
      setFormData({
        title: notification.title || '',
        description: notification.description || '',
        isRead: notification.isRead || false,
        userId: notification.userId || ''
      });
      setEditingNotification(notification);
      setShowEditModal(true);
    } catch (err) {
      setError(String(err.message || err));
    }
  };

  // Update notification
  const handleUpdateNotification = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await updateNotification(editingNotification.id, formData);
      setShowEditModal(false);
      setShowSuccessModal(true);
      fetchNotifications();
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setLoading(false);
    }
  };

  // Delete notification
  const handleDeleteNotification = (notification) => {
    setNotificationToDelete(notification);
    setShowDeleteConfirmModal(true);
  };

  const confirmDeleteNotification = async () => {
    if (!notificationToDelete) return;
    try {
      setLoading(true);
      await deleteNotification(notificationToDelete.id);
      setShowDeleteConfirmModal(false);
      setShowSuccessModal(true);
      fetchNotifications();
    } catch (err) {
      setError(String(err.message || err));
    } finally {
      setLoading(false);
    }
  };

  // Mark notification as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      await markNotificationRead(notificationId);
      fetchNotifications();
    } catch (err) {
      setError(String(err.message || err));
    }
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      setLoading(true);
      await markAllNotificationsRead();
      setShowSuccessModal(true);
      fetchNotifications();
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

  useEffect(() => { fetchNotifications(); /* eslint-disable-next-line */ }, [activeTab, skip, limit, unreadOnly]);

  const sidebarWidthPx = sidebarExpanded ? 200 : 60;

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
              <div className="absolute top-full right-0 bg-white border border-gray-200 rounded-lg shadow-xl z-[1000] mt-2 min-w-48 overflow-hidden">
                {user && (
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {user.profilePictureUrl ? (
                          <img src={user.profilePictureUrl} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                        ) : (
                          <span className="text-blue-600 text-sm font-medium">
                            {user.firstName?.[0] || user.email?.[0] || 'U'}
                          </span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : user.email || 'User'}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  </div>
                )}
                <Link to="/profile" className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  <span>My Profile</span>
                </Link>
                <Link to="/posts" className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>
                  <span>My Posts</span>
                </Link>
                <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
                  <span>Admin Panel</span>
                </Link>
                <div className="flex items-center gap-3 px-4 py-3 text-gray-700 cursor-pointer text-sm font-medium hover:bg-gray-100">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l-.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                  <span>Settings</span>
                </div>
                <div className="border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-600 cursor-pointer text-sm font-medium hover:bg-red-50"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16,17 21,12 16,7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-screen bg-amber-400 z-[1001] transition-all flex flex-col" style={{ width: sidebarWidthPx }}>
        <div className="p-4 cursor-pointer flex flex-col gap-1 items-center justify-center border-b border-black/10" onClick={toggleSidebar}>
          <div className="w-5 h-0.5 bg-gray-800"></div>
          <div className="w-5 h-0.5 bg-gray-800"></div>
          <div className="w-5 h-0.5 bg-gray-800"></div>
        </div>
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
              <Link to="/schedule" className="flex items-center px-4 py-3 text-sm bg-white/10 rounded-md mx-2 hover:bg-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                <span className="ml-3 text-sm font-medium">Schedule</span>
              </Link>
              <Link to="/news" className="flex items-center px-4 py-3 text-sm bg-white/10 rounded-md mx-2 hover:bg-white/20">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14,2 14,8 20,8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10,9 9,9 8,9"></polyline></svg>
                <span className="ml-3 text-sm font-medium">News</span>
              </Link>
            </div>
          )}
          <Link to="/development" className="flex items-center p-4 text-gray-800 hover:bg-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Development</span>
          </Link>
          <Link to="/notifications" className="flex items-center p-4 text-gray-800 hover:bg-white/30 bg-white/20">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Notifications</span>
          </Link>
        </nav>
        <div className="mt-auto p-2">
          <div className="flex items-center justify-center p-4 text-gray-800 rounded-md hover:bg-white/30">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16,17 21,12 16,7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            <span className={`ml-3 text-sm font-medium whitespace-nowrap transition-all ${sidebarExpanded ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="relative z-[1] min-h-screen p-8 pt-20 transition-all" style={{ marginLeft: sidebarWidthPx, backgroundImage: `url(${apImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[1.75rem] font-bold text-gray-800 m-0">Notifications</h1>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-white/60 rounded-lg p-1 backdrop-blur-sm">
            <button
              onClick={() => setActiveTab('my')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'my'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Notifications
            </button>
            <button
              onClick={() => setActiveTab('public')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'public'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Public Notifications
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'admin'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Admin
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="mb-6 flex gap-3">
          {activeTab === 'admin' && (
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-green-500 text-white border-0 px-6 py-3 rounded-md text-base font-medium cursor-pointer transition hover:bg-green-600 flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
              Create Notification
            </button>
          )}
          {activeTab === 'my' && (
            <button 
              onClick={handleMarkAllAsRead}
              className="bg-blue-500 text-white border-0 px-6 py-3 rounded-md text-base font-medium cursor-pointer transition hover:bg-blue-600 flex items-center gap-2"
              disabled={loading}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"></polyline></svg>
              Mark All as Read
            </button>
          )}
          <button 
            onClick={fetchNotifications}
            className="bg-gray-500 text-white border-0 px-6 py-3 rounded-md text-base font-medium cursor-pointer transition hover:bg-gray-600 flex items-center gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M3 21v-5h5"></path></svg>
            Refresh
          </button>
        </div>

        {/* Filters */}
        {activeTab === 'my' && (
          <div className="mb-6 flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox" 
                checked={unreadOnly} 
                onChange={(e) => setUnreadOnly(e.target.checked)}
                className="accent-blue-600"
              />
              <span className="text-sm text-gray-700">Unread only</span>
            </label>
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Page size:</label>
              <select 
                className="border border-gray-300 rounded px-2 py-1 text-sm" 
                value={limit} 
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                {[10, 25, 50, 100].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}

        {/* Notifications List */}
        <div className="rounded-xl border shadow-lg" style={{ backgroundColor: 'rgba(255,255,255,0.65)' }}>
          <div className="px-4 py-3 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 m-0">
              {activeTab === 'my' ? 'My Notifications' : 
               activeTab === 'public' ? 'Public Notifications' : 
               'Admin - All Notifications'}
            </h2>
          </div>
          <div className="flex flex-col gap-3 p-4">
            {loading ? (
              <div className="p-4 text-center text-sm text-gray-600">Loading...</div>
            ) : (activeTab === 'my' ? notifications : publicNotifications).length === 0 ? (
              <div className="p-4 text-center text-sm text-gray-600">No notifications found</div>
            ) : (activeTab === 'my' ? notifications : publicNotifications).map((notification, idx) => (
              <div key={idx} className={`bg-white rounded-lg p-4 shadow-sm border border-gray-200 ${!notification.isRead ? 'border-l-4 border-l-blue-500' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-base font-semibold text-gray-800 m-0">{notification.title}</h3>
                      {!notification.isRead && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">New</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 m-0 mb-2">{notification.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>📅 {new Date(notification.createdAt).toLocaleDateString()}</span>
                      <span>🕐 {new Date(notification.createdAt).toLocaleTimeString()}</span>
                      {notification.userId && <span>👤 User: {notification.userId}</span>}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    {!notification.isRead && activeTab === 'my' && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-md transition-colors"
                        title="Mark as Read"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20,6 9,17 4,12"></polyline>
                        </svg>
                      </button>
                    )}
                    {activeTab === 'admin' && (
                      <>
                        <button
                          onClick={() => handleEditNotification(notification.id)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit Notification"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDeleteNotification(notification)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete Notification"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 6h18"></path>
                            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Create Notification Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 m-0">Create Notification</h2>
              <button className="p-2 rounded text-gray-500 hover:bg-gray-100" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleCreateNotification} className="px-6 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="title">Title</label>
                  <input className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="title" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter notification title" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="description">Description</label>
                  <textarea className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter notification description" rows="3" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="userId">User ID (optional)</label>
                  <input className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="userId" name="userId" value={formData.userId} onChange={handleInputChange} placeholder="Leave empty for public notification" />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="isRead" name="isRead" checked={formData.isRead} onChange={handleInputChange} className="accent-blue-600" />
                  <label htmlFor="isRead" className="text-sm text-gray-700">Mark as read</label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="bg-green-600 text-white px-5 py-2.5 rounded-full text-sm font-medium" disabled={loading}>
                  {loading ? 'Creating...' : 'Create Notification'}
                </button>
                <button type="button" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Notification Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={handleCloseModal}>
          <div className="bg-white rounded-lg w-[90%] max-w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800 m-0">Edit Notification</h2>
              <button className="p-2 rounded text-gray-500 hover:bg-gray-100" onClick={handleCloseModal}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            <form onSubmit={handleUpdateNotification} className="px-6 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="edit_title">Title</label>
                  <input className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="edit_title" name="title" value={formData.title} onChange={handleInputChange} placeholder="Enter notification title" required />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1" htmlFor="edit_description">Description</label>
                  <textarea className="w-full px-3 py-3 border border-gray-300 rounded-md text-sm text-gray-700" id="edit_description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter notification description" rows="3" required />
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" id="edit_isRead" name="isRead" checked={formData.isRead} onChange={handleInputChange} className="accent-blue-600" />
                  <label htmlFor="edit_isRead" className="text-sm text-gray-700">Mark as read</label>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button type="submit" className="bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium" disabled={loading}>
                  {loading ? 'Updating...' : 'Update Notification'}
                </button>
                <button type="button" className="bg-gray-100 text-gray-700 px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-200" onClick={handleCloseModal}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={handleCloseModal}>
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
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Delete Notification</h3>
                  <p className="text-sm text-gray-600">
                    Are you sure you want to delete <strong>{notificationToDelete?.title}</strong>? This action cannot be undone.
                  </p>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteNotification}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000]" onClick={handleCloseModal}>
          <div className="bg-white rounded-xl p-12 text-center shadow-2xl relative w-96 max-w-[90vw]" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors" onClick={handleCloseModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20,6 9,17 4,12"></polyline></svg>
              </div>
              <div className="text-center">
                <h3 className="text-emerald-600 text-xl font-semibold mb-2">Operation Successful</h3>
                <p className="text-gray-600 text-sm">The notification has been processed successfully</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
