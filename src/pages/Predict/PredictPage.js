import React from 'react';
import PredictForm from '../../components/PredictForm'; // Nhớ check đúng tên file component của bạn
import '../../styles/PredictPageStyle.css';

const PredictPage = () => {
  return (
    <div className="predict-page-wrapper">
      <div className="brand-header">
        <h1 className="brand-name">A</h1>
        <p className="brand-slogan">b</p>
      </div>

      <div className="form-container-glass">
        <PredictForm />
      </div>
    </div>
  );
};

export default PredictPage;