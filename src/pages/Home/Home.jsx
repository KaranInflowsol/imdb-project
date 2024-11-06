import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";

const Home = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
    )
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  return (
    <>
      <div className="relative">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          transitionTime={3}
          infiniteLoop={true}
          showStatus={false}
        >
          {popularMovies.slice(10).map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="text-white no-underline"
            >
              <div className="h-[600px] relative">
                <img
                  className="w-full h-full object-cover"
                  src={`https://image.tmdb.org/t/p/original${
                    movie && movie.backdrop_path
                  }`}
                  alt={movie.original_title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent p-20 flex flex-col justify-end items-start">
                  <h2 className="text-5xl font-extrabold mb-2">
                    {movie ? movie.original_title : ""}
                  </h2>
                  <div className="text-2xl mb-4 flex items-center">
                    {movie ? movie.release_date : ""}
                    <span className="ml-12 flex items-center">
                      {movie ? movie.vote_average : ""}
                      <i className="fas fa-star text-yellow-400 ml-2" />
                    </span>
                  </div>
                  <p className="italic text-lg w-1/2">
                    {movie ? movie.overview : ""}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Carousel>
        <MovieList />
      </div>
    </>
  );
};

export default Home;
