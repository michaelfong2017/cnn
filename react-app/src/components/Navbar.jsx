import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from "react-bootstrap"

const MyNavbar = () => {

  const search = (e) => {
    e.preventDefault();
    console.log("search")
  }
  const searchChange = () => {
    console.log("searchChange")
  }

  return (
    <Navbar className="my-navbar" variant="light" expand="xl">
      <Navbar.Brand className="brand" href="#home">
        <div>
          CNN Object Recognition
        </div>
      </Navbar.Brand>

      <Navbar.Toggle />
      <Navbar.Collapse>

        <Nav className="mr-auto">
        <Nav.Link href="#classification-demo">Classification Demo</Nav.Link>
          <Nav.Link href="#coming-soon">Coming soon</Nav.Link>
          <Nav.Link href="#source-code">Source Code</Nav.Link>
          <NavDropdown title="Presentation">
            <NavDropdown.Item href="#proposal">Proposal</NavDropdown.Item>
            <NavDropdown.Item href="#powerpoint">Powerpoint (Coming soon)</NavDropdown.Item>
          </NavDropdown>
        </Nav>

      </Navbar.Collapse>

    </Navbar>
  );
};

export default MyNavbar;
