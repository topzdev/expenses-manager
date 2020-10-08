import Head from "next/head";
import Banner from "../components/Banner";

export default function Home() {
  const data = {
    title: "Circle",
    content: "Manage your income and expenses",
    destination: "/register",
    label: "Register Now!",
  };

  return (
    <React.Fragment>
      <Banner dataProp={data} />
    </React.Fragment>
  );
}
