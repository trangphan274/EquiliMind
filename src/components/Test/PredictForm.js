import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/PredictFormStyle.css";
import dropdown from "../../data/roleAndDepartment.json";

const roles = dropdown.roles;
const departments = dropdown.departments;
const jobLevels = ["Entry", "Mid", "Senior", "Manager", "Lead"];

const BurnoutForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        form
      );

      navigate("/predict-result", {
        state: { ...form, burnout_score: response.data.burnout_score }
      });

    } catch (error) {
      console.log("Predict error:", error);
      alert("Server error bro");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="predict-form">

      {/* Role */}
      <div className="form-group">
        <label>What’s your job title?</label>
        <Select
          options={roles.map(r => ({ value: r, label: r }))}
          value={form.role ? { value: form.role, label: form.role } : null}
          onChange={val => handleChange("role", val.value)}
          placeholder="Select role..."
          isSearchable
        />
      </div>
<div className="divider"></div>
      {/* Department */}
      <div className="form-group">
  <label>Which department do you work in?</label>

  <div className="select-row">
    <select
      value={form.department}
      onChange={e => handleChange("department", e.target.value)}
    >
      <option value="">Select department</option>
      {departments.map(d => (
        <option key={d} value={d}>{d}</option>
      ))}
    </select>
  </div>
</div>
<div className="divider"></div>
      {/* Job Level */}
     <div className="radio-group">
  {jobLevels.map(level => (
    <label key={level} className="radio-item">
      <input
        type="radio"
        name="jobLevel"
        value={level}
        checked={form.jobLevel === level}
        onChange={e => handleChange("jobLevel", e.target.value)}
      />
      <span className="circle"></span>
      <span className="label-text">{level}</span>
    </label>
  ))}
</div>
<div className="divider"></div>
      {/* Sliders */}
      <div className="scale-box">
  <span>Low</span>
  <span>Medium</span>
  <span>High</span>
</div>
      <div className="form-group">
        
  <label>Satisfaction</label>

  

  <div className="slider-row">
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={form.satisfaction}
      onChange={e => handleChange("satisfaction", parseFloat(e.target.value))}
    />
    <span className="slider-value">{form.satisfaction.toFixed(2)}</span>
  </div>
</div>
<div className="divider"></div>
<div className="form-group">
  <label>Workload</label>

  

  <div className="slider-row">
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={form.workload}
      onChange={e => handleChange("workload", parseFloat(e.target.value))}
    />
    <span className="slider-value">
      {form.workload.toFixed(2)}
    </span>
  </div>
</div>
<div className="divider"></div>
<div className="form-group">
  <label>Collaboration</label>

 

  <div className="slider-row">
    <input
      type="range"
      min="0"
      max="1"
      step="0.01"
      value={form.collaboration}
      onChange={e => handleChange("collaboration", parseFloat(e.target.value))}
    />
    <span className="slider-value">
      {form.collaboration.toFixed(2)}
    </span>
  </div>
</div>
<div className="divider"></div>
      {/* Numbers */}
      <div className="form-group">
  <label>Overtime hours</label>
  <div className="input-row">
    <input
      type="number"
      min="0"
      max="74"
      value={form.overtime}
      onChange={e => handleChange("overtime", parseInt(e.target.value) || 0)}
    />
  </div>
</div>
<div className="divider"></div>
<div className="form-group">
  <label>Tenure (months)</label>
  <div className="input-row">
    <input
      type="number"
      min="1"
      max="357"
      value={form.tenure}
      onChange={e => handleChange("tenure", parseInt(e.target.value) || 1)}
    />
  </div>
</div>
<div className="divider"></div>
<div className="form-group">
  <label>Salary</label>
  <div className="input-row">
    <input
      type="number"
      min="27000"
      max="384000"
      value={form.salary}
      onChange={e => handleChange("salary", parseInt(e.target.value) || 0)}
    />
  </div>
</div>
 

      <button type="submit" className="predict-btn">
        Predict Burnout
      </button>
    </form>
  );
};

export default BurnoutForm;