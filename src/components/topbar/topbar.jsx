import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// react-bootstrap UI
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

// logo img
import img from "../../logo.png";

export function Topbar({ onLoggedOut }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Link to={`/`} style={{ textDecoration: 'none' }}>
          <Navbar.Brand href="#home" className="d-flex align-items-center" style={{ fontFamily: 'Montserrat', fontWeight: 700, color: "rgb(149,149,149)" }}>
            <img
              src={img}
              height="60"
              width="60"
              className="d-inline-block align-top"
              alt="AvengersFlix logo"
            />vengersFlix
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-center" style={{ width: "100%" }}>
            <Nav.Link as={Link} to="/profile" style={{ fontSize: "20px" }}>Profile</Nav.Link>
          </Nav>
          <Link to={'/'}>
            <Button variant="danger" onClick={onLoggedOut} style={{ width: "90px" }}>Log out</Button>
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

Topbar.propTypes = {
  onLoggedOut: PropTypes.func.isRequired
}
