import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

export const MoviesContext = createContext();
export const MoviesContextProvider = (props) => {
    const [restMovies, setRestMovies] = useState([]);
    const [movies, setMovies] = useState([])

    useEffect(() => {
        axios.get("https://api.tvmaze.com/shows").then(resp => setRestMovies(resp.data.splice(0, 20)));
    }, [])

    useEffect(() => {
        setMovies(movies => [...movies, ...restMovies])

    }, [restMovies])

    useEffect(() => {
        movies.sort(function (a, b) {
            const keyA = a.name.toLowerCase(), keyB = b.name.toLowerCase();

            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;

            return 0;
        });

    }, [movies])

    return (
        <MoviesContext.Provider value={[movies, setMovies]}>
            {props.children}
        </MoviesContext.Provider>)
}


