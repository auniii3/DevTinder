import React from "react";
import { useSelector } from "react-redux";

import UserCard from "./UserCard";
import EditProfile from "./EditProfile";

function Profile() {
  const user = useSelector((store) => store.user);

  return user && <EditProfile user={user}></EditProfile>;
}

export default Profile;
