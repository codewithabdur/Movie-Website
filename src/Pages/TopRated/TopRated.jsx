import React, { useEffect, useState } from "react";
import { NavBar } from "../../Components";
import { Footer } from "../../Containers";
import axios from "axios";
import { BounceLoader } from "react-spinners";

const TopRated = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/tv/top_rated?api_key=e7730a61c57baf83c9cebd81860420b8')
      .then((response) => {
        console.log(response);
        console.log(response.data.page);
        console.log(response.data.total_pages);
        setMovies(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    document.title = "Abdur Rahman Khan Video Website";
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastPost = currentPage * moviesPerPage;
  const indexOfFirstPost = indexOfLastPost - moviesPerPage;
  const currentMovies = filteredMovies.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  if (currentMovies.length === 0) {
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
      </form>
      <div className="flex flex-wrap justify-center">
        {currentMovies.map((movie) => (
        //   <Link to={`/bollywood/${movie.id}`} key={movie.id}>
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
                  Title: <span> {movie.name} </span>
                </h1>
                <p className="date">
                  Date: <span>{movie.first_air_date}</span>
                </p>
                <h5 className="popu">
                  <div className="span"> {movie.vote_average}</div>
                </h5>
              </div>
            </div>
        //   </Link>
        ))}
      </div>
      <div className="pagination flex flex-row">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={`button mx-1 ${
              currentPage === index + 1 ? "bolly" : ""
            }`}
          >
            {"Page " + (index + 1)}
          </button>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default TopRated;
