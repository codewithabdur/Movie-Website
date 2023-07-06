import React, { useEffect, useState } from 'react';
import './NavBar.scss';
import { Link } from 'react-router-dom';
import client from '../../lib/client';

const NavBar = () => {
  const username = localStorage.getItem('username');
  // const isLoggedIno = localStorage.getItem('username') !== null;
  const isLoggedIn = username !== null;

  const [isOpen, setIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    client
      .fetch(
        `*[_type == "needThings"]{
          navImg{
            asset->{
              _id,
              url
            }
          }
        } `
      )
      .then((data) => {
        setPosts(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      {posts[0] && (
        <nav className="">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link to="/">
                  {posts[0].navImg && (
                    <img
                      className="h-8 w-auto img"
                      src={posts[0].navImg.asset.url}
                      alt="Logo"
                    />
                  )}
                </Link>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-center space-x-4">
                  <Link
                    to="/"
                    className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                  {isLoggedIn ? (
                  <Link to="/toprated"
                    className="text-gray-300 hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Top Rated
                  </Link>
            ) : (
              <Link to="/login" className="text-gray-300 hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium">Top Rated</Link>)}
                  {isLoggedIn ? (
                  <Link to="/hollywood2010"
                    className="text-gray-300 hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Hollywood2010
                  </Link>
            ) : (
              <Link to="/login" className="text-gray-300 hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium">Hollywood2010</Link>)}
                  {isLoggedIn ? (
                  <Link to="/hollywoodpage"
                    className="text-gray-300 hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    HollyWood
                  </Link>
                  ) : (
                    <Link to="/login" className="text-gray-300 hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium">Hollywood</Link>)}
                  <Link
                    to="/contact"
                    className="text-gray-300 hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </Link>
                  {isLoggedIn ? (
                    <Link to={`/profile/${username}`}>
                      <p className="bg-gray-200 w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold">
                        {username && username.charAt(0).toUpperCase()}
                      </p>
                    </Link>
                  ) : (
                    <Link to="/login" className="text-gray-300 hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <button
                  onClick={toggleNavbar}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded={isOpen}
                >
                  <span className="sr-only">Open main menu</span>
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {isOpen && (
            <div className="md:hidden" id="mobile-menu ">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>
                {isLoggedIn ? (
                <Link
                  to="/toprated"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Top Rated
                </Link>
                ):(
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Top Rated
                </Link>)}
                {isLoggedIn ? (
                <Link
                  to="/hollywood2010"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Hollywood2010
                </Link>
                ):(
                <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Hollywood2010
                </Link>)}
                
                 {isLoggedIn ? (
                 <Link
                  to="/hollywoodpage"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Hollywood
                </Link>
                 ):(
                 <Link
                  to="/login"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Hollywood
                </Link>)}
                <Link
                  to="/contact"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Contact
                </Link>
                {isLoggedIn ? (
                  <Link to={`/profile/${username}`}>
                    <p className="bg-gray-200 w-12 h-12 rounded-full mb-4 flex items-center justify-center text-4xl font-bold">
                      {username && username.charAt(0).toUpperCase()}
                    </p>
                  </Link>
                ) : (
                  <Link to="/login" className="text-gray-300 hover:bg-white hover:text-black px-3 py-2 rounded-md text-sm font-medium">Login</Link>
       
                )}
              </div>
            </div>
          )}
        </nav>
      )}
    </>
  );
};

export default NavBar;
