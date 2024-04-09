// SignupPage.js
import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './styles.css'; // Import your CSS file for styling

const SignupPage = () => {
  const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '', role: 'Standard User' });
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
      setSignupData({ email: '', password: '', confirmPassword: '', role: 'Standard User' });
      setPasswordMatchError('');
      setRegistrationError('');
      // Redirect user to login page or show success message
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      setRegistrationError('Registration failed. Please try again.'); // Display error message to user
    }
  };

  const handleRoleChange = (e) => {
    setSignupData({ ...signupData, role: e.target.value }); // Update role state with the selected value
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
        <select id="role" value={signupData.role} onChange={handleRoleChange}>
          <option value="Standard User">Standard User</option>
          <option value="Admin Role">Admin Role</option>
        </select>
        {registrationError && <p className="error">{registrationError}</p>}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;

