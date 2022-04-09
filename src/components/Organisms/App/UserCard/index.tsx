import React from "react";
import { Card } from "react-bootstrap";

const UserCard = ({ user }: { user: Record<string, any> }) => {
  return (
    <Card className="bg-white radius-10 p-3" style={{ border: "none" }}>
      <p className="text-center bold">
        {user.firstName}&nbsp; {user.lastName}
      </p>
    </Card>
  );
};

export default UserCard;
