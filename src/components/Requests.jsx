import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_APP_URL } from "../utils/constants";
import { addRequest, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_APP_URL + "user/requests", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (err) {}
  };

  const handleRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_APP_URL + "request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      console.log(res);
      dispatch(removeRequest(res.data.data._id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className="flex justify-center my-5 text-white text-3xl">
        No Available Requests
      </h1>
    );

  return (
    <div>
      <div className="flex justify-center my-5 text-white text-3xl">
        <h1>Requests</h1>
      </div>

      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center w-full">
          {requests.map((request) => {
            // Extract values from connection
            const { firstName, lastName, photoUrl, about, age, gender } =
              request.fromUserId;

            return (
              <div className="my-5 text-left w-1/3" key={request._id}>
                <div className="card card-side bg-base-300 shadow-xl">
                  <img
                    className="rounded-full w-1/5 h-1/5 m-5"
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                  />

                  <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-outline btn-error mx-5"
                        onClick={() => handleRequest("rejected", request._id)}
                      >
                        Reject
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleRequest("accepted", request._id)}
                      >
                        Accept
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
