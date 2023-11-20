import React from "react";
import { Container } from "reactstrap";
import { NavMenu } from "./NavMenu";

export function Layout(props) {
  return (
    <div className="container" style={{ height: "95.5vh" }}>
      {/* <NavMenu /> */}
      <Container tag="main">{props.children}</Container>
    </div>
  );
}
