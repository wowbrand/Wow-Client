import * as React from "react";
import { getToken } from "../utils/getToken";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const token = getToken();

export interface IAppProps {}

export function Profile(props: IAppProps) {
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
  let { state } = useLocation<RestaurantI>();

  const [profileData, setprofileData] = useState([]);
  const [loading, setLoading] = React.useState(true);
  const [userName, setuserName] = useState("none");
  const [email, setEmail] = useState("email");
  const [comments, setComments] = useState([]);

  let profileHandler = async function () {
    const graphglQuery: any = {
      query: `query {
        profileReceive(token: "${token}"){
          userId
          email
          comments
          likes
          userName
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
        setprofileData(resData.data.profileReceive);
        //setprofileData(resData.data.profileReceive);
        console.log("resData", resData);
        setuserName(resData.data.profileReceive.userName);
        setEmail(resData.data.profileReceive.email);
        setLoading(false);
        setComments(JSON.parse(resData.data.profileReceive.comments));
        console.log("comments", comments);
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

  return (
    <div>
      <h1>
        profile
        <button onClick={profileHandler}>retrieve profile</button>
        <br />
        {loading
          ? "loading"
          : `Welcome ${userName}, your email adress is: ${email}`}
        {loading ? (
          <>
            <div>loading</div>
          </>
        ) : (
          comments.map((element) => {
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
      </h1>
    </div>
  );
}
