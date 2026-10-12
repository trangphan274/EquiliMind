import React from 'react';
import { TrendingDown, TrendingUp } from 'lucide-react';

function TrendCard({ current = 42, previous = 48 }) {
  const difference = current - previous;
  const percentage = Math.abs(difference);

  const isImproved = difference < 0;
  const isWorse = difference > 0;

  return (
    <div
      className={`trend-card ${
        isImproved
          ? 'trend-improved'
          : isWorse
          ? 'trend-worse'
          : 'trend-neutral'
      }`}
    >

      <div className="trend-card-header">

        <div className="trend-icon">
          {isImproved ? (
            <TrendingDown size={16} />
          ) : (
            <TrendingUp size={16} />
          )}
        </div>

        <span className="trend-title">
          BURNOUT TREND
        </span>

        <span className="trend-percentage">
          {isImproved ? '-' : '+'}
          {percentage}%
        </span>

      </div>

      <p>
        {isImproved
          ? 'Your burnout risk has decreased since your last test.'
          : isWorse
          ? 'Your burnout risk has increased since your last test.'
          : 'Your burnout risk has remained the same.'}
      </p>

      <span className="trend-comparison">
        Compared with your previous test ({previous}%)
      </span>

    </div>
  );
}

export default TrendCard;