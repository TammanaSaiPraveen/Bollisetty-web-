import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './Settings.css'

const Settings = () => {
  const [settings, setSettings] = useState({ theme: 'system', accent: '#667eea', emailAlerts: true, push: false, twoFA: false, sessionMins: 30 })
  const [message, setMessage] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('app_settings')
    if (saved) {
      try { setSettings(JSON.parse(saved)) } catch {}
    }
  }, [])

  useEffect(() => {
    // apply accent color live
    document.documentElement.style.setProperty('--accent', settings.accent)
  }, [settings.accent])

  const bind = (key) => ({
    value: settings[key],
    onChange: (e) => setSettings(prev => ({ ...prev, [key]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }))
  })

  const bindCheck = (key) => ({
    checked: settings[key],
    onChange: (e) => setSettings(prev => ({ ...prev, [key]: e.target.checked }))
  })

  const save = () => {
    localStorage.setItem('app_settings', JSON.stringify(settings))
    setMessage('Settings saved')
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className="settings-container">
      <header className="settings-header">
        <h1>Settings</h1>
        <Link className="back-link" to="/dashboard">Back to Dashboard</Link>
      </header>

      <main className="settings-main">
        {message && (
          <div className="settings-card" style={{marginBottom:'1rem'}}>
            <span>{message}</span>
          </div>
        )}
        <section className="settings-grid">
          <form className="settings-card">
            <h3>Appearance</h3>
            <div className="row">
              <label>Theme</label>
              <select {...bind('theme')}>
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System</option>
              </select>
            </div>
            <div className="row">
              <label>Accent Color</label>
              <input type="color" {...bind('accent')} />
            </div>
            <div className="actions">
              <button type="button" className="save-btn" onClick={save}>Save</button>
            </div>
          </form>

          <form className="settings-card">
            <h3>Notifications</h3>
            <div className="row inline">
              <label>Email Alerts</label>
              <input type="checkbox" {...bindCheck('emailAlerts')} />
            </div>
            <div className="row inline">
              <label>Push Notifications</label>
              <input type="checkbox" {...bindCheck('push')} />
            </div>
            <div className="actions">
              <button type="button" className="save-btn" onClick={save}>Update</button>
            </div>
          </form>

          <form className="settings-card">
            <h3>Security</h3>
            <div className="row inline">
              <label>Two-factor Authentication</label>
              <input type="checkbox" {...bindCheck('twoFA')} />
            </div>
            <div className="row">
              <label>Session Timeout (mins)</label>
              <input type="number" min={5} max={240} {...bind('sessionMins')} />
            </div>
            <div className="actions">
              <button type="button" className="save-btn" onClick={save}>Apply</button>
            </div>
          </form>
        </section>
      </main>
    </div>
  )
}

export default Settings


