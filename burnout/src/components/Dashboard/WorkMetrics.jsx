
import React from "react";

function WorkMetrics({ workMetrics }) {
  const latest =
    workMetrics?.[workMetrics.length - 1];

  if (!latest) {
    return null;
  }

  return (
    <section className="dashboard-section">

      <div className="dashboard-section-header">
        <div>
          <h2>Work & Well-being Metrics</h2>
          <p>
            Your latest work and well-being indicators.
          </p>
        </div>
      </div>

      <div className="work-metrics-grid">

        <div className="metric-card">
          <span>Satisfaction</span>
          <strong>
            {Number(
              latest.satisfaction
            ).toFixed(2)}
          </strong>
        </div>

        <div className="metric-card">
          <span>Workload</span>
          <strong>
            {Number(
              latest.workload
            ).toFixed(2)}
          </strong>
        </div>

        <div className="metric-card">
          <span>Collaboration</span>
          <strong>
            {Number(
              latest.collaboration
            ).toFixed(2)}
          </strong>
        </div>

        <div className="metric-card">
          <span>Project Completion</span>
          <strong>
            {Math.round(
              Number(
                latest.projectCompletion
              ) * 100
            )}
            %
          </strong>
        </div>

        <div className="metric-card">
          <span>Overtime</span>
          <strong>
            {latest.overtimeHours} hrs
          </strong>
        </div>

      </div>

    </section>
  );
}

export default WorkMetrics;
