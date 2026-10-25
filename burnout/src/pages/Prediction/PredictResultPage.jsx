import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import PredictionResult from "../../components/Test/PredictionResult";

const PredictResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const result = location.state;

  if (!result) {
    return (
      <div className="predict-result-page">
        <div className="predict-result-card">
          <h1>No assessment result</h1>

          <p>
            Please complete an assessment first to see your
            burnout risk.
          </p>

          <button
            type="button"
            onClick={() => navigate("/predict")}
          >
            Take Assessment
          </button>
        </div>
      </div>
    );
  }

  const burnoutRisk = Number(result.burnout_score || 0);

  const burnoutPercentage = Math.round(burnoutRisk * 100);

  let riskLevel = "Low";
  let riskDescription =
    "Your current indicators suggest a relatively low burnout risk.";

  if (burnoutPercentage >= 70) {
    riskLevel = "High";
    riskDescription =
      "Your current indicators suggest a high burnout risk. Consider reviewing your workload and well-being indicators.";
  } else if (burnoutPercentage >= 40) {
    riskLevel = "Moderate";
    riskDescription =
      "Your current indicators suggest a moderate burnout risk. It may be helpful to monitor your workload and well-being.";
  }

  return (
    <div className="predict-result-page">
      <PredictionResult
        burnoutPercentage={burnoutPercentage}
        riskLevel={riskLevel}
        riskDescription={riskDescription}
        result={result}
        onTakeAnother={() => navigate("/predict")}
        onViewDashboard={() => navigate("/dashboard")}
      />
    </div>
  );
};

export default PredictResultPage;