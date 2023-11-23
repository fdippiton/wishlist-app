import React from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";
import { Footer } from "./Footer";

export function Layout(props) {
  return (
    <div>
      {/* <NavMenu /> */}
      <Container className="container" tag="main">
        {props.children}
      </Container>
      <Footer></Footer>
    </div>
  );
}
