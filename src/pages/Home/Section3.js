import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Section3Style.css";

const services = [
  { id: '01', title: 'STRESS TRACKING', text: 'Track your daily stress levels and spot patterns early to prevent burnout before it hits.', icon: '📊' },
  { id: '02', title: 'MIND BREAKS', text: 'Get guided short breaks and exercises to relax your mind and reset your focus.', icon: '🧘', active: true },
  { id: '03', title: 'MOOD INSIGHTS', text: 'Analyze your mood trends over time and understand triggers to manage them better.', icon: '🧠' },
  { id: '04', title: 'WELLNESS TIPS', text: 'Receive personalised tips for better sleep, work-life balance, and mental health.', icon: '✨' },
];

const Section3 = () => {
  return (
    <section className="services_section">
      <Container>
        <div className="services_header d-flex justify-content-between align-items-end mb-5">
          <h2 className="services_title">
            SERVICES DESIGNED TO <br />
            SUPPORT YOUR MIND, BODY, <br />
            AND SOUL
          </h2>
          <div className="slider_controls">
            <button className="control_btn">←</button>
            <button className="control_btn">→</button>
          </div>
        </div>

        <Row className="flex-nowrap overflow-hidden g-4">
          {services.map((service) => (
            <Col key={service.id} lg={3} md={6} sm={12}>
              <div className={`service_card ${service.active ? 'active' : ''}`}>
                <span className="service_number">{service.id}</span>
                <div className="service_icon">{service.icon}</div>
                <h3 className="service_name">{service.title}</h3>
                <p className="service_description">{service.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Section3;