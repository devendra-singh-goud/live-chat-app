import React from "react";
import { getUser } from "../utils/auth";

const Profile = () => {
  const user = getUser();

  if (!user) {
    return <p>Please log in.</p>;
  }

  return (
    <div>
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default Profile;
