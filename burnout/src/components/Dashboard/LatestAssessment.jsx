import React from 'react';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function LatestAssessment() {
  const navigate = useNavigate();

  // Temporary data
  // Later this will come from the latest prediction stored in MongoDB.
  const assessment = {
    date: 'September 10, 2026',
    risk: 42,
    status: 'Moderate Risk',
    satisfaction: 78,
    workload: 72,
    projectCompletion: 88,
  };

  return (
    <section className="latest-assessment">
      <div className="latest-assessment-header">
        <div>
          <h2>Latest Assessment</h2>
          <p>Your most recent burnout assessment.</p>
        </div>

        <div className="assessment-date">
          <CalendarDays size={16} />
          <span>{assessment.date}</span>
        </div>
      </div>

      <div className="assessment-content">
        <div className="assessment-risk">
          <span className="assessment-risk-label">
            Burnout Risk
          </span>

          <strong>{assessment.risk}%</strong>

          <span className="assessment-risk-status">
            {assessment.status}
          </span>
        </div>

        <div className="assessment-details">
          <div>
            <span>Satisfaction</span>
            <strong>{assessment.satisfaction}%</strong>
          </div>

          <div>
            <span>Workload</span>
            <strong>{assessment.workload}/100</strong>
          </div>

          <div>
            <span>Project Completion</span>
            <strong>{assessment.projectCompletion}%</strong>
          </div>
        </div>

        <button
          type="button"
          className="view-result-button"
          onClick={() => navigate('/predict-result')}
        >
          View Result
          <ArrowRight size={17} />
        </button>
      </div>
    </section>
  );
}

export default LatestAssessment;