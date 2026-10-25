
import React, { useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/PredictFormStyle.css";
import dropdown from "../../data/roleAndDepartment.json";

const roles = dropdown.roles;
const departments = dropdown.departments;
const jobLevels = ["Entry", "Mid", "Senior", "Manager", "Lead"];

const PredictForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "",
    department: "",
    job_level: "",
    project_completion_rate: "",
    satisfaction_score: "",
    workload_score: "",
    collaboration_score: "",
    overtime_hours: "",
    tenure_months: "",
    salary: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Remove error for this field once it has a value
    if (value !== "" && value !== null && value !== undefined) {
      setErrors((prev) => ({
        ...prev,
        [field]: false,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "role",
      "department",
      "job_level",
      "project_completion_rate",
      "satisfaction_score",
      "workload_score",
      "collaboration_score",
      "overtime_hours",
      "tenure_months",
      "salary",
    ];

    const newErrors = {};

    requiredFields.forEach((field) => {
      if (
        form[field] === "" ||
        form[field] === null ||
        form[field] === undefined
      ) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const token = localStorage.getItem("access_token");

      if (!token) {
        alert("Please log in before taking the assessment.");
        return;
      }

      const requestData = {
        role: form.role,
        department: form.department,
        job_level: form.job_level,
        project_completion_rate: Number(
          form.project_completion_rate
        ),
        satisfaction_score: Number(
          form.satisfaction_score
        ),
        workload_score: Number(
          form.workload_score
        ),
        collaboration_score: Number(
          form.collaboration_score
        ),
        overtime_hours: Number(form.overtime_hours),
        tenure_months: Number(form.tenure_months),
        salary: Number(form.salary),
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/predictions",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/predict-result", {
        state: {
          ...requestData,
          burnout_score: response.data.burnoutRisk,
          predictionId: response.data.predictionId,
          createdAt: response.data.createdAt,
        },
      });
    } catch (error) {
      console.log("Predict error:", error);

      if (error.response) {
        console.log("Backend response:", error.response.data);
        alert(
          error.response.data.detail ||
            "Unable to calculate burnout risk."
        );
      } else {
        alert("Cannot connect to the server.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="predict-form">

      {/* Role */}
      <div className="form-group">
        <label>What’s your job title?</label>

<div className={`role-select ${errors.role ? "select-error" : ""}`}>
  <Select
    classNamePrefix="select"
    options={roles.map((r) => ({
      value: r,
      label: r,
    }))}
    value={
      form.role
        ? {
            value: form.role,
            label: form.role,
          }
        : null
    }
    onChange={(val) =>
      handleChange("role", val ? val.value : "")
    }
    placeholder="Select role..."
    isSearchable
  />
</div>

      </div>

      <div className="divider"></div>

      {/* Department */}
      <div className="form-group">
        <label>Which department do you work in?</label>

        <div className="select-row">
          <select
            className={errors.department ? "input-error" : ""}
            value={form.department}
            onChange={(e) =>
              handleChange("department", e.target.value)
            }
          >
            <option value="">Select department</option>

            {departments.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="divider"></div>

      {/* Job Level */}
      <div
        className={`radio-group ${
          errors.job_level ? "radio-error" : ""
        }`}
      >
        {jobLevels.map((level) => (
          <label key={level} className="radio-item">
            <input
              type="radio"
              name="jobLevel"
              value={level}
              checked={form.job_level === level}
              onChange={(e) =>
                handleChange("job_level", e.target.value)
              }
            />

            <span className="circle"></span>
            <span className="label-text">{level}</span>
          </label>
        ))}
      </div>

      <div className="divider"></div>

      {/* Scale labels */}
      <div className="scale-box">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>

      {/* Project Completion */}
      <div className="form-group">
        <label>Project completion rate</label>

        <div
          className={`slider-row ${
            errors.project_completion_rate
              ? "slider-error"
              : ""
          }`}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={
              form.project_completion_rate === ""
                ? 0
                : form.project_completion_rate
            }
            onChange={(e) =>
              handleChange(
                "project_completion_rate",
                parseFloat(e.target.value)
              )
            }
          />

          <span className="slider-value">
            {form.project_completion_rate === ""
              ? "—"
              : form.project_completion_rate.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="divider"></div>

      {/* Satisfaction */}
      <div className="form-group">
        <label>Satisfaction</label>

        <div
          className={`slider-row ${
            errors.satisfaction_score
              ? "slider-error"
              : ""
          }`}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={
              form.satisfaction_score === ""
                ? 0
                : form.satisfaction_score
            }
            onChange={(e) =>
              handleChange(
                "satisfaction_score",
                parseFloat(e.target.value)
              )
            }
          />

          <span className="slider-value">
            {form.satisfaction_score === ""
              ? "—"
              : form.satisfaction_score.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="divider"></div>

      {/* Workload */}
      <div className="form-group">
        <label>Workload</label>

        <div
          className={`slider-row ${
            errors.workload_score ? "slider-error" : ""
          }`}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={
              form.workload_score === ""
                ? 0
                : form.workload_score
            }
            onChange={(e) =>
              handleChange(
                "workload_score",
                parseFloat(e.target.value)
              )
            }
          />

          <span className="slider-value">
            {form.workload_score === ""
              ? "—"
              : form.workload_score.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="divider"></div>

      {/* Collaboration */}
      <div className="form-group">
        <label>Collaboration</label>

        <div
          className={`slider-row ${
            errors.collaboration_score
              ? "slider-error"
              : ""
          }`}
        >
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={
              form.collaboration_score === ""
                ? 0
                : form.collaboration_score
            }
            onChange={(e) =>
              handleChange(
                "collaboration_score",
                parseFloat(e.target.value)
              )
            }
          />

          <span className="slider-value">
            {form.collaboration_score === ""
              ? "—"
              : form.collaboration_score.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="divider"></div>

      {/* Overtime */}
      <div className="form-group">
        <label>Overtime hours</label>

        <div className="input-row">
          <input
            className={errors.overtime_hours ? "input-error" : ""}
            type="number"
            min="0"
            max="74"
            value={form.overtime_hours}
            onChange={(e) =>
              handleChange(
                "overtime_hours",
                e.target.value === ""
                  ? ""
                  : parseInt(e.target.value, 10)
              )
            }
          />
        </div>
      </div>

      <div className="divider"></div>

      {/* Tenure */}
      <div className="form-group">
        <label>Tenure (months)</label>

        <div className="input-row">
          <input
            className={errors.tenure_months ? "input-error" : ""}
            type="number"
            min="1"
            max="357"
            value={form.tenure_months}
            onChange={(e) =>
              handleChange(
                "tenure_months",
                e.target.value === ""
                  ? ""
                  : parseInt(e.target.value, 10)
              )
            }
          />
        </div>
      </div>

      <div className="divider"></div>

      {/* Salary */}
      <div className="form-group">
        <label>Salary</label>

        <div className="input-row">
          <input
            className={errors.salary ? "input-error" : ""}
            type="number"
            min="27000"
            max="384000"
            value={form.salary}
            onChange={(e) =>
              handleChange(
                "salary",
                e.target.value === ""
                  ? ""
                  : parseInt(e.target.value, 10)
              )
            }
          />
        </div>
      </div>

      {/* Submit */}
      <button type="submit" className="predict-btn">
        Predict Burnout
      </button>
    </form>
  );
};

export default PredictForm;
