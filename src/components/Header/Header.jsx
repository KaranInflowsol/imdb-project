import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ setToken }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("token");
    setToken(false); // Update token to false in App state
    navigate("/");
  }

  const handleSearch = () => {
    if (query) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="flex justify-between items-center mx-10 py-2">
      <div className="flex items-center">
        <Link to="/">
          <img
            className="w-20 cursor-pointer"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
            alt="IMDB Logo"
          />
        </Link>
        <Link
          to="/movies/popular"
          className="text-white text-xl mx-7 hover:text-red-500 no-underline"
        >
          Popular
        </Link>
        <Link
          to="/movies/top_rated"
          className="text-white text-xl mx-7 hover:text-red-500 no-underline"
        >
          Top Rated
        </Link>
        <Link
          to="/movies/upcoming"
          className="text-white text-xl mx-7 hover:text-red-500 no-underline"
        >
          Upcoming
        </Link>
      </div>
      <div className="headerRight flex items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies"
          className="px-3 py-2 rounded bg-gray-800 text-white"
        />
        <button
          onClick={handleSearch}
          className="ml-2 px-4 py-2 bg-green-600 rounded text-white"
        >
          Search
        </button>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 ml-3 mt-1 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
