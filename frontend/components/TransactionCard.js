import { useState, useEffect } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function TransactionCard({ courseProp }) {
  const { _id, name, type, amount, income, createdOn } = courseProp;
  const router = useRouter();

  function deleteTransaction() {
    fetch("http://localhost:4000/api/transaction/" + _id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data === true) {
          router.push("/transaction/create/");
        } else {
          router.push("/errors/1");
        }
      });
  }

  return (
    <Card style={{ marginBottom: 20 }}>
      <Card.Body>
        <Card.Title>
          {name}{" "}
          <Badge variant={income === "Income" ? "success" : "primary"}>
            {income}
          </Badge>{" "}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {dayjs(createdOn).format("MMMM DD YYYY hh:mm")}
        </Card.Subtitle>
        <Card.Text>
          <span className="subtitle">Transaction Type: </span>
          {type}
          <br />
          <span className="subtitle">Amount: </span>
          {amount}
          <br />
          <span className="subtitle">Income: </span>
          {income}
        </Card.Text>

        <Button
          variant="warning"
          onClick={() => router.push(`/transaction/update/${_id}`)}
          style={{ marginRight: 10 }}
        >
          Update
        </Button>

        <Button variant="danger" onClick={(e) => deleteTransaction()}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

TransactionCard.propTypes = {
  // shape() - used to check that the prop conforms
  // to a specific "shape"
  courseProp: PropTypes.shape({
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    income: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    createdOn: PropTypes.string.isRequired,
  }),
};
