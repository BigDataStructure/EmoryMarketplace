import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Navbar, Nav } from "react-bootstrap";
import "./Header.css";

const Header = () => {
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
              <LinkContainer to="/login">
                <Nav.Link>
                  Login <i className="fas fa-user"></i>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signup">
                <Nav.Link>
                  Sign Up <i className="fa-solid fa-user-plus"></i>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Container>
        </Navbar>
      </>
    </header>
  );
};

export default Header;
