import React, { useEffect, useState } from "react";
import "./H2010.scss";
import axios from "axios";
import { NavBar } from "../../Components";
import { Footer } from "../../Containers";
import { useParams } from "react-router-dom";
import { BounceLoader } from "react-spinners";

const H2010 = () => {
  const { id } = useParams(); // Get the id parameter from the route
  const [movie, setMovie] = useState(null);
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e7730a61c57baf83c9cebd81860420b8`
      )
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  useEffect(() => {
    document.title = "Abdur Rahman Khan Video Website";
  }, []);

  useEffect(() => {
    axios
      // .get(`https://api.themoviedb.org/3/movie/${id}?api_key=e7730a61c57baf83c9cebd81860420b8`)
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=e7730a61c57baf83c9cebd81860420b8&append_to_response=videos`
      )
      .then((response) => {
        setVideo(response.data.videos.results);
        // console.log(response.data.videos.results)
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  if (!movie) {
    return (
      <div className="h-screen w-screen items-center flex justify-center">
        <BounceLoader color="#36d5d6" />
      </div>
    );
  }

  const videoKey = video[0].key;

  return (
    <>
      <NavBar />
      <div className="slugbody">
        <div className="slugimg">
          <img
            className="slugImage"
            src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
            alt=""
          />
        </div>
        <div className="slugdes">
          <h1 className="slugTitle">
            Titles: <span>{movie.title}</span>
          </h1>
          <div className="box">
            {" "}
            <iframe
              title={movie.title}
              key={videoKey}
              width="420"
              height="315"
              src={`https://www.youtube.com/embed/${videoKey}`}
              className="flex justify-center mx-auto my-4"
            ></iframe>{" "}
          </div>
          <p className="slugDate">
            {" "}
            Date: <span>{movie.release_date}</span>
          </p>
          <h5 className="popu">
            {" "}
            <div className="span"> {movie.vote_average}</div>
          </h5>
          <h5 className="slugover">
            Description: <span>{movie.overview}</span>
          </h5>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default H2010;
