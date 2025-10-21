// Authentication utility functions

export const getStoredToken = () => {
  return localStorage.getItem('access_token');
};

export const getTokenType = () => {
  return localStorage.getItem('token_type') || 'Bearer';
};

export const isTokenExpired = () => {
  const loginTime = localStorage.getItem('login_time');
  const expiresIn = localStorage.getItem('expires_in');
  
  if (!loginTime || !expiresIn) {
    return true;
  }
  
  const currentTime = Date.now();
  const tokenExpiryTime = parseInt(loginTime) + (parseInt(expiresIn) * 1000);
  
  return currentTime >= tokenExpiryTime;
};

export const isAuthenticated = () => {
  const token = getStoredToken();
  return token && !isTokenExpired();
};

export const clearAuthData = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('token_type');
  localStorage.removeItem('expires_in');
  localStorage.removeItem('login_time');
};

export const getAuthHeaders = () => {
  const token = getStoredToken();
  const tokenType = getTokenType();
  
  if (!token) {
    return {};
  }
  
  return {
    'Authorization': `${tokenType} ${token}`,
    'Content-Type': 'application/json'
  };
};

// Fetch current user information
export const getCurrentUser = async () => {
  try {
    const response = await fetch('/api/auth/me', {
      method: 'GET',
      headers: getAuthHeaders()
    });

    if (response.ok) {
      const userData = await response.json();
      return userData;
    } else if (response.status === 401) {
      // Token expired or invalid
      clearAuthData();
      window.location.href = '/login';
      return null;
    } else {
      throw new Error('Failed to fetch user data');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

// Get current user's profile (new users service)
export const getMyProfile = async () => {
  try {
    const response = await fetch('/api/users/me/profile', {
      method: 'GET',
      headers: getAuthHeaders()
    });
    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      clearAuthData();
      window.location.href = '/login';
      return null;
    } else {
      throw new Error('Failed to fetch profile');
    }
  } catch (err) {
    console.error('Error fetching my profile:', err);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (profileData) => {
  try {
    const response = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });

    if (response.ok) {
      const updatedUser = await response.json();
      return updatedUser;
    } else if (response.status === 401) {
      // Token expired or invalid
      clearAuthData();
      window.location.href = '/login';
      return null;
    } else if (response.status === 422) {
      // Validation error
      const errorData = await response.json();
      throw new Error(errorData.detail?.[0]?.msg || 'Validation error');
    } else {
      throw new Error('Failed to update profile');
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Update current user's profile (new users service)
export const updateMyProfile = async (profileData) => {
  try {
    const response = await fetch('/api/users/me/profile', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    if (response.ok) {
      return await response.json();
    } else if (response.status === 401) {
      clearAuthData();
      window.location.href = '/login';
      return null;
    } else if (response.status === 422) {
      const errorData = await response.json();
      throw new Error(errorData.detail?.[0]?.msg || 'Validation error');
    } else {
      throw new Error('Failed to update profile');
    }
  } catch (err) {
    console.error('Error updating my profile:', err);
    throw err;
  }
};

// Logout user and invalidate session
export const logoutUser = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      headers: getAuthHeaders()
    });

    if (response.ok) {
      const result = await response.text();
      console.log('Logout successful:', result);
      return result;
    } else if (response.status === 401) {
      // Token already expired or invalid, just clear local data
      console.log('Token already invalid, clearing local data');
      return 'Token expired';
    } else {
      console.warn('Logout API failed, but clearing local data anyway');
      return 'Logout completed locally';
    }
  } catch (error) {
    console.error('Error during logout API call:', error);
    // Even if API fails, we should clear local data
    return 'Logout completed locally';
  } finally {
    // Always clear local auth data regardless of API response
    clearAuthData();
  }
};

// Validate voter ID
export const validateVoterId = async (voterId) => {
  try {
    const response = await fetch(`/api/auth/validate-voter-id/${encodeURIComponent(voterId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const result = await response.text();
      console.log('Voter ID validation successful:', result);
      return { isValid: true, message: result };
    } else if (response.status === 422) {
      // Validation error
      const errorData = await response.json();
      return { 
        isValid: false, 
        message: errorData.detail?.[0]?.msg || 'Invalid voter ID format' 
      };
    } else if (response.status === 404) {
      // Voter ID not found
      return { 
        isValid: false, 
        message: 'Voter ID not found in the system' 
      };
    } else {
      return { 
        isValid: false, 
        message: 'Failed to validate voter ID' 
      };
    }
  } catch (error) {
    console.error('Error validating voter ID:', error);
    return { 
      isValid: false, 
      message: 'Network error. Please try again.' 
    };
  }
};

// ===== Grievances API =====
export const getGrievances = async ({ skip = 0, limit = 25, status, priority, constituency } = {}) => {
  const params = new URLSearchParams();
  params.set('skip', String(skip));
  params.set('limit', String(limit));
  if (status) params.set('status_filter', status);
  if (priority) params.set('priority_filter', priority);
  if (constituency) params.set('constituency_filter', constituency);
  const response = await fetch(`/api/grievances?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const createGrievance = async (payload) => {
  const response = await fetch('/api/grievances', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getUserGrievances = async (userId, { skip = 0, limit = 25 } = {}) => {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) });
  const response = await fetch(`/api/grievances/user/${encodeURIComponent(userId)}?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getMyGrievances = async ({ skip = 0, limit = 25 } = {}) => {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) });
  const response = await fetch(`/api/grievances/my?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getGrievanceById = async (grievanceId) => {
  const response = await fetch(`/api/grievances/${encodeURIComponent(grievanceId)}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const updateGrievance = async (grievanceId, payload) => {
  const response = await fetch(`/api/grievances/${encodeURIComponent(grievanceId)}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const deleteGrievance = async (grievanceId) => {
  const response = await fetch(`/api/grievances/${encodeURIComponent(grievanceId)}`, { method: 'DELETE', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

export const addGrievanceComment = async (grievanceId, { content, timestamp }) => {
  const response = await fetch(`/api/grievances/${encodeURIComponent(grievanceId)}/comments`, { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify({ content, timestamp }) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getGrievanceComments = async (grievanceId) => {
  const response = await fetch(`/api/grievances/${encodeURIComponent(grievanceId)}/comments`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const assignGrievance = async (grievanceId, departmentId) => {
  const params = new URLSearchParams();
  if (departmentId) params.set('department_id', departmentId);
  const response = await fetch(`/api/grievances/assign/${encodeURIComponent(grievanceId)}?${params.toString()}`, { method: 'PUT', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

export const getGrievanceStatsSummary = async () => {
  const response = await fetch('/api/grievances/stats/summary', { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getAdminGrievancesAll = async (opts = {}) => {
  const { skip = 0, limit = 25, status, priority, constituency } = opts;
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) });
  if (status) params.set('status_filter', status);
  if (priority) params.set('priority_filter', priority);
  if (constituency) params.set('constituency_filter', constituency);
  const response = await fetch(`/api/grievances/admin/all?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getAdminGrievancesOngoing = async ({ skip = 0, limit = 25 } = {}) => {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) });
  const response = await fetch(`/api/grievances/admin/ongoing?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const updateGrievanceStatusAdmin = async (grievanceId, status) => {
  const response = await fetch(`/api/grievances/admin/${encodeURIComponent(grievanceId)}/status`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify({ status }) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

// ===== Schedules API =====
export const getSchedules = async ({ skip = 0, limit = 25, start_date, end_date } = {}) => {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) });
  if (start_date) params.set('start_date', start_date);
  if (end_date) params.set('end_date', end_date);
  const response = await fetch(`/api/schedules?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const createSchedule = async (payload) => {
  const response = await fetch('/api/schedules', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getMySchedules = async ({ skip = 0, limit = 25 } = {}) => {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) });
  const response = await fetch(`/api/schedules/my?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getScheduleById = async (scheduleId) => {
  const response = await fetch(`/api/schedules/${encodeURIComponent(scheduleId)}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const updateSchedule = async (scheduleId, payload) => {
  const response = await fetch(`/api/schedules/${encodeURIComponent(scheduleId)}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const deleteSchedule = async (scheduleId) => {
  const response = await fetch(`/api/schedules/${encodeURIComponent(scheduleId)}`, { method: 'DELETE', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

export const getUpcomingEvents = async ({ days = 7 } = {}) => {
  const params = new URLSearchParams({ days: String(days) });
  const response = await fetch(`/api/schedules/upcoming/events?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

// ===== Schedule Events API =====
export const getScheduleEvents = async ({ skip = 0, limit = 25, start_date, end_date } = {}) => {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) });
  if (start_date) params.set('start_date', start_date);
  if (end_date) params.set('end_date', end_date);
  const response = await fetch(`/api/schedule_events?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const createScheduleEvent = async (payload) => {
  const response = await fetch('/api/schedule_events', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getScheduleEventById = async (eventId) => {
  const response = await fetch(`/api/schedule_events/${encodeURIComponent(eventId)}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const updateScheduleEvent = async (eventId, payload) => {
  const response = await fetch(`/api/schedule_events/${encodeURIComponent(eventId)}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const deleteScheduleEvent = async (eventId) => {
  const response = await fetch(`/api/schedule_events/${encodeURIComponent(eventId)}`, { method: 'DELETE', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

export const getUpcomingScheduleEvents = async ({ days = 7 } = {}) => {
  const params = new URLSearchParams({ days: String(days) });
  const response = await fetch(`/api/schedule_events/upcoming/events?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

// ===== News API =====
export const getNews = async ({ skip = 0, limit = 25 } = {}) => {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) });
  const response = await fetch(`/api/news?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const createNews = async (payload) => {
  const response = await fetch('/api/news', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getNewsById = async (newsId) => {
  const response = await fetch(`/api/news/${encodeURIComponent(newsId)}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const updateNews = async (newsId, payload) => {
  const response = await fetch(`/api/news/${encodeURIComponent(newsId)}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const deleteNews = async (newsId) => {
  const response = await fetch(`/api/news/${encodeURIComponent(newsId)}`, { method: 'DELETE', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

// ===== Projects API =====
export const getProjects = async ({ skip = 0, limit = 25 } = {}) => {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) });
  const response = await fetch(`/api/projects?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const createProject = async (payload) => {
  const response = await fetch('/api/projects', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getProjectById = async (projectId) => {
  const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const updateProject = async (projectId, payload) => {
  const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const deleteProject = async (projectId) => {
  const response = await fetch(`/api/projects/${encodeURIComponent(projectId)}`, { method: 'DELETE', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

// ===== Notifications API =====
export const getUserNotifications = async (userId, { skip = 0, limit = 100, unread_only = false } = {}) => {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit), unread_only: String(unread_only) });
  const response = await fetch(`/api/notifications/user/${encodeURIComponent(userId)}?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getMyNotifications = async ({ skip = 0, limit = 100, unread_only = false } = {}) => {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit), unread_only: String(unread_only) });
  const response = await fetch(`/api/notifications/my?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getPublicNotifications = async ({ skip = 0, limit = 100 } = {}) => {
  const params = new URLSearchParams({ skip: String(skip), limit: String(limit) });
  const response = await fetch(`/api/notifications/public?${params.toString()}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getNotificationById = async (notificationId) => {
  const response = await fetch(`/api/notifications/${encodeURIComponent(notificationId)}`, { method: 'GET', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const updateNotification = async (notificationId, payload) => {
  const response = await fetch(`/api/notifications/${encodeURIComponent(notificationId)}`, { method: 'PUT', headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const deleteNotification = async (notificationId) => {
  const response = await fetch(`/api/notifications/${encodeURIComponent(notificationId)}`, { method: 'DELETE', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

export const createNotification = async (payload) => {
  const response = await fetch('/api/notifications/', { method: 'POST', headers: getAuthHeaders(), body: JSON.stringify(payload) });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const markNotificationRead = async (notificationId) => {
  const response = await fetch(`/api/notifications/${encodeURIComponent(notificationId)}/mark-read`, { method: 'PUT', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

export const markAllNotificationsRead = async () => {
  const response = await fetch('/api/notifications/mark-all-read', { method: 'PUT', headers: getAuthHeaders() });
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

// ===== Upload API =====
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/upload/image', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    body: formData
  });
  
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

export const uploadVideo = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/upload/video', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    body: formData
  });
  
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch('/api/upload/document', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    body: formData
  });
  
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

export const uploadMultipleFiles = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('files', file);
  });
  
  const response = await fetch('/api/upload/multiple', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('access_token')}`
    },
    body: formData
  });
  
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

// ===== Constituencies API =====
export const getAllConstituencies = async () => {
  const response = await fetch('/api/constituencies/', { 
    method: 'GET', 
    headers: getAuthHeaders() 
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getConstituencyById = async (constituencyId) => {
  const response = await fetch(`/api/constituencies/${encodeURIComponent(constituencyId)}`, { 
    method: 'GET', 
    headers: getAuthHeaders() 
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

// ===== Departments API =====
export const getAllDepartments = async () => {
  const response = await fetch('/api/departments/', { 
    method: 'GET', 
    headers: getAuthHeaders() 
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getDepartmentById = async (departmentId) => {
  const response = await fetch(`/api/departments/${encodeURIComponent(departmentId)}`, { 
    method: 'GET', 
    headers: getAuthHeaders() 
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

// ===== Admin Authentication API =====
export const adminLogin = async (email, password) => {
  const response = await fetch('/api/admin/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getCurrentAdmin = async () => {
  const response = await fetch('/api/admin/auth/me', { 
    method: 'GET', 
    headers: getAuthHeaders() 
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const adminLogout = async () => {
  const response = await fetch('/api/admin/auth/logout', {
    method: 'POST',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

export const validateAdminAccess = async () => {
  const response = await fetch('/api/admin/auth/validate', { 
    method: 'GET', 
    headers: getAuthHeaders() 
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

export const createAdmin = async (adminData) => {
  const response = await fetch('/api/admin/auth/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(adminData)
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const getAllAdmins = async () => {
  const response = await fetch('/api/admin/auth/list', { 
    method: 'GET', 
    headers: getAuthHeaders() 
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const updateAdmin = async (adminId, adminData) => {
  const response = await fetch(`/api/admin/auth/update/${encodeURIComponent(adminId)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders()
    },
    body: JSON.stringify(adminData)
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.json();
};

export const deleteAdmin = async (adminId) => {
  const response = await fetch(`/api/admin/auth/delete/${encodeURIComponent(adminId)}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!response.ok) throw new Error(await response.text());
  return await response.text();
};

// ===== User Authentication API =====
export const loginUser = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error(await response.text());
  const result = await response.json();
  
  // Store the access token in localStorage
  localStorage.setItem('access_token', result.access_token);
  localStorage.setItem('token_type', result.token_type);
  localStorage.setItem('expires_in', result.expires_in);
  localStorage.setItem('login_time', Date.now().toString());
  
  return result;
};

export const registerUser = async (userData) => {
  const response = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  if (!response.ok) throw new Error(await response.text());
  const result = await response.json();
  
  // Store the access token in localStorage
  localStorage.setItem('access_token', result.access_token);
  localStorage.setItem('token_type', result.token_type);
  localStorage.setItem('expires_in', result.expires_in);
  localStorage.setItem('login_time', Date.now().toString());
  
  return result;
};

// Load voter IDs from file (Admin only)
export const loadVoterIds = async () => {
  try {
    const response = await fetch('/api/auth/admin/load-voter-ids', {
      method: 'POST',
      headers: getAuthHeaders()
    });

    if (response.ok) {
      const result = await response.text();
      console.log('Voter IDs loaded successfully:', result);
      return { success: true, message: result };
    } else if (response.status === 401) {
      // Unauthorized - not an admin
      return { 
        success: false, 
        message: 'Unauthorized. Admin access required.' 
      };
    } else if (response.status === 403) {
      // Forbidden - insufficient permissions
      return { 
        success: false, 
        message: 'Forbidden. Insufficient permissions.' 
      };
    } else {
      return { 
        success: false, 
        message: 'Failed to load voter IDs' 
      };
    }
  } catch (error) {
    console.error('Error loading voter IDs:', error);
    return { 
      success: false, 
      message: 'Network error. Please try again.' 
    };
  }
};
