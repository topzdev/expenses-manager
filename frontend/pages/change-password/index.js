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
    <View title={"Change Password"}>
      <Row className="justify-content-center">
        <Col xs md="6">
          <ChangePasswordForm />
        </Col>
      </Row>
    </View>
  );
}
const ChangePasswordForm = () => {
  // const [user, setUser] = useState('');
  const { user } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  function changePassword(e) {
    console.log(user.id);
    //prevent redirection via form submission
    e.preventDefault();
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: user.id,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      }),
    };
    console.log(options);
    fetch(`${AppHelper.API_URL}/users/change-password`, options)
      .then(AppHelper.toJSON)
      .then((data) => {
        console.log("hello!!", data);
        if (data) {
          Swal.fire(
            "Password Change",
            "Password Changed Successfully",
            "success"
          );
          setNewPassword("");
          setConfirmPassword("");
        } else {
          Swal.fire(
            "Change Password Error",
            "Something wrong on changing your password",
            "error"
          );
        }
      });
  }
  // ternary operator = {condition ? ifTrue : ifFalse}
  return (
    <React.Fragment>
      <Card>
        <Card.Header>Change Password</Card.Header>
        <Card.Body>
          <Form onSubmit={(e) => changePassword(e)}>
            <Form.Group controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button className="bg-primary" type="submit">
              Change Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </React.Fragment>
  );
};
