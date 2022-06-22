import * as React from "react";

export interface IAppProps {}

export function List(props: IAppProps) {
  const restaurantHandler = async (event: any) => {
    event.preventDefault();
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

  const basicOutput = (output: any) => {
    console.log("output", JSON.parse(output.data.viewRestaurant.restaurant));
  };

  return (
    <div>
      <h1>All restaurants</h1>
      <button onClick={restaurantHandler}>requestaurants</button>
    </div>
  );
}
