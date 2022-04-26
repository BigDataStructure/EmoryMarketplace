import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav } from "react-bootstrap";
import { LogoutButton } from "./logout";
import "./Header.css";

const HeaderSignedIn = () => {
  return (
    <header>
      <>
        <Navbar className="header" variant="dark" collapseOnSelect>
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand><img src="/images/Ex.png" width="149" height="33"/></Navbar.Brand>
            </LinkContainer>
            <Nav className="ml-auto">
              <LinkContainer to="/">
                <Nav.Link href="/">Home</Nav.Link>
              </LinkContainer>

              <LinkContainer to="/chat">
                <Nav.Link href="/chat">
                  Chat <i className="fas fa-solid fa-message"></i>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/sell">
                <Nav.Link>
                  Sell <i className="fa-solid fa-book"></i>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/own">
                <Nav.Link>
                  Profile <i className="fas fa-user"></i>
                </Nav.Link>
              </LinkContainer>
              <LogoutButton />
            </Nav>
          </Container>
        </Navbar>
      </>
    </header>
  );
};

export default HeaderSignedIn;
