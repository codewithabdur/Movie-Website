import React, { useState } from "react";
import { NavBar } from "../../Components";
import { Footer } from "../../Containers";
import "./Contact.scss";

const Contact = () => {
  const [userData, setUserData] = useState({
    name: "",
    message: "",
    email: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formNotSubmitted, setFormNotSubmitted] = useState(false);
  const [formFillSubmitted, setFormFillSubmitted] = useState(false);

  let name, value;
  const postUserData = (event) => {
    name = event.target.name;
    value = event.target.value;
    setUserData({ ...userData, [name]: value });
  };

  const checkDataExists = async (newData) => {
    const res = await fetch(
      "https://register-data-bed5b-default-rtdb.firebaseio.com/ContactForm.json"
    );
    const data = await res.json();

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const existingData = data[key];

        // Compare the new data with existing data
        // Adjust this condition based on your data structure
        if (
          existingData.message === newData.message
        ) {
          return true; // Data already exists
        }
      }
    }

    return false; // Data does not exist
  };

  const submitData = async (event) => {
    event.preventDefault();
    const { name, message, email } = userData;

    if (name && message && email) {
      const newData = { name, message, email };
      const isDataExists = await checkDataExists(newData);

      if (isDataExists) {
        setFormNotSubmitted(true);
        setTimeout(() => {
          setFormNotSubmitted(false);
        }, 2000);
      } else {
        const res = await fetch(
          "https://register-data-bed5b-default-rtdb.firebaseio.com/ContactForm.json",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newData),
          }
        );

        if (res) {
          setUserData({
            name: "",
            message: "",
            email: "",
          });

          setFormSubmitted(true);
          setTimeout(() => {
            setFormSubmitted(false);
          }, 2000);
        } else {
          setFormNotSubmitted(true);
          setTimeout(() => {
            setFormNotSubmitted(false);
          }, 2000);
        }
      }
    } else {
      setFormFillSubmitted(true);
      setTimeout(() => {
        setFormFillSubmitted(false);
      }, 2000);
    }
  };

  return (
    <>
    <NavBar />
      <div className="flex justify-center items-center  contact-box">
        <div className="max-w-md w-full px-6 py-8 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Contact Us
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={postUserData}
                placeholder="Your name"
                className="w-full border-gray-300 border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={postUserData}
                placeholder="Your email"
                className="w-full border-gray-300 border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-gray-700 font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={userData.message}
                onChange={postUserData}
                placeholder="Your message"
                rows="4"
                className="w-full border-gray-300 border px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={submitData}
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
            >
              Submit
            </button>
          </form>
          {formSubmitted && <p className="p">Message Send</p>}
          {formNotSubmitted && <p className="p">Message Data Already Exist</p>}
          {formFillSubmitted && <p className="p">Please Fill All Details</p>}
        </div>
      </div>
      <Footer />
      </>
  );
};

export default Contact
