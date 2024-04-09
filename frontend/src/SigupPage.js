// SignupPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './styles.css'; // Import your CSS file for styling

const SignupPage = () => {
  const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '', role: '' });
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [registrationError, setRegistrationError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      return;
    }
    try {
      // Make POST request to backend API endpoint
      const response = await axios.post('http://localhost:8000/api/v1/users/register', signupData);
      console.log('Registration successful:', response.data);
      // Reset form and state after successful registration
      setSignupData({ email: '', password: '', confirmPassword: '', role: '' });
      setPasswordMatchError('');
      setRegistrationError('');
      // Redirect user to login page or show success message
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setRegistrationError('Registration failed. Please try again.'); // Display error message to user
    }
  };

  return (
    <div className="container"> {/* Add a container class for styling */}
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={signupData.email}
          onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
          required
        />
        <input
          type="role"
          placeholder="Role"
          value={signupData.role}
          onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={signupData.password}
          onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={signupData.confirmPassword}
          onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
          required
        />
        {passwordMatchError && <p className="error">{passwordMatchError}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;
