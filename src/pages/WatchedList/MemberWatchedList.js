import React from "react";
import { Link, useHistory } from 'react-router-dom';

function MemberWatchedList(props) {

    const history = useHistory();
    const goToMovie = (movieId) => {
        history.push('/rosenflix/movies/' + movieId);
    }

    let watchedItems = props.watched.map((item, index) => {
        return <li key={index}>
            <Link to="#" onClick={() => goToMovie(item.movieId)}
                style={{ textDecoration: "none", color: "white" }}>
                {item.movieToWatch}, {item.dateToWatch}
            </Link></li>
    });

    return (
        <div style={{ paddingLeft: "20px", textAlign: "left" }}>Watched List:
            <ul style={{ paddingLeft: "20px" }}>{watchedItems}</ul>
        </div>
    )
}

export default MemberWatchedList