// LoginPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    // Your login logic here
    console.log('Logging in with:', loginData);
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

