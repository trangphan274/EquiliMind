import React from "react";

import BurnoutRateCard from "./BurnoutRateCard.jsx";
import StatusCard from "./StatusCard.jsx";
import TrendCard from "./TrendCard.jsx";

function BurnoutOverview({
  rate = 0,
  previousRate = null,
  date = null,
}) {
  const formatDate = (dateString) => {
    if (!dateString) {
      return "No assessment yet";
    }

    const assessmentDate = new Date(dateString);
    const now = new Date();

    const diffTime = now - assessmentDate;
    const diffDays = Math.floor(
      diffTime / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) {
      return "Today";
    }

    if (diffDays === 1) {
      return "1 day ago";
    }

    if (diffDays < 7) {
      return `${diffDays} days ago`;
    }

    return assessmentDate.toLocaleDateString(
      "en-US",
      {
        month: "short",
        day: "numeric",
        year: "numeric",
      }
    );
  };

  return (
    <section className="burnout-overview">

      <div className="burnout-overview-header">

        <div className="overview-icon">
          〽
        </div>

        <div className="overview-title">
          <h2>Latest Burnout Record</h2>

          <span>
            Latest assessment result
          </span>
        </div>

        <span className="overview-date">
          {formatDate(date)}
        </span>

      </div>

      <div className="burnout-overview-content">

        <BurnoutRateCard rate={rate} />

        <div className="burnout-details">

          <StatusCard rate={rate} />

          <TrendCard
            current={rate}
            previous={previousRate}
          />

        </div>

      </div>

    </section>
  );
}

export default BurnoutOverview;