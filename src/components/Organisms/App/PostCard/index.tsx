import Image from "next/image";
import React from "react";
import { Button, Card } from "react-bootstrap";
import Logo from "../../../Atoms/Logo";

const PostCard = ({ post }: { post: Record<string, any> }) => {
  const postButton = [
    {
      name: "Like",
      reaction: true,
    },
    {
      name: "Share",
      reaction: true,
    },
    {
      name: "Comment",
      reaction: true,
    },
    {
      name: "Bookmark",
      reaction: true,
    },
  ];
  return (
    <Card className="my-3" style={{ border: "none" }}>
      <Card.Title className="position-relative mx-2 d-flex justify-content-start gap-2 p-2 border-bottom">
        <Logo />{" "}
        <div className="d-flex flex-column">
          <strong style={{ fontSize: "1rem" }}>Ephraim Nkonam</strong>
          <span style={{ fontSize: "0.9rem" }}>3 hours ago</span>
          <Button variant="light" size="sm" className="position-absolute end-0">
            <i className="bi bi-three-dots-vertical" />
          </Button>
        </div>
      </Card.Title>
      <Card.Body>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim
        aspernatur vel dolores accusamus libero repellat voluptates repudiandae
        dignissimos magnam tenetur laudantium tempore voluptate odio debitis,
        itaque possimus, eos fuga quae iusto eligendi cumque. Nesciunt
        temporibus doloremque reiciendis deleniti tenetur delectus odio eveniet,
        ullam magni, perferendis doloribus natus! Earum quisquam magni autem
        unde sequi voluptates quibusdam molestias eius, iste consectetur quos.
      </Card.Body>
      <Card.Footer className="mx-2 d-flex justify-content-between bg-white">
        {postButton.map((item, key) => (
          <Button
            variant="none"
            className="d-flex justify-content-center gap-1 align-items-center"
          >
            <Image
              src={`/assets/icons/${item.name.toLowerCase()}.svg`}
              alt=""
              width={20}
              height={20}
            />
            {item.name}
          </Button>
        ))}
      </Card.Footer>
    </Card>
  );
};

export default PostCard;
