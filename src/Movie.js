import { useNavigate } from "react-router-dom";
import { useState } from "react";
// import { Counter } from "./Counter";
import IconButton from "@mui/material/IconButton";
import InfoIcon from "@mui/icons-material/Info";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

export function Movie({ movie, id, deleteButton, EditButton }) {
  const styles = {
    color: movie.rating >= 8 ? "green" : "red",
  };
  var [show, setShow] = useState(true);
  // const parastyles={
  //   display:show?'block':"none",
  // }
  const navigate = useNavigate();
  const { actors, producers } = movie;
  return (
    <div className="container-top">
      <Card>
        <div className="movie-details">
          <img
            className="movie-poster"
            src={movie.poster}
            alt={movie.name}
          ></img>
          <CardContent>
            <div className="movie-specs">
              <h3>
                {movie.name}
                <IconButton
                  aria-label="info"
                  color="primary"
                  onClick={() => navigate(`/movies${id}`)}
                >
                  <InfoIcon />
                </IconButton>
              </h3>
              <p>{movie.year}</p>
              <p style={styles}>{movie.rating}⭐</p>
            </div>
            <div>
              <h3>Actors: {actors?.map((actor) => actor).join(", ")}</h3>
              <h3>Producer: {producers?.map((actor) => actor).join(", ")}</h3>
              {/* <h3>{movie.producer}</h3> */}
            </div>
            {show ? <p className="movie-summary">{movie.summary}</p> : null}
            <div className="like-dislike">
              <CardActions>
                <div className="movie-buttons">
                  <div>{deleteButton}</div>
                  <div>{EditButton}</div>
                </div>
              </CardActions>
            </div>
            <IconButton
              color="primary"
              aria-label="toggle"
              onClick={() => setShow(!show)}
            >
              {show ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </CardContent>
        </div>
      </Card>
    </div>
  );
}
