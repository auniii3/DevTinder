import React, { useState } from "react";
import { BASE_APP_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";

const EditProfile = ({ user }) => {
  console.log(user);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [photoUrl, setphotoUrl] = useState(user.photoUrl);
  const [about, setAbout] = useState(user.about);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleUpdate = async () => {
    try {
      let data = {
        firstName,
        lastName,
        age,
        gender,
        photoUrl,
        about,
      };
      const res = await axios.patch(BASE_APP_URL + "profile/edit", data, {
        withCredentials: true,
      });
      dispatch(addUser(res.data.data));
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <div>
        <div className="flex justify-center my-3">
          <div className="card bg-base-300 w-96 shadow-xl mx-10">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">First Name:</span>
                </div>
                <input
                  type="text"
                  value={firstName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Last Name:</span>
                </div>
                <input
                  type="text"
                  value={lastName}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Age:</span>
                </div>
                <input
                  type="text"
                  value={age}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Photo Url:</span>
                </div>
                <input
                  type="text"
                  value={photoUrl}
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setphotoUrl(e.target.value)}
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text">Gender:</span>
                </div>
                <select
                  className="select w-full max-w-xs"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option disabled defaultValue>
                    Select Gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text">About</span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24"
                  value={about}
                  placeholder="Bio"
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </label>
              <div className="card-actions justify-center my-5">
                <button className="btn btn-primary" onClick={handleUpdate}>
                  Save Details
                </button>
              </div>
            </div>
          </div>
          <div className="my-3">
            <UserCard
              user={{ firstName, lastName, gender, photoUrl, about, age }}
              componentName={"editProfile"}
            ></UserCard>
          </div>
        </div>
        {success && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span>Profile Saved Succesfully.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
