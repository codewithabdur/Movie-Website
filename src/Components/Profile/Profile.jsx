import React, { useEffect, useState } from "react";
import "./Profile.scss";
import { NavBar } from "../../Components";
import { Footer } from "../../Containers";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import firebase, { auth } from "../../lib/firebase";
import { BounceLoader } from "react-spinners";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  // const [bio, setBio] = useState("");
  const [userData, setUserData] = useState(null);
  const [savedData, setSavedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingUsername, setEditingUsername] = useState(false);

  const { username: profileUsername } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    if (profileUsername) {
      axios
        .get(
          `https://register-data-bed5b-default-rtdb.firebaseio.com/movie-${profileUsername}.json`
        )
        .then((response) => {
          if (response.data) {
            setUserData(response.data);
            setSavedData(response.data);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [profileUsername]);

  const handleEditProfile = () => {
    setEditing(true);
    setEditingUsername(true);
  };

  const handleSaveProfile = () => {
    axios
      .put(
        `https://register-data-bed5b-default-rtdb.firebaseio.com/movie-${username}.json`,
        savedData
      )
      .then((response) => {
        console.log(response.data);
        setEditing(false);
        setEditingUsername(false);
        setUserData(savedData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        firebase.database().goOffline();
        localStorage.removeItem("username"); // Remove the stored username
        setUsername(""); // Reset the username
        setUserData(null); // Reset the user data
        setSavedData(null); // Reset the saved data
        navigate(`/login`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleEmailChange = (event) => {
  //   setSavedData({ ...savedData, email: event.target.value });
  // };

  const handleUsernameChange = (event) => {
    setSavedData({ ...savedData, username: event.target.value });
  };

  const handleBioChange = (event) => {
    setSavedData({ ...savedData, bio: event.target.value });
  };

  // if(!userData){
  //   return(
  //     <div className="h-screen w-screen items-center flex justify-center">
  //     <BounceLoader color="#36d5d6" />
  //   </div>
  //   )
  // }

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-6">
        {loading ? (
             <div className="h-screen  items-center flex justify-center">
             <BounceLoader color="#36d5d6" />
           </div>
          ) : userData ? (
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className="mb-6 text-center">
                <img
                  className="w-32 h-32 rounded-full mx-auto"
                  src="https://via.placeholder.com/150"
                  alt="Profile Picture"
                />
                <h1 className="text-2xl font-bold mt-4">
                  {editingUsername ? (
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Username"
                      value={editing ? savedData.username : userData.username}
                      onChange={handleUsernameChange}
                      readOnly={!editing}
                    />
                  ) : (
                    userData.username
                  )}
                </h1>
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={editing ? savedData.email : userData.email}
                  // onChange={handleEmailChange}
                  readOnly={!editing}
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="bio"
                  rows="4"
                  placeholder="Write something about yourself..."
                  value={editing ? savedData.bio : userData.bio}
                  onChange={handleBioChange}
                  readOnly={!editing}
                ></textarea>
              </div>
              <div className="flex items-center justify-between">
                {!editing ? (
                  <>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleEditProfile}
                      type="button"
                    >
                      Edit Profile
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleLogout}
                      type="button"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleSaveProfile}
                      type="button"
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="text-white font-serif textedit">
              <img
                src="https://cdn.sanity.io/images/k88yshkr/production/45a76c2a82337ece8dd62a10c970c0bc492604d8-666x213.png"
                alt="error"
              />
              <h2 className="title">Internal Server Error or Might be Data Not Found</h2>
              <p className=" mt-2 mb-2"> Don't panic Please Go Back to Homepage and try again.</p>
             <Link to="/"> <button className="btn4 mb-0">Go Back</button></Link>
            </div>
          )}
        </div>
      </div>
      <Footer  />
    </>
  );
};

export default Profile;
