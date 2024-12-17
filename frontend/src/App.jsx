import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import Articles from './Articles';

const App = () => {
  return (
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </Router>
  );
};

export default App;
