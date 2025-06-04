import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setError('All fields are required!');
      return;
    }

    setError('');

    if (username === 'adminEUS' && password === 'Helpdesk@45') {
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
    <div className="container mt-5">
      <h2>Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="mb-3">
        <label className="form-label">Username</label>
        <input 
          type="text" 
          className="form-control" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyPress} 
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Password</label>
        <input 
          type="password" 
          className="form-control" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyPress} 
        />
      </div>

      <button className="btn btn-primary" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;