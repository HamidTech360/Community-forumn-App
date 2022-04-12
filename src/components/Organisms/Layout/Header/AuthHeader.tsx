import Link from "next/link";
import React from "react";
import {
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Image,
  Button,
} from "react-bootstrap";
import useAuth from "../../../../hooks/useAuth";
import Logo from "../../../Atoms/Logo";

const AuthHeader = () => {
  const links = [
    { icon: "feed", name: "Home" },
    { icon: "explore", name: "Explore" },
    { icon: "gist", name: "Gist" },
    { icon: "groups", name: "Groups" },
  ];
  const { user } = useAuth();
  return (
    <Navbar
      className="bg-white"
      style={{ boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.04)" }}
      fixed="top"
    >
      <Container className="d-flex justify-content-between">
        <Navbar.Brand>
          <Logo />
        </Navbar.Brand>
        <Form.Control
          type="search"
          style={{ maxWidth: 300 }}
          placeholder="Search"
        />
        <Nav className="d-flex justify-content-between gap-4">
          {links.map((link, key) => (
            <Link href={`/${link.icon}`} passHref>
              <div className="d-flex flex-column align-items-center gap-1">
                <span>
                  <Image
                    src={`/assets/icons/${link.icon}.svg`}
                    width={15}
                    height={15}
                    alt=""
                  />
                </span>
                <small>{link.name}</small>
              </div>
            </Link>
          ))}
        </Nav>
        <div className="notifications d-flex  gap-2">
          <NavDropdown
            title={
              <Button
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "100%",
                  backgroundColor: "#EAFEFD",
                  border: "none",
                }}
              >
                <Image src="/assets/icons/message.svg" alt="" fluid />
              </Button>
            }
          >
            hello
          </NavDropdown>
          <NavDropdown
            title={
              <Button
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "100%",
                  backgroundColor: "#EAFEFD",
                  border: "none",
                }}
              >
                <Image src="/assets/icons/notification.svg" alt="" fluid />
              </Button>
            }
          >
            hello
          </NavDropdown>
        </div>
        <NavDropdown
          title={
            <>
              <Image
                src={user?.avatar.url}
                alt=""
                width={40}
                height={40}
                roundedCircle
              />
              <span className="mx-2">{user?.firstName.split(" ")[0]}</span>
            </>
          }
        >
          hello
        </NavDropdown>
      </Container>
    </Navbar>
  );
};

export default AuthHeader;
