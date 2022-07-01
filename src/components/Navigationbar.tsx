import * as React from 'react';
import { Navbar, Nav } from "react-bootstrap";
import "./Navigationbar.css"
import { Link } from 'react-router-dom';

export interface Props {
}

export function Navigationbar(props: Props) {
  return (
    <div >
      <Navbar bg="myBar" variant="dark">
        <Nav.Link className="navbar-brand" as={Link} to={"/"}>
          WOWBRAND
          <i className="fas fa-leaf"></i>
        </Nav.Link>
        <Navbar.Toggle />
        <Nav.Link className="navbar-brand" as={Link} to={"/list"}>
          Brand Places
        </Nav.Link>
        <Nav.Link className="navbar-brand" as={Link} to={"/Register"}>
          Register
        </Nav.Link>
        <Nav.Link className="navbar-brand" as={Link} to={"/login"}>
          Login
        </Nav.Link>
        <Nav.Link className="navbar-brand" as={Link} to={"/profile"}>
          <i className="fas fa-user"></i>
        </Nav.Link>
      </Navbar>
    </div >
  );
}
