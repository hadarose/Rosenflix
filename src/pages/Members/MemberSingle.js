import React, { useContext, useState, useEffect } from 'react';
import { MembersContext } from "./MembersContextAPI";
import { MoviesContext } from '../Movies/MoviesContextAPI';
import { useHistory, useParams } from 'react-router-dom';
import MemberWatchedList from "../WatchedList/MemberWatchedList";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

function MemberSingle() {
    const history = useHistory();
    const [members, setMembers] = useContext(MembersContext);
    const [movies] = useContext(MoviesContext);
    const [name, setName] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [watched, setWatched] = useState([]);
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
            height: 100,
            width: "100%",
            objectFit: "scale-down",
            marginLeft: "-100px"
        },
    });

    const classes = useStyles();
    const id = useParams().id;

    let currentMember = members.filter(member => member.id.toString() === id);

    useEffect(() => {
        setName(currentMember[0] && currentMember[0].name);
        setEmail(currentMember[0] && currentMember[0].email);
        if (currentMember[0].watched) {
            setWatched(currentMember[0] && currentMember[0].watched);
        }

        setCity(currentMember[0] && currentMember[0].address.city);
    }, [currentMember])


    const deleteMember = () => {
        let index = members.findIndex(item => item.id.toString() === id);
        members.splice(index, 1);
        setMembers([...members]);

        // Finding the movies that the deleted member apears in them
        let haveWatchedMovies = movies.filter(item => item.watched)
            .filter(item => item.watched.find(watchedItem => watchedItem.subscriber === name))

        // Deleting the member from each movie watched array
        haveWatchedMovies.forEach(watchedMovie => {
            let watchedIndex = watchedMovie.watched.findIndex(memberObj => memberObj.subId === id);
            watchedMovie.watched.splice(watchedIndex, 1);
        })

        // Redirect to movies so it renders after deletion
        history.push('/rosenflix/members');
    }

    const goToEditMember = () => {
        history.push('/rosenflix/edit-member/' + id);
    }

    const checkWatched = () => {
        if (watched.length > 0) {
            setShowWatched(!showWatched);
        }
    }

    return (
        <div>
            <Card className={classes.root} >
                <CardActionArea>
                    <CardContent><br />
                        <CardMedia component={AccountCircleIcon} className={classes.media}></CardMedia>
                        <br />
                        <Typography className={classes.root} align="left" gutterBottom variant="h6"
                            component="h3"><b>{name}</b>  |&nbsp;<small>{city}</small></Typography>

                        <Typography className={classes.root} align="left" variant="body2"
                            color="textSecondary" component="p">{email}</Typography>
                    </CardContent>
                </CardActionArea>

                <CardActions >
                    <Button onClick={goToEditMember} size="small" variant="contained"
                        color="secondary">Edit</Button>
                    <Button onClick={deleteMember} size="small" variant="contained"
                        color="secondary">Delete</Button>
                    <Button onClick={checkWatched} size="small" variant="contained"
                        color="secondary">Watched List</Button>
                </CardActions>

                {showWatched ? <div >
                    <MemberWatchedList id={id} watched={watched} />
                </div> : ""}
            </Card>

        </div>
    )
}

export default MemberSingle;

