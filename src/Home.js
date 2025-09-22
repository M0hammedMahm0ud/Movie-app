import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState([{}]);
  const getMovies = () => {
    fetch(
      "https://api.themoviedb.org/3/discover/movie?api_key=ec6be4b1be9a3b0696e335a181bead44"
    )
      .then((res) => res.json())
      .then((data) => setMovies(data.results));
  };
  useEffect(() => {
    getMovies();
  }, []);
  console.log(movies);
  // const renderMovies = movies.map((movieItem) => {
  //   return (
  //     <div key={movieItem.id}>
  //       <img src={movieItem.poster_path} alt="" />
  //     </div>
  //   );
  // });
  return (
    <div className="container">
      <h1 className="title">React Movie Search</h1>
      <div>
        movie name :
        <label htmlFor="movieName">
          <input name="movieName" type="text" />
        </label>
        <button>Search</button>
      </div>
      <div>{""}</div>
    </div>
  );
}
