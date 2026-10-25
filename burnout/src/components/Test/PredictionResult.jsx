import React from "react";
import "../../styles/PredictResultPageStyle.css";

const PredictionResult = ({
  burnoutPercentage,
  riskLevel,
  riskDescription,
  result,
  onTakeAnother,
  onViewDashboard,
}) => {
  return (
    <div className="predict-result-card">

      <div className="predict-result-header">
        <h1>Your Burnout Risk</h1>
        <p>
          Based on the information you provided in your assessment.
        </p>
      </div>

      <div className="burnout-result">
        <div className="burnout-score">
          {burnoutPercentage}%
        </div>

        <div className="burnout-level">
          <span>Burnout Risk</span>
          <strong>{riskLevel}</strong>
        </div>
      </div>

      <div className="burnout-description">
        <p>{riskDescription}</p>
      </div>

      <div className="assessment-summary">
        <h2>Assessment Summary</h2>

        <div className="summary-row">
          <span>Job Title</span>
          <strong>{result.role || "-"}</strong>
        </div>

        <div className="summary-row">
          <span>Department</span>
          <strong>{result.department || "-"}</strong>
        </div>

        <div className="summary-row">
          <span>Job Level</span>
          <strong>{result.job_level || "-"}</strong>
        </div>

        <div className="summary-row">
          <span>Project Completion</span>
          <strong>
            {result.project_completion_rate !== undefined
              ? `${Math.round(result.project_completion_rate * 100)}%`
              : "-"}
          </strong>
        </div>

        <div className="summary-row">
          <span>Satisfaction</span>
          <strong>
            {result.satisfaction_score !== undefined
              ? result.satisfaction_score.toFixed(2)
              : "-"}
          </strong>
        </div>

        <div className="summary-row">
          <span>Workload</span>
          <strong>
            {result.workload_score !== undefined
              ? result.workload_score.toFixed(2)
              : "-"}
          </strong>
        </div>

        <div className="summary-row">
          <span>Collaboration</span>
          <strong>
            {result.collaboration_score !== undefined
              ? result.collaboration_score.toFixed(2)
              : "-"}
          </strong>
        </div>

        <div className="summary-row">
          <span>Overtime</span>
          <strong>
            {result.overtime_hours !== undefined
              ? `${result.overtime_hours} hours`
              : "-"}
          </strong>
        </div>

        <div className="summary-row">
          <span>Tenure</span>
          <strong>
            {result.tenure_months !== undefined
              ? `${result.tenure_months} months`
              : "-"}
          </strong>
        </div>
      </div>

      <div className="predict-result-actions">
        <button type="button" onClick={onTakeAnother}>
          Take Another Assessment
        </button>

        <button type="button" onClick={onViewDashboard}>
          View Dashboard
        </button>
      </div>

    </div>
  );
};

export default PredictionResult;