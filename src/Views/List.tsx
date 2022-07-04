import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ButtonProps } from "react-bootstrap";
import Button from "../components/Button";

import "./List.css";

export interface IAppProps {}

export function List(props: IAppProps) {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const restaurantHandler = async (e: any) => {
    e.preventDefault();
    const graphglQuery: any = {
      query: `{
        viewRestaurant(restaurantname: "${""}"){
          restaurant
        }
      }
`,
    };
    await fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(graphglQuery),
    })
      .then((res) => res.json())
      .then((resData) => basicOutput(resData));
  };

  const basicOutput = async (output: any) => {
    await setRestaurants(JSON.parse(output.data.viewRestaurant.restaurant));
    setLoading(false);
    await console.log(restaurants);
  };

  // useEffect(() => {
  //   restaurantHandler();
  //   console.log("test")
  // }, [loading, restaurants, restaurantHandler]);

  setTimeout(() => {
    console.log("restaurants :>> ", restaurants);
  }, 1000);

  return (
    <div className="restaurantcontainer">
      <div className="crbt">
        <Link to={"/createrestaurant"}>
          <Button
            border="none"
            color="#8FBDD3"
            font="18px"
            fontfamily="'Josefin Sans', sans-serif"
            height="75px"
            radius="5%"
            width="180px"
            children="Add your Favourite Restaurant"
          />
        </Link>
      </div>
      <div className="myrestaurants">
        {!loading &&
          restaurants.map((restaurant) => {
            return (
              <div className="card text-center " key={restaurant._id}>
                <div className="overflow">
                  <img
                    className="restaurant-img"
                    src={restaurant.restaurantMainImage}
                    alt=""
                  />
                </div>
                <div className="card-body cl-md-4 text-dark">
                  <h4 className="card-name">{restaurant.restaurantname}</h4>
                  <p className="card-text text-secondary">
                    {restaurant.restaurantdescription}
                  </p>
                  <p className="card-text text-secondary">
                    {restaurant.restaurantcity}
                  </p>

                  {/* <MyLink state={{
                    restaurant,
                  }} to={`restaurants/${restaurant.restaurantname}`} /> */}

                  <Link
                    to={{
                      pathname: `/${restaurant.restaurantname}`,
                      state: restaurant,
                    }}
                  >
                    {/* <Link to={{ pathname: `restaurants/${restaurant.restaurantname}`, state: restaurant }}> */}
                    <Button
                      border="none"
                      color="#8FBDD4"
                      font="18px"
                      fontfamily="'Josefin Sans', sans-serif"
                      height="75px"
                      radius="5%"
                      width="180px"
                      children="Details"
                    />
                  </Link>
                </div>
              </div>
            );
          })}
        <button onClick={restaurantHandler}>requestaurants</button>
      </div>
    </div>
  );
}
