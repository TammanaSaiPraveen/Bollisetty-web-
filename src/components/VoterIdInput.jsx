import React, { useState, useEffect } from 'react';
import { validateVoterId } from '../utils/auth';

const VoterIdInput = ({ 
  value, 
  onChange, 
  placeholder = "Enter Voter ID", 
  required = false, 
  className = "",
  showValidation = true,
  onValidationChange = null
}) => {
  const [validating, setValidating] = useState(false);
  const [validation, setValidation] = useState({ isValid: null, message: '' });

  // Debounced voter ID validation
  useEffect(() => {
    if (!value || value.length < 3) {
      setValidation({ isValid: null, message: '' });
      if (onValidationChange) onValidationChange({ isValid: null, message: '' });
      return;
    }

    const timeoutId = setTimeout(async () => {
      setValidating(true);
      try {
        const result = await validateVoterId(value);
        setValidation(result);
        if (onValidationChange) onValidationChange(result);
      } catch (error) {
        const errorResult = { isValid: false, message: 'Failed to validate voter ID' };
        setValidation(errorResult);
        if (onValidationChange) onValidationChange(errorResult);
      } finally {
        setValidating(false);
      }
    }, 500); // Wait 500ms after user stops typing

    return () => clearTimeout(timeoutId);
  }, [value, onValidationChange]);

  const getInputClassName = () => {
    const baseClasses = `w-full px-4 py-3 pr-10 border rounded-md text-[0.95rem] transition focus:outline-none focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] bg-white text-gray-700 placeholder:text-gray-400 ${className}`;
    
    if (!showValidation) {
      return `${baseClasses} border-gray-300 focus:border-blue-500`;
    }

    if (validation.isValid === true) {
      return `${baseClasses} border-green-500 focus:border-green-500`;
    } else if (validation.isValid === false) {
      return `${baseClasses} border-red-500 focus:border-red-500`;
    } else {
      return `${baseClasses} border-gray-300 focus:border-blue-500`;
    }
  };

  return (
    <div>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={getInputClassName()}
          required={required}
        />
        
        {/* Validation Icon */}
        {showValidation && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {validating ? (
              <svg className="animate-spin w-5 h-5 text-blue-500" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : validation.isValid === true ? (
              <svg className="w-5 h-5 text-green-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20,6 9,17 4,12"></polyline>
              </svg>
            ) : validation.isValid === false ? (
              <svg className="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : null}
          </div>
        )}
      </div>
      
      {/* Validation Message */}
      {showValidation && validation.message && (
        <p className={`mt-1 text-xs ${
          validation.isValid === true 
            ? 'text-green-600' 
            : 'text-red-600'
        }`}>
          {validation.message}
        </p>
      )}
    </div>
  );
};

export default VoterIdInput;
