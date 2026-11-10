
import '../../styles/AboutStyle.css';

const About = () => {
  return (
    <section className="about-page">
      <div className="about-hero">
        <span className="about-eyebrow">ABOUT EQUILIMIND</span>
        <h1>Understand Your Burnout Risk</h1>
        <p>
          Gain insights into your well-being and better understand
          the factors that may contribute to burnout.
        </p>
      </div>

      <div className="about-content">
        <div className="about-section-block">
          <span className="about-number">01</span>
          <div>
            <h2>Our Purpose</h2>
            <p>
              Burnout can develop gradually as work demands and personal
              well-being become unbalanced. EquiliMind aims to help individuals
              better understand their burnout risk through data-driven insights.
            </p>
          </div>
        </div>

        <div className="about-section-block alt">
          <span className="about-number">02</span>
          <div>
            <h2>What We Do</h2>
            <p>
              EquiliMind analyzes selected work-related and personal indicators
              to estimate burnout risk. The platform presents prediction
              results to help users recognize potential risk factors and
              reflect on their well-being.
            </p>
          </div>
        </div>

        <div className="about-section-block">
          <span className="about-number">03</span>
          <div>
            <h2>Our Vision</h2>
            <p>
              We envision making burnout awareness more accessible through
              intelligent, data-driven tools that encourage individuals to
              pay attention to their well-being and make more informed choices.
            </p>
          </div>
        </div>
      </div>

      <div className="about-note">
        <p>
          EquiliMind is designed for awareness and reflection. Its predictions
          are not a medical diagnosis or a substitute for professional advice.
        </p>
      </div>
    </section>
  );
};

export default About;
