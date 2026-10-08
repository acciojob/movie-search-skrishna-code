import React, { useState } from "react";
import "./App.css";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const searchMovies = async () => {
    if (!search.trim()) {
      setMovies([]);
      setError("Invalid movie name. Please try again.");
      return;
    }

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=99eb9fd1&s=${encodeURIComponent(
          search
        )}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setError("");
      } else {
        setMovies([]);
        setError("Invalid movie name. Please try again.");
      }
    } catch (error) {
      setMovies([]);
      setError("Invalid movie name. Please try again.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  return (
    <div className="app">
      <h1>Movie Search</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={searchMovies}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            {movie.Poster !== "N/A" ? (
              <img src={movie.Poster} alt={movie.Title} />
            ) : (
              <div className="no-poster">No Poster</div>
            )}

            <h2>{movie.Title}</h2>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
