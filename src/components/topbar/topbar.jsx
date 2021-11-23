import React from 'react';

// react-bootstrap UI
import { Navbar, Nav, Container } from 'react-bootstrap';

export function Topbar() {
  return (
    <Navbar bg="light" variant="light" expand="lg" className="topbar">
      <Container>
        <Navbar.Brand href="#home">AvengersFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}