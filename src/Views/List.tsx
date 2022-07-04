import * as React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ButtonProps, Spinner } from "react-bootstrap";
import Button from "../components/Button";
import "./List.css"
// import { Map } from "../components/Map";
export interface IAppProps { }

export function List(props: IAppProps) {

  const [restaurants, setRestaurants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const restaurantHandler = async () => {
    // e.preventDefault();


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

    // setRestaurants(JSON.parse(output.data.viewRestaurant.restaurant));
    // setLoading(false)
    // console.log(restaurants)

    await setRestaurants(JSON.parse(output.data.viewRestaurant.restaurant));
    setLoading(false);
    await console.log(restaurants);
  };

  useEffect(() => {
    restaurantHandler();
  }, []);

  setTimeout(() => {
    console.log("restaurants :>> ", restaurants);
  }, 1000);
  return (
    <div >
      {/* <Map /> */}
      <div className="restaurantcontainer">
        <div className="myrestaurants">
          {loading ? (<>
            <Spinner animation="grow" />
          </>
          ) :
            restaurants.map((restaurant) => {
              return (
                <div className="card text-center " key={restaurant._id}>
                  <div className="overflow">
                    <img className="restaurant-img" src={restaurant.restaurantMainImage} alt="" />
                  </div>
                  <div className="card-body cl-md-4 text-dark">
                    <h4 className="card-name">{restaurant.restaurantname}</h4>
                    <p className="card-text text-secondary">{restaurant.restaurantdescription}</p>
                    <p className="card-text text-secondary">{restaurant.restaurantcity}</p>
                    <Link to={{ pathname: `restaurants/${restaurant.restaurantname}`, state: restaurant }}>
                      <Button
                        border="none"
                        color="#8FBDD3"
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
        </div>
        <div className="crbt">
          <Link to={"/createrestaurant"}>
            <Button
              border="none"
              color="#F1EEE9"
              font="18px"
              fontfamily="'Josefin Sans', sans-serif"
              height="75px"
              radius="15px"
              width="210px"
              children="Add your Favourite Restaurant"
            />
          </Link>
        </div>

      </div>
    </div>
  );
}
