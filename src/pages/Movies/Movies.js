import React, { useContext, useState, useEffect } from "react";
import { MoviesContext } from "./MoviesContextAPI";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Movie from "./Movie";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "../../index.css";

function Movies() {
  const history = useHistory();
  const [movies] = useContext(MoviesContext);
  const [showMovies, setShowMovies] = useState(movies);

  useEffect(() => {
    if (movies) {
      setShowMovies(movies);
    }
  }, [movies]);

  const filterMoviesByMovieName = (movieName) => {
    const filteredResults = movies.filter((movie) =>
      movie.name.toLowerCase().includes(movieName.toLowerCase())
    );

    setShowMovies(filteredResults);
  };

  const goToAddMovie = () => {
    history.push("/rosenflix/add-new-movie");
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        style={{ marginRight: "10px" }}
        onClick={goToAddMovie}
      >
        Add A New Movie
      </Button>

      <TextField
        id="outlined-margin-dense"
        size="small"
        label="Search By Name"
        variant="outlined"
        style={{ top: "-2px", marginRight: "10px", marginBottom: "10px" }}
        onChange={({ target }) => filterMoviesByMovieName(target.value)}
      />

      {showMovies.length > 0 ? (
        <div className="moviesDiv">
          <Grid container spacing={3}>
            {showMovies.map((movie) => (
              <Paper key={movie.id}>
                <Movie movie={movie} />
              </Paper>
            ))}
          </Grid>
        </div>
      ) : (
        <h2 className="addNewMsg">
          Sorry, didn't find what you were looking for, try again!{" "}
        </h2>
      )}
    </div>
  );
}

export default Movies;
