import React from 'react'
import { Container, Row, Col } from "react-bootstrap";
import Folks from "../../assets/images/folks.avif";
import "../../styles/Section3Style.css";
const Section3 = () => {
  return (
    <section className="history_section">
        <Container fluid className="px-0">
            <Row className="history_row g-0">
                <Col>
                    <img src={Folks} className="img-fluid w-100" alt="Folks" />
                </Col>

                <Col className="d-flex align-items-center">
                    <div className="history_content">
                    <h1>L'Eredità</h1>
                    <p>
                        With a tradition spanning over 20 years, we decided to open a fast food
                        chain, preserving the same quality of our ingredients and maintaining an
                        unparalleled flavor.
                    </p>
                    </div>
                </Col>
            </Row>

        </Container>
    </section>
  )
}

export default Section3