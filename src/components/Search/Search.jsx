import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cards from "../../components/Card/Card";

const Search = () => {
  const { query } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US&query=${query}`
      )
        .then((res) => res.json())
        .then((data) => setSearchResults(data.results || []));
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div className="px-12 py-8">
      <h2 className="text-2xl font-bold mb-8 text-center">
        Search Results for {query}
      </h2>
      <div className="flex flex-wrap justify-center">
        {searchResults.length > 0 ? (
          searchResults.map((movie) => <Cards key={movie.id} movie={movie} />)
        ) : (
          <p className="text-center text-lg">No results found.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
