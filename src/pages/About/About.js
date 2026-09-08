import "../styles/AboutStyle.css";

const About = () => {
  return (
    <section className="about-page">

      {/* HERO */}
      <div className="about-hero">
        <h1>Understand Burnout Before It Happens</h1>
      </div>

      {/* STORY */}
      <div className="about-section-block">
        <h2>Our Purpose</h2>
        <p>
          Burnout doesn’t happen overnight. It builds quietly through stress,
          workload, and imbalance. This platform helps you detect early signals
          and understand your mental state through simple insights.
        </p>
      </div>

      {/* WHAT WE DO */}
      <div className="about-section-block alt">
        <h2>What We Do</h2>
        <p>
          By analyzing your work patterns, satisfaction, and daily pressure,
          we provide a prediction of your burnout risk — helping you reflect
          and take action before it becomes serious.
        </p>
      </div>

      {/* VISION */}
      <div className="about-section-block">
        <h2>Our Vision</h2>
        <p>
          We aim to go beyond prediction — building intelligent tools that
          actively support your mental well-being, helping you stay balanced,
          productive, and in control of your life.
        </p>
      </div>

    </section>
  );
};

export default About;