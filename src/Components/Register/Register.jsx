import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../NavBar/NavBar";
import { Footer } from "../../Containers";
import './Register.scss'
import { ClipLoader } from "react-spinners";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!username || !email || !password || !bio) {
      setFormSubmitted(true);
      setTimeout(()=>{
        setFormSubmitted(false);
      },2000)
      return;
    }

    setIsLoading(true); // Set loading state to true

    // Save data to the API endpoint
    axios
      .put(`https://register-data-bed5b-default-rtdb.firebaseio.com/movie-${username}.json`, {
        username,
        email,
        password,
        bio,
      })
      .then((response) => {
        console.log(response.data);
        setIsLoading(false); // Set loading state to false
        navigate(`/login`);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false); // Set loading state to false
      });
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md p-6">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={handleSubmit}
          >
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={isLoading} // Disable the button when loading is true
              >
                {isLoading ? `${<ClipLoader color="#36d5d6" />}Loading...` : 'Register'} {/* Display loading text when loading */}
              </button>
              <Link to="/login">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                >
                  Login
                </button>
              </Link>
            </div>
            {formSubmitted && <p>Form Not Submitted</p>}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
