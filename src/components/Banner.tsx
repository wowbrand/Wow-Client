import * as React from 'react';
// import { Button } from "./Button";
import { Nav } from "react-bootstrap";


import "./Banner.css"
import { Link } from 'react-router-dom';

export interface Props {
}


export function Banner(props: Props) {

  return (
    <div>
      <img className="home-img" src="https://images.unsplash.com/photo-1585518419759-7fe2e0fbf8a6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHJlc3RhdXJhbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60" alt=""></img>
      <div className="hero-btns">
        <Link to="/list">
          <button>
            Start Browsing
          </button>
        </Link>
      </div>

    </div>
  );
}
