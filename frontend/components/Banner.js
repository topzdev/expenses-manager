import { Col, Row, Jumbotron, Image, Container, Button } from "react-bootstrap";

import Link from "next/link";
import PropTypes from "prop-types";

export default function Banner({ dataProp }) {
  const { title, content, destination, label } = dataProp;

  return (
    <Jumbotron
      style={{
        padding: "0 !important",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          zIndex: 10,
          background: "rgba(0,0,0, 0.5)",
          height: "100%",
        }}
      >
        <Container fluid style={{ color: "white", padding: "60px" }}>
          <h1 style={{ fontSize: "200px" }}>{title}</h1>
          <p style={{ fontSize: "40px" }}>{content}</p>
          <Link href={destination}>
            <Button variant="primary" size="lg">
              {label}
            </Button>
          </Link>
        </Container>
      </div>

      <Image
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
          width: "100%",
        }}
        src="https://static-app-misc.teachbanzai.com/img/income-and-expenses-spot.jpg"
        fluid
      />
    </Jumbotron>
  );
}

Banner.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    destination: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
};
