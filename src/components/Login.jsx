import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';
import bjpImage from '../assets/Images/BJP.png';
import janasenaImage from '../assets/Images/Janasena.jpg';
import tdpImage from '../assets/Images/TDP.jpg';
import { isAuthenticated, validateVoterId } from '../utils/auth';
import VoterIdInput from './VoterIdInput';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    voterId: '',
    rememberMe: false
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [bjpImage, janasenaImage, tdpImage];

  // OTP authentication states
  const [loginStep, setLoginStep] = useState(1); // 1: Phone/Voter ID, 2: OTP Verification
  const [otpData, setOtpData] = useState({
    otp: ''
  });
  const [otpTimer, setOtpTimer] = useState(60);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [voterIdValidation, setVoterIdValidation] = useState({ isValid: null, message: '' });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

  // OTP Timer effect
  useEffect(() => {
    let timer;
    if (loginStep === 2 && otpTimer > 0) {
      timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [loginStep, otpTimer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // API call to send OTP
  const sendOTP = async (phoneNumber, voterId) => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          voterId: voterId
        })
      });

      if (response.ok) {
        const result = await response.text();
        console.log('OTP sent successfully:', result);
        setLoginStep(2);
        setOtpTimer(60);
      } else {
        const errorData = await response.json();
        setError(errorData.detail?.[0]?.msg || 'Failed to send OTP');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // API call to verify OTP
  const verifyOTP = async (phoneNumber, otp, voterId) => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          otp: otp,
          voterId: voterId
        })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('OTP verified successfully:', result);
        
        // Store the access token in localStorage
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('token_type', result.token_type);
        localStorage.setItem('expires_in', result.expires_in);
        localStorage.setItem('login_time', Date.now().toString());
        
        // Navigate to dashboard on successful verification
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.detail?.[0]?.msg || 'Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (loginStep === 1) {
      // Validate phone number and voter ID
      if (!formData.phoneNumber || !formData.voterId) {
        setError('Please fill in all fields');
        return;
      }
      
      // Basic phone number validation (Indian format)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }

      // Check voter ID validation
      if (voterIdValidation.isValid === false) {
        setError(voterIdValidation.message || 'Invalid voter ID');
        return;
      }

      // If voter ID hasn't been validated yet, show error
      if (voterIdValidation.isValid === null) {
        setError('Please wait for voter ID validation to complete');
        return;
      }
      
      await sendOTP(formData.phoneNumber, formData.voterId);
    } else {
      // OTP verification step
      if (!otpData.otp) {
        setError('Please enter the OTP');
        return;
      }
      
      // Validate OTP format (6 digits)
      if (!/^\d{6}$/.test(otpData.otp)) {
        setError('Please enter a valid 6-digit OTP');
        return;
      }
      
      await verifyOTP(formData.phoneNumber, otpData.otp, formData.voterId);
    }
  };

  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBackToStep1 = () => {
    setLoginStep(1);
    setOtpData({ otp: '' });
      setOtpTimer(60);
    setError('');
  };

  const handleResendOTP = async () => {
    if (otpTimer === 0) {
      await sendOTP(formData.phoneNumber, formData.voterId);
    }
  };


  return (
    <div className="flex h-screen overflow-hidden font-[Inter,Segoe_UI,Tahoma,Geneva,Verdana,sans-serif]">
      {/* Left side - Login Form */}
      <div className="flex-[0_0_50%] bg-white flex items-center justify-center px-8 py-12 md:py-12">
        <div className="w-full max-w-[420px]">
          {/* Logo and Brand */}
          <div className="mb-10 mt-10">
            <div className="flex items-center gap-4 mb-0">
              <img src={logoImage} alt="Logo" className="w-[50px] h-[50px] object-contain bg-white rounded-full p-1 shadow" />
              <span className="text-[1.4rem] font-semibold text-gray-800">మన బొలిశెట్టి</span>
            </div>
          </div>

          {/* Login Form */}
          <div className="w-full">
            <h1 className="text-[2.2rem] font-bold text-gray-900 m-0 mb-2 tracking-tight">
              {loginStep === 1 ? 'Login' : 'Verify OTP'}
            </h1>
            <p className="text-base text-gray-500 m-0 mb-6">
              {loginStep === 1 ? 'Enter your phone number and voter ID to continue' : 'Enter the OTP sent to your phone'}
            </p>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full">
              {loginStep === 1 ? (
                <>
                  <div className="mb-4">
                <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter Phone Number (10 digits)"
                      value={formData.phoneNumber}
                  onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-[0.95rem] transition focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] bg-white text-gray-700 placeholder:text-gray-400"
                  required
                />
              </div>

                  <div className="mb-4">
                    <VoterIdInput
                      value={formData.voterId}
                      onChange={(e) => handleChange({ target: { name: 'voterId', value: e.target.value } })}
                      placeholder="Enter Voter ID"
                  required
                      onValidationChange={setVoterIdValidation}
                />
              </div>

                  <div className="mb-5">
                    <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                        className="w-4 h-4 accent-blue-500"
                  />
                      <span className="text-gray-500 text-[0.9rem] font-normal">Remember me</span>
                </label>
              </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-blue-500 text-white rounded-md text-[0.95rem] font-semibold cursor-pointer transition shadow-sm mb-3 hover:bg-blue-600 hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Sending OTP...' : 'Send OTP'}
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="otp"
                      placeholder="Enter 6-digit OTP"
                      value={otpData.otp}
                      onChange={handleOtpChange}
                      maxLength="6"
                      className="w-full px-4 py-3 border border-gray-300 rounded-md text-[0.95rem] transition focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] bg-white text-gray-700 placeholder:text-gray-400 text-center text-lg tracking-widest"
                      required
                    />
                  </div>

                  <div className="mb-4 text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      OTP sent to: <span className="font-medium">{formData.phoneNumber}</span>
                    </p>
                    <p className="text-xs text-gray-500">
                      OTP valid for: {String(Math.floor(otpTimer / 60)).padStart(2, '0')}:{String(otpTimer % 60).padStart(2, '0')}
                    </p>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full px-4 py-3 bg-blue-500 text-white rounded-md text-[0.95rem] font-semibold cursor-pointer transition shadow-sm mb-3 hover:bg-blue-600 hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
              </button>

                  <div className="flex gap-2 justify-center">
                    <button 
                      type="button" 
                      onClick={handleBackToStep1}
                      className="text-blue-500 text-[0.9rem] font-medium hover:underline"
                    >
                      Back
                    </button>
                    <span className="text-gray-400">|</span>
                    <button 
                      type="button" 
                      onClick={handleResendOTP}
                      disabled={otpTimer > 0}
                      className="text-blue-500 text-[0.9rem] font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {otpTimer > 0 ? `Resend in ${otpTimer}s` : 'Resend OTP'}
                    </button>
                  </div>
                </>
              )}
            </form>

            {/* Social Login - Only show on step 1 */}
            {loginStep === 1 && (
              <div className="text-center mt-2">
                <div className="flex flex-col gap-3 mb-4">
                  <button className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 text-[0.9rem] font-medium cursor-pointer transition hover:border-gray-400 hover:bg-gray-50">
                    <svg className="shrink-0" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                  <button className="flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md bg-white text-gray-700 text-[0.9rem] font-medium cursor-pointer transition hover:border-black hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                    <svg className="shrink-0" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Continue with Apple
                </button>
              </div>

                {/* Divider and Sign up */}
                <div className="relative text-center my-4">
                  <span className="bg-white px-4 text-gray-400 text-sm font-medium relative z-[1]">or</span>
                  <div className="absolute inset-0 top-1/2 h-px bg-gray-200 -z-[1]"></div>
                </div>
                <p className="text-gray-500 text-[0.9rem]">
                  Do not have Account? <Link to="/signup" className="text-blue-500 no-underline font-semibold hover:underline hover:text-blue-600">Sign up</Link>
                </p>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="flex-[0_0_50%] bg-white relative overflow-hidden">
        <div
          className="w-full h-full bg-white relative bg-[length:80%] bg-center bg-no-repeat transition-[background-image] duration-1000 animate-[fadeInOut_3s_ease-in-out_infinite]"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        >
        </div>
      </div>


      {/* Keyframes for animations used */}
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0.8; }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translateY(-20px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Login;
