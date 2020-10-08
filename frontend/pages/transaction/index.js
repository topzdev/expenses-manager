import { useContext, useState, useEffect } from "react";
import courseData from "../../data/coursesdata.js";
import TransactionCard from "../../components/TransactionCard";
import { Table, Button, Modal, Form, Container } from "react-bootstrap";
import UserContext from "../../UserContext";
import Head from "next/head";
import Router from "next/router";

export default function index({ data }) {
  const { user } = useContext(UserContext);
  const [list, setList] = useState([]);

  // states for edit form input
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  // state for course ID to be edited
  const [courseId, setCourseId] = useState("");

  // state for showing and closing the modal edit form
  const [showForm, setShowForm] = useState(false);

  // state for storing JWT
  const [token, setToken] = useState("");

  // sets Token from localstorage
  useEffect(() => {
    if (user) {
      setToken(localStorage.getItem("token"));
      fetch("http://localhost:4000/api/transaction/" + user.id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((res) => setList(res));

      console.log("Fetching....");
    }
  }, [user]);

  const fetchTransaction = () => {};

  const transactionList = list.map((indivCourse) => {
    if (indivCourse.isActive) {
      return <TransactionCard key={indivCourse._id} courseProp={indivCourse} />;
    } else {
      return null;
    }
  });

  return (
    <React.Fragment>
      <Container>
        <Head>
          <title>My Transactions</title>
        </Head>
        {transactionList}
      </Container>
    </React.Fragment>
  );
}

// getServerSideProps - called on every request
// export async function getServerSideProps() {
//   // fetch data from endpoint
//   const res = await fetch("http://localhost:4000/api/transaction");
//   const data = await res.json();

//   //return the props
//   return {
//     props: {
//       data,
//     },
//   };
// }
