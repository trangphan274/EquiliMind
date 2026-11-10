import React from "react";

function BurnoutRateCard({ rate = 0 }) {
  const getStatus = () => {
    if (rate < 40) {
      return "Low Risk";
    }

    if (rate < 70) {
      return "Moderate Risk";
    }

    return "High Risk";
  };

  const status = getStatus();

  return (
    <div className="burnout-rate-card">
      <div
        className="burnout-gauge"
        style={{
          "--rate": `${rate}%`,
        }}
      >
        <div className="burnout-gauge-inner">
          <span className="burnout-rate-label">
            BURNOUT RATE
          </span>

          <span className="burnout-rate-number">
            {Math.round(rate)}%
          </span>

          <span className="burnout-gauge-status">
            {status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default BurnoutRateCard;