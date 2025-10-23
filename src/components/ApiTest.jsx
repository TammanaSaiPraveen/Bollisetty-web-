import React, { useState } from 'react';
import { loginUser } from '../utils/auth';

const ApiTest = () => {
  const [testResult, setTestResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: 'admin@bolisetti.com',
    password: ''
  });

  const handleTestLogin = async () => {
    try {
      setIsLoading(true);
      setTestResult('Testing API connection...');
      
      const result = await loginUser(credentials.email, credentials.password);
      
      setTestResult(`✅ Login successful! 
      
API Response:
${JSON.stringify(result, null, 2)}

Token stored in localStorage:
- access_token: ${localStorage.getItem('access_token')}
- token_type: ${localStorage.getItem('token_type')}
- expires_in: ${localStorage.getItem('expires_in')}`);
      
    } catch (error) {
      setTestResult(`❌ Login failed: ${error.message}`);
      console.error('API Test Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">API Connection Test</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Test Admin Login API</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="admin@bolisetti.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
              />
            </div>
            
            <button
              onClick={handleTestLogin}
              disabled={isLoading || !credentials.email || !credentials.password}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Testing...' : 'Test API Connection'}
            </button>
          </div>
        </div>

        {testResult && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Test Result:</h3>
            <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto max-h-96 whitespace-pre-wrap">
              {testResult}
            </pre>
          </div>
        )}

        <div className="mt-6 p-4 bg-blue-50 rounded-md">
          <h4 className="font-semibold text-blue-900 mb-2">API Endpoint Information:</h4>
          <p className="text-sm text-blue-800">
            <strong>Endpoint:</strong> https://bolisetti-fast-api.onrender.com/api/admin/auth/login
          </p>
          <p className="text-sm text-blue-800">
            <strong>Method:</strong> POST
          </p>
          <p className="text-sm text-blue-800">
            <strong>Content-Type:</strong> application/json
          </p>
        </div>
      </div>
    </div>
  );
};

export default ApiTest;
