import * as React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { Button, Carousel, Form,  } from "react-bootstrap";
import ButtonProps from '../components/Button';
// import Carousel from 'react-bootstrap/Carousel'

export interface IAppProps {}
interface RestaurantDetailsParams {
  name: string;
}

interface RestaurantI {
  _id: string;
  restaurantImage2: string;
  restaurantMainImage: string;
  restaurantcity: string;
  restaurantdescription: string;
  restaurantdescriptionshort: string;
  restaurantname: string;
  restaurantstreetnumber: string;
  restaurantzip: string;
}

export function Restaurants(props: IAppProps) {
  let { name } = useParams<RestaurantDetailsParams>();
  let { state } = useLocation<RestaurantI>();

  const [comment, setComment] = React.useState("");
  const [commentList, setCommentList] = React.useState("");

  let commentClickHandler = async function (e: any) {
    console.log(typeof e);
    e.preventDefault();
    console.log("comment", comment);
    const graphglQuery: any = {
      query: `mutation {
    createComments(commentsInput: {user: "${"placeholderName"}", comment: "${comment}", option: "create", restaurantId: "${
        state._id
      }" })

    {
     user
     serverTimeStamp
    }}
  `,
    };
    await fetch("http://localhost:8080/graphql", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(graphglQuery),
    })
      .then((res) => res.json())
      .then((resData) => {
        console.log(resData);
      });
  };

  let commentReceiveHandler = async function (e: any) {
    e.preventDefault();
    const graphglQuery: any = {
      query: `{
        viewComments(user: "", restaurantId: "${state._id}"){
          user
          comment
          restaurantId
          _id
          serverTimeStamp
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
    await console.log(JSON.parse(output.data.viewComments.user));
  };

  const commentHandler = function (event: any) {
    setComment(event.target.value);
  };

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
        <ButtonProps
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
      <br></br>
      <br></br>
<Link to={"/map"}>
        <ButtonProps
          border="none"
          color="#8FBDD3"
          font="24px"
          fontfamily="'Josefin Sans', sans-serif"
          height="70px"
          radius="5%"
          width="190px"
          children="Find your route"
        />
      </Link>


<div className="container mt-5">
    <div className="d-flex justify-content-center row">
        <div className="col-md-8">
            <div className="d-flex flex-column comment-section">
                <div className="bg-white p-2">
              </div>
      <div className="like p-2 cursor"><i className="fa fa-commenting-o"></i><span className="ml-1">Comment</span></div>
              <div className="bg-light p-2">
                <div className="d-flex flex-row align-items-start"></div>

          <Form.Control
            onChange={commentHandler}
            placeholder="Your comment"
              />
<div className="mt-2 text-right">
                <Button
          variant="btn btn-primary btn-sm shadow-none"
          type="submit"
                  onClick={commentClickHandler}
        >
          Post Comment
                </Button>
                </div>
                </div>
          </div>
        </div>
    </div>
</div>












{/*
        Placeholder code for backend
      <form>
        <label>
          your comment about this awesome restaurant:
          <input type="text" name="name" onChange={commentHandler} />
        </label>
        <input type="submit" value="Submit" onClick={commentClickHandler} />
        <div>
          <input
            type="submit"
            value="receiver"
            onClick={commentReceiveHandler}
          />
        </div>
      </form>
       end of placeholder code for backend */}
    </div>

  );
}
