import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "./global.js";
import CircularProgress from "@mui/material/CircularProgress";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { fetchActors, fetchProducers } from "./store/movies/moviesSlice.js";

export function EditMovie() {
  const { id } = useParams();
  console.log(id);
  const [movie, setMovie] = useState(null);
  const getMovies = () => {
    const res = fetch(`${API}/movies/${id}`, {
      method: "GET",
    });
    res.then((data) => data.json()).then((mv) => setMovie(mv));
  };
  useEffect(() => getMovies(), []);

  return (
    <div>{movie ? <EditMovieForm movie={movie} /> : <CircularProgress />}</div>
  );
}

function EditMovieForm({ movie }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(movie.name);
  const [poster, setPoster] = useState(movie.poster);
  const [rating, setRating] = useState(movie.rating);
  const [year, setYear] = useState(movie.year);
  const [summary, setSummary] = useState(movie.summary);
  const [trailer, setTrailer] = useState(movie.trailer);
  const [actors, setActors] = useState(movie?.actors || []);
  const [producers, setProducers] = useState(movie?.producers || []);
  console.log("Actors1234: ", actors);
  const newmovie = {
    name: name,
    poster: poster,
    rating: rating,
    summary: summary,
    trailer: trailer,
    actors: actors,
    producers: producers,
  };
  const navigate = useNavigate();
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName?.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();
  // function to handle actors change
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const actorsArray = useSelector((state) => state.movies.actorsArray);
  console.log("ActorsList Redux : ", actorsArray);
  let actorNames = actorsArray.map((actor) => actor.actorName);
  console.log("ActorNames : ", actorNames);

  const handleChangeActors = (event) => {
    const {
      target: { value },
    } = event;

    // Use handleChange from useFormik to update form values
    const selectedActors = Array.isArray(value) ? value : [value];
    setActors(selectedActors);
  };

  const producersArray = useSelector((state) => state.movies.producersArray);
  console.log("ProducersList Redux : ", producersArray);
  let producersNames = producersArray.map((producer) => producer.producerName);
  console.log("ActorNames : ", actorNames);

  const handleChangeProducers = (event) => {
    const {
      target: { value },
    } = event;

    // Use handleChange from useFormik to update form values
    const selectedProducers = Array.isArray(value) ? value : [value];
    setProducers(selectedProducers);
  };

  useEffect(() => {
    // Dispatch fetchMovies action when the component mounts
    dispatch(fetchActors());
    dispatch(fetchProducers());
  }, [dispatch]);

  return (
    <div>
      <div className="add-movie-form">
        <TextField
          value={name}
          id="standard-basic"
          label="Name"
          variant="standard"
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          value={poster}
          id="standard-basic"
          label="Poster"
          variant="standard"
          onChange={(event) => setPoster(event.target.value)}
        />
        <TextField
          value={rating}
          id="standard-basic"
          label="Rating"
          variant="standard"
          onChange={(event) => setRating(event.target.value)}
        />
        <TextField
          value={year}
          id="standard-basic"
          label="Release Year"
          variant="standard"
          onChange={(event) => setYear(event.target.value)}
        />
        <TextField
          value={summary}
          id="standard-basic"
          label="Summary"
          variant="standard"
          onChange={(event) => setSummary(event.target.value)}
        />
        <TextField
          value={trailer}
          id="standard-basic"
          label="Trailer"
          variant="standard"
          onChange={(event) => setTrailer(event.target.value)}
        />
        <div style={{ textAlign: "left" }}>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Name</InputLabel>
            <Select
              name="actors"
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={actors}
              onChange={handleChangeActors}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
            >
              {actorNames.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, actors, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
            {/* {touched.actors && errors.actors && (
                <div style={{ color: "red" }}>{errors.actors}</div>
              )} */}
          </FormControl>
        </div>
        <div style={{ textAlign: "left" }}>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="demo-multiple-name-label">Producers</InputLabel>
            <Select
              name="producers"
              labelId="demo-multiple-name-label"
              id="demo-multiple-name"
              multiple
              value={producers}
              onChange={handleChangeProducers}
              input={<OutlinedInput label="Name" />}
              MenuProps={MenuProps}
              // onBlur={handleBlur}
            >
              {producersNames.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, producers, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
            {/* {touched.producers && errors.producers && (
                <div style={{ color: "red" }}>{errors.producers}</div>
              )} */}
          </FormControl>
        </div>
        <Button
          type="submit"
          variant="outlined"
          color="success"
          onClick={() => {
            fetch(`${API}/movies/${movie._id}`, {
              method: "PUT",
              body: JSON.stringify(newmovie),
              headers: {
                "content-Type": "application/json",
              },
            }).then(() => navigate("/movies"));

            console.log(newmovie);
          }}
        >
          save
        </Button>
      </div>
    </div>
  );
}
