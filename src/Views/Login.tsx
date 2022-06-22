import * as React from "react";
import { useState } from "react";
import { Button, Form, FormGroup, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

interface userlogin {
  token: string
  userId : string
}

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
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form className="rounded p-4 p-sm-3">
        <h4>Login</h4>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
          type="email"
          onChange={emailHandler}
          name="email"
            value={email ? email : ""}
            placeholder="Enter email"
          />
          <Form.Text className="text-muted">
            We'll not share your email with anyone else.
          </Form.Text>
        </Form.Group>
                <FormGroup className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
          type="password"
          onChange={passwordHandler}
          name="password"
            value={password ? password : ""}
            placeholder="password"
          />
          </FormGroup>
         <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember Me" />
        </Form.Group>
        <Button variant="outline-primary" type="submit" onClick={loginHandler }>
          Login
        </Button>
        <Nav.Link as={Link} to={"/register"}>
      New user? Click here to register.
      </Nav.Link>

</Form>
      </div>

  );
}
