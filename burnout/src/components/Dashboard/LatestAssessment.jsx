
import React from "react";
import { useNavigate } from "react-router-dom";

function LatestAssessment({ assessment }) {
  const navigate = useNavigate();

  if (!assessment) {
    return null;
  }

  const burnoutPercentage = Math.round(
    Number(assessment.burnoutRisk) * 100
  );

  const createdAt = new Date(
    assessment.createdAt
  ).toLocaleString();

  return (
    <section className="dashboard-section">

      <div className="dashboard-section-header">
        <div>
          <h2>Latest Assessment</h2>
          <p>
            Your most recent burnout assessment.
          </p>
        </div>
      </div>

      <div className="latest-assessment-card">

        <div>
          <span>Burnout Risk</span>

          <strong>
            {burnoutPercentage}%
          </strong>
        </div>

        <div>
          <span>Assessment Date</span>

          <strong>
            {createdAt}
          </strong>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/predict-result", {
              state: {
                ...assessment.inputs,
                burnout_score:
                  assessment.burnoutRisk,
                predictionId:
                  assessment.predictionId,
                createdAt:
                  assessment.createdAt,
              },
            })
          }
        >
          View Result
        </button>

      </div>

    </section>
  );
}

export default LatestAssessment;
