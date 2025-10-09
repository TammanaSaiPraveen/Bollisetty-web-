import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';
import bjpImage from '../assets/Images/BJP.png';
import janasenaImage from '../assets/Images/Janasena.jpg';
import tdpImage from '../assets/Images/TDP.jpg';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [bjpImage, janasenaImage, tdpImage];

  // Password reset modal states
  const [showPasswordResetModal, setShowPasswordResetModal] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: Email, 2: OTP, 3: Success
  const [resetData, setResetData] = useState({
    email: '',
    otp: '',
    newPassword: ''
  });
  const [otpTimer, setOtpTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // OTP Timer effect
  useEffect(() => {
    let timer;
    if (resetStep === 2 && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resetStep, otpTimer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Navigate to dashboard on successful login
    navigate('/dashboard');
  };

  const handleResetChange = (e) => {
    const { name, value } = e.target;
    setResetData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleForgotPassword = () => {
    setShowPasswordResetModal(true);
    setResetStep(1);
    setResetData({ email: '', otp: '', newPassword: '' });
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (resetData.email) {
      setResetStep(2);
      setOtpTimer(60);
      console.log('OTP sent to:', resetData.email);
    }
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (resetData.otp && resetData.newPassword) {
      setResetStep(3);
      console.log('Password reset successful');
    }
  };

  const handleCloseModal = () => {
    setShowPasswordResetModal(false);
    setResetStep(1);
    setResetData({ email: '', otp: '', newPassword: '' });
    setOtpTimer(60);
  };

  const handleBackToLogin = () => {
    handleCloseModal();
  };

  return (
    <div className="login-container">
      {/* Left side - Login Form */}
      <div className="login-form-section">
        <div className="login-form-container">
          {/* Logo and Brand */}
          <div className="brand-section">
            <div className="logo">
              <img src={logoImage} alt="Logo" className="logo-image" />
              <span className="brand-name">మన బొలిశెట్టి</span>
            </div>
            <h1 className="login-title">Login</h1>
            <p className="login-subtitle">Welcome!</p>
          </div>

          {/* Login Form */}
          <div className="form-section">

            <form onSubmit={handleSubmit} className="login-form">
              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="checkbox-input"
                  />
                  <span className="checkbox-text">Remember me</span>
                </label>
              </div>

              <button type="submit" className="login-button">
                Login
              </button>

              <button type="button" onClick={handleForgotPassword} className="forgot-password">Forgot Password!</button>
            </form>

            {/* Divider */}
            <div className="divider">
              <span className="divider-text">or</span>
            </div>

            {/* Social Login */}
            <div className="social-login">
              <p className="signup-text">
                Do not have Account? <Link to="/signup" className="signup-link">Sign up</Link>
              </p>

              <div className="social-buttons">
                <button className="social-button google-button">
                  <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button className="social-button apple-button">
                  <svg className="social-icon" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Continue with Apple
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hero-section">
        <div className="hero-image" style={{ backgroundImage: `url(${images[currentImageIndex]})` }}>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showPasswordResetModal && (
        <div className="modal-overlay">
          <div className="password-reset-modal">
            {/* Close Button */}
            <button className="modal-close" onClick={handleCloseModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Step 1: Email Input */}
            {resetStep === 1 && (
              <>
                <h2 className="modal-title">Password Reset</h2>
                <form onSubmit={handleSendOTP} className="modal-form">
                  <div className="modal-input-group">
                    <label className="modal-label">Enter Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={resetData.email}
                      onChange={handleResetChange}
                      className="modal-input"
                      required
                    />
                  </div>
                  <button type="submit" className="modal-button">
                    Send OTP
                  </button>
                  <button type="button" onClick={handleBackToLogin} className="modal-link">
                    Back To Login
                  </button>
                </form>
              </>
            )}

            {/* Step 2: OTP Verification */}
            {resetStep === 2 && (
              <>
                <h2 className="modal-title">Password Reset</h2>
                <p className="modal-subtitle">OTP Sent to Your Email</p>
                <form onSubmit={handleVerifyOTP} className="modal-form">
                  <div className="modal-input-group">
                    <label className="modal-label">Enter OTP</label>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={resetData.otp}
                      onChange={handleResetChange}
                      className="modal-input"
                      required
                    />
                  </div>
                  <div className="modal-input-group">
                    <label className="modal-label">Set New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="Enter New Password"
                      value={resetData.newPassword}
                      onChange={handleResetChange}
                      className="modal-input"
                      required
                    />
                  </div>
                  <button type="submit" className="modal-button">
                    Next
                  </button>
                  <div className="otp-timer">
                    OTP valid for only {String(Math.floor(otpTimer / 60)).padStart(2, '0')}:{String(otpTimer % 60).padStart(2, '0')}
                  </div>
                </form>
              </>
            )}

            {/* Step 3: Success */}
            {resetStep === 3 && (
              <>
                <div className="success-icon">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                </div>
                <h2 className="modal-title success-title">Password Reset Successfully</h2>
                <button onClick={handleBackToLogin} className="modal-button success-button">
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
