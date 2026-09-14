import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home.jsx';
import PredictPage from './pages/Prediction/PredictPage.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import LoadingScreen from './components/common/Loading.jsx';
import PredictResult from './pages/Prediction/PredictResultPage.jsx';
import About from './pages/About/About.jsx';

import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Records from './pages/Records/Records.jsx';
import AppLayout from './components/Layouts/AppLayout.jsx';

function App() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDone(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
  
      <LoadingScreen done={done} />

   
      <Router>
        <Routes>

  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />


  <Route path="/predict" element={<PredictPage />} />
  <Route path="/predict-result" element={<PredictResult />} />

  
  <Route element={<AppLayout />}>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/records" element={<Records />} />
  </Route>
</Routes>
      </Router>
    </>
  );
}

export default App;