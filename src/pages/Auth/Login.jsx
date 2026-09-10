import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import '../../styles/AuthStyle.css';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    usernameOrEmail: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.usernameOrEmail.trim()) {
      newErrors.usernameOrEmail = 'Username or email is required.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    }

    return newErrors;
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
      'http://127.0.0.1:8000/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username_or_email: formData.usernameOrEmail,
          password: formData.password,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setServerError(data.detail);
      return;
    }

    localStorage.setItem('user', JSON.stringify(data.user));

    navigate('/');
  } catch (error) {
    setServerError('Unable to connect to the server.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">
            <LogIn size={26} />
          </div>

          <h1>Welcome back</h1>
          <p>Sign in to access your burnout results</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="usernameOrEmail">
              Username or Email
            </label>

            <input
              id="usernameOrEmail"
              name="usernameOrEmail"
              type="text"
              placeholder="Enter your username or email"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className={errors.usernameOrEmail ? 'input-error' : ''}
            />

            {errors.usernameOrEmail && (
              <span className="error-message">
                {errors.usernameOrEmail}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <div className="password-wrapper">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'input-error' : ''}
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={
                  showPassword ? 'Hide password' : 'Show password'
                }
              >
                {showPassword ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>
            </div>

            {errors.password && (
              <span className="error-message">
                {errors.password}
              </span>
            )}
          </div>

          <div className="forgot-password">
            <button type="button">
              Forgot password?
            </button>
          </div>
{serverError && (
  <span className="error-message">
    {serverError}
  </span>
)}
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="auth-footer">
          <span>Don't have an account?</span>
          <Link to="/register">Sign up</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;