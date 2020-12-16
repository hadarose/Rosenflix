import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "./MainPage.css";

// Movies
import { MoviesContextProvider } from "./Movies/MoviesContextAPI";
import Movies from "./Movies/Movies";
import MovieSingleComp from "./Movies/MovieSingle";
import AddNewMovie from "./Movies/AddNewMovie";
import EditMovie from "./Movies/EditMovie";

// Members
import { MembersContextProvider } from "./Members/MembersContextAPI";
import Members from "./Members/Members";
import MemberSingle from "./Members/MemberSingle";
import AddNewMember from "./Members/AddNewMember";
import EditMember from "./Members/EditMember";

function MainPage() {
  return (
    <div className="logoDiv">
      <a href="/rosenflix" alt="Rose-N-Flix" className="logoLink">
        <h1 className="logoHeadline">
          <em>Rose</em>
          <img
            alt="Netflix Icon"
            src="https://e1.pngegg.com/pngimages/10/90/png-clipart-clay-os-6-a-macos-icon-netflix-netflix-logo.png"
            className="logoImg"
          />
          <em>flix</em>
        </h1>
      </a>

      <div className="mainBtnsDiv">
        <Button
          variant="contained"
          color="default"
          style={{ marginRight: "10px" }}
          component={Link}
          to={"/rosenflix/movies/"}
        >
          Movies
        </Button>

        <Button
          variant="contained"
          color="default"
          component={Link}
          to={"/rosenflix/members/"}
        >
          Members
        </Button>
      </div>

      <MembersContextProvider>
        <MoviesContextProvider>
          <Switch>
            <Route exact path="/rosenflix/movies" component={Movies} />
            <Route
              exact
              path="/rosenflix/movies/:id"
              component={MovieSingleComp}
            />
            <Route path="/rosenflix/add-new-movie" component={AddNewMovie} />
            <Route path="/rosenflix/edit-movie/:id" component={EditMovie} />

            <Route exact path="/rosenflix/members/" component={Members} />
            <Route
              exact
              path="/rosenflix/members/:id"
              component={MemberSingle}
            />
            <Route path="/rosenflix/add-new-member" component={AddNewMember} />
            <Route path="/rosenflix/edit-member/:id" component={EditMember} />
          </Switch>
        </MoviesContextProvider>
      </MembersContextProvider>
    </div>
  );
}

export default MainPage;
