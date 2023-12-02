import React from "react";
import { Container } from "reactstrap";
import { Footer } from "./Footer";

export function Layout(props) {
  return (
    <div>
      {/* <NavMenu /> */}
      <Container
        className="container"
        tag="main"
        style={{
          minHeight: "90vh",
        }}
      >
        {props.children}
      </Container>
      <Footer></Footer>
    </div>
  );
}
