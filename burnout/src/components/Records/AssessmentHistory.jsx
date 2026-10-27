import React from "react";
import {
  ArrowDown,
  ArrowUp,
  Minus,
  ClipboardList,
} from "lucide-react";

function getRiskLevel(score) {
  const percentage = score * 100;

  if (percentage > 50) {
    return {
      label: "High Risk",
      className: "risk-high",
    };
  }

  if (percentage >= 30) {
    return {
      label: "Moderate Risk",
      className: "risk-moderate",
    };
  }

  return {
    label: "Low Risk",
    className: "risk-low",
  };
}

function formatDate(dateString) {
  if (!dateString) return "-";

  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

function getChangeContent(change) {
  if (change === null || change === undefined) {
    return {
      text: "Starting point",
      className: "change-start",
      icon: null,
    };
  }

  if (change < 0) {
    return {
      text: `${Math.abs(change)}% vs previous`,
      className: "change-positive",
      icon: <ArrowDown size={13} />,
    };
  }

  if (change > 0) {
    return {
      text: `+${change}% vs previous`,
      className: "change-negative",
      icon: <ArrowUp size={13} />,
    };
  }

  return {
    text: "0% vs previous",
    className: "change-neutral",
    icon: <Minus size={13} />,
  };
}

function AssessmentHistory({
  records,
  onViewDetails,
}) {
  const visibleRecords = records.slice(0, 4);

  return (
    <section className="assessment-history-card">
      <div className="assessment-history-header">
        <h2>Assessment History</h2>

        <span className="assessment-count">
          Showing {visibleRecords.length} recent records
        </span>
      </div>

      {visibleRecords.length === 0 ? (
        <div className="empty-records">
          <div className="empty-records-icon">
            <ClipboardList size={22} />
          </div>

          <h3>No assessment records yet</h3>

          <p>
            Complete your first burnout assessment to
            start building your history.
          </p>
        </div>
      ) : (
        <div className="assessment-table-wrapper">
          <table className="assessment-table">
            <thead>
              <tr>
                <th>ASSESSMENT DATE</th>
                <th>BURNOUT RATE</th>
                <th>RISK LEVEL</th>
                <th>CHANGE</th>
                <th>ACTION</th>
              </tr>
            </thead>

            <tbody>
              {visibleRecords.map((record, index) => {
                const risk = getRiskLevel(
                  Number(record.burnoutRisk)
                );

                const change = getChangeContent(
                  record.change
                );

                const percentage = Math.round(
                  Number(record.burnoutRisk) * 100
                );

                return (
                  <tr
                    key={
                      record.predictionId || index
                    }
                  >
                    <td>
                      <div className="assessment-date">
                        {formatDate(record.createdAt)}

                        {index === 0 && (
                          <span className="latest-label">
                            (Latest)
                          </span>
                        )}
                      </div>
                    </td>

                    <td>
                      <span
                        className={`burnout-rate ${risk.className}`}
                      >
                        {percentage}%
                      </span>
                    </td>

                    <td>
                      <span
                        className={`risk-badge ${risk.className}`}
                      >
                        {risk.label}
                      </span>
                    </td>

                    <td>
                      <div
                        className={`assessment-change ${change.className}`}
                      >
                        {change.icon}
                        <span>{change.text}</span>
                      </div>
                    </td>

                    <td>
                      <button
                        type="button"
                        className="view-result-button"
                        onClick={() =>
                          onViewDetails(record)
                        }
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AssessmentHistory;