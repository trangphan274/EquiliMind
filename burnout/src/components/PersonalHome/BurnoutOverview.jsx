import React from 'react';

import BurnoutRateCard from './BurnoutRateCard.jsx';
import StatusCard from './StatusCard.jsx';
import TrendCard from './TrendCard.jsx';

function BurnoutOverview() {
  return (
    <section className="burnout-overview">

      <div className="burnout-overview-header">

        <div className="overview-icon">
          〽
        </div>

        <div className="overview-title">
          <h2>Latest Burnout Record</h2>
          <span>Latest assessment result</span>
        </div>

        <span className="overview-date">
          2 days ago
        </span>

      </div>

      <div className="burnout-overview-content">

        <BurnoutRateCard rate={42} />

        <div className="burnout-details">

          <StatusCard rate={42} />

          <TrendCard
            current={42}
            previous={48}
          />

        </div>

      </div>

    </section>
  );
}

export default BurnoutOverview;