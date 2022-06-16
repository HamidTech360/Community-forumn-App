/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import Logo from "@/components/Atoms/Logo";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { FiMenu } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import AuthHeader from "./AuthHeader";

// import useUser from "@/hooks/useUser";
import { user } from "@/redux/user";
import { useSelector } from "@/redux/store";


import { selectAuthState } from "@/reduxFeatures/authState/authStateSlice";

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
 // const { isAuthenticated, user } = useUser();
  const [isMobile, setIsMobile] = useState(false);

  const authState = useSelector(s=>s.user);

  const handleClick = () => {
    setIsMobile(!isMobile);
  };

  const disabled = [
    "/login",
    "/register",
    "/success-reset",
    "/reset-password",
    "/interests",
    "/profile/timeline",
    "/profile/about",
    "/profile/media",
    "/profile/friends",
  ];

  return (
    <>
      {authState.isAuthenticated? (
        <AuthHeader />
      ) : (
        <Navbar collapseOnSelect className="nav_bar" expand="lg" fixed="top">
          <Head>
            <meta name="robots" content="noindex" />
          </Head>

          <Container>
            <Link href="/" passHref>
              <Navbar.Brand>
                <Logo />
              </Navbar.Brand>
            </Link>

            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="ham-menu"
              onClick={handleClick}
            >
              {isMobile ? (
                <AiOutlineClose color="#207681" />
              ) : (
                <FiMenu color="#207681" />
              )}
            </Navbar.Toggle>

            {!disabled.includes(activePage) && (
              <Navbar.Collapse id="responsive-navbar-nav" className=" gap-4">
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
                <div className="buttons ms-auto d-flex mt-lg-3 align-items-center gap-3 justify-content-center">
                  <Nav.Item as={Link} href="/login">
                    <Button variant="outline-primary">Sign In</Button>
                  </Nav.Item>
                  <Nav.Item as={Link} href="/register">
                    <Button variant="primary">Register</Button>
                  </Nav.Item>
                </div>
              </Navbar.Collapse>
            )}
          </Container>
        </Navbar>
      )}
    </>
  );
};

export default Header;
