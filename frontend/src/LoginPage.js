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
      // Assuming the API returns both tokens upon successful login
      const { refreshToken, sessionToken } = response.data;
      // Store the tokens in cookies
      setCookie('refreshToken', refreshToken, 10);
      setCookie('sessionToken', sessionToken, 1);
      alert("Successfully Logged in")
      window.location.href = '/dashboard';
      // Redirect to a different page
      // window.location.href = '/dashboard'; // Redirect to dashboard after login
    } catch (error) {
      alert(`Login failed with error: ${error.response.data}`)
      console.error('Login failed:', error.response.data);
      // Handle login error
    }
  };

  // Function to set cookie
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + value + ';' + expires + ';path=/';
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

