import React, { useEffect, useState } from "react";
import "./LandingPage.scss";
import { Link } from "react-router-dom";
import client from '../../lib/client'
import { BounceLoader } from "react-spinners";

const LandingPage = () => {
  const [posts, setPosts] = useState([]);
  const username = localStorage.getItem('username')
  const isLoggedIn = localStorage.getItem('username') !== null;

  useEffect( () => {
    client.fetch(
      `
      *[_type == "landingPage"]{

        title,
        description,
        image{
          asset ->{
            _id,
            url
          }
        }
      }

      `
    ).then((data) =>{
      setPosts(data)
      // console.log(data)
    }).catch(console.error)
  },[])

  if(!posts[0]){
    return <div  className="h-screen w-screen items-center flex justify-center"><BounceLoader color="#36d5d6" /></div>;
  }


  return (
    <>
      {posts[0] && <div className="landing-container flex">
        <section className="leftsection">
          <h2 className="title">{posts[0].title}</h2>
          <p className="desc">
            {`${posts[0].description.substring(0, 500)}...`}
          </p>
          {isLoggedIn ? (
                  <Link to={`/profile/${username}`}>
                <button className="btn">Go to Dashboard</button>
              </Link>
            ) : (
              <Link to="/login">
                <button className="btn">Get Started</button>
              </Link>
            )}
        </section>
        <section className="rightsection">
          {posts[0].image && <img src={posts[0].image.asset.url} alt="" className="laptopimg" />}
        </section>
      </div>}
    </>
  );
};

export default LandingPage;
