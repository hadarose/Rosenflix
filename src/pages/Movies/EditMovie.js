import React, { useState, useContext, useEffect } from "react";
import { MoviesContext } from "./MoviesContextAPI";
import { useHistory, useParams } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { isValidDate } from "../../shared/date-utils";
import "../../index.css";
import SuccessMsg from "../SuccessMsg";

function EditMovie() {
  const history = useHistory();
  const [movies, setMovies] = useContext(MoviesContext);
  const [name, setName] = useState("");
  const [newName, setNewName] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [genres, setGenres] = useState([]);
  const [newGenres, setNewGenres] = useState([]);
  const [url, setUrl] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [date, setDate] = useState("");
  const [newDate, setNewDate] = useState("");
  const [isDateChanged, setDateChanged] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [isEdited, setIsEdited] = useState(false);
  const [isAllValid, setIsAllValid] = useState(true);

  const getNewGenres = (evt) => {
    let inputGenres = evt.target.value;
    inputGenres = inputGenres.split(",");
    setNewGenres(inputGenres);
  };

  const getDate = (evt) => {
    setDateChanged(!isDateChanged);

    if (isValidDate(evt.target.value)) {
      setNewDate(evt.target.value);
    }
  };

  const id = useParams().id;
  let currentMovie = movies.filter((movie) => movie.id.toString() === id);

  useEffect(() => {
    setName(currentMovie[0] && currentMovie[0].name);
    setUrl(currentMovie[0] && currentMovie[0].image.medium);
    setGenres(currentMovie[0] && currentMovie[0].genres);
    setDate(currentMovie[0] && currentMovie[0].premiered);
  }, [currentMovie]);

  const genresStr = currentMovie[0] && currentMovie[0].genres.join(", ");

  const editMovie = () => {
    // Deleting the current Movie
    let index = movies.findIndex((movie) => movie.id.toString() === id);
    movies.splice(index, 1);

    let newMovie = {
      id: id,
      name: newName,
      genres: newGenres,
      image: { medium: newUrl },
      premiered: newDate,
    };

    setMovies([...movies, newMovie]);

    setIsEdited(!isEdited);
    setShowForm(!showForm);
  };

  useEffect(() => {
    const checkValid = () => {
      if (newName !== "") {
        setIsAllValid(false);
      }
    };
    checkValid();
  }, [newName, newUrl, newDate, newGenres]);

  const goToMovies = () => {
    // Redirect to movies so it renders after addition
    history.push("/rosenflix/movies");
  };

  return (
    <div>
      {showForm ? (
        <div className="mainDiv">
          <img alt={name} src={url} />
          <form className="form" noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Update Name"
              placeholder={name}
              variant="outlined"
              onChange={(evt) => setNewName(evt.target.value)}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Update Genres"
              variant="outlined"
              placeholder={genresStr}
              onChange={getNewGenres}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Update Image Url"
              variant="outlined"
              placeholder={url}
              onChange={(evt) => setNewUrl(evt.target.value)}
            />
            <br />

            {isDateChanged ? (
              <TextField
                error
                id="outlined-error-helper-text"
                helperText="Format: yyyy-dd-mm"
                label={date}
                variant="outlined"
                placeholder={date}
                onChange={getDate}
              />
            ) : (
              <TextField
                id="outlined-basic"
                label="Update Premiere Date"
                variant="outlined"
                placeholder={date}
                onChange={getDate}
              />
            )}
            <br />
            <br />
          </form>
        </div>
      ) : (
        ""
      )}

      {isEdited ? (
        <SuccessMsg type="Movie" name={name.toUpperCase()} action="Updated" />
      ) : (
        ""
      )}
      <br />

      <Button
        variant="contained"
        color="secondary"
        disabled={isAllValid}
        onClick={editMovie}
      >
        Edit Movie
      </Button>

      <br />
      <br />
      <Button variant="contained" color="secondary" onClick={goToMovies}>
        Back To Movies
      </Button>
    </div>
  );
}

export default EditMovie;
