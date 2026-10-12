import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../styles/PredictResultPageStyle.css";

const PredictResultPage = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;

  if (!data) {
    return <h2>No result found</h2>;
  }

  const score = data.burnout_score;

  let level = "";
  if (score < 0.3) level = "Low Burnout Risk";
  else if (score < 0.6) level = "Medium Burnout Risk";
  else level = "High Burnout Risk";

return (
    <div className="result-wrapper">
      <div className="result-card">
        
        {/* Bên trái: Score */}
        <div className="result-box">
          <div className="result-label">{level}</div>
          <div className="result-prob">Burnout Score: {(score * 100).toFixed(1)}%</div>
        </div>

        {/* Bên phải: Thông tin User nhập */}
        <div className="user-input-details">
          <h3>User Profile</h3>
          <div className="detail-item"><span>Role:</span> <span>{data.role}</span></div>
          <div className="detail-item"><span>Dept:</span> <span>{data.department}</span></div>
          <div className="detail-item"><span>Level:</span> <span>{data.jobLevel}</span></div>
          <div className="detail-item"><span>Satisfaction:</span> <span>{data.satisfaction}</span></div>
          <div className="detail-item"><span>Workload:</span> <span>{data.workload}</span></div>
          <div className="detail-item"><span>Overtime:</span> <span>{data.overtime} hrs</span></div>
          <div className="detail-item"><span>Tenure:</span> <span>{data.tenure} months</span></div>
          <div className="detail-item"><span>Salary:</span> <span>${data.salary.toLocaleString()}</span></div>
        </div>

        <button className="back-btn" onClick={() => navigate("/predict")}>
          PREDICT AGAIN
        </button>

      </div>
    </div>
  );
};

export default PredictResultPage;