import * as React from "react";
import { useState } from "react";
import { Nav, Button, Form, FormGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Register.css"

interface newUser {
  name: string
  email: string
  _id: string
}
export interface IAppProps { }


export function Register(props: IAppProps) {

  //texthandlers
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");

  const passwordHandler = (event: any) => {
    setPassword(event.target.value);
  };

  const userNameHandler = (event: any) => {
    setUserName(event.target.value);
  };
  const emailHandler = (event: any) => {
    setEmail(event.target.value);
  };

  // end of textHandlers

  // Front-end GraphQL connection no front end error handling, just as basic as possible connection
  const signUpHandler = async (event: any) => {
    console.log("password", password);
    event.preventDefault();
    const graphglQuery: any = {
      query: `mutation {
    createUser(userInput: {email: "${email}", name: "${userName}", password:"${password}" })

    {
      _id
      email
      name
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

        const { data: { createUser } } = resData

        basicOutput(createUser)
      });
  };

  const basicOutput = (user: newUser) => {
    console.log("output", user);
  };
  //End of frontend GraphQL connection

  //to remove, only for demo purposes

  //end of to remove, only for demo purposes

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form className="rounded p-4 p-sm-3">
        <h2>Register here</h2>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>User name</Form.Label>
          <Form.Control
            id="username"
            value={userName ? userName : ""}
            name="username"
            onChange={userNameHandler}
            placeholder="User name"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            value={email ? email : ""}
            onChange={emailHandler}
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
            value={password ? password : ""}
            onChange={passwordHandler}
            placeholder="password"
          />
        </FormGroup>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Remember Me" />
        </Form.Group>
        <Button
          variant="outline-primary"
          type="submit"
          onClick={signUpHandler}
        >
          Register
        </Button>

        <Nav.Link as={Link} to={"/login"}></Nav.Link>
        <Nav.Link as={Link} to={"/login"}>
          Already have an account? Click here to login.
        </Nav.Link>
      </Form>
    </div>
  )
}
