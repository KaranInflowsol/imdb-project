import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="inline-block rounded-lg overflow-hidden m-1 min-w-[200px] h-[300px]">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <Link to={`/movie/${movie.id}`} className="text-white no-underline">
          <div className="relative inline-block rounded-lg overflow-hidden m-1 min-w-[200px] h-[300px] border border-gray-700 transition-transform transform hover:scale-125 z-10 hover:z-20 shadow-lg hover:shadow-2xl">
            <img
              className="h-[300px] w-full object-cover"
              src={`https://image.tmdb.org/t/p/original${
                movie ? movie.poster_path : ""
              }`}
              alt={movie ? movie.original_title : "Movie poster"}
            />
            <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-black to-transparent p-4 flex flex-col justify-end opacity-0 hover:opacity-100 transition-opacity">
              <h3 className="text-lg font-bold mb-1">
                {movie ? movie.original_title : ""}
              </h3>
              <div className="text-xs mb-1 flex justify-between">
                <span>{movie ? movie.release_date : ""}</span>
                <span className="flex items-center">
                  {movie ? movie.vote_average : ""}
                  <i className="fas fa-star text-yellow-400 ml-1" />
                </span>
              </div>
              <p className="italic text-xs">
                {movie ? movie.overview.slice(0, 118) + "..." : ""}
              </p>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Cards;
