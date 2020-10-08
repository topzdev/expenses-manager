import { useState, useContext } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { GoogleLogin } from "react-google-login";
import Swal from "sweetalert2";

import Router from "next/router";
import Head from "next/head";

import UserContext from "../../UserContext";
import usersData from "../../data/usersdata";
import View from "../../components/View";
import AppHelper from "../../app-helper";

export default function index() {
  return (
    <View title={"Login"}>
      <Row className="justify-content-center">
        <Col xs md="6">
          <h3>Login</h3>
          <LoginForm />
        </Col>
      </Row>
    </View>
  );
}

const LoginForm = () => {
  // const [user, setUser] = useState('');
  const { setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [tokenId, setTokenId] = useState(null);

  function authenticate(e) {
    //prevent redirection via form submission
    e.preventDefault();

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    fetch(`${AppHelper.API_URL}/users/login`, options)
      .then(AppHelper.toJSON)
      .then((data) => {
        if (typeof data.accessToken !== "undefined") {
          localStorage.setItem("token", data.accessToken);
          retrieveUserDetails(data.accessToken);
        } else {
          if (data.error === "does-not-exist") {
            Swal.fire("Authentication Failed", "User does not exist.", "error");
          } else if (data.error === "incorrect-password") {
            Swal.fire(
              "Authentication Failed",
              "Password is incorrect.",
              "error"
            );
          } else if (data.error === "login-type-error") {
            Swal.fire(
              "Login Type Error",
              "You may have registered through a different login procedure",
              "error"
            );
          }
        }
      });
  }

  const authenticateGoogleToken = (response) => {
    console.log(response);

    const payload = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tokenId: response.tokenId }),
    };

    fetch(`${AppHelper.API_URL}/users/verify-google-id-token`, payload)
      .then(AppHelper.toJSON)
      .then((data) => {
        if (typeof data.accessToken !== "undefined") {
          localStorage.setItem("token", data.accessToken);
          retrieveUserDetails(data.accessToken);
        } else {
          if (data.error === "google-auth-error") {
            Swal.fire(
              "Google Auth Error",
              "Google authentication procedure failed",
              "error"
            );
          } else if (data.error === "login-type-error") {
            Swal.fire(
              "Login Type Error",
              "You may have registered through a different login procedure",
              "error"
            );
          }
        }
      });
  };

  const retrieveUserDetails = (accessToken) => {
    const options = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(`${AppHelper.API_URL}/users/details`, options)
      .then(AppHelper.toJSON)
      .then((data) => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });

        Router.push("/transaction");
      });
  };

  // ternary operator = {condition ? ifTrue : ifFalse}
  return (
    <React.Fragment>
      <Card>
        <Card.Header>Login Details</Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => authenticate(e)}>
            <Form.Group controlId="userEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="bg-primary" type="submit">
              Submit
            </Button>

            <GoogleLogin
              clientId="134832901843-u2qca0mvpa3npov3bsdn3s4vnu949amq.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={authenticateGoogleToken}
              onFailure={authenticateGoogleToken}
              cookiePolicy={"single_host_origin"}
              className="w-100 text-center d-flex justify-content-center"
            />
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};
