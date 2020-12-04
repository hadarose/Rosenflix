import React, { useContext, useState } from 'react';
import { MoviesContext } from "./MoviesContextAPI";
import { MembersContext } from "../Members/MembersContextAPI";
import { useHistory } from 'react-router-dom';
import MovieWatchedList from "../WatchedList/MovieWatchedList";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import "../../index.css";

function Movie(props) {
    const history = useHistory();
    const [movies, setMovies] = useContext(MoviesContext);
    const [members] = useContext(MembersContext);
    const [showWatched, setShowWatched] = useState(false);

    const useStyles = makeStyles({
        root: {
            width: 350,
            margin: 10,
            backgroundColor: "#212625",
            color: "white",
            marginLeft: 2,
        },
        media: {
            height: "75%",
            width: "75%",
            maxWidth: "100%",
            maxHeight: "100%",
        },
    });

    const classes = useStyles();

    let genres = props.movie.genres.map((genre, index) => {
        return <span key={index}> {genre} |</span>
    })

    const deleteMovie = () => {
        // Finding the index of the movie to be deleted
        let movieIndex = movies.findIndex(item => item.id === props.movie.id);
        movies.splice(movieIndex, 1);
        setMovies([...movies]);

        // Finding the members who watched the deleted movie
        let haveWatchedMembers = members.filter(item => item.watched)
            .filter(item => item.watched.find(watchedItem => watchedItem.movieToWatch === props.movie.name))

        // Deleting the movie from each member watched array
        haveWatchedMembers.forEach(watchedMember => {
            let watchedIndex = watchedMember.watched.findIndex(movieObj => movieObj.movieId === props.movie.id);
            watchedMember.watched.splice(watchedIndex, 1);
        })

        // Redirect to movies so it renders after deletion
        history.push('/rosenflix/movies');
    }

    const goToEditMovie = () => {
        history.push('/rosenflix/edit-movie/' + props.movie.id);
    }

    const goToMovie = () => {
        history.push('/rosenflix/movies/' + props.movie.id)
    }

    const checkWatched = () => {

        if (props.movie.watched) {

            setShowWatched(!showWatched);
        }
    }

    return (
        <div>
            <Card className={classes.root} >
                <CardActionArea onClick={goToMovie}>
                    <CardContent >
                        <CardMedia
                            component="img"
                            className={classes.media}
                            image={props.movie.image.medium}>
                        </CardMedia>

                        <Typography className={classes.root}
                            align="left"
                            gutterBottom variant="h6"
                            component="h3">
                            {props.movie.name} | {props.movie.premiered.substring(0, 4)}
                        </Typography>
                        <Typography className={classes.root}
                            align="left"
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            {genres}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <div className="btnsMainDiv">
                    <div className="btnsDiv" >
                        <CardActions>
                            <Button
                                onClick={goToEditMovie}
                                size="small"
                                variant="contained"
                                color="secondary">Edit</Button>
                            <Button
                                onClick={deleteMovie}
                                size="small"
                                variant="contained"
                                color="secondary">Delete</Button>
                            <Button
                                onClick={checkWatched}
                                size="small"
                                variant="contained"
                                color="secondary">Watched List</Button>
                        </CardActions>
                    </div>
                </div>

                {showWatched ? <div>
                    <MovieWatchedList watched={props.movie.watched} />
                </div> : ""}
            </Card>

        </div>
    )
}

export default Movie;

