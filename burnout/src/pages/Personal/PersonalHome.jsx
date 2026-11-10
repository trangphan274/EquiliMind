import React, { useEffect, useState } from "react";

import WelcomeHeader from "../../components/PersonalHome/WelcomeHeader.jsx";
import BurnoutOverview from "../../components/PersonalHome/BurnoutOverview.jsx";
import TestButton from "../../components/PersonalHome/TestButton.jsx";
import DailyReflection from "../../components/PersonalHome/DailyReflection.jsx";

import "../../styles/PersonalHome.css";

function PersonalHome() {
  const [burnoutRate, setBurnoutRate] = useState(0);
  const [previousRate, setPreviousRate] = useState(null);
  const [assessmentDate, setAssessmentDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestAssessment = async () => {
      try {
        const token = localStorage.getItem(
          "access_token"
        );

        if (!token) {
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
          throw new Error(
            "Failed to load dashboard data."
          );
        }

        const data = await response.json();

        // Latest burnout risk
        const latestRisk =
          data?.summary?.burnoutRisk ?? 0;

        setBurnoutRate(latestRisk * 100);

        // Latest assessment date
        setAssessmentDate(
          data?.latestAssessment?.createdAt ?? null
        );

        // Previous assessment
        const trend = data?.trend || [];

        if (trend.length >= 2) {
          const previous =
            trend[trend.length - 2]?.burnoutRisk;

          setPreviousRate(
            Number(previous) * 100
          );
        } else {
          setPreviousRate(null);
        }

      } catch (error) {
        console.error(
          "Personal Home error:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAssessment();
  }, []);

  return (
    <div className="personal-home">

      <WelcomeHeader />

      {loading ? (
        <div className="burnout-overview-loading">
          Loading your latest assessment...
        </div>
      ) : (
        <BurnoutOverview
          rate={burnoutRate}
          previousRate={previousRate}
          date={assessmentDate}
        />
      )}

      <TestButton />

      <DailyReflection />

    </div>
  );
}

export default PersonalHome;