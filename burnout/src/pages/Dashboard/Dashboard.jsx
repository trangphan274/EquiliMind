import React from 'react';
import DashboardHeader from '../../components/Dashboard/DashboardHeader.jsx';
import DashboardSummary from '../../components/Dashboard/DashboardSummary.jsx';
import BurnoutTrend from '../../components/Dashboard/BurnoutTrend.jsx';
import WorkMetrics from '../../components/Dashboard/WorkMetrics.jsx';
import LatestAssessment from '../../components/Dashboard/LatestAssessment.jsx';
import '../../styles/Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <DashboardHeader />
        <DashboardSummary />
        <BurnoutTrend />
        <WorkMetrics />
        <LatestAssessment />
      </div>
    </div>
  );
}

export default Dashboard;