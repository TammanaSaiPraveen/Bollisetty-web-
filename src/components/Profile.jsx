import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Profile.css'

const Profile = () => {
  const [profile, setProfile] = useState({
    name: 'Surya Bollisetty',
    email: 'surya@gmail.com',
    role: 'Admin',
    department: 'Electricity'
  })

  const [passwordForm, setPasswordForm] = useState({
    current: '',
    next: '',
    confirm: ''
  })

  const [message, setMessage] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('app_profile')
    if (saved) {
      try { setProfile(JSON.parse(saved)) } catch {}
    }
  }, [])

  const handleChange = (key) => (e) => {
    setProfile(prev => ({ ...prev, [key]: e.target.value }))
  }

  const saveProfile = () => {
    localStorage.setItem('app_profile', JSON.stringify(profile))
    setMessage('Profile saved')
    setTimeout(() => setMessage(''), 2000)
  }

  const updatePassword = () => {
    if (!passwordForm.current || !passwordForm.next || !passwordForm.confirm) {
      setMessage('Please fill all password fields')
      setTimeout(() => setMessage(''), 2000)
      return
    }
    if (passwordForm.next !== passwordForm.confirm) {
      setMessage('New password and confirm do not match')
      setTimeout(() => setMessage(''), 2500)
      return
    }
    // In real app, call API. Here just clear and show success
    setPasswordForm({ current: '', next: '', confirm: '' })
    setMessage('Password updated')
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>My Profile</h1>
        <Link className="back-link" to="/dashboard">Back to Dashboard</Link>
      </header>

      <main className="profile-main">
        {message && (
          <div className="profile-card" style={{alignItems:'center', gap:'.5rem'}}>
            <span className="muted">{message}</span>
          </div>
        )}
        <section className="profile-card">
          <div className="avatar">
            <span>SB</span>
          </div>
          <div className="profile-info">
            <h2>{profile.name}</h2>
            <p className="muted">{profile.email}</p>
            <div className="meta">
              <div>
                <span className="label">Role</span>
                <span className="value">{profile.role}</span>
              </div>
              <div>
                <span className="label">Department</span>
                <span className="value">{profile.department}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="profile-forms">
          <form className="form-card">
            <h3>Personal Details</h3>
            <div className="form-row">
              <label>Name</label>
              <input type="text" value={profile.name} onChange={handleChange('name')} />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input type="email" value={profile.email} onChange={handleChange('email')} />
            </div>
            <div className="form-row">
              <label>Role</label>
              <input type="text" value={profile.role} onChange={handleChange('role')} />
            </div>
            <div className="form-row">
              <label>Department</label>
              <input type="text" value={profile.department} onChange={handleChange('department')} />
            </div>
            <div className="actions">
              <button type="button" className="save-btn" onClick={saveProfile}>Save Changes</button>
            </div>
          </form>

          <form className="form-card">
            <h3>Change Password</h3>
            <div className="form-row">
              <label>Current Password</label>
              <input type="password" placeholder="Enter current password" value={passwordForm.current} onChange={(e)=>setPasswordForm({...passwordForm, current:e.target.value})} />
            </div>
            <div className="form-row">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" value={passwordForm.next} onChange={(e)=>setPasswordForm({...passwordForm, next:e.target.value})} />
            </div>
            <div className="form-row">
              <label>Confirm Password</label>
              <input type="password" placeholder="Confirm new password" value={passwordForm.confirm} onChange={(e)=>setPasswordForm({...passwordForm, confirm:e.target.value})} />
            </div>
            <div className="actions">
              <button type="button" className="save-btn" onClick={updatePassword}>Update Password</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Profile


