/* eslint-disable @next/next/no-img-element */

import React, { ReactPropTypes, useEffect } from "react";
import { Button, Container, Nav, Navbar, Form } from "react-bootstrap";
import Logo from "../../../Atoms/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import useAuth from "../../../../hooks/useAuth";
import AuthHeader from "./AuthHeader";
import { propTypes } from "react-bootstrap/esm/Image";
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
  const { loggedIn, user } = useAuth();

  const disabled = [
    "/login",
    "/register",
    "/success-reset",
    "/reset-password",
    "/interests",
  ];
  useEffect(() => {
    const navbar = window.document.querySelector(".nav_bar");
    window.onscroll = () => {
      if (window.scrollY > 100) {
        !navbar.classList.contains("bg-light")
          ? navbar.classList.add("bg-light")
          : null;
      } else {
        navbar.classList.contains("bg-light")
          ? navbar.classList.remove("bg-light")
          : null;
      }
    };
  });

  return (
    <>
      {loggedIn ? (
        <AuthHeader />
      ) : (
        <Navbar
          collapseOnSelect
          className="nav_bar"
          expand="lg"
          bg={disabled.includes(activePage) ? "light" : ""}
          fixed="top"
        >
          <Head>
            <meta name="robots" content="noindex" />
          </Head>

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
      )}
    </>
  );
};

export default Header;
