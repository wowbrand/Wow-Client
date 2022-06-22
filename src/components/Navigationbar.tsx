import * as React from 'react';
import { Navbar, Nav } from "react-bootstrap";
import "./Navigationbar.css"


export interface Props {
}

export function Navigationbar(props: Props) {
  return (
    <div >
      <Navbar bg="myBar" variant="dark">
        <Nav.Link className="navbar-brand" href="/">
          WOWBRAND
          <i className="fas fa-leaf"></i>
        </Nav.Link>
        <Navbar.Toggle />
        <Nav.Link className="navbar-brand" href="List">
          Brand Places
        </Nav.Link>
        <Nav.Link className="navbar-brand" href="register">
          Register
        </Nav.Link>
        <Nav.Link className="navbar-brand" href="login">
          Login
        </Nav.Link>
        <Nav.Link className="navbar-brand" href="profile">
          <i className="fas fa-user"></i>
        </Nav.Link>
      </Navbar>
  </div >
  );
}
