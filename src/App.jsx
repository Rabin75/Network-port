import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Search from './components/Search';

const App = () => {
  return (
    <Router>
      <div className="container">
        {/* Show heading ONLY on login page */}
        <Routes>
          <Route path="/" element={<><Login /></>} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;