import React from 'react';
import {
  Activity,
  Smile,
  Gauge,
  TrendingUp,
} from 'lucide-react';

function DashboardSummary() {
  // Temporary data
  // Later these values will come from the latest prediction in MongoDB.
  const summary = {
    burnoutRisk: 42,
    satisfaction: 78,
    workload: 72,
    overtime: 18,
    projectCompletion: 88,
    collaboration: 85,
  };

  return (
    <section className="dashboard-summary">
      {/* Burnout Risk */}
      <div className="summary-card">
        <div className="summary-card-header">
          <div className="summary-icon">
            <Activity size={20} />
          </div>

          <span className="summary-label">
            Burnout Risk
          </span>
        </div>

        <div className="summary-main-value">
          {summary.burnoutRisk}%
        </div>

        <span className="summary-status moderate">
          Moderate Risk
        </span>

        <p className="summary-description">
          Based on your latest assessment
        </p>
      </div>

      {/* Satisfaction */}
      <div className="summary-card">
        <div className="summary-card-header">
          <div className="summary-icon">
            <Smile size={20} />
          </div>

          <span className="summary-label">
            Satisfaction
          </span>
        </div>

        <div className="summary-main-value">
          {summary.satisfaction}%
        </div>

        <div className="summary-progress">
          <div
            className="summary-progress-fill"
            style={{ width: `${summary.satisfaction}%` }}
          />
        </div>

        <p className="summary-description">
          Overall job satisfaction
        </p>
      </div>

      {/* Workload & Overtime */}
      <div className="summary-card">
        <div className="summary-card-header">
          <div className="summary-icon">
            <Gauge size={20} />
          </div>

          <span className="summary-label">
            Workload & Overtime
          </span>
        </div>

        <div className="summary-dual-value">
          <div>
            <strong>{summary.workload}</strong>
            <span>/100</span>
            <small>Workload</small>
          </div>

          <div>
            <strong>{summary.overtime}</strong>
            <span>h</span>
            <small>Overtime</small>
          </div>
        </div>

        <p className="summary-description">
          Current workload indicators
        </p>
      </div>

      {/* Project Performance */}
      <div className="summary-card">
        <div className="summary-card-header">
          <div className="summary-icon">
            <TrendingUp size={20} />
          </div>

          <span className="summary-label">
            Project Performance
          </span>
        </div>

        <div className="summary-main-value">
          {summary.projectCompletion}%
        </div>

        <div className="summary-secondary-value">
          {summary.collaboration}% collaboration
        </div>

        <p className="summary-description">
          Completion and collaboration
        </p>
      </div>
    </section>
  );
}

export default DashboardSummary;