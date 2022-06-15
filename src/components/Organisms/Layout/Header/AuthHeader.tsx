import Link from "next/link";
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

import { useDispatch, useSelector } from "@/redux/store";
import {
  notificationsOffcanvas,
  selectNotificationOffcanvas,
} from "@/reduxFeatures/app/appSlice";
import styles from '@/styles/utils.module.scss'

const AuthHeader = () => {
  const links = [
    { icon: "feed", name: "Home" },
    { icon: "explore", name: "Explore" },
    { icon: "gist", name: "Gist" },
    { icon: "groups", name: "Groups" },
  ];

  const { user } = useUser();
  const router = useRouter();

  const dispatch = useDispatch();
  const show = useSelector(selectNotificationOffcanvas);

  // Set notificationsOffcanvas in redux state to true
  const handleClose = () => dispatch(notificationsOffcanvas(false));
  const handleShow = () => dispatch(notificationsOffcanvas(true));

  const notificationsDisplay = () => {
    if (window.innerWidth >= 992) {
      // Display Offcanvas
      handleShow();
    } else {
      router.push("/notifications");
    }
  };

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
              <Link key={key} href={`/${link.icon}`} passHref>
                <div className="d-flex flex-column align-items-center gap-1 btn">
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
          <div className="notifications d-flex  gap-3">
            <Link href="/chat" passHref>
              <Button
                className={`position-relative ${styles.btn}`}
              >
                <Image src="/assets/icons/message.svg" alt="" fluid />
              </Button>
            </Link>

            <Offcanvas
              show={show}
              onHide={handleClose}
              placement={"end"}
              style={{
                position: "fixed",
                top: "4.8rem",
                borderRadius: "15px 0 0 0",
              }}
              scroll={true}
              // backdrop={false}
            >
              <Offcanvas.Body>
                <Notifications />
              </Offcanvas.Body>
            </Offcanvas>

            <Button
              variant="primary position-relative"
              className={`position-relative ${styles.btn}`}
              onClick={notificationsDisplay}
              disabled={router.asPath === "/notifications" ? true : false}
            >
              <Image src="/assets/icons/notification.svg" alt="" fluid />
            </Button>
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
              <Link key={key} href={`/${link.icon}`} passHref>
                <div className="d-flex flex-column align-items-center gap-1 mobi-nav bg-white btn">
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
