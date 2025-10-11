import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'
import ForgotPassword from './components/ForgotPassword'
import SignUp from './components/SignUp'
import Dashboard from './components/Dashboard'
import Grievances from './components/Grievances'
import Users from './components/Users'
import Reports from './components/Reports'
import Schedule from './components/Schedule'
import News from './components/News'
import Development from './components/Development'
import Profile from './components/Profile'
import Settings from './components/Settings'
// App.css removed - using Tailwind CSS

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/grievances" element={<Grievances />} />
        <Route path="/users" element={<Users />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/news" element={<News />} />
        <Route path="/development" element={<Development />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App
