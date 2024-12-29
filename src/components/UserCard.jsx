import React from "react";
import { BASE_APP_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeSingleFeed } from "../utils/feedSlice";
import axios from "axios";

function UserCard({ user, componentName }) {
  const { _id, firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const handleConnection = async (status, id) => {
    try {
      const res = await axios.post(
        BASE_APP_URL + "request/send/" + status + "/" + id,
        {},
        { withCredentials: true }
      );
      dispatch(removeSingleFeed(res.data.data.toUserId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    user && (
      <div className="flex justify-center">
        <div className="card bg-base-300 w-96 shadow-xl">
          <figure>
            <img src={photoUrl} alt="photoUrl" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{firstName + " " + lastName}</h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{about}</p>
            {componentName == "feed" && (
              <div className="card-actions justify-center my-5">
                <button
                  className="btn btn-outline btn-error"
                  onClick={() => handleConnection("ignored", _id)}
                >
                  Ignore
                </button>
                <button
                  className="btn btn-secondary mx-5"
                  onClick={() => handleConnection("interested", _id)}
                >
                  Interested
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default UserCard;
