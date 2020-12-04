import React from "react";
import { Link, useHistory } from 'react-router-dom';


function MovieWatchedList(props) {
    const history = useHistory();
    const goToMember = (id) => {
        history.push('/rosenflix/members/' + id);
    }

    let subscribers = props.watched.map((subObj, index) => {
        return <li key={index}>
            <Link to="#" onClick={() => goToMember(subObj.subId)}
                style={{ textDecoration: "none", color: "white" }}>
                {subObj.subscriber}, {subObj.dateWatched}
            </Link>
        </li>
    });

    return (<div>

        <div style={{ paddingLeft: "20px", textAlign: "left" }}>Watched List:
                        <ul style={{ paddingLeft: "20px" }}>{subscribers}</ul>
        </div>
    </div>
    )
}

export default MovieWatchedList