import * as React from "react";
import { useState } from "react";

export interface IAppProps {}

export function Login(props: IAppProps) {
  //texthandlers
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  const emailHandler = (event: any) => {
    setEmail(event.target.value);
  };

  // end of textHandlers

  //Front-end GraphQL connection no front end error handling, just as basic as possible connection
  const loginHandler = async (event: any) => {
    console.log("password", password);
    event.preventDefault();
    const graphglQuery: any = {
      query: `{
        login(email: "${email}", password: "${password}"){
          token
          userId
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
    console.log("output", output);
  };
  //End of frontend GraphQL connection

  //to remove, only for demo purposes

  //end of to remove, only for demo purposes

  return (
    <div>
      <h1>Login</h1>
      {/* to remove later, only for demo purpose  */}
      <div>
        <button onClick={loginHandler}>Login</button>
        email:
        <input onChange={emailHandler} />
        password: <input onChange={passwordHandler} />
      </div>
      {/* end of to remove later, only for demo purpose */}
    </div>
  );
}
