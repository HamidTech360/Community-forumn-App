import Link from "next/link";
import React, { useState } from "react";
import {
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
  Image,
  Button,
  Badge,
  Offcanvas,
} from "react-bootstrap";
import useUser from "@/hooks/useUser";
import Notifications from "@/pages/notifications";

import Logo from "@/components/Atoms/Logo";
import Loader from "@/components/Organisms/Layout/Loader/Loader";
import { useRouter } from "next/router";

const AuthHeader = () => {
  const links = [
    { icon: "feed", name: "Home" },
    { icon: "explore", name: "Explore" },
    { icon: "gist", name: "Gist" },
    { icon: "groups", name: "Groups" },
  ];

  const { user } = useUser();
  const router = useRouter();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const notificationsDisplay = () => {
    console.log("notificationsDisplay");
    if (window.innerWidth >= 992) {
      // Display Offcanvas
      handleShow();
    } else {
      router.push("/notifications");
    }
  };

  const notificationPath = () =>
    router.asPath === "/notifications" ? true : false;
  return (
    <>
      <Navbar
        className="bg-white"
        style={{ boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.04)" }}
        fixed="top"
      >
        <Container className="d-flex justify-content-between">
          <Link href="/feed" passHref>
            <Navbar.Brand>
              <Logo />
            </Navbar.Brand>
          </Link>
          <Form.Control
            className="mx-2"
            type="search"
            style={{ maxWidth: 300 }}
            placeholder="Search"
          />
          <Nav className="d-flex justify-content-between gap-4 	d-none d-md-flex">
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
            <Link href="/chat" passHref>
              <Button
                className="position-relative"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "100%",
                  backgroundColor: "#EAFEFD",
                  border: "none",
                }}
              >
                <Image src="/assets/icons/message.svg" alt="" fluid />
                <Badge bg="danger" className="position-absolute end-0 top-0">
                  3
                </Badge>
              </Button>
            </Link>

            <Offcanvas show={show} onHide={handleClose} placement={"end"}>
              <Offcanvas.Body>
                <Notifications />
              </Offcanvas.Body>
            </Offcanvas>

            <Button
              variant="primary position-relative"
              style={{
                width: 35,
                height: 35,
                borderRadius: "100%",
                backgroundColor: "#EAFEFD",
                border: "none",
              }}
              // onClick={handleShow}
              onClick={notificationsDisplay}
              disabled={notificationPath()}
              // {`${router.asPath === 'notifications' && 'disabled'}`}
            >
              <Image src="/assets/icons/notification.svg" alt="" fluid />
              <Badge bg="warning" className="position-absolute end-0 top-0">
                3
              </Badge>
            </Button>

            {/* {window.innerWidth >= 992 ? (
              <Button
                variant="primary position-relative"
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: "100%",
                  backgroundColor: "#EAFEFD",
                  border: "none",
                }}
                onClick={handleShow}
              >
                <Image src="/assets/icons/notification.svg" alt="" fluid />
                <Badge bg="warning" className="position-absolute end-0 top-0">
                  33
                </Badge>
              </Button>
            ) : (
              <Link href="/notifications" passHref>
                <Button
                  className="position-relative"
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "100%",
                    backgroundColor: "#EAFEFD",
                    border: "none",
                  }}
                >
                  <Image src="/assets/icons/notification.svg" alt="" fluid />
                  <Badge bg="warning" className="position-absolute end-0 top-0">
                    3
                  </Badge>
                </Button>
              </Link>
            )}  */}
          </div>
          <NavDropdown
            className="d-none d-md-block "
            style={{ color: "black" }}
            title={
              <>
                <Image
                  src={user?.avatar?.url || "/images/formbg.png"}
                  alt=""
                  width={40}
                  height={40}
                  roundedCircle
                />
                <span className="mx-2">{user?.firstName.split(" ")[0]}</span>
              </>
            }
          >
            <NavDropdown.Header>
              <Image
                src={user?.avatar?.url || "/images/formbg.png"}
                alt=""
                width={20}
                height={20}
                roundedCircle
              />
              <span className="mx-2">
                {user?.firstName}&nbsp; {user?.lastName}
              </span>{" "}
            </NavDropdown.Header>
            <NavDropdown.Divider />
            <NavDropdown.Item>Dark mode</NavDropdown.Item>
            <NavDropdown.Item>
              <Link href="/settings" passHref>
                Account Settings
              </Link>
            </NavDropdown.Item>
            <NavDropdown.Item>Support</NavDropdown.Item>
            {/* <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item> */}
          </NavDropdown>
        </Container>
      </Navbar>

      <Navbar
        className="mobi-nav bg-white rounded"
        style={{ boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.04)" }}
        fixed="bottom"
      >
        <Container className="d-flex justify-content-start">
          <Nav className="d-flex justify-content-around gap-4 w-100">
            {links.map((link, key) => (
              <Link href={`/${link.icon}`} passHref>
                <div className="d-flex flex-column align-items-center gap-1 mobi-nav bg-white">
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
        </Container>
      </Navbar>
    </>
  );
};

export default AuthHeader;
