import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home.jsx';
import PredictPage from './pages/Prediction/PredictPage.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import LoadingScreen from './components/common/Loading.jsx';
import PredictResult from './pages/Prediction/PredictResultPage.jsx';
import About from './pages/About/About.jsx';

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
      {/* loading luôn tồn tại */}
      <LoadingScreen done={done} />

      {/* web chính */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<PredictPage />} />
          <Route path="/predict-result" element={<PredictResult />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;