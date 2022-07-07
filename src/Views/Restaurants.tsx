import * as React from "react";
import { useState } from "react";

import { useParams, useLocation, Link } from "react-router-dom";
import { Button, Carousel, Form } from "react-bootstrap";
import ButtonProps from "../components/Button";
import { getToken } from "../utils/getToken";
import "../components/Button.css";
import { useEffect } from "react";
import Spinner from "react-bootstrap";

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
  const token = getToken();

  let { name } = useParams<RestaurantDetailsParams>();
  let { state } = useLocation<RestaurantI>();

  const [comment, setComment] = React.useState("");
  const [commentList, setCommentList] = React.useState("");
  const [btnState, setBtnState] = useState(false);
  const [arraycomments, setArraycomments] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  let likeUnlikeHandler = async function (e: any) {
    e.preventDefault();
    const graphglQuery: any = {
      query: `mutation {
    createlikeUnlike(likeUnlikeInput: {token: "${token}",user: "Placeholder user", likeId: "${state._id}"})

    {
     likedAmount
      likedBoolean
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
        const isLiked =
          resData.data.createlikeUnlike.likedAmount === "0" ? false : true;
        setBtnState(isLiked);
      });
  };

  let likeViewHandler = async function () {
    const graphglQuery: any = {
      query: `query {
        likesCheck(token: "${token}",restaurantId:"${state._id}", user:"245575E53"){
          likedAmount
          likedBoolean
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
      .then((resData) => {
        console.log(resData);
        const isLiked =
          resData.data.likesCheck.likedAmount === "0" ? false : true;
        setBtnState(isLiked);
      });
  };
  let commentClickHandler = async function (e: any) {
    console.log("e", e);
    console.log("e", e);
    console.log(typeof e);
    e.preventDefault();
    console.log("comment", comment);
    const graphglQuery: any = {
      query: `mutation {

    createComments(commentsInput: {token: "${token}",user: "${"placeholderName"}", comment: "${comment}", option: "create", restaurantId: "${
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

  let commentDeleteHandler = async function (key: any, event: any) {
    event.preventDefault();
    console.log("event", key);

    const graphglQuery: any = {
      query: `mutation {

    createComments(commentsInput: {_id: "${key}",token: "${token}", option: "delete", restaurantId: "${state._id}" })

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
    await console.log("test1", JSON.parse(output.data.viewComments.user));

    await setArraycomments(JSON.parse(output.data.viewComments.user));

    setTimeout(() => {
      setLoading(false);
    }, 2000);
    await console.log("arraycomments", typeof arraycomments);
  };

  const commentHandler = function (event: any) {
    setComment(event.target.value);
  };

  useEffect(() => {
    likeViewHandler();
  });

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
              <div className="bg-white p-2"></div>
              <div className="like p-2 cursor">
                <i className="fa fa-commenting-o"></i>
                <span className="ml-1">Comment</span>
              </div>
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

                  {/* <Button
                    variant="btn btn-primary btn-sm shadow-none"
                    type="submit"
                    onClick={commentDeleteHandler}
                  >
                    Delete Comment
                  </Button> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder code for backend */}
      <form>
        {/* <label>
          your comment about this awesome restaurant:
          <input type="text" name="name" onChange={commentHandler} />
        </label>
        <input type="submit" value="Submit" onClick={commentClickHandler} /> */}
        <div>
          {/* <input
            type="submit"
            value="receiver"
            onClick={commentReceiveHandler}
          /> */}
          {/* <input type="submit" value="LikeUnlike" onClick={likeUnlikeHandler} /> */}
          {/* <input type="submit" value="likeview" onClick={likeViewHandler} /> */}
          <div onClick={likeUnlikeHandler}>
            {btnState ? (
              <i className="fas fa-heart"></i>
            ) : (
              <i className="far fa-heart"></i>
            )}
          </div>
        </div>
      </form>

      <div>
        <input
          type="submit"
          value="receivecomment"
          onClick={commentReceiveHandler}
        />{" "}
        {loading ? (
          <>
            <div>loading</div>
          </>
        ) : (
          arraycomments.map((element) => {
            return (
              <div>
                name: {element.user}
                <br />
                comment: {element.comment}
                <br /> time posted:
                {element.serverTimeStamp}
                <button
                  key={element._id}
                  onClick={(event) => commentDeleteHandler(element._id, event)}
                >
                  deletepost
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
