import React from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";

export function Layout(props) {
  return (
    <div>
      {/* <NavMenu /> */}
      <Container className="container" tag="main" style={{ minHeight: "93vh" }}>
        {props.children}
      </Container>
      <Footer></Footer>
    </div>
  );
}
