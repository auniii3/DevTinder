import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_APP_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchConnections();
  }, []);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_APP_URL + "user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  if (!connections) {
    return;
  }

  if (connections.length === 0) {
    return (
      <h1 className="flex justify-center my-5 text-white text-3xl">
        No Connections Found
      </h1>
    );
  }

  return (
    <div>
      <h1 className="flex justify-center mt-5 text-white text-3xl">
        Connections
      </h1>
      <div className="flex justify-center items-center">
        <div
          className="flex flex-col items-center w-full overflow-auto"
          style={{ height: "75vh" }}
        >
          {connections.map((connection) => (
            <div className="my-5 text-left w-1/3" key={connection._id}>
              <div className="card card-side bg-base-300 shadow-xl">
                <img
                  className="rounded-full w-1/5 h-1/5 m-5"
                  src={connection.photoUrl}
                  alt="Movie"
                />

                <div className="card-body">
                  <h2 className="card-title">
                    {connection.firstName + " " + connection.lastName}
                  </h2>
                  {connection.age && connection.gender && (
                    <p>{connection.age + ", " + connection.gender}</p>
                  )}
                  <p>{connection.about}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
