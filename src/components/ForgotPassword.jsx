import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoImage from '../assets/Images/Authoritative Government Service App Logo (1).png';
import bjpImage from '../assets/Images/BJP.png';
import janasenaImage from '../assets/Images/Janasena.jpg';
import tdpImage from '../assets/Images/TDP.jpg';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: ''
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [bjpImage, janasenaImage, tdpImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forgot password data:', formData);
    // Handle forgot password logic here
    alert('Password reset link sent to your email!');
    navigate('/login');
  };

  return (
    <div className="flex h-screen max-h-screen overflow-hidden font-inter">
      {/* Left side - Forgot Password Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-6 overflow-hidden max-h-screen">
        <div className="w-full max-w-md">
          {/* Logo and Brand */}
          <div className="mb-8 text-left pl-0">
            <div className="flex items-center gap-4 mb-0 justify-start -ml-2">
              <img src={logoImage} alt="Logo" className="w-12 h-12 object-contain bg-white rounded-full p-1 shadow-lg -ml-1" />
              <span className="text-xl font-semibold text-gray-800 -ml-1">మన బొలిశెట్టి</span>
            </div>
          </div>

          {/* Forgot Password Form */}
          <div className="w-full">
            <h1 className="text-4xl font-bold text-gray-900 mt-4 mb-2 tracking-tight">Forgot Password</h1>
            <p className="text-base text-gray-500 m-0 font-normal mb-6">Enter your email to reset password</p>

            <form onSubmit={handleSubmit} className="w-full">
              <div className="mb-3.5">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3.5 py-3 border-2 border-gray-300 rounded-md text-sm transition-all duration-200 box-border bg-white text-gray-700 focus:outline-none focus:border-blue-500 focus:shadow-lg focus:shadow-blue-100 placeholder-gray-400"
                  required
                />
              </div>

              <button type="submit" className="w-full py-3 px-4 bg-blue-500 text-white border-none rounded-md text-sm font-semibold cursor-pointer transition-all duration-200 mb-3 shadow-sm hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-400">
                Send Reset Link
              </button>

              <div className="text-center mb-6">
                <Link to="/login" className="text-blue-500 no-underline text-sm font-medium hover:underline hover:text-blue-600">Back to Login</Link>
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
                Don't have Account? <Link to="/signup" className="text-blue-500 no-underline font-semibold hover:underline hover:text-blue-600">Sign up</Link>
              </p>

              <div className="flex flex-col gap-2">
                <button className="flex items-center justify-center gap-3 py-2.5 px-3.5 border-2 border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium cursor-pointer transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-150">
                  <svg className="flex-shrink-0" viewBox="0 0 24 24" width="20" height="20">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>

                <button className="flex items-center justify-center gap-3 py-2.5 px-3.5 border-2 border-gray-300 rounded-md bg-white text-gray-700 text-sm font-medium cursor-pointer transition-all duration-200 hover:border-gray-400 hover:bg-gray-50 hover:border-black hover:shadow-lg hover:shadow-black-100">
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
          className="w-full h-full bg-white relative bg-cover bg-center bg-no-repeat transition-all duration-1000 animate-fade-in-out"
          style={{ backgroundImage: `url(${images[currentImageIndex]})`, backgroundSize: '80%' }}
        >
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
