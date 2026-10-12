
import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff } from "lucide-react";
import "../../styles/AuthStyle.css";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validate();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    setLoading(true);
    setServerError('');

    const response = await fetch(
      'http://127.0.0.1:8000/auth/register',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setServerError(data.detail);
      return;
    }

    navigate('/login');
  } catch (error) {
    setServerError('Unable to connect to the server.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page">
      <div className="register-card">

        <div className="register-header">
          <div className="register-icon">
            <UserPlus size={24} />
          </div>

          <h1>Create your account</h1>

          <p>
            Create an account to save and track your burnout results
          </p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="firstName">First Name</label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? "input-error" : ""}
              />

              {errors.firstName && (
                <span className="error-message">
                  {errors.firstName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? "input-error" : ""}
              />

              {errors.lastName && (
                <span className="error-message">
                  {errors.lastName}
                </span>
              )}
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="username">Username</label>

              <input
                id="username"
                name="username"
                type="text"
                placeholder="johndoe123"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "input-error" : ""}
              />

              {errors.username && (
                <span className="error-message">
                  {errors.username}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="name@domain.com"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
              />

              {errors.email && (
                <span className="error-message">
                  {errors.email}
                </span>
              )}
            </div>

          </div>

          <div className="form-row">

            <div className="form-group">
              <label htmlFor="password">Password</label>

              <div className="password-wrapper">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "input-error" : ""}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              {errors.password && (
                <span className="error-message">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password
              </label>

              <div className="password-wrapper">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "input-error" : ""}
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>
              </div>

              {errors.confirmPassword && (
                <span className="error-message">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

          </div>
{serverError && (
  <span className="error-message">
    {serverError}
  </span>
)}
          <button type="submit" className="register-button" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

        </form>

        <div className="register-footer">
          <span>Already have an account?</span>{" "}
          <Link to="/login">Sign in</Link>
        </div>

      </div>
    </div>
  );
}

export default Register;
