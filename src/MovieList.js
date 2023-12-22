import { Movie } from "./Movie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API } from "./global.js";
import CircularProgress from "@mui/material/CircularProgress";
export function MovieList() {
  const [movieList, setMovieList] = useState([]);
  console.log("movvieLiList :" + JSON.stringify(movieList));
  const getMovies = () => {
    const res = fetch(`${API}/movies`, {
      method: "GET",
    });
    res
      .then((data) => data.json())
      .then((mvs) => setMovieList(mvs))
      .catch((error) => console.log(error));
  };
  useEffect(() => getMovies(), []);

  const deleteMovie = (id) => {
    fetch(`${API}/movies/${id}`, {
      method: "DELETE",
    }).then(() => getMovies());
  };
  const navigate = useNavigate();
  return (
    <div>
      {movieList.length > 0 ? (
        <div className="movie-container">
          {movieList.map((mv) => (
            <Movie
              movie={mv}
              id={mv._id}
              key={mv._id}
              deleteButton={
                <IconButton
                  style={{ marginLeft: "auto" }}
                  color="error"
                  aria-label="delete"
                  onClick={() => deleteMovie(mv._id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
              EditButton={
                <IconButton
                  color="primary"
                  aria-label="delete"
                  onClick={() => navigate(`/movies/edit/${mv._id}`)}
                >
                  <EditIcon />
                </IconButton>
              }
            />
          ))}
        </div>
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}
