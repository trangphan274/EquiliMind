import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, HeartPulse } from 'lucide-react';

function TestButton() {
  const navigate = useNavigate();

  return (
    <section className="test-cta">

      <div className="test-cta-icon">
        <HeartPulse size={24} />
      </div>

      <span className="test-cta-label">
        QUICK ASSESSMENT
      </span>

      <h2>
        Check your burnout risk
      </h2>

      <p>
        Take a quick assessment to understand your current
        burnout risk and well-being.
      </p>

      <div className="test-cta-divider" />

      <button
        type="button"
        className="test-cta-button"
        onClick={() => navigate('/predict')}
      >
        Take Burnout Test
        <ArrowRight size={18} />
      </button>

    </section>
  );
}

export default TestButton;