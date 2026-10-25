
import React from "react";
import {
  Activity,
  Smile,
  BriefcaseBusiness,
  Clock,
  CheckCircle,
} from "lucide-react";

function DashboardSummary({ summary }) {
  const burnoutRisk = Math.round(
    (summary?.burnoutRisk || 0) * 100
  );

  const satisfaction = summary?.satisfaction ?? 0;
  const workload = summary?.workload ?? 0;
  const overtimeHours = summary?.overtimeHours ?? 0;
  const projectCompletion =
    summary?.projectCompletion ?? 0;

  return (
    <section className="dashboard-summary">

      <div className="summary-card">
        <Activity size={22} />

        <span>Burnout Risk</span>

        <strong>
          {burnoutRisk}%
        </strong>
      </div>

      <div className="summary-card">
        <Smile size={22} />

        <span>Satisfaction</span>

        <strong>
          {Number(satisfaction).toFixed(2)}
        </strong>
      </div>

      <div className="summary-card">
        <BriefcaseBusiness size={22} />

        <span>Workload</span>

        <strong>
          {Number(workload).toFixed(2)}
        </strong>
      </div>

      <div className="summary-card">
        <Clock size={22} />

        <span>Overtime</span>

        <strong>
          {overtimeHours} hrs
        </strong>
      </div>

      <div className="summary-card">
        <CheckCircle size={22} />

        <span>Project Completion</span>

        <strong>
          {Math.round(
            Number(projectCompletion) * 100
          )}
          %
        </strong>
      </div>

    </section>
  );
}

export default DashboardSummary;
