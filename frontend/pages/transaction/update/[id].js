import { useState, useEffect } from "react";
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
import { Form, Button, Container, Card } from "react-bootstrap";
import Router, { useRouter } from "next/router";

export default function update() {
  //declare form input states
  const router = useRouter();
  const { id } = router.query;
  const [transaction, useTransaction] = useState({
    name: "",
    type: "",
    amount: "",
    income: "",
  });

  const onChange = (e) => {
    useTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  //function for processing creation of a new course

  useEffect(() => {
    fetch("http://localhost:4000/api/transaction/single/" + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => useTransaction({ ...res }));
  }, [id]);

  function updateTransaction(e) {
    e.preventDefault();

    console.log(transaction);

    fetch("http://localhost:4000/api/transaction", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ ...transaction, id }),
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
          <Card.Title style={{ marginBottom: 20 }}>
            <h3> Update Transaction </h3>
          </Card.Title>
          <Form onSubmit={(e) => updateTransaction(e)}>
            <Form.Group controlId="courseName">
              <Form.Label>Transaction Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter transaction name"
                value={transaction.name}
                name="name"
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Transaction type:</Form.Label>
              <Form.Control
                name="type"
                onChange={(e) => onChange(e)}
                value={transaction.type}
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
                name="income"
                onChange={(e) => onChange(e)}
                value={transaction.income}
                as="select"
                custom
              >
                <option>Income</option>
                <option>Expense</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="amount">
              <Form.Label>Amount:</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={transaction.amount}
                onChange={(e) => onChange(e)}
                required
              />
            </Form.Group>

            <Button size="m" variant="warning" type="submit">
              Update Transaction
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
