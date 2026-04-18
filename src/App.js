import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import PredictPage from './pages/Predict/PredictPage';

import LoadingScreen from './components/LoadingScreen';
import PredictResult from './pages/Predict/PredictResultPage';

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
        </Routes>
      </Router>
    </>
  );
}

export default App;