import React from 'react';
import { Nav, Navbar as BootstrapNavbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class Navbar extends React.Component {
  render = () => (
    <BootstrapNavbar bg="light" expand="lg">
      <BootstrapNavbar.Brand href="/">MERN</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to="/" className="nav-link">
            Anasayfa
          </Link>
          <Link to="/about-us" className="nav-link">
            Hakkımızda
          </Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
}
