import * as React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { ButtonProps } from "react-bootstrap";
import Button from '../components/Button';
import Carousel from 'react-bootstrap/Carousel'


export interface IAppProps {
}
interface RestaurantDetailsParams {
  name: string;
};

interface RestaurantI {
  _id: string
  restaurantImage2: string
  restaurantMainImage: string
  restaurantcity: string
  restaurantdescription: string
  restaurantdescriptionshort: string
  restaurantname: string
  restaurantstreetnumber: string
  restaurantzip: string
}

export function Restaurants(props: IAppProps) {
  let { name } = useParams<RestaurantDetailsParams>()
  let { state } = useLocation<RestaurantI>()

  return (
    <div className="restdetail">
      <h1>{name}</h1>
      <Carousel interval={3000}>
        <Carousel.Item>
          <img src={state.restaurantMainImage} alt="" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={state.restaurantImage2} alt="" />
        </Carousel.Item>
      </Carousel>
      <p className="details">{state.restaurantdescription}</p>
      <p className="details">{state.restaurantdescriptionshort}</p>
      <p className="details">{state.restaurantcity}</p>
      <p className="details">{state.restaurantstreetnumber}</p>
      <p className="details">{state.restaurantzip}</p>

      <Link to={"/list"}>

        <Button
          border="none"
          color="#8FBDD3"
          font="24px"
          fontfamily="'Josefin Sans', sans-serif"
          height="65px"
          radius="5%"
          width="120px"
          children="Back"
        />
      </Link>
    </div>
  );
}
