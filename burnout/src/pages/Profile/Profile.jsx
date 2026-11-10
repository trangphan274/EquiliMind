
import React, { useEffect, useState } from 'react';
import {
  UserRound,
  Building2,
  BriefcaseBusiness,
  Clock3,
  DollarSign,
  Heart,
  Activity,
  UsersRound,
  CircleCheck,
  Pencil,
  Download,
  ChartColumn,
  Bell,
  SlidersHorizontal,
  Save,
  X,
} from 'lucide-react';
import '../../styles/Profile.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

const getToken = () =>
  localStorage.getItem('access_token') || localStorage.getItem('token');

const formatValue = (value, suffix = '') => {
  if (value === null || value === undefined || value === '') return '—';
  return `${value}${suffix}`;
};

// Convert scores from 0–1 to 0–100.
// Values already in 0–100 remain unchanged.
const toPercentage = (value) => {
  if (value === null || value === undefined || value === '') return null;

  const number = Number(value);
  if (!Number.isFinite(number)) return null;

  return Math.round(number <= 1 ? number * 100 : number);
};

function Profile() {
  const [profile, setProfile] = useState(null);
  const [assessment, setAssessment] = useState(null);
  const [form, setForm] = useState({});
  const [activeTab, setActiveTab] = useState('personal');
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const authHeaders = {
    Authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  };

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await fetch(`${API_URL}/api/profile`, {
        headers: authHeaders,
      });

      if (!response.ok) {
        throw new Error('Unable to load profile information.');
      }

      const data = await response.json();
      const user = data.profile || {};

      setProfile(user);
      setAssessment(data.latestAssessment || null);

      setForm({
        first_name: user.firstName || '',
        last_name: user.lastName || '',
        username: user.username || '',
        role: user.role || '',
        department: user.department || '',
        job_level: user.jobLevel || '',
        tenure_months: user.tenureMonths ?? '',
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');

      const response = await fetch(`${API_URL}/api/profile`, {
        method: 'PUT',
        headers: authHeaders,
        body: JSON.stringify({
          ...form,
          tenure_months:
            form.tenure_months === '' ? null : Number(form.tenure_months),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Unable to update profile.');
      }

      setEditing(false);
      await fetchProfile();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const risk = assessment?.burnoutRisk;
  const riskPercent = toPercentage(risk);

  const riskLabel =
    riskPercent === null
      ? 'No assessment yet'
      : riskPercent < 35
        ? 'Low Burnout Risk'
        : riskPercent < 65
          ? 'Moderate Burnout Risk'
          : 'High Burnout Risk';

  // All score metrics are displayed on a 0–100 scale.
  const satisfaction = toPercentage(assessment?.satisfaction);
  const workload = toPercentage(assessment?.workload);
  const collaboration = toPercentage(assessment?.collaboration);
  const projectCompletion = toPercentage(assessment?.projectCompletion);

  const metrics = [
    {
      label: 'Satisfaction',
      value: formatValue(satisfaction, '/100'),
      icon: Heart,
      color: 'pink',
      description: 'Satisfaction score',
      percentage: satisfaction ?? 0,
    },
    {
      label: 'Workload Burden',
      value: formatValue(workload, '/100'),
      icon: Activity,
      color: 'orange',
      description: 'Workload score',
      percentage: workload ?? 0,
    },
    {
      label: 'Collaboration',
      value: formatValue(collaboration, '/100'),
      icon: UsersRound,
      color: 'purple',
      description: 'Collaboration score',
      percentage: collaboration ?? 0,
    },
    {
      label: 'Overtime (OT)',
      value: formatValue(assessment?.overtimeHours, ' hrs'),
      icon: Clock3,
      color: 'teal',
      description: 'Monthly overtime hours',
      percentage: Math.min(
        100,
        ((Number(assessment?.overtimeHours) || 0) / 74) * 100
      ),
    },
    {
      label: 'Project Completion',
      value: formatValue(projectCompletion, '%'),
      icon: CircleCheck,
      color: 'green',
      description: 'Project completion rate',
      percentage: projectCompletion ?? 0,
    },
  ];

  const tabs = [
    { id: 'personal', label: 'Personal & Job Metrics', icon: UserRound },
    {
      id: 'history',
      label: 'Assessment & Survey History',
      icon: ChartColumn,
    },
    {
      id: 'privacy',
      label: 'Notifications & Privacy',
      icon: SlidersHorizontal,
    },
  ];

  if (loading) {
    return <div className="profile-state">Loading profile...</div>;
  }

  if (!profile) {
    return (
      <div className="profile-state">
        {error || 'Profile information is unavailable.'}
        <button onClick={fetchProfile}>Try again</button>
      </div>
    );
  }

  return (
    <main className="profile-page">
      {/* Page header */}
      <header className="profile-page-header">
        <div className="profile-page-heading">
          <div className="profile-heading-icon">
            <UserRound size={23} />
          </div>

          <div>
            <h1>Employee Profile & Settings</h1>
            <p>EquiliMind Personal Burnout & Well-being Management</p>
          </div>
        </div>

        <div className="profile-header-actions">
          <button
            className="profile-btn profile-btn-outline"
            onClick={() => setEditing((prev) => !prev)}
          >
            {editing ? <X size={15} /> : <Pencil size={15} />}
            {editing ? 'Cancel Editing' : 'Edit Metrics'}
          </button>

          <button
            className="profile-btn profile-btn-primary"
            onClick={() => window.print()}
          >
            <Download size={15} />
            Export Report
          </button>
        </div>
      </header>

      {error && <div className="profile-error">{error}</div>}

      {/* Employee hero */}
      <section className="profile-hero">
        <div className="profile-identity">
          <div className="profile-avatar">
            <UserRound size={42} />
            <span className="profile-avatar-status">
              <CircleCheck size={15} />
            </span>
          </div>

          <div className="profile-identity-info">
            <div className="profile-name-row">
              <h2>
                {[profile.firstName, profile.lastName]
                  .filter(Boolean)
                  .join(' ') || profile.username}
              </h2>

              <span
                className={`profile-risk-badge ${
                  riskPercent === null
                    ? 'risk-none'
                    : riskPercent < 35
                      ? 'risk-low'
                      : riskPercent < 65
                        ? 'risk-moderate'
                        : 'risk-high'
                }`}
              >
                {riskPercent === null
                  ? 'No Assessment'
                  : `${riskLabel} (${riskPercent}%)`}
              </span>
            </div>

            <p className="profile-role">
              {profile.role || 'Job role not set'}
            </p>

            <div className="profile-tags">
              <span>
                <Building2 size={14} />
                {profile.department || 'Department not set'}
              </span>
              <span>
                <BriefcaseBusiness size={14} />
                {profile.jobLevel || 'Level not set'}
              </span>
              <span>
                <Clock3 size={14} />
                {profile.tenureMonths != null
                  ? `${profile.tenureMonths} Months Tenure`
                  : 'Tenure not set'}
              </span>
              <span>
                <DollarSign size={14} />
                {assessment?.salary != null
                  ? Number(assessment.salary).toLocaleString()
                  : 'Salary unavailable'}
              </span>
            </div>
          </div>
        </div>

        <div className="profile-risk-panel">
          <div className="profile-risk-panel-heading">
            <span>
              <Activity size={17} />
              LATEST BURNOUT ASSESSMENT
            </span>
            {riskPercent !== null && <strong>{riskPercent}%</strong>}
          </div>

          <div className="profile-risk-track">
            <div
              className="profile-risk-progress"
              style={{ width: `${riskPercent ?? 0}%` }}
            />
          </div>

          <p>
            {riskPercent === null
              ? 'Complete a burnout assessment to view your latest result.'
              : `Your latest burnout risk level is ${riskLabel.toLowerCase()}.`}
          </p>

          <div className="profile-risk-footer">
            <span>Assessment status</span>
            <strong>
              {riskPercent === null ? 'Not available' : 'Completed'}
            </strong>
          </div>
        </div>
      </section>

      {/* Metric cards */}
      <section className="profile-metrics-grid">
        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <article
              className={`profile-metric-card metric-${metric.color}`}
              key={metric.label}
            >
              <div className="profile-metric-heading">
                <span>{metric.label}</span>
                <Icon size={17} />
              </div>

              <strong className="profile-metric-value">
                {metric.value}
              </strong>

              <div className="profile-metric-track">
                <div
                  className="profile-metric-progress"
                  style={{ width: `${metric.percentage}%` }}
                />
              </div>

              <p>{assessment ? metric.description : 'No assessment data'}</p>
            </article>
          );
        })}
      </section>

      {/* Tabs and content */}
      <section className="profile-content">
        <nav className="profile-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <button
                key={tab.id}
                className={`profile-tab ${
                  activeTab === tab.id ? 'active' : ''
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <Icon size={17} />
                {tab.label}
              </button>
            );
          })}
        </nav>

        {activeTab === 'personal' && (
          <div className="profile-panels">
            <section className="profile-info-panel">
              <h3>
                <BriefcaseBusiness size={17} />
                Employment Parameters
              </h3>

              <div className="profile-info-grid">
                <ProfileField
                  label="First Name"
                  value={form.first_name}
                  name="first_name"
                  editing={editing}
                  onChange={handleChange}
                />
                <ProfileField
                  label="Last Name"
                  value={form.last_name}
                  name="last_name"
                  editing={editing}
                  onChange={handleChange}
                />
                <ProfileField
                  label="Job Title / Role"
                  value={form.role}
                  name="role"
                  editing={editing}
                  onChange={handleChange}
                />
                <ProfileField
                  label="Business Department"
                  value={form.department}
                  name="department"
                  editing={editing}
                  onChange={handleChange}
                />
                <ProfileField
                  label="Job Level"
                  value={form.job_level}
                  name="job_level"
                  editing={editing}
                  onChange={handleChange}
                />
                <ProfileField
                  label="Tenure (Months)"
                  value={form.tenure_months}
                  name="tenure_months"
                  editing={editing}
                  onChange={handleChange}
                  type="number"
                />

                <div className="profile-info-item">
                  <span>Username</span>
                  <strong>{profile.username || '—'}</strong>
                </div>

                <div className="profile-info-item">
                  <span>Email Address</span>
                  <strong>{profile.email || '—'}</strong>
                </div>
              </div>

              {editing && (
                <div className="profile-save-row">
                  <button
                    className="profile-btn profile-btn-primary"
                    onClick={handleSave}
                    disabled={saving}
                  >
                    <Save size={15} />
                    {saving ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </section>

            <section className="profile-info-panel">
              <h3>
                <SlidersHorizontal size={17} />
                Active Model Features
              </h3>

              <p className="profile-panel-description">
                These metrics are used by the EquiliMind Machine Learning
                Model to evaluate burnout risk.
              </p>

              <FeatureBar
                label="Satisfaction Score"
                value={assessment?.satisfaction}
                suffix="/100"
                max={100}
                normalize
              />

              <FeatureBar
                label="Workload Score"
                value={assessment?.workload}
                suffix="/100"
                max={100}
                normalize
              />

              <FeatureBar
                label="Collaboration Score"
                value={assessment?.collaboration}
                suffix="/100"
                max={100}
                normalize
              />

              <FeatureBar
                label="Monthly Overtime"
                value={assessment?.overtimeHours}
                suffix=" hrs"
                max={74}
              />

              <FeatureBar
                label="Project Completion"
                value={assessment?.projectCompletion}
                suffix="%"
                max={100}
                normalize
              />
            </section>
          </div>
        )}

        {activeTab === 'history' && (
          <section className="profile-info-panel profile-tab-panel">
            <h3>
              <ChartColumn size={17} />
              Assessment & Survey History
            </h3>

            {assessment ? (
              <div className="profile-history-item">
                <div>
                  <strong>Latest Burnout Assessment</strong>
                  <p>
                    {assessment.createdAt
                      ? new Date(assessment.createdAt).toLocaleString()
                      : 'Date unavailable'}
                  </p>
                </div>
                <span className="profile-history-risk">
                  {riskPercent ?? '—'}%
                </span>
              </div>
            ) : (
              <p className="profile-empty">
                No assessment history is available yet.
              </p>
            )}
          </section>
        )}

        {activeTab === 'privacy' && (
          <section className="profile-info-panel profile-tab-panel">
            <h3>
              <Bell size={17} />
              Notifications & Privacy
            </h3>

            <p className="profile-panel-description">
              Your account information is associated with your personal
              EquiliMind profile. Profile data can be updated from the
              Personal & Job Metrics section.
            </p>

            <div className="profile-info-item">
              <span>Account email</span>
              <strong>{profile.email || '—'}</strong>
            </div>

            <div className="profile-info-item">
              <span>Username</span>
              <strong>{profile.username || '—'}</strong>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function ProfileField({
  label,
  value,
  name,
  editing,
  onChange,
  type = 'text',
}) {
  return (
    <div className="profile-info-item">
      <label htmlFor={`profile-${name}`}>{label}</label>

      {editing ? (
        <input
          id={`profile-${name}`}
          name={name}
          type={type}
          value={value ?? ''}
          onChange={onChange}
        />
      ) : (
        <strong>{formatValue(value)}</strong>
      )}
    </div>
  );
}

function FeatureBar({
  label,
  value,
  suffix = '',
  max = 100,
  normalize = false,
}) {
  const available =
    value !== null && value !== undefined && value !== '';

  const numericValue = Number(value);

  const displayValue = available
    ? normalize
      ? toPercentage(numericValue)
      : numericValue
    : null;

  const percentage = available
    ? Math.max(0, Math.min(100, (displayValue / max) * 100))
    : 0;

  return (
    <div className="profile-feature">
      <div className="profile-feature-heading">
        <span>{label}</span>
        <strong>
          {available ? `${displayValue}${suffix}` : '—'}
        </strong>
      </div>

      <div className="profile-feature-track">
        <div
          className="profile-feature-progress"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default Profile;
