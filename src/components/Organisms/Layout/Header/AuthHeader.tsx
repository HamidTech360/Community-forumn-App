import { useState, useEffect } from "react";
import config from "@/config";
import axios from "axios";
import Link from "next/link";
import {
  Container,
  Form,
  Modal,
  Nav,
  Navbar,
  NavDropdown,
  Button,
  Badge,
  Offcanvas
} from "react-bootstrap";
import Notifications from "@/pages/notifications";
import { RiLogoutCircleRLine } from "react-icons/ri";

import Logo from "@/components/Atoms/Logo";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "@/redux/store";
import {
  notificationsOffcanvas,
  setSearchModal,
  selectNotificationOffcanvas,
  selectSearchModal
} from "@/reduxFeatures/app/appSlice";
import { selectUser, logout } from "@/reduxFeatures/authState/authStateSlice";
import {
  AiFillHome,
  AiOutlineHome,
  AiFillCompass,
  AiOutlineCompass
} from "react-icons/ai";
import { RiMessage2Fill, RiMessage2Line } from "react-icons/ri";
import { HiUserGroup, HiOutlineUserGroup } from "react-icons/hi";
import { BsEnvelopeFill, BsEnvelope, BsSearch } from "react-icons/bs";
import {
  MdNotificationsActive,
  MdOutlineNotificationsActive
} from "react-icons/md";
import {
  selectNotificationsCount,
  setNotificationsCount,
  setNotificationsData
} from "@/reduxFeatures/api/notifications";
import Head from "next/head";
import styles from "@/styles/utils.module.scss";
import SearchTabs from "@/components/Molecules/SearchTabs";
import Avatar from "@/components/Atoms/Avatar";

import DarkModeSwitch from "../../../Molecules/DarkMode/DarkModeSwitch";

const AuthHeader = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const totalNotifications = useSelector(selectNotificationsCount);
  const showing = useSelector(selectSearchModal);
  const handleClosing = () => dispatch(setSearchModal(false));
  const handleShowing = () => dispatch(setSearchModal(true));
  const show = useSelector(selectNotificationOffcanvas);
  const data = useSelector(selectUser);
  const [latestNotificationTime, setLatestNotificationTime] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${config.serverUrl}/api/notifications`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          }
        );

        const notificationsCountClearedAt = localStorage.getItem(
          "notificationsCountClearedAt"
        );

        dispatch(setNotificationsData(response.data.notifications));

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let badgeCount: string | any[];
        if (notificationsCountClearedAt) {
          badgeCount = response.data.notifications.filter(
            item => item.createdAt > notificationsCountClearedAt
          );
        } else {
          badgeCount = response.data.notifications.filter(item => !item.read);
        }

        dispatch(setNotificationsCount(badgeCount.length));

        setLatestNotificationTime(
          response.data.notifications[0].updatedAt ||
            response.data.notifications[0].createdAt
        );
      } catch (error) {
        // console.log(error.response?.data);
      }
    })();
  }, [dispatch]);

  const links = [
    { icon: "feed", name: "Home" },
    { icon: "explore", name: "Explore" },
    { icon: "gist", name: "Gist" },
    { icon: "groups", name: "Groups" }
  ];

  // Set notificationsOffcanvas in redux state to true
  const handleClose = () => dispatch(notificationsOffcanvas(false));
  const handleShow = () => dispatch(notificationsOffcanvas(true));

  const notificationsDisplay = () => {
    // Set latestNotificationTime to last notification time if any or to current date
    const notificationsCountClearedAt = localStorage.getItem(
      "notificationsCountClearedAt"
    )
      ? latestNotificationTime
      : new Date().toISOString();

    localStorage.setItem(
      "notificationsCountClearedAt",
      notificationsCountClearedAt
    );

    // Clear UI Notification Badge
    dispatch(setNotificationsCount(0));

    if (window.innerWidth >= 992) {
      // Display Offcanvas
      handleShow();
    } else {
      router.push("/notifications");
    }
  };

  const LogOut = () => {
    dispatch(logout());
    router.push("/");
  };

  const activeTab = link => {
    if (link.icon === "feed") {
      if (link.icon === "feed" && router.asPath.substring(1) === "feed") {
        return <AiFillHome />;
      } else if (
        link.icon === "feed" &&
        router.asPath.substring(1) !== "feed"
      ) {
        return <AiOutlineHome />;
      }
    } else if (link.icon === "explore") {
      if (link.icon === "explore" && router.asPath.substring(1) === "explore") {
        return <AiFillCompass />;
      } else if (
        link.icon === "explore" &&
        router.asPath.substring(1) !== "explore"
      ) {
        return <AiOutlineCompass />;
      }
    } else if (link.icon === "gist") {
      if (link.icon === "gist" && router.asPath.substring(1) === "gist") {
        return <RiMessage2Fill />;
      } else if (
        link.icon === "gist" &&
        router.asPath.substring(1) !== "gist"
      ) {
        return <RiMessage2Line />;
      }
    } else if (link.icon === "groups") {
      if (link.icon === "groups" && router.asPath.substring(1) === "groups") {
        return <HiUserGroup />;
      } else if (
        link.icon === "groups" &&
        router.asPath.substring(1) !== "groups"
      ) {
        return <HiOutlineUserGroup />;
      }
    }
  };

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <Navbar
        className={`bg-white  ${styles.navBar}`}
        style={{ borderBottom: "1.5px solid rgba(0, 0, 0, 0.125)" }}
        fixed="top"
      >
        <Container className="d-flex justify-content-between">
          <Link href="/feed" passHref>
            <Navbar.Brand className={styles.brand}>
              <Logo />
            </Navbar.Brand>
          </Link>
          <Form.Control
            id="navSearch"
            className={`mx-2 ${styles.formControl}`}
            type="search"
            style={{ maxWidth: 300 }}
            placeholder="Search"
            onClick={handleShowing}
            onChange={handleShowing}
          />

          <div className={styles.search}>
            <BsSearch className={styles.iconSearch} onClick={handleShowing} />
          </div>

          <Nav className="d-flex justify-content-between gap-4 d-md-flex auth-nav">
            {links.map((link, key) => (
              <Link key={key} href={`/${link.icon}`} passHref>
                <div
                  className={`${
                    router.asPath.substring(1) === link.icon ||
                    router.asPath.substring(1).split("/")[0].includes(link.icon)
                      ? "text-primary auth-name"
                      : "text-muted auth-name"
                  } d-flex flex-column align-items-center gap-1 auth-gap btn`}
                >
                  <span>{activeTab(link)}</span>
                  <small className="fixed-bottom-navBar-text">
                    {link.name}
                  </small>
                </div>
              </Link>
            ))}
          </Nav>
          <div className="notifications d-flex gap-3">
            <Link href="/chat" passHref>
              <Button
                variant="none position-relative"
                style={{
                  borderRadius: "100%",
                  backgroundColor: "#EAFEFD",
                  border: "none"
                }}
              >
                {router.asPath === "/chat" ? (
                  <BsEnvelopeFill />
                ) : (
                  <BsEnvelope />
                )}
              </Button>
            </Link>

            <Offcanvas
              show={show}
              onHide={handleClose}
              placement={"end"}
              style={{
                position: "fixed",
                top: "4.8rem"
              }}
              scroll={true}
            >
              <Offcanvas.Body>
                <Notifications />
              </Offcanvas.Body>
            </Offcanvas>

            <Button
              variant="none position-relative"
              className={styles.btn}
              onClick={notificationsDisplay}
              disabled={router.asPath === "/notifications" ? true : false}
            >
              {router.asPath === "/notifications" ? (
                <MdNotificationsActive />
              ) : (
                <MdOutlineNotificationsActive />
              )}

              {totalNotifications > 0 && (
                <Badge className={styles.badge}>
                  {totalNotifications > 99 ? `${99}+` : totalNotifications}
                </Badge>
              )}
            </Button>
          </div>
          <NavDropdown
            className={`d-md-block ${styles.header}`}
            style={{ color: "black" }}
            title={
              <div className="d-flex align-items-center g-2">
                <Avatar
                  src={data?.images?.avatar}
                  name={data.firstName}
                  width={40}
                  height={40}
                />
                <span className={`mx-2 ${styles.span}`}>
                  {data?.firstName?.split(" ")[0]}
                </span>
              </div>
            }
          >
            <div className={styles.navDrop}>
              <NavDropdown.Header className={styles.navHead}>
                <div className="d-flex g-2 align-items-center">
                  <Avatar
                    src={data?.images?.avatar}
                    name={data.firstName}
                    width={40}
                    height={40}
                  />
                  <Link href="/profile" passHref>
                    <span className="mx-2" style={{ cursor: "pointer" }}>
                      {data?.firstName}&nbsp; {data?.lastName}
                    </span>
                  </Link>
                </div>
              </NavDropdown.Header>
              <NavDropdown.Divider />
              <NavDropdown.Item className={styles.navMenu}>
                Dark mode
              </NavDropdown.Item>
              <NavDropdown.Item className={styles.navMenu}>
                <Link href="/settings" passHref>
                  Account Settings
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item className={styles.navMenu}>
                Support
              </NavDropdown.Item>
              <NavDropdown.Item
                className={styles.navMenu}
                style={{
                  fontWeight: "700",
                  color: "#207681",
                  marginTop: "10px"
                }}
                onClick={() => LogOut()}
              >
                Logout
                <RiLogoutCircleRLine size={14} />
              </NavDropdown.Item>
            </div>
          </NavDropdown>
          {/* <DarkModeSwitch /> */}
        </Container>
      </Navbar>

      {router.asPath !== "/chat" && (
        <Navbar
          className="mobi-nav bg-white rounded"
          style={{ borderTop: "1.5px solid rgba(0, 0, 0, 0.125)" }}
          fixed="bottom"
        >
          <Container>
            <Nav className="row w-100">
              {links.map((link, key) => (
                <div className="col-3" key={key}>
                  <Link href={`/${link.icon}`} passHref>
                    <div
                      className={`${
                        router.asPath.substring(1) === link.icon
                          ? "text-primary"
                          : "text-muted"
                      } d-flex flex-column align-items-center gap-1 mobi-nav bg-white btn`}
                    >
                      <span>{activeTab(link)}</span>
                      <small className="fixed-bottom-navBar-text">
                        {link.name}
                      </small>
                    </div>
                  </Link>
                </div>
              ))}
            </Nav>
          </Container>
        </Navbar>
      )}

      <Modal show={showing} onHide={handleClosing} scrollable>
        <Modal.Body>
          <SearchTabs />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClosing}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AuthHeader;
