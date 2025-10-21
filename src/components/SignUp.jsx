import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';
import bjpImage from '../assets/Images/BJP.png';
import janasenaImage from '../assets/Images/Janasena.jpg';
import tdpImage from '../assets/Images/TDP.jpg';
import VoterIdInput from './VoterIdInput';
import { isAuthenticated } from '../utils/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    voterId: '',
    agreeToTerms: false
  });

  // OTP auth states
  const [step, setStep] = useState(1); // 1: details + send OTP, 2: verify OTP
  const [otpData, setOtpData] = useState({ otp: '' });
  const [otpTimer, setOtpTimer] = useState(60);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [voterIdValidation, setVoterIdValidation] = useState({ isValid: null, message: '' });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [bjpImage, janasenaImage, tdpImage];

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

  // OTP timer
  useEffect(() => {
    let timer;
    if (step === 2 && otpTimer > 0) {
      timer = setInterval(() => setOtpTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [step, otpTimer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // API calls
  const sendOTP = async (phoneNumber, voterId) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, voterId })
      });
      if (response.ok) {
        await response.text();
        setStep(2);
        setOtpTimer(60);
      } else {
        const errorData = await response.json();
        setError(errorData.detail?.[0]?.msg || 'Failed to send OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (phoneNumber, otp, voterId) => {
    try {
      setIsLoading(true);
      setError('');
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp, voterId })
      });
      if (response.ok) {
        const result = await response.json();
        // store token
        localStorage.setItem('access_token', result.access_token);
        localStorage.setItem('token_type', result.token_type);
        localStorage.setItem('expires_in', result.expires_in);
        localStorage.setItem('login_time', Date.now().toString());
        navigate('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.detail?.[0]?.msg || 'Invalid OTP');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (step === 1) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phoneNumber || !formData.voterId) {
        setError('Please fill in all fields');
        return;
      }
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(formData.phoneNumber.replace(/\D/g, ''))) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }
      if (voterIdValidation.isValid === false) {
        setError(voterIdValidation.message || 'Invalid voter ID');
        return;
      }
      if (!formData.agreeToTerms) {
        setError('You must agree to the Terms and Conditions');
        return;
      }
      await sendOTP(formData.phoneNumber, formData.voterId);
    } else {
      if (!otpData.otp) {
        setError('Please enter the OTP');
        return;
      }
      if (!/^\d{6}$/.test(otpData.otp)) {
        setError('Please enter a valid 6-digit OTP');
        return;
      }
      await verifyOTP(formData.phoneNumber, otpData.otp, formData.voterId);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden font-[Inter,Segoe_UI,Tahoma,Geneva,Verdana,sans-serif]">
      {/* Left side - Sign Up Column */}
      <div className="flex-[0_0_50%] bg-white flex items-stretch px-10 py-6 md:py-8">
        <div className="w-full max-w-[420px] mx-auto flex flex-col h-full justify-between">
          {/* Logo and Brand */}
          <div className="mt-1 mb-3">
            <div className="flex items-center gap-3">
              <img src={logoImage} alt="Logo" className="w-[44px] h-[44px] object-contain bg-white rounded-full p-1 shadow" />
              <span className="text-[1.2rem] font-semibold text-gray-800">మన బొలిశెట్టి</span>
            </div>
          </div>

          {/* Sign Up Form */}
          <div className="w-full">
            <h1 className="text-[1.8rem] font-bold text-gray-900 m-0 mb-2 tracking-tight">Sign Up</h1>
            <p className="text-[0.9rem] text-gray-500 m-0 mb-4">{step === 1 ? 'Enter your details to receive OTP' : 'Enter OTP to complete registration'}</p>

            {error && (
              <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="w-full">
              {step === 1 ? (
              <>
              <div className="flex gap-3 mb-2.5">
                <div className="flex-1">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-[0.9rem] focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] bg-white text-gray-700 placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-[0.9rem] focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] bg-white text-gray-700 placeholder:text-gray-400"
                    required
                  />
                </div>
              </div>

              <div className="mb-2.5">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-[0.9rem] focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] bg-white text-gray-700 placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="mb-2.5">
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-[0.9rem] focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] bg-white text-gray-700 placeholder:text-gray-400"
                  required
                />
              </div>

              <div className="mb-2.5">
                <VoterIdInput
                  value={formData.voterId}
                  onChange={(e) => handleChange({ target: { name: 'voterId', value: e.target.value } })}
                  placeholder="Enter Voter ID"
                  required
                  onValidationChange={setVoterIdValidation}
                />
              </div>

              <div className="mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="w-4 h-4 accent-blue-500"
                    required
                  />
                  <span className="text-gray-500 text-[0.85rem]">I agree to the Terms and Conditions</span>
                </label>
              </div>

              <button type="submit" disabled={isLoading} className="w-full px-4 py-2.5 bg-blue-500 text-white rounded-md text-[0.95rem] font-semibold transition shadow-sm mb-2.5 hover:bg-blue-600 hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
              </>
              ) : (
              <>
                <div className="mb-3">
                  <input
                    type="text"
                    name="otp"
                    placeholder="Enter 6-digit OTP"
                    value={otpData.otp}
                    onChange={(e) => setOtpData({ otp: e.target.value })}
                    maxLength="6"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-md text-[1rem] text-center tracking-widest focus:outline-none focus:border-blue-500 focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] bg-white text-gray-700 placeholder:text-gray-400"
                    required
                  />
                </div>
                <div className="mb-3 text-center text-xs text-gray-500">OTP valid for: {String(Math.floor(otpTimer / 60)).padStart(2, '0')}:{String(otpTimer % 60).padStart(2, '0')}</div>
                <button type="submit" disabled={isLoading} className="w-full px-4 py-2.5 bg-blue-500 text-white rounded-md text-[0.95rem] font-semibold transition shadow-sm mb-2.5 hover:bg-blue-600 hover:shadow-[0_4px_12px_rgba(59,130,246,0.4)] disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? 'Verifying OTP...' : 'Verify OTP'}
              </button>
              </>
              )}

              <div className="text-center mb-3">
                <Link to="/login" className="text-blue-500 no-underline text-[0.9rem] font-medium hover:underline hover:text-blue-600">Already have an account? Login</Link>
              </div>
            </form>

            {/* Social Login */}
            <div className="text-center">
              <div className="flex flex-col gap-2.5">
                <button className="flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-md bg-white text-gray-700 text-[0.9rem] font-medium transition hover:border-gray-400 hover:bg-gray-50">
                  <svg className="shrink-0" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button className="flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-md bg-white text-gray-700 text-[0.9rem] font-medium transition hover:border-black hover:shadow-[0_2px_8px_rgba(0,0,0,0.1)]">
                  <svg className="shrink-0" viewBox="0 0 24 24" width="18" height="18">
                    <path fill="#000" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  Continue with Apple
                </button>
              </div>

              {/* Divider */}
              <div className="relative text-center my-3">
                <span className="bg-white px-4 text-gray-400 text-sm font-medium relative z-[1]">or</span>
                <div className="absolute inset-0 top-1/2 h-px bg-gray-200 -z-[1]"></div>
          </div>
            </div>
          </div>

          {/* Spacer to ensure content fits nicely */}
          <div className="h-1" />
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="flex-[0_0_50%] bg-white relative overflow-hidden">
        <div
          className="w-full h-full bg-white relative bg-[length:78%] bg-center bg-no-repeat transition-[background-image] duration-1000 animate-[fadeInOut_3s_ease-in-out_infinite]"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
        >
        </div>
      </div>
    </div>
  );
};

export default SignUp;
