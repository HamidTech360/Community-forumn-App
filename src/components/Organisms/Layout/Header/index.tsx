/* eslint-disable react/jsx-key */
import React from "react";
import { Button, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import Logo from "../../../Atoms/Logo";
import Link from "next/link";
const links = [
  { name: "Gist", link: "/gist" },
  { name: "Explore", link: "/explore" },
  { name: "About", link: "/about" },
  { name: "Contact Us", link: "/contact" },
  { name: "FAQ", link: "/faq" },
];
const Header = () => {
  return (
    <Navbar collapseOnSelect className="nav_bar" fixed="top" expand="lg">
      <Container>
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <i className="bi bi-list"></i>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav" className=" gap-4">
          <Nav className="mx-auto  gap-5">
            {links.map((link, index) => (
              <Nav.Item as={Link} key={`link-${index}`} href={link.link}>
                {link.name}
              </Nav.Item>
            ))}
          </Nav>
          <Nav className="mr-auto gap-2 d-flex justify-content-end">
            <Nav.Item>
              <Button variant="outline-primary">Sign In</Button>
            </Nav.Item>
            <Nav.Item>
              <Button variant="primary">Register</Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
