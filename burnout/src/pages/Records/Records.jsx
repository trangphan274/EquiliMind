import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusCircle,
  BookOpen,
  ArrowDown,
  ArrowUp,
  Minus,
} from "lucide-react";

import RecordsHeader from "../../components/Records/RecordsHeader.jsx";
import AssessmentHistory from "../../components/Records/AssessmentHistory.jsx";
import RecoveryNote from "../../components/Records/RecoveryNote.jsx";

import "../../styles/Records.css";

function Records() {
  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRecords = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem(
        "access_token"
      );

      if (!token) {
        setError(
          "Please log in to view your assessment records."
        );
        return;
      }

      const response = await fetch(
        "http://127.0.0.1:8000/api/records",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load assessment records."
        );
      }

      const data = await response.json();

      setRecords(data.records || []);
    } catch (err) {
      console.error("Records error:", err);
      setError(
        "Unable to load your assessment records."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleNewTest = () => {
    navigate("/predict");
  };

  const handleViewDetails = (record) => {
    navigate("/predict-result", {
      state: {
        ...record.inputs,
        burnout_score: record.burnoutRisk,
        predictionId: record.predictionId,
        createdAt: record.createdAt,
      },
    });
  };

  if (loading) {
    return (
      <div className="records-page">
        <div className="records-container">
          <div className="records-loading">
            Loading assessment records...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="records-page">
        <div className="records-container">
          <div className="records-error">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="records-page">
      <div className="records-container">

        <RecordsHeader
          onNewTest={handleNewTest}
        />

        <AssessmentHistory
          records={records}
          onViewDetails={handleViewDetails}
        />

        <RecoveryNote />

      </div>
    </div>
  );
}

export default Records;