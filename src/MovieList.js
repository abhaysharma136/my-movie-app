import { Movie } from "./Movie";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { API } from "./global.js";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { fetchMovies } from "./store/movies/moviesSlice.js";
import { deleteMovie } from "./API/movies.js";
export function MovieList() {
  const dispatch = useDispatch();
  const moviesArray = useSelector((state) => state.movies.moviesArray);
  console.log("MoviesList Redux : ", moviesArray);

  useEffect(() => {
    // Dispatch fetchMovies action when the component mounts
    dispatch(fetchMovies());
  }, [dispatch]);

  const handledeleteMovie = (id) => {
    deleteMovie(id).then(() => dispatch(fetchMovies()));
  };
  const navigate = useNavigate();
  return (
    <div>
      {moviesArray?.length > 0 ? (
        <div className="movie-container">
          {moviesArray?.map((mv) => (
            <Movie
              movie={mv}
              id={mv._id}
              key={mv._id}
              deleteButton={
                <IconButton
                  style={{ marginLeft: "auto" }}
                  color="error"
                  aria-label="delete"
                  onClick={() => handledeleteMovie(mv._id)}
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
