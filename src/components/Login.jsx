import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import bjpImage from '../assets/Images/BJP.png';
import janasenaImage from '../assets/Images/Janasena.jpg';
import tdpImage from '../assets/Images/TDP.jpg';
import fullLogo from '../assets/Images/fulllogo.png';

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
    <div className="flex h-screen max-h-screen overflow-hidden font-inter">
      {/* Left side - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-6 overflow-hidden max-h-screen">
        <div className="w-full max-w-md">
          {/* Logo and Brand */}
          <div className="mb-8 text-left pl-0">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={fullLogo} 
                alt="TADEPALIGUDEM SS Logo" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2 tracking-tight">Login</h1>
            <p className="text-base text-gray-500 m-0 font-normal">Welcome!</p>
          </div>

          {/* Login Form */}
          <div className="w-full">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-4">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                  required
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-sm transition-all duration-200 bg-white text-gray-700 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 accent-blue-500"
                  />
                  <span className="text-gray-500 text-sm font-normal">Remember me</span>
                </label>
              </div>

              <div className="flex items-center justify-between mb-4">
                <button type="button" onClick={handleForgotPassword} className="text-blue-500 no-underline text-sm font-medium hover:underline hover:text-blue-600">Forgot Password!</button>
                <button type="submit" className="py-2 px-6 bg-blue-500 text-white border-none rounded-md text-sm font-semibold cursor-pointer transition-all duration-200 hover:bg-blue-600">
                  Login
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="relative text-center my-5">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200"></div>
              <span className="bg-white px-4 text-gray-400 text-sm font-medium">or</span>
            </div>

            {/* Social Login */}
            <div className="text-center">
              <p className="text-gray-500 mb-3 text-sm">
                Do not have Account? <Link to="/signup" className="text-blue-500 no-underline font-semibold hover:underline hover:text-blue-600">Sign up</Link>
              </p>

              <div className="flex flex-col gap-3">
                <button className="flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium cursor-pointer transition-all duration-200 hover:border-gray-400 hover:bg-gray-50">
                  <svg className="flex-shrink-0" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button className="flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium cursor-pointer transition-all duration-200 hover:border-gray-400 hover:bg-gray-50">
                  <svg className="flex-shrink-0" viewBox="0 0 24 24" width="20" height="20">
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
      <div className="flex-1 bg-white relative overflow-hidden max-h-screen">
        <div 
          className="w-full h-full bg-white relative bg-cover bg-center bg-no-repeat transition-all duration-1000 animate-fade-in-out rounded-lg"
          style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: 'cover' }}
        >
          {/* Quote Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <div className="text-2xl font-bold mb-2">Once we decide, we have to do something, we can go miles ahead.</div>
            </div>
          </div>
          
          {/* BJP Logo in top right */}
          <div className="absolute top-4 right-4">
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center border-2 border-black">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="#FF6B35">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showPasswordResetModal && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-10 w-11/12 max-w-lg relative shadow-2xl animate-modal-slide-in">
            {/* Close Button */}
            <button className="absolute top-4 right-4 bg-none border-none cursor-pointer p-2 rounded-full flex items-center justify-center transition-colors duration-200 hover:bg-gray-100" onClick={handleCloseModal}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Step 1: Email Input */}
            {resetStep === 1 && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 m-0 mb-4 text-center">Password Reset</h2>
                <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Enter Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={resetData.email}
                      onChange={handleResetChange}
                      className="px-3 py-3 border border-gray-300 rounded-md text-base transition-colors duration-200 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-100"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-gray-800 text-white border-none py-3 px-6 rounded-md text-base font-medium cursor-pointer transition-colors duration-200 mt-2 block mx-auto hover:bg-gray-700">
                    Send OTP
                  </button>
                  <button type="button" onClick={handleBackToLogin} className="bg-none border-none text-blue-500 text-sm cursor-pointer underline mt-2 text-center hover:text-blue-700">
                    Back To Login
                  </button>
                </form>
              </>
            )}

            {/* Step 2: OTP Verification */}
            {resetStep === 2 && (
              <>
                <h2 className="text-2xl font-bold text-gray-800 m-0 mb-4 text-center">Password Reset</h2>
                <p className="text-sm text-gray-500 m-0 mb-6 text-center">OTP Sent to Your Email</p>
                <form onSubmit={handleVerifyOTP} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Enter OTP</label>
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter OTP"
                      value={resetData.otp}
                      onChange={handleResetChange}
                      className="px-3 py-3 border border-gray-300 rounded-md text-base transition-colors duration-200 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-100"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Set New Password</label>
                    <input
                      type="password"
                      name="newPassword"
                      placeholder="Enter New Password"
                      value={resetData.newPassword}
                      onChange={handleResetChange}
                      className="px-3 py-3 border border-gray-300 rounded-md text-base transition-colors duration-200 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-100"
                      required
                    />
                  </div>
                  <button type="submit" className="bg-gray-800 text-white border-none py-3 px-6 rounded-md text-base font-medium cursor-pointer transition-colors duration-200 mt-2 block mx-auto hover:bg-gray-700">
                    Next
                  </button>
                  <div className="text-xs text-gray-500 text-center mt-2">
                    OTP valid for only {String(Math.floor(otpTimer / 60)).padStart(2, '0')}:{String(otpTimer % 60).padStart(2, '0')}
                  </div>
                </form>
              </>
            )}

            {/* Step 3: Success */}
            {resetStep === 3 && (
              <>
                <div className="flex justify-center mb-4">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22,4 12,14.01 9,11.01"></polyline>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-green-500 m-0 mb-4 text-center">Password Reset Successfully</h2>
                <button onClick={handleBackToLogin} className="w-full max-w-xs bg-gray-800 text-white border-none py-3 px-6 rounded-md text-base font-medium cursor-pointer transition-colors duration-200 mt-4 mx-auto block hover:bg-gray-700">
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
