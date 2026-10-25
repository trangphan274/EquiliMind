
import React, { useState } from "react";
import { Activity } from "lucide-react";

function DashboardHeader({ profile }) {
  const [timeframe, setTimeframe] = useState("6 Months");

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const firstName = user.first_name || "User";

  const role = profile?.role || "-";
  const department = profile?.department || "-";
  const jobLevel = profile?.jobLevel || "-";
  const tenure = profile?.tenureMonths ?? "-";

  return (
    <header className="dashboard-header">

      <div className="dashboard-header-title">
        <div className="dashboard-title-row">
          <Activity size={28} />
          <h1>Personal Burnout Analytics</h1>
        </div>

        <p>
          Your personal workload, well-being, performance,
          and burnout risk overview.
        </p>
      </div>

      <div className="dashboard-header-actions">

        <div className="dashboard-timeframe">
          <span>Timeframe:</span>

          <select
            value={timeframe}
            onChange={(e) =>
              setTimeframe(e.target.value)
            }
          >
            <option value="30 Days">
              Last 30 Days
            </option>

            <option value="3 Months">
              Last 3 Months
            </option>

            <option value="6 Months">
              Last 6 Months
            </option>

            <option value="1 Year">
              Last 1 Year
            </option>
          </select>
        </div>

        <div className="dashboard-profile">

          <div className="dashboard-avatar">
            {firstName.charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{role}</strong>

            <span>
              {department} · {jobLevel} ·{" "}
              {tenure} months
            </span>
          </div>

        </div>

      </div>

    </header>
  );
}

export default DashboardHeader;
