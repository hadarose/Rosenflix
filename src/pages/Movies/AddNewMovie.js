import React, { useState, useEffect, useContext } from "react";
import { MoviesContext } from "./MoviesContextAPI";
import { useHistory } from "react-router-dom";
import "../../index.css";
import { getLastId } from "../../shared/id-utils";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import Grid from "@material-ui/core/Grid";
import SuccessMsg from "../SuccessMsg";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

function AddNewMovie() {
  const history = useHistory();
  const [movies, setMovies] = useContext(MoviesContext);
  const [name, setName] = useState("");
  const [genres, setGenres] = useState([]);
  const [url, setUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [isAdded, setIsAdded] = useState(false);
  const [isAllValid, setIsAllValid] = useState(true);

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes = useStyles();

  const setNewGenres = (evt) => {
    let inputGenres = evt.target.value;
    inputGenres = inputGenres.split(",");
    setGenres(inputGenres);
  };

  const setNewDate = (evt) => {
    let year = evt.getFullYear().toString();
    let month = (evt.getMonth() + 1).toString();
    let day = evt.getDate().toString();
    let pickedDate = year.concat("-", month, "-", day);
    setSelectedDate(pickedDate);
  };

  const addMovie = () => {
    // Getting last Id from movies
    let lastMovieId = getLastId(movies);
    let newMovie = {
      id: lastMovieId + 1,
      name: name,
      genres: genres,
      image: { medium: url },
      premiered: selectedDate,
    };
    setMovies([...movies, newMovie]);
    setIsAdded(!isAdded);
    setShowForm(!showForm);
  };

  useEffect(() => {
    const checkValid = () => {
      if (name !== "" && genres.length > 0) {
        setIsAllValid(false);
      }
    };

    checkValid();
  }, [name, genres]);

  const goToMovies = () => {
    // Redirect to movies so it renders after addition
    history.push("/rosenflix/movies");
  };

  return (
    <div>
      {showForm ? (
        <div>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              onChange={(evt) => setName(evt.target.value)}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Genres"
              variant="outlined"
              placeholder="separate with a comma"
              onChange={setNewGenres}
            />
            <br />
            <TextField
              id="outlined-basic"
              label="Image URL"
              variant="outlined"
              placeholder="www.example.com/img"
              onChange={(evt) => setUrl(evt.target.value)}
            />
            <br />
            <div>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                  <KeyboardDatePicker
                    showTodayButton={true}
                    id="date-picker-dialog"
                    label="Date"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={setNewDate}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </div>
            <br />
          </form>
        </div>
      ) : (
        ""
      )}

      {isAdded ? (
        <SuccessMsg type="Movie" name={name.toUpperCase()} action="Added" />
      ) : (
        ""
      )}
      <br />
      <Button
        variant="contained"
        color="secondary"
        style={{ marginRight: "10px" }}
        disabled={isAllValid}
        onClick={addMovie}
      >
        Add New
      </Button>

      <Button variant="contained" color="secondary" onClick={goToMovies}>
        Back To Movies
      </Button>
    </div>
  );
}

export default AddNewMovie;
