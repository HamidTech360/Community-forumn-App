import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button, Card, Container, Image } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../../../styles/delete.module.scss";

const Delete = () => {
  const [progress, setProgress] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirm = window.confirm("Continue with this action");
    if (!confirm) return;
    setProgress(true);
    try {
      const response = await axios.delete(`/api/user`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setProgress(false);
      console.log(response.data);

      setTimeout(() => {
        toast.success("Account deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 7000,
          toastId: "toast1",
        });
        router.push("/login");
        localStorage.removeItem("accessToken");
      }, 3000);
    } catch (error) {
      console.log(error?.response.data);
      setProgress(false);
      toast.error("Failed to delete account", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 7000,
        toastId: "toast1",
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <Container className={styles.container}>
        <Card className={styles.card}>
          <Card.Body>
            <Card.Title className={styles.title}>Confirmation</Card.Title>
            <Image
              src="./assets/Warning.png"
              alt="warning"
              className={styles.img}
            />
            <Card.Text className={styles.text}>
              Deleting your account will delete all of the content you have
              created. It will be completely irrecoverable.
            </Card.Text>

            <div>
              <Button className={styles.btn1}>Cancel</Button>
              <Button onClick={() => handleDelete()} className={styles.btn2}>
                <Image
                  src="./assets/Delete.png"
                  alt="delete"
                  className={styles.img2}
                />{" "}
                {progress ? "deleting..." : "Confirm"}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Delete;
