import React, { useState, useEffect, useContext } from "react";
import { MoviesContext } from "../Movies/MoviesContextAPI";
import { MembersContext } from "../Members/MembersContextAPI";

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';

import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

function AddToWatched(props) {
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(0),
            minWidth: 250,
            marginBottom: 5
        },
    }));

    const classes = useStyles();
    const [movies, setMovies] = useContext(MoviesContext);
    const [members, setMembers] = useContext(MembersContext)
    const [selectedMovie, setSelectedMovie] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showForm, setShowForm] = useState(true);
    const [isDateChanged, setDateChanged] = useState(false);
    const [isAllValid, setIsAllValid] = useState(true);

    const selectMovie = (event) => {
        setSelectedMovie(event.target.value);
    };

    const selectDate = (date) => {
        setDateChanged(!isDateChanged)
        setSelectedDate(date);
    }

    useEffect(() => {
        const checkValid = () => {
            if (selectedMovie) {
                setIsAllValid(false);
            }
        }
        checkValid();


    }, [isDateChanged, selectedMovie])

    const addToWatched = () => {
        // PART 1 - Movie related
        //Finding the selected movie in Movies Array
        let movieIndex = movies.findIndex(item => item.name === selectedMovie);

        // Creating a duplicate movie with the new subscriber's details 
        let newMovie = movies[movieIndex];
        let movieId = movies[movieIndex].id;

        // Deleting the movie before inserting it updated with subscriber
        movies.splice(movieIndex, 1);

        if (!newMovie.watched) {
            newMovie.watched = [{
                subId: props.member.id,
                subscriber: props.member.name,
                dateWatched: selectedDate.toString().substr(4, 12)
            }];
        }
        else {
            newMovie.watched = [...newMovie.watched, {
                subId: props.member.id,
                subscriber: props.member.name,
                dateWatched: selectedDate.toString().substr(4, 12)
            }];
        }

        // Setting the updated Movie in Movies Array
        setMovies([...movies, newMovie]);


        // PART 2 - Member related
        // Updating the NEW MOVIE in the MEMBER
        let newWatched = {
            movieId: movieId,
            movieToWatch: selectedMovie,
            dateToWatch: selectedDate.toString().substr(4, 12)
        };

        let newMember = {
            id: props.member.id,
            name: props.member.name,
            address: { city: props.member.address.city },
            email: props.member.email
        }

        if (!props.member.watched) {
            newMember.watched = [newWatched];
        }
        else {
            newMember.watched = [...props.member.watched, newWatched];
        }

        // Deleting the Member before inserting it updated
        let index = members.findIndex(member => member.id === props.member.id);
        members.splice(index, 1);

        // Setting the updated member in Members Array
        setMembers([...members, newMember]);
        setShowForm(!showForm);
    }

    let optionItems = movies.map((movie) => {
        return <MenuItem key={movie.id} value={movie.name} style={{ color: "white", background: "#dc004e" }} >

            <ListItemText key={movie.id} primary={<div style={{ fontSize: 14 }}>{movie.name}</div>} />

        </MenuItem>
    })

    return (
        <div style={{
            margin: "15px",
            color: "black",
            background: "white",
            borderRadius: "10px",
            border: "1px solid black"
        }}>
            {showForm ?
                <div>
                    <h3 >Add To Your Watch List</h3>
                    <div >

                        <div style={{ margin: "5px" }}>
                            <FormControl className={classes.formControl}>
                                <InputLabel style={{ fontSize: "10" }}>Subscribe To:</InputLabel>
                                <Select style={{ background: "lightgray", width: "650" }}
                                    value={selectedMovie}
                                    onChange={selectMovie}>

                                    {optionItems.length === 0 ?
                                        <ListItemText primary={<div style={{ color: "white", background: "#dc004e", fontSize: 14 }}>
                                            No Available Movies
                                                    </div>} /> : optionItems}

                                </Select>
                            </FormControl>

                        </div>

                        <div >
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justify="space-around" >
                                    <KeyboardDatePicker
                                        showTodayButton={true}
                                        id="date-picker-dialog"
                                        label="Date"
                                        format="MM/dd/yyyy"
                                        value={selectedDate}
                                        onChange={selectDate} />
                                </Grid>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div style={{ margin: "15px" }}>
                            <Button disabled={isAllValid}
                                size="small"
                                variant="contained"
                                color="default"
                                onClick={addToWatched}>OK
                    </Button>
                        </div>
                    </div>
                </div> : ""}
        </div>
    )
}

export default AddToWatched;
