import { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [inputVal, setInputVal] = useState("");

  const getMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=a961a1c0e0d72aca2b97335285874bcd&primary_release_year=2023&with_origin_country=US"
    )
      .then((res) => res.json())
      .then((data) => {
        setAllMovies(data.results);
        setMovies(data.results);
      });
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handleSearch = () => {
    if (inputVal.trim() === "") {
      setMovies(allMovies);
      return;
    }

    const newList = allMovies.filter((mitem) =>
      mitem.title?.toLowerCase().includes(inputVal.toLowerCase())
    );

    setMovies(newList);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputVal(value);

    if (value.trim() === "") {
      setMovies(allMovies);
    } else {
      const filtered = allMovies.filter((mitem) =>
        mitem.title?.toLowerCase().includes(value.toLowerCase())
      );
      setMovies(filtered);
    }
  };
  function highlightText(text, highlight) {
    if (!highlight.trim()) return text;

    const regex = new RegExp(`(${highlight})`, "gi"); // match case-insensitive
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span
          key={i}
          style={{ backgroundColor: "#FFFF66	", fontWeight: "bold" }}
        >
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  const renderMovies =
    movies.length > 0 ? (
      movies.map((movieItem, index) => (
        <div key={index} className="card">
          <div>
            <img
              alt={movieItem.title}
              src={`https://image.tmdb.org/t/p/w500${movieItem.poster_path}`}
              width="100px"
            />
          </div>
          <div>
            <p>{highlightText(movieItem.title, inputVal)}</p>
            <p>Released date: {movieItem.release_date}</p>
            <p>Rating: {movieItem.vote_average.toFixed(1)}</p>
            <p>Overview: {movieItem.overview}</p>
          </div>
        </div>
      ))
    ) : (
      <p
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2.5rem",
          minHeight: "60vh",
        }}
      >
        Movie not found
      </p>
    );

  return (
    <div className="container">
      <h1 className="title">React Movie Search</h1>
      <div className="search-container">
        <label htmlFor="movieName">Movie name: </label>
        <input
          name="movieName"
          type="text"
          value={inputVal}
          onChange={handleInputChange}
          id="movieName"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>{renderMovies}</div>
      <footer>
        By :{" "}
        <a
          href="https://github.com/M0hammedMahm0ud"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mohammed Mahmoud Ali
          <FaGithub style={{ marginLeft: "6px", verticalAlign: "middle" }} />
        </a>
      </footer>
    </div>
  );
}
