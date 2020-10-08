import { useState, useContext } from "react";
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import { Form, Button, Container, Card } from "react-bootstrap";
import UserContext from "../../UserContext";
import Router from "next/router";

export default function create() {
  //declare form input states
  const { user } = useContext(UserContext);
  const [courseName, setCourseName] = useState("");
  const [type, setType] = useState("Food");
  const [income, setIncome] = useState("Income");
  const [price, setPrice] = useState(0);

  //function for processing creation of a new course
  function addTransaction(e) {
    e.preventDefault();

    console.log(user, {
      name: courseName,
      type: type,
      amount: price,
      income: income,
      userId: user.id,
    });

    fetch("http://localhost:4000/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: courseName,
        type: type,
        amount: price,
        income: income,
        userId: user.id,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data === true) {
          Router.push("/transaction");
        } else {
          Router.push("/errors/1");
        }
      });
  }

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Create Transaction</Card.Title>
          <Form onSubmit={(e) => addTransaction(e)}>
            <Form.Group controlId="courseName">
              <Form.Label>Transaction Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter transaction name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Transaction type:</Form.Label>
              <Form.Control
                onChange={(e) => setType(e.target.value)}
                value={type}
                as="select"
                custom
              >
                <option>Food</option>
                <option>Utility</option>
                <option>Transportaion</option>
                <option>Allowance</option>
                <option>Rent</option>
                <option>Salary</option>
                <option>Cash</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="income">
              <Form.Label>Income or Expense:</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setIncome(e.target.value);
                  console.log(e.target.value);
                }}
                value={income}
                as="select"
                custom
              >
                <option>Income</option>
                <option>Expense</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="price">
              <Form.Label>Amount:</Form.Label>
              <Form.Control
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </Form.Group>

            <Button className="bg-primary" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
