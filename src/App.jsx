import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import MovieList from "./components/MovieList/MovieList";
import Movie from "./pages/MovieDetail/Movie";
import Search from "./components/Search/Search";
import Login from "./pages/Login/Login";
import { useEffect, useState } from "react";
import SingUp from "./pages/Login/SingUP";

function App() {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const savedToken = sessionStorage.getItem("token");
    if (savedToken) {
      setToken(JSON.parse(savedToken));
    }
  }, []);

  useEffect(() => {
    if (token) {
      sessionStorage.setItem("token", JSON.stringify(token));
    } else {
      sessionStorage.removeItem("token");
    }
  }, [token]);

  return (
    <div className="App">
      <Router>
        {token && <Header setToken={setToken} />}{" "}
        <Routes>
          <Route path="/singup" element={<SingUp />} />
          <Route path="/" element={<Login setToken={setToken} />} />
          {token ? (
            <Route path="/homepage" element={<Home />} />
          ) : (
            <Route path="/" element={<Login setToken={setToken} />} />
          )}
          <Route path="movie/:id" element={<Movie />}></Route>
          <Route path="movies/:type" element={<MovieList />}></Route>
          <Route path="search/:query" element={<Search />} />
          <Route path="/*" element={<h1>Error Page</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
