import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../Card/Card";

const MovieList = () => {
  const [movieList, setMovieList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { type } = useParams();
  const resultsPerPage = 16;

  useEffect(() => {
    getData();
  }, [type]);

  const getData = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        type ? type : "popular"
      }?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        setMovieList(data.results);
        setTotalPages(Math.ceil(data.results.length / resultsPerPage));
      });
  };

  const paginatedMovies = movieList.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="px-12 py-8">
      <h2 className="text-2xl font-bold mb-8 text-center">
        {(type ? type : "POPULAR").toUpperCase()}
      </h2>
      <div className="flex flex-wrap justify-center">
        {paginatedMovies.map((movie) => (
          <Cards key={movie.id} movie={movie} />
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2 mx-2 text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-700 disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MovieList;
