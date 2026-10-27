import React from "react";
import { PlusCircle } from "lucide-react";

function RecordsHeader({ onNewTest }) {
  return (
    <header className="records-header">
      <div className="records-header-content">
        <h1>Assessment History & Take a Test</h1>

        <p>
          Manage your previous burnout assessments and take a new test
        </p>
      </div>

      <button
        type="button"
        className="records-new-test-button"
        onClick={onNewTest}
      >
        <PlusCircle size={18} />
        <span>Take New Burnout Test</span>
      </button>
    </header>
  );
}

export default RecordsHeader;