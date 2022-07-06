import * as React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "./Navigationbar.css";
import { Link } from "react-router-dom";
import { getToken } from "../utils/getToken";
import { useState, useEffect } from "react";

export interface Props {}

export function Navigationbar(props: Props) {
  const [loginstate, setLoginstate] = useState("Login");

  let token = getToken();

  return (
    <div>
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
        {!token && (
          <Nav.Link className="navbar-brand" as={Link} to={"/login"}>
            Login
          </Nav.Link>
        )}
        {token && (
          <Nav.Link className="navbar-brand" as={Link} to={"/logout"}>
            Logout
          </Nav.Link>
        )}
        <Nav.Link className="navbar-brand" as={Link} to={"/profile"}>
          <i className="fas fa-user"></i>
        </Nav.Link>
      </Navbar>
    </div>
  );
}
