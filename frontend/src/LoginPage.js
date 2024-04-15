// LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/login', loginData);
      const refreshToken = response.data.data.refreshToken;
      const accessToken = response.data.data.accessToken;
      // Store the tokens in cookies
      window.localStorage.setItem('refreshToken', refreshToken, 10);
      window.localStorage.setItem('accessToken', accessToken, 1);
      alert("Successfully Logged in")
      window.location.href = '/dashboard';
    } catch (error) {
      alert(`Login failed with error: ${error.response.data}`)
      console.error('Login failed:', error.response.data);
      // Handle login error
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>If you don't have an account, <Link to="/signup">click here</Link> to register.</p>
    </div>
  );
};

export default LoginPage;

