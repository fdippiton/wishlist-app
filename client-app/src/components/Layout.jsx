import React from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";

export function Layout(props) {
  return (
    <div className="container">
      {/* <NavMenu /> */}
      <Container tag="main">{props.children}</Container>
    </div>
  );
}
