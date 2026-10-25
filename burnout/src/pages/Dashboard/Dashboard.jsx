
import React, { useEffect, useState } from "react";
import DashboardHeader from "../../components/Dashboard/DashboardHeader.jsx";
import DashboardSummary from "../../components/Dashboard/DashboardSummary.jsx";
import BurnoutTrend from "../../components/Dashboard/BurnoutTrend.jsx";
import WorkMetrics from "../../components/Dashboard/WorkMetrics.jsx";
import LatestAssessment from "../../components/Dashboard/LatestAssessment.jsx";
import "../../styles/Dashboard.css";

function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("access_token");

        if (!token) {
          setError("Please log in to view your dashboard.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://127.0.0.1:8000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to load dashboard data.");
        }

        const data = await response.json();

        setDashboardData(data);
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (!dashboardData || !dashboardData.summary) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-container">
          <h2>No assessment data yet</h2>
          <p>
            Complete an assessment to start building your
            personal burnout dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">

        <DashboardHeader
          profile={dashboardData.profile}
        />

        <DashboardSummary
          summary={dashboardData.summary}
        />

        <BurnoutTrend
          trend={dashboardData.trend}
        />

        <WorkMetrics
          workMetrics={dashboardData.workMetrics}
        />

        <LatestAssessment
          assessment={dashboardData.latestAssessment}
        />

      </div>
    </div>
  );
}

export default Dashboard;
