import * as React from 'react';
import Button from "./Button";
import { ButtonProps } from "react-bootstrap";
import "./Banner.css"
import { Link } from 'react-router-dom';

export interface Props {
}

export function Banner(props: ButtonProps) {

  return (
    <div className="landing">
      <div className="banner-foto">
        <h1>Discover the Realm of Vegan Food.</h1>
        <p>Want to enjoy Vegan food</p>
        <br></br><br></br>
        <div className="hero-btn">
          <Link to={"/list"}>
            <Button
              border="none"
              color="#FFFF"
              font="24px"
              fontfamily="'Josefin Sans', sans-serif"
              height="74px"
              radius="5%"
              width="180px"
              children="Start Browsing"
            />
          </Link>
        </div>
      </div>
    </div >
  );
}
