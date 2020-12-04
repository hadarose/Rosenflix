import React, { useContext, useState, useEffect } from 'react';
import { MoviesContext } from "./MoviesContextAPI";
import { MembersContext } from "../Members/MembersContextAPI";
import { useHistory, useParams } from 'react-router-dom';
import MovieWatchedList from "../WatchedList/MovieWatchedList";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function MovieSingle() {
    const history = useHistory();
    const [movies, setMovies] = useContext(MoviesContext);
    const [members] = useContext(MembersContext);
    const [name, setName] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [genres, setGenres] = useState([]);
    const [url, setUrl] = useState("");
    const [date, setDate] = useState("");
    const [watched, setWatched] = useState([]);
    const [showWatched, setShowWatched] = useState(false);

    const useStyles = makeStyles({
        root: {
            maxWidth: "100%",
            backgroundColor: "#212625",
            color: "white",
            marginLeft: 2,
        },
        media: {
            height: "60%",
            width: "40%",
        },
    });

    const classes = useStyles();
    const id = useParams().id;

    let currentMovie = movies.filter(movie => movie.id.toString() === id);

    useEffect(() => {
        setName(currentMovie[0] && currentMovie[0].name);
        setUrl(currentMovie[0] && currentMovie[0].image.medium);
        setGenres(currentMovie[0] && currentMovie[0].genres);
        setDate(currentMovie[0] && currentMovie[0].premiered.substring(0, 4));

        if (currentMovie[0] && currentMovie[0].watched) {
            setWatched(currentMovie[0] && currentMovie[0].watched);
        }

    }, [currentMovie])

    const genresStr = currentMovie[0] && currentMovie[0].genres.join(", ");

    const deleteMovie = () => {
        // Finding the index of the movie to be deleted
        let movieIndex = movies.findIndex(item => item.id === id);
        movies.splice(movieIndex, 1);
        setMovies([...movies]);

        // Finding the members who watched the deleted movie
        let haveWatchedMembers = members.filter(item => item.watched)
            .filter(item => item.watched.find(watchedItem => watchedItem.movieToWatch === name))

        // Deleting the movie from each member watched array
        haveWatchedMembers.forEach(watchedMember => {
            let watchedIndex = watchedMember.watched.findIndex(movieObj => movieObj.movieId === id);
            watchedMember.watched.splice(watchedIndex, 1);
        })

        // Redirect to movies so it renders after deletion
        history.push('/rosenflix/movies');
    }


    const goToEditMovie = () => {
        history.push('/rosenflix/edit-movie/' + id);
    }

    const checkWatched = () => {
        if (watched.length > 0) {
            setShowWatched(!showWatched);
        }

    }

    return (
        <div  >
            <Card className={classes.root} >
                <CardActionArea>
                    <CardContent >
                        <CardMedia
                            component="img"
                            className={classes.media}
                            image={url}>
                        </CardMedia>

                        <br />
                        <Typography className={classes.root}
                            align="left"
                            gutterBottom variant="h6"
                            component="h3">
                            {name} | {date}
                        </Typography>
                        <Typography className={classes.root}
                            align="left"
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            {genresStr}
                        </Typography>

                    </CardContent>
                </CardActionArea>


                <CardActions >
                    <Button onClick={goToEditMovie}
                        size="small"
                        variant="contained"
                        color="secondary">Edit</Button>
                    <Button onClick={deleteMovie}
                        size="small"
                        variant="contained"
                        color="secondary">Delete</Button>
                    <Button onClick={checkWatched}
                        size="small"
                        variant="contained"
                        color="secondary">Watched List</Button>
                </CardActions>

                {showWatched ? <div >
                    <MovieWatchedList watched={watched} />
                </div> : ""}
            </Card>

        </div>
    )
}

export default MovieSingle;
