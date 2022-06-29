import React from 'react'
import { Button } from "react-bootstrap";
import { LinkProps, useLocation, Link } from "react-router-dom";
interface LinkPropsWithState extends LinkProps {
  state?: any
}
const MyLink = (props: LinkPropsWithState) => {
  const { state } = useLocation<any>();
  return (
    <div>
      <Link to={`restaurants/${state.restaurant.restaurantname}`}
      >
        <Button>Details</Button>
      </Link>

    </div>
  )
}

export default MyLink
