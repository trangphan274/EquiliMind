import React from 'react';
import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Section3Style.css";

const services = [
  { id: '01', title: 'PEACEFUL MIND', text: 'A Peaceful Mind Is At The Heart Of True Well-Being. In A World Filled With Constant Noise And Distraction, Cultivating Inner.', icon: '🧠' },
  { id: '02', title: 'BODY POSTURE', text: 'Body Posture Is The Foundation Of A Safe, Effective, And Mindful Yoga Practice Proper Alignment Helps Prevent Injury.', icon: '🧘', active: true },
  { id: '03', title: 'TRADITIONAL YOGA', text: 'Traditional Yoga Is A Timeless Path Rooted In Ancient Wisdom, Guiding The Body, Mind, And Spirit Toward Balance And Self.', icon: '🏃' },
  { id: '04', title: 'HEALTHIER SKIN', text: 'Healthier Skin Begins Regular Yoga Practi Improved Circulatio', icon: '✨' },
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