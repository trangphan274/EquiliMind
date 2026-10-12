import React from 'react';

function BurnoutRateCard({ rate = 42 }) {
  return (
    <div className="burnout-rate-card">

      <div
        className="burnout-gauge"
        style={{
          '--rate': `${rate}%`,
        }}
      >
        <div className="burnout-gauge-inner">

          <span className="burnout-rate-label">
            BURNOUT RATE
          </span>

          <span className="burnout-rate-number">
            {rate}%
          </span>

          <span className="burnout-gauge-status">
            Moderate Risk
          </span>

        </div>
      </div>

    </div>
  );
}

export default BurnoutRateCard;