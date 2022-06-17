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
//import useUser from "@/hooks/useUser";
import Notifications from "@/pages/notifications";
import {RiLogoutCircleRLine} from 'react-icons/ri'

import Logo from "@/components/Atoms/Logo";
import Loader from "@/components/Organisms/Layout/Loader/Loader";
import { useRouter } from "next/router";

import { useDispatch, useSelector } from "@/redux/store";
import {
  notificationsOffcanvas,
  selectNotificationOffcanvas,
} from "@/reduxFeatures/app/appSlice";
import styles from "@/styles/utils.module.scss";

import {
  AiFillHome,
  AiOutlineHome,
  AiFillCompass,
  AiOutlineCompass,
} from "react-icons/ai";
import { RiMessage2Fill, RiMessage2Line } from "react-icons/ri";
import { HiUserGroup, HiOutlineUserGroup } from "react-icons/hi";
import { BsEnvelopeFill, BsEnvelope } from "react-icons/bs";
import {
  MdNotificationsActive,
  MdOutlineNotificationsActive,
} from "react-icons/md";

import { logout } from "@/redux/user";

const AuthHeader = () => {
  const links = [
    { icon: "feed", name: "Home" },
    { icon: "explore", name: "Explore" },
    { icon: "gist", name: "Gist" },
    { icon: "groups", name: "Groups" },
  ];

  //const { user } = useUser();
  const router = useRouter();

  const dispatch = useDispatch();
  const show = useSelector(selectNotificationOffcanvas);
  const {data} = useSelector(s=>s.user)

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

  const LogOut = ()=>{
    router.push('/login')
    dispatch(logout({}))
    //router.push('/login')
  }

  const activeTab = (link) => {
    console.log("link.icon:", link.icon);
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
                <div
                  className={`${
                    router.asPath.substring(1) === link.icon
                      ? "text-primary"
                      : "text-muted"
                  } d-flex flex-column align-items-center gap-1 btn`}
                >
                  <span>{activeTab(link)}</span>
                  <small>{link.name}</small>
                </div>
              </Link>
            ))}
          </Nav>
          <div className="notifications d-flex  gap-3">
            <Link href="/chat" passHref>
              <Button
                variant="none position-relative"
                style={{
                  borderRadius: "100%",
                  backgroundColor: "#EAFEFD",
                  border: "none",
                }}
              >
                {router.asPath === "/chat" ? (
                  <BsEnvelopeFill />
                ) : (
                  <BsEnvelope />
                )}
                 <Badge className = {styles.badge}>9</Badge>
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
            >
              <Offcanvas.Body>
                <Notifications />
              </Offcanvas.Body>
            </Offcanvas>

            <Button
              variant="none position-relative"
              className = {styles.btn}
              onClick={notificationsDisplay}
              disabled={router.asPath === "/notifications" ? true : false}
            >
              {router.asPath === "/notifications" ? (
                <MdNotificationsActive />
              ) : (
                <MdOutlineNotificationsActive />
              )}
             <Badge className = {styles.badge}>9</Badge>
            </Button>
          </div>
          <NavDropdown
            className={`d-none d-md-block ${styles.header}`}
            style={{ color: "black" }}
            title={
              <>
                <Image
                  src={data?.avatar?.url || "/images/formbg.png"}
                  alt=""
                  className = {styles.img}
                  roundedCircle
                />
                <span className={`mx-2 ${styles.span}`}>{data?.firstName.split(" ")[0]}</span>
              </>
            }
          >
            <NavDropdown.Header>
              <Image
                src={data?.avatar?.url || "/images/formbg.png"}
                alt=""
                width={20}
                height={20}
                roundedCircle
              />
              <span className={`mx-2 ${styles.span}`}>
                {data?.firstName}&nbsp; {data?.lastName}
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
            <NavDropdown.Item 
                  style={{fontWeight:'700', marginTop:'10px'}} onClick={()=>LogOut()}>
                    Logout 
                    <RiLogoutCircleRLine size={14}/>
            </NavDropdown.Item> 
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
                <div
                  className={`${
                    router.asPath.substring(1) === link.icon
                      ? "text-primary"
                      : "text-muted"
                  } d-flex flex-column align-items-center gap-1 mobi-nav bg-white btn`}
                >
                  <span>{activeTab(link)}</span>
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

// import Link from "next/link";
// import {
//   Container,
//   Form,
//   Nav,
//   Navbar,
//   NavDropdown,
//   Image,
//   Button,
//   Badge,
//   Offcanvas,
// } from "react-bootstrap";
// import useUser from "@/hooks/useUser";
// import Notifications from "@/pages/notifications";

// import Logo from "@/components/Atoms/Logo";
// import Loader from "@/components/Organisms/Layout/Loader/Loader";
// import { useRouter } from "next/router";

// import { useDispatch, useSelector } from "@/redux/store";
// import {
//   notificationsOffcanvas,
//   selectNotificationOffcanvas,
// } from "@/reduxFeatures/app/appSlice";
// import {
//   AiFillHome,
//   AiOutlineHome,
//   AiFillCompass,
//   AiOutlineCompass,
// } from "react-icons/ai";
// import { RiMessage2Fill, RiMessage2Line } from "react-icons/ri";
// import { HiUserGroup, HiOutlineUserGroup } from "react-icons/hi";
// import { BsEnvelopeFill, BsEnvelope } from "react-icons/bs";
// import {
//   MdNotificationsActive,
//   MdOutlineNotificationsActive,
// } from "react-icons/md";
// import styles from '@/styles/utils.module.scss'

// const AuthHeader = () => {
//   const links = [
//     { icon: "feed", name: "Home" },
//     { icon: "explore", name: "Explore" },
//     { icon: "gist", name: "Gist" },
//     { icon: "groups", name: "Groups" },
//   ];

//   // const { user } = useUser();
//   const router = useRouter();

//   const dispatch = useDispatch();
//   const show = useSelector(selectNotificationOffcanvas);
//   const {data} = useSelector(s=>s.user)


//   // Set notificationsOffcanvas in redux state to true
//   const handleClose = () => dispatch(notificationsOffcanvas(false));
//   const handleShow = () => dispatch(notificationsOffcanvas(true));

//   const notificationsDisplay = () => {
//     if (window.innerWidth >= 992) {
//       // Display Offcanvas
//       handleShow();
//     } else {
//       router.push("/notifications");
//     }
//   };

//   const activeTab = (link) => {
//     console.log("link.icon:", link.icon);
//     if (link.icon === "feed") {
//       if (link.icon === "feed" && router.asPath.substring(1) === "feed") {
//         return <AiFillHome />;
//       } else if (
//         link.icon === "feed" &&
//         router.asPath.substring(1) !== "feed"
//       ) {
//         return <AiOutlineHome />;
//       }
//     } else if (link.icon === "explore") {
//       if (link.icon === "explore" && router.asPath.substring(1) === "explore") {
//         return <AiFillCompass />;
//       } else if (
//         link.icon === "explore" &&
//         router.asPath.substring(1) !== "explore"
//       ) {
//         return <AiOutlineCompass />;
//       }
//     } else if (link.icon === "gist") {
//       if (link.icon === "gist" && router.asPath.substring(1) === "gist") {
//         return <RiMessage2Fill />;
//       } else if (
//         link.icon === "gist" &&
//         router.asPath.substring(1) !== "gist"
//       ) {
//         return <RiMessage2Line />;
//       }
//     } else if (link.icon === "groups") {
//       if (link.icon === "groups" && router.asPath.substring(1) === "groups") {
//         return <HiUserGroup />;
//       } else if (
//         link.icon === "groups" &&
//         router.asPath.substring(1) !== "groups"
//       ) {
//         return <HiOutlineUserGroup />;
//       }
//     }
//   };
//   return (
//     <>
//       <Navbar
//         className="bg-white"
//         style={{ boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.04)" }}
//         fixed="top"
//       >
//         <Container className="d-flex justify-content-between">
//           <Link href="/feed" passHref>
//             <Navbar.Brand>
//               <Logo />
//             </Navbar.Brand>
//           </Link>
//           <Form.Control
//             className="mx-2"
//             type="search"
//             style={{ maxWidth: 300 }}
//             placeholder="Search"
//           />
//           <Nav className="d-flex justify-content-between gap-4 	d-none d-md-flex">
//             {links.map((link, key) => (
//               <Link key={key} href={`/${link.icon}`} passHref>
//                 <div
//                   className={`${
//                     router.asPath.substring(1) === link.icon
//                       ? "text-primary"
//                       : "text-muted"
//                   } d-flex flex-column align-items-center gap-1 btn`}
//                 >
//                   <span>{activeTab(link)}</span>
//                   <small>{link.name}</small>
//                 </div>
//               </Link>
//             ))}
//           </Nav>
//           <div className="notifications d-flex  gap-3">
//             <Link href="/chat" passHref>
//               <Button
//                 variant="none position-relative"
//                 className = {styles.btn}
//               >
//                 {router.asPath === "/chat" ? (
//                   <BsEnvelopeFill />
//                 ) : (
//                   <BsEnvelope />
//                 )}
//                 <Badge className = {styles.badge}>1</Badge>
//               </Button>
//             </Link>

//             <Offcanvas
//               show={show}
//               onHide={handleClose}
//               placement={"end"}
//               style={{
//                 position: "fixed",
//                 top: "4.8rem",
//                 borderRadius: "15px 0 0 0",
//               }}
//               scroll={true}
//             >
//               <Offcanvas.Body>
//                 <Notifications />
//               </Offcanvas.Body>
//             </Offcanvas>

//           {/* <Link href="/notifications" passHref> */}
//             <Button
//               variant="none position-relative"
//               className = {styles.btn}
//               onClick={notificationsDisplay}
//               disabled={router.asPath === "/notifications" ? true : false}
//             >
//               {router.asPath === "/notifications" ? (
//                 <MdNotificationsActive />
//               ) : (
//                 <MdOutlineNotificationsActive />
//               )}
//               <Badge className = {styles.badge}>9</Badge>
//             </Button>
//           {/* </Link> */}
//           </div>
//           <NavDropdown
//             className={`d-none d-md-block ${styles.header}`}
//             style={{ color: "black" }}
//             title={
//               <>
//                 <Image
//                   src={data?.avatar?.url || "/images/formbg.png"}
//                   alt=""
//                   className = {styles.img}
//                   roundedCircle
//                 />
//                 <span className={`mx-2 ${styles.span}`}>{data?.firstName.split(" ")[0]}</span>
//               </>
//             }
//           >
//             <NavDropdown.Header>
//               <Image
//                 src={data?.avatar?.url || "/images/formbg.png"}
//                 alt=""
//                 width={20}
//                 height={20}
//                 roundedCircle
//               />
//               <span className="mx-2">
//                 {data?.firstName}&nbsp; {data?.lastName}
//               </span>{" "}
//             </NavDropdown.Header>
//             <NavDropdown.Divider />
//             <NavDropdown.Item>Dark mode</NavDropdown.Item>
//             <NavDropdown.Item>
//               <Link href="/settings" passHref>
//                 Account Settings
//               </Link>
//             </NavDropdown.Item>
//             <NavDropdown.Item>Support</NavDropdown.Item>
//             {/* <NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item> */}
//           </NavDropdown>
//         </Container>
//       </Navbar>

//       <Navbar
//         className="mobi-nav bg-white rounded"
//         style={{ boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.04)" }}
//         fixed="bottom"
//       >
//         <Container className="d-flex justify-content-start">
//           <Nav className="d-flex justify-content-around gap-4 w-100">
//             {links.map((link, key) => (
//               <Link key={key} href={`/${link.icon}`} passHref>
//                 <div
//                   className={`${
//                     router.asPath.substring(1) === link.icon
//                       ? "text-primary"
//                       : "text-muted"
//                   } d-flex flex-column align-items-center gap-1 mobi-nav bg-white btn`}
//                 >
//                   <span>{activeTab(link)}</span>
//                   <small>{link.name}</small>
//                 </div>
//               </Link>
//             ))}
//           </Nav>
//         </Container>
//       </Navbar>
//     </>
//   );
// };

// export default AuthHeader;
