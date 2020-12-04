import React, { useContext, useState } from 'react';
import { MembersContext } from "./MembersContextAPI";
import { MoviesContext } from "../Movies/MoviesContextAPI";
import { useHistory } from 'react-router-dom';
import AddToWatched from "../WatchedList/AddToWatched";
import MemberWatchedList from "../WatchedList/MemberWatchedList";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import "../../index.css";

function Member(props) {
    const history = useHistory();
    const [members, setMembers] = useContext(MembersContext);
    const [movies] = useContext(MoviesContext);
    const [showMenu, setShowMenu] = useState(false);
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

    const deleteMember = () => {
        let index = members.findIndex(item => item.id === props.member.id);
        members.splice(index, 1);
        setMembers([...members]);

        // Finding the movies that the deleted member apears in them
        let haveWatchedMovies = movies.filter(item => item.watched)
            .filter(item => item.watched.find(watchedItem => watchedItem.subscriber === props.member.name))

        // Deleting the member from each movie watched array
        haveWatchedMovies.forEach(watchedMovie => {
            let watchedIndex = watchedMovie.watched.findIndex(memberObj => memberObj.subId === props.member.id);
            watchedMovie.watched.splice(watchedIndex, 1);
        })

        // Redirect to members so it renders after deletion
        history.push('/rosenflix/members');
    }

    const goToMember = () => {
        history.push('/rosenflix/members/' + props.member.id);
    }

    const goToEditMember = () => {
        history.push('/rosenflix/edit-member/' + props.member.id);
    }

    const checkWatched = () => {
        if (props.member.watched) {
            setShowWatched(!showWatched);
        }
    }

    const goToAddToWatch = () => {
        setShowMenu(!showMenu);
    }

    return (
        <div>
            <Card className={classes.root} >
                <CardActionArea onClick={goToMember}>
                    <CardContent ><br />
                        <CardMedia component={AccountCircleIcon} className={classes.media} />

                        <Typography
                            className={classes.root}
                            align="left"
                            gutterBottom variant="h6"
                            component="h3"><b>{props.member.name}</b> |&nbsp;
                            <small>{props.member.address.city}</small>
                        </Typography>

                        <Typography
                            className={classes.root}
                            align="left"
                            variant="body2"
                            color="textSecondary"
                            component="p">
                            {props.member.email}
                        </Typography>
                    </CardContent>
                </CardActionArea>


                <Button
                    onClick={goToAddToWatch}
                    variant="contained"
                    color="default" size="small"
                    className={classes.button}
                    startIcon={<CloudUploadIcon />}>
                    <small>Movie Subscribe</small>
                </Button>

                {showMenu ? <AddToWatched member={props.member} /> : ""}

                <div className="btnsMainDiv">
                    <div className="btnsDiv" >
                        <CardActions >
                            <Button
                                onClick={goToEditMember}
                                size="small"
                                variant="contained"
                                color="secondary">Edit</Button>
                            <Button
                                onClick={deleteMember}
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

                {showWatched ? <div >
                    <MemberWatchedList id={props.member.id} watched={props.member.watched} />
                </div> : ""}
            </Card>
        </div>
    )
}

export default Member;


