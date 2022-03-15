/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import { Button, Container, Nav, Navbar, NavbarBrand } from "react-bootstrap";
import Logo from "../../../Atoms/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
const links = [
  { name: "Gist", link: "/gist" },
  { name: "Explore", link: "/explore" },
  { name: "About", link: "/about" },
  { name: "Contact Us", link: "/contact" },
  { name: "FAQ", link: "/faq" },
];
const Header = () => {
  const router = useRouter();
  const activePage = router.pathname;

  const disabled = ["/login", "/register"];
  return (
    <Navbar collapseOnSelect className="nav_bar" expand="lg">
      <img src="/assets/ellipse-intro-top.png" className={"vector1"} alt="" />
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand>
            <Logo />
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <i className="bi bi-list"></i>
        </Navbar.Toggle>
        {!disabled.includes(activePage) && (
          <Navbar.Collapse id="basic-navbar-nav" className=" gap-4">
            <Nav className="mx-auto  gap-5">
              {links.map((link, index) => (
                <Nav.Item
                  className={link.link === activePage ? `active` : ""}
                  key={`link-${index}`}
                >
                  <Link href={link.link}>{link.name}</Link>
                </Nav.Item>
              ))}
            </Nav>
            <Nav className="mr-auto gap-2 d-flex justify-content-end">
              <Nav.Item as={Link} href="/login">
                <Button variant="outline-primary">Sign In</Button>
              </Nav.Item>
              <Nav.Item as={Link} href="/register">
                <Button variant="primary">Register</Button>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
