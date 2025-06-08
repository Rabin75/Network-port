import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import FallingCodeBackground from './FallingCodeBackground'; // <-- make sure this path is correct
import './Login.css';

const Login = () => {
  const [showLoginBox, setShowLoginBox] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError('All fields are required!');
      return;
    }
    if (username === 'admin' && password === 'admin') {
      setError('');
      navigate('/search');
    } else {
      setError('Invalid credentials!');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="login-wrapper">
      {/* Background falling code */}
      <FallingCodeBackground />

      {/* Heading */}
      <h1 className="left-centered-heading">
        Susquehanna EUS Network Voice Configuration
      </h1>
      {/* Top-right user icon */}
      <div
        className="top-right-avatar"
        onClick={() => setShowLoginBox(!showLoginBox)}
        aria-label="Toggle login form"
      >
        <FaUserCircle size={40} color="#fff" />
      </div>

      {/* Login dialog */}
      {showLoginBox && (
        <div className="login-box">
          <h5 className="mb-3 text-center">Login</h5>
          {error && <div className="error-message">{error}</div>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={handleKeyPress}
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
