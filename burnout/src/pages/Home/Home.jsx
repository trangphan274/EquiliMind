import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  Brain,
  ChartNoAxesCombined,
  ShieldCheck,
  ClipboardCheck,
  Heart,
  LockKeyhole,
  Menu,
  X,
  CheckCircle2,
  Sparkles,
  BookHeart,
  TrendingUp,
} from "lucide-react";

import "../../styles/Home.css";

function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <div className="landing-page">
      {/* HEADER */}
      <header className="landing-header">
        <div className="landing-nav">
          <Link to="/" className="landing-brand" onClick={closeMenu}>
            <div className="brand-icon">
              <Activity size={23} />
            </div>

            <span>EquiliMind</span>
          </Link>

          <nav className={`landing-nav-links ${mobileMenuOpen ? "open" : ""}`}>
            <Link to="/about" onClick={closeMenu}>About</Link>
            <Link to="/login" onClick={closeMenu}>Login</Link>
            <Link
              to="/register"
              className="nav-register"
              onClick={closeMenu}
            >
              Register
            </Link>
          </nav>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section className="landing-hero">
          <div className="hero-background-shape hero-shape-one" />
          <div className="hero-background-shape hero-shape-two" />

          <div className="landing-container hero-container">
            <div className="hero-content">
              <div className="hero-label">
                <Sparkles size={15} />
                <span>Understand Your Well-Being</span>
              </div>

              <h1>
                Take a Moment.
                <br />
                <span>Understand Your Burnout.</span>
              </h1>

              <p className="hero-description">
                Your well-being matters. EquiliMind helps you understand
                burnout risk through data-driven assessment and personal
                insights, so you can make more informed decisions about
                your work-life balance.
              </p>

              <div className="hero-actions">
                <Link to="/register" className="primary-button">
                  Get Started Free
                  <ArrowRight size={18} />
                </Link>

                <Link to="/about" className="secondary-button">
                  Learn More
                </Link>
              </div>

              <div className="hero-benefits">
                <span>
                  <CheckCircle2 size={16} />
                  Personal Assessment
                </span>

                <span>
                  <CheckCircle2 size={16} />
                  Data-Driven Insights
                </span>

                <span>
                  <CheckCircle2 size={16} />
                  Private Reflection
                </span>
              </div>
            </div>

            {/* HERO VISUAL */}
            <div className="hero-visual">
              <div className="visual-glow" />

              <div className="preview-card">
                <div className="preview-header">
                  <div className="preview-heading">
                    <div className="preview-icon">
                      <Activity size={20} />
                    </div>

                    <div>
                      <h3>Your Well-Being</h3>
                      <p>A personal space to check in</p>
                    </div>
                  </div>

                  <span className="preview-status">Personal</span>
                </div>

                <div className="preview-main">
                  <div className="preview-main-icon">
                    <Brain size={32} />
                  </div>

                  <div>
                    <span>Burnout Assessment</span>
                    <h3>Understand your current state</h3>
                    <p>
                      Explore the factors that may influence your
                      well-being.
                    </p>
                  </div>
                </div>

                <div className="preview-metrics">
                  <div className="preview-metric">
                    <div className="metric-icon blue">
                      <ChartNoAxesCombined size={19} />
                    </div>
                    <div>
                      <strong>Assessment</strong>
                      <span>Explore your risk</span>
                    </div>
                  </div>

                  <div className="preview-metric">
                    <div className="metric-icon purple">
                      <BookHeart size={19} />
                    </div>
                    <div>
                      <strong>Reflection</strong>
                      <span>Record your thoughts</span>
                    </div>
                  </div>

                  <div className="preview-metric">
                    <div className="metric-icon green">
                      <TrendingUp size={19} />
                    </div>
                    <div>
                      <strong>Progress</strong>
                      <span>Review your history</span>
                    </div>
                  </div>
                </div>

                <div className="preview-footer">
                  <ShieldCheck size={17} />
                  <span>Your personal well-being journey starts here.</span>
                </div>
              </div>

              <div className="floating-note note-top">
                <Heart size={17} />
                <span>Your well-being comes first</span>
              </div>

              <div className="floating-note note-bottom">
                <LockKeyhole size={17} />
                <span>Your personal space</span>
              </div>
            </div>
          </div>
        </section>

        {/* INTRODUCTION */}
        <section className="landing-intro">
          <div className="landing-container intro-content">
            <span className="section-eyebrow">WHY EQUILIMIND?</span>

            <h2>
              Burnout is more than just
              <span> feeling tired.</span>
            </h2>

            <p>
              Workload, overtime, job satisfaction and other workplace
              factors can influence your well-being. Recognising these
              patterns is an important first step towards understanding
              your burnout risk.
            </p>
          </div>
        </section>

        {/* FEATURES */}
        <section className="landing-features" id="features">
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-eyebrow">WHAT YOU CAN DO</span>

              <h2>
                A clearer picture of your
                <span> well-being.</span>
              </h2>

              <p>
                Explore your work-related well-being through a simple
                and personalised experience.
              </p>
            </div>

            <div className="feature-grid">
              <article className="feature-card">
                <div className="feature-icon blue">
                  <ClipboardCheck size={25} />
                </div>

                <h3>Burnout Assessment</h3>

                <p>
                  Complete a structured assessment using workplace
                  and personal indicators to estimate your burnout risk.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon purple">
                  <ChartNoAxesCombined size={25} />
                </div>

                <h3>Personal Insights</h3>

                <p>
                  Review your assessment results and explore the
                  indicators associated with your well-being.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon green">
                  <BookHeart size={25} />
                </div>

                <h3>Daily Reflection</h3>

                <p>
                  Record your thoughts and reflect on your daily
                  experiences in your personal space.
                </p>
              </article>

              <article className="feature-card">
                <div className="feature-icon orange">
                  <TrendingUp size={25} />
                </div>

                <h3>Progress Tracking</h3>

                <p>
                  View your previous assessments and observe how
                  your burnout risk changes over time.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="landing-how">
          <div className="landing-container">
            <div className="section-heading">
              <span className="section-eyebrow">GET STARTED</span>

              <h2>
                Your well-being journey,
                <span> made simple.</span>
              </h2>

              <p>
                Start with a few simple steps to better understand
                your work-related well-being.
              </p>
            </div>

            <div className="steps-grid">
              <div className="step-card">
                <span className="step-number">01</span>
                <div className="step-icon">
                  <LockKeyhole size={24} />
                </div>
                <h3>Create Your Account</h3>
                <p>
                  Register for an account to access your personal
                  EquiliMind space.
                </p>
              </div>

              <div className="step-connector">
                <ArrowRight size={22} />
              </div>

              <div className="step-card">
                <span className="step-number">02</span>
                <div className="step-icon">
                  <ClipboardCheck size={24} />
                </div>
                <h3>Complete an Assessment</h3>
                <p>
                  Provide information about your work experience
                  and well-being indicators.
                </p>
              </div>

              <div className="step-connector">
                <ArrowRight size={22} />
              </div>

              <div className="step-card">
                <span className="step-number">03</span>
                <div className="step-icon">
                  <ChartNoAxesCombined size={24} />
                </div>
                <h3>Review Your Insights</h3>
                <p>
                  Explore your results, track assessment history
                  and reflect on your progress.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* PRIVACY */}
        <section className="landing-privacy">
          <div className="landing-container privacy-content">
            <div className="privacy-icon">
              <ShieldCheck size={32} />
            </div>

            <div>
              <span className="section-eyebrow">YOUR PERSONAL SPACE</span>
              <h2>Your well-being deserves care and privacy.</h2>
              <p>
                EquiliMind provides an individual space to review
                assessment results and record personal reflections.
                Your account keeps your information associated with
                your own experience.
              </p>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="landing-cta">
          <div className="landing-container">
            <div className="cta-card">
              <div className="cta-decoration" />

              <div className="cta-content">
                <span>YOUR WELL-BEING MATTERS</span>

                <h2>
                  Start understanding yourself better.
                </h2>

                <p>
                  Take the first step towards a more mindful
                  approach to your work-related well-being.
                </p>

                <Link to="/register" className="cta-button">
                  Get Started Free
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div className="landing-container footer-content">
          <Link to="/" className="landing-brand footer-brand">
            <div className="brand-icon">
              <Activity size={20} />
            </div>
            <span>EquiliMind</span>
          </Link>

          <p>
            Supporting a more mindful approach to workplace well-being.
          </p>

          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>

          <div className="footer-bottom">
            © {new Date().getFullYear()} EquiliMind. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;