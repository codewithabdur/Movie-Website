import React, { useEffect, useState } from "react";
import "./HollywoodPage.scss";
import { NavBar } from "../../Components";
import { Footer } from "../../Containers";
import axios from "axios";
import { Link } from "react-router-dom";
import { BounceLoader } from "react-spinners";

const HollywoodPage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      // .get('https://api.themoviedb.org/3/tv/popular?api_key=e7730a61c57baf83c9cebd81860420b8')
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=e7730a61c57baf83c9cebd81860420b8"
      )
      .then((response) => {
        setMovies(response.data.results);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const indexOfLastPost = currentPage * moviesPerPage;
  const indexOfFirstPost = indexOfLastPost - moviesPerPage;
  // const currentmovies = movies.slice(indexOfFirstPost, indexOfLastPost);
  const [searchQuery, setSearchQuery] = useState("");

  // console.log(currentPage)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(movies.length / moviesPerPage);

  console.log(movies);

  useEffect(() => {
    document.title = "Abdur Rahman Khan Video Website";
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMovies = filteredMovies.slice(indexOfFirstPost, indexOfLastPost);
  if (!currentMovies) {
    return (
      <div className="h-screen w-screen items-center flex justify-center">
        <BounceLoader color="#36d5d6" />
      </div>
    );
  }

  return (
    <div className="bollywoodPageContainer">
      <NavBar />
      <form className="navForm mx-auto">
        <input
          className="input"
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        {/* <button type="submit" className="navButton">
          Search
        </button> */}
      </form>
      <div className="flex flex-wrap justify-center">
        {currentMovies.map((movie) => (
          <Link to={`/hollywood/${movie.id}`} key={movie.id}>
            {" "}
            <div key={movie.id} className="pageCardsContainer">
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w220_and_h330_face/${movie.poster_path}`}
                  alt=""
                  className="movieimg"
                />
              )}
              <div className="pageCardsDetails">
                <h1 className="movieTitle">
                  Title: <span> {movie.title} </span>
                </h1>
                <p className="date">
                  Date: <span>{movie.release_date}</span>
                </p>
                <h5 className="popu">
                  {" "}
                  <div className="span"> {movie.vote_average}</div>
                </h5>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="pagination flex flex-row ">
        {Array.from({ length: totalPages }).map((_, index) => (
          <btn
            key={index}
            onClick={() => paginate(index + 1)}
            className={
              currentPage === index + 1 ? "active btn2 mx-1" : "btn2 mx-1"
            }
          >
            {"Page " + (index + 1)}
          </btn>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default HollywoodPage;
