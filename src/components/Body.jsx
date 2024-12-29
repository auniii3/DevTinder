// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useLocation, useNavigate } from "react-router";
import Footer from "./Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_APP_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [authError, setAuthError] = useState(false);

  useEffect(() => {
    if (!(location.pathname == "/login")) {
      fetchUserData();
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const res = await axios.get(BASE_APP_URL + "profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      setAuthError(true);
      setTimeout(() => {
        setAuthError(false);
      }, 3000);
      navigate("/login");
    }
  };

  return (
    <div>
      {authError && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-error">
            <span>Unauthorized</span>
          </div>
        </div>
      )}
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
}

export default Body;
