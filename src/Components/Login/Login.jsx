import React, { useEffect, useState } from 'react';
import './Login.scss';
import { NavBar } from '../../Components';
import { Footer } from '../../Containers';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formNotSubmitted, setFormNotSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);

  useEffect(() => {
    const storedLoginAttempts = localStorage.getItem('loginAttempts');
    if (storedLoginAttempts) {
      setLoginAttempts(parseInt(storedLoginAttempts, 10));
    }
  }, []);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://register-data-bed5b-default-rtdb.firebaseio.com/movie-${username}.json`
      );
      const data = await response.json();

      if (data && data.password === password) {
        console.log('Login successful');
        localStorage.setItem('username', username);
        localStorage.removeItem('loginAttempts');
        navigate('/');
      } else {
        console.log('Invalid username or password');
        setFormNotSubmitted(true);
        setTimeout(() => {
          setFormNotSubmitted(false);
        }, 2000);

        const updatedLoginAttempts = loginAttempts + 1;
        setLoginAttempts(updatedLoginAttempts);

        if (updatedLoginAttempts >= 6) {
          setIsLoading(true);
          let button  = document.getElementById('cur');
          button.style.cursor = "not-allowed";
          // button.classList.remove = "bg-[#22dfa6] hover:bg-[#12d198]";
          setTimeout(() => {
            setIsLoading(false);
            setLoginAttempts(0);
            button.style.cursor = "pointer";
            // button.classList.add = "bg-[#22dfa6] hover:bg-[#12d198]";
          }, 24 * 60 * 60 * 1000); // 24 hours in milliseconds
        }

        localStorage.setItem('loginAttempts', updatedLoginAttempts.toString());
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // const isButtonDisabled = isLoading || loginAttempts >= 2;

  return (
    <>
      {username !== undefined && <NavBar username={username} />}
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-sm p-6">
          {loginAttempts >= 6 && (
            <div className="bg-red-500 text-white text-center py-2 mb-4">
              Warning: You have reached the maximum daily login-attempts. Please try again after 24 hours
            </div>
          )}
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="text-center">
              <Link
                to="/register"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              >
                Register
              </Link>
            </div>
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
            <div className="flex items-center justify-between mb-6">
              <button
                id='cur'
                className="bg-[#22dfa6] hover:bg-[#12d198] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                type="button"
                onClick={handleLogin}
                disabled={isLoading || loginAttempts >= 6}
                // disabled={isButtonDisabled}
              >
                {isLoading ? (
                  <>
                    <ClipLoader color="#36d5d6" size={18} /> Loading...
                  </>
                ) : (
                  'Sign In'
                )}
              </button>
            </div>
            <div className="text-center">
              <Link
                target="_blank"
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </Link>
            </div>
            {formNotSubmitted && <p>Invalid Username or Password</p>}
            {/* <p>Login Attempts: {loginAttempts}</p> */}
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
