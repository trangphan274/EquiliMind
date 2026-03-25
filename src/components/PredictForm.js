import React, { useState } from "react";
import Select from "react-select";
import "../styles/PredictFormStyle.css";

// giả sử dataset đã load
const roles = [ /* ...unique roles from dataset */ ];
const departments = [ /* ...unique departments */ ];
const jobLevels = ["Entry", "Mid", "Senior", "Manager", "Lead"];

const BurnoutForm = () => {
  const [form, setForm] = useState({
    role: null,
    department: "",
    jobLevel: "",
    satisfaction: 0.5,
    workload: 0.5,
    collaboration: 0.5,
    overtime: 0,
    tenure: 12,
    salary: 50000
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("Form submit:", form);
    // TODO: call predict API
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* Role */}
      <label>What’s your job title?</label>
      <Select
        options={roles.map(r => ({ value: r, label: r }))}
        value={form.role ? { value: form.role, label: form.role } : null}
        onChange={val => handleChange("role", val.value)}
        placeholder="Select role..."
        isSearchable
      />
      <small>Choose your role (searchable)</small>

      {/* Department */}
      <label>Which department do you work in?</label>
      <select
        value={form.department}
        onChange={e => handleChange("department", e.target.value)}
      >
        <option value="">Select department</option>
        {departments.map(d => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>

      {/* Job Level */}
      <label>What’s your job level?</label>
      <div>
        {jobLevels.map(level => (
          <label key={level} style={{ marginRight: 10 }}>
            <input
              type="radio"
              name="jobLevel"
              value={level}
              checked={form.jobLevel === level}
              onChange={e => handleChange("jobLevel", e.target.value)}
            />
            {level}
          </label>
        ))}
      </div>

      {/* Sliders 0-1 */}
      <label>How happy are you at work? ({form.satisfaction.toFixed(2)})</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={form.satisfaction}
        onChange={e => handleChange("satisfaction", parseFloat(e.target.value))}
      />

      <label>How heavy is your workload? ({form.workload.toFixed(2)})</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={form.workload}
        onChange={e => handleChange("workload", parseFloat(e.target.value))}
      />

      <label>How well do you work with your team? ({form.collaboration.toFixed(2)})</label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={form.collaboration}
        onChange={e => handleChange("collaboration", parseFloat(e.target.value))}
      />

      {/* Number inputs */}
      <label>Overtime hours per month (0–74)</label>
      <input
        type="number"
        min="0"
        max="74"
        value={form.overtime}
        onChange={e => handleChange("overtime", parseInt(e.target.value))}
      />

      <label>Time with company in months (1–357)</label>
      <input
        type="number"
        min="1"
        max="357"
        value={form.tenure}
        onChange={e => handleChange("tenure", parseInt(e.target.value))}
      />

      <label>Annual salary ($27K–$384K)</label>
      <input
        type="number"
        min="27000"
        max="384000"
        value={form.salary}
        onChange={e => handleChange("salary", parseInt(e.target.value))}
      />

      <button type="submit" style={{ marginTop: 20 }}>Predict Burnout</button>
    </form>
  );
};

export default BurnoutForm;