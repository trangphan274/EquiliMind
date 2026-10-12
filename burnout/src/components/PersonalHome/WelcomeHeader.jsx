import React from 'react';

function WelcomeHeader({ name = 'Evelyn' }) {
  return (
    <section className="welcome-header">

      <div className="welcome-content">
        <span className="welcome-badge">
          ✨ Personal Home
        </span>

        <h1>
          Good day, {name} 👋
        </h1>

        <p>
          Take a moment to check in with yourself.
          EquiliMind is here to help you understand your
          well-being and manage your burnout risk.
        </p>
      </div>

      <button
        type="button"
        className="log-note-button"
      >
        📝 Log Daily Note
      </button>

    </section>
  );
}

export default WelcomeHeader;