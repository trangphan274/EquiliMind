import React from 'react';
import '../../styles/HeaderStyle.css';
import {Container, Navbar,Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


function Header() {
  return (
    <header>
    <Navbar collapseOnSelect expand="lg" >
      <Container fluid className="px-5">
        <Navbar.Brand href="#home">
          <Link className="logo-text">EquiliMind
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as ={Link} to="/" >
              Home
            </Nav.Link>
            <Nav.Link as ={Link} to="/about">
              About
            </Nav.Link>
            
            <Nav.Link as ={Link} to="/contact">
              Contact
            </Nav.Link>
            <Nav.Link as={Link} to="/">
            

            </Nav.Link>
           
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </header>
  )
}

export default Header