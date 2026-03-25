import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FooterImg from '../../assets/images/footer.avif'
import '../../styles/FooterStyle.css'

const Footer = () => {
  return (
    <footer className="site-footer">

  {/* image layer ở đáy */}
  <img src={FooterImg} alt="" className="footer-image" />

  <Container className="footer-content">
    <Row className="align-items-start">

      <Col md={4}>
        <nav className="footer-nav">
          <Link to="/">Home</Link>
          
          <Link to="/contact">Contact</Link>
          
        </nav>
      </Col>

      <Col md={4} className="footer-center text-center">
        
        <h2 className="footer-brand">EquiliMind</h2>
        <p className="footer-sub">di Manuella</p>
      </Col>

      <Col md={4} className="footer-right text-end">
        <div className="footer-social">
          <i className="bi bi-instagram"></i>
          <i className="bi bi-facebook"></i>
          <i className="bi bi-linkedin"></i>
        </div>

        <p className="footer-email">
          contact@lereditaexpress.com.br
        </p>

        <a href="#top" className="back-top">↑ Top</a>
      </Col>

    </Row>

    <Row>
      <Col className="footer-copy text-center">
        © 2023 La Pasta di Manuella. Site by Ambizy.
      </Col>
    </Row>
  </Container>

</footer>

  )
}

export default Footer
