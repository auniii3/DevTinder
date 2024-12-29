import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_APP_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";

function Feed() {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchUserFeed();
  }, []);

  const fetchUserFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_APP_URL + "user/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  if (!feed) return;

  if (feed.length == 0)
    return (
      <h1 className="flex justify-center my-5 text-white text-3xl">
        No Available Devs
      </h1>
    );

  return (
    feed && (
      <div className="my-10">
        <UserCard
          key={feed[0]._id}
          user={feed[0]}
          componentName={"feed"}
        ></UserCard>
      </div>
    )
  );
}

export default Feed;
