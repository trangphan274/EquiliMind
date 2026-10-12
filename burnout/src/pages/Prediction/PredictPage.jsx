import React from 'react';
import PredictForm from '../../components/Test/PredictForm'; // Nhớ check đúng tên file component của bạn
import '../../styles/PredictPageStyle.css';

const PredictPage = () => {
  return (
    <div className="predict-page-wrapper">
      <div className="brand-header">
      
        <p className="brand-slogan">Your work patterns can reveal more than you think. Let’s assess your burnout risk.</p>
      </div>

      <div className="form-container-glass">
        <PredictForm />
      </div>
    </div>
  );
};

export default PredictPage;