import React from 'react';

function StatusCard({ rate = 42 }) {
  const getStatus = () => {
    if (rate < 40) {
      return {
        label: 'Low Risk',
        description: 'Your current burnout risk is relatively low.',
        className: 'status-low',
      };
    }

    if (rate < 70) {
      return {
        label: 'Moderate Risk',
        description: 'Your burnout risk is at a moderate level.',
        className: 'status-moderate',
      };
    }

    return {
      label: 'High Risk',
      description: 'Your burnout risk is relatively high.',
      className: 'status-high',
    };
  };

  const status = getStatus();

  return (
    <div className="status-card">

      <div className="status-card-header">
        <span className="status-title">
          CURRENT STATUS
        </span>

        <span className={`status-label ${status.className}`}>
          {status.label}
        </span>
      </div>

      <p>{status.description}</p>

    </div>
  );
}

export default StatusCard;