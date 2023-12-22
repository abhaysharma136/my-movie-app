import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./global.js";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";

const movieValidationSchema = yup.object({
  name: yup.string().required("Movie Name Can't be empty"),
  poster: yup
    .string()
    .required("please Enter Movie Poster")
    .min(10, "Enter bigger poster"),
  rating: yup
    .number()
    .typeError("Please enter a valid number for Movie Rating")
    .required("please Enter Movie Rating")
    .min(1)
    .max(10),
  summary: yup
    .string()
    .required("please Enter Movie Summary")
    .min(20, "Summary should be atleast 20 characters"),
  trailer: yup.string().required("please Enter Movie Trailer"),
  actors: yup.array().nullable().min(1, "Please select at least one actor"),
  producer: yup.string().required("Please select a producer"),
  year: yup.number().required("Please Enter Movie Year"),
});
const actorValidationSchema = yup.object({
  actorName: yup.string().required("Actor Name Can't be empty"),
});
const producerValidationSchema = yup.object({
  producerName: yup.string().required("Producer Name Can't be empty"),
});
export function AddMovie(newmovie) {
  async function fetchActorsFromAPI() {
    try {
      const response = await fetch(`${API}/movies/actors`); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch actors");
      }

      const actorsList = await response.json();
      return actorsList;
    } catch (error) {
      console.error("Error fetching actors:", error.message);
      throw error;
    }
  }
  const [actorsList, setActorsList] = useState([]);
  console.log(actorsList);

  useEffect(() => {
    async function fetchActors() {
      try {
        const fetchedActors = await fetchActorsFromAPI();
        setActorsList(fetchedActors);
      } catch (error) {
        // Handle error if needed
      }
    }

    fetchActors();
  }, []);

  async function fetchProducersFromAPI() {
    try {
      const response = await fetch(`${API}/movies/producers`); // Replace with your actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch producers");
      }

      const prodcuersList = await response.json();
      return prodcuersList;
    } catch (error) {
      console.error("Error fetching producers:", error.message);
      throw error;
    }
  }
  const [producersList, setProducersList] = useState([]);
  console.log("producerName", producersList);

  useEffect(() => {
    async function fetchActors() {
      try {
        const fetchedProducers = await fetchProducersFromAPI();
        setProducersList(fetchedProducers);
      } catch (error) {
        // Handle error if needed
      }
    }

    fetchActors();
  }, []);

  const navigate = useNavigate();
  const [popUpOpen, setPopUpOpen] = useState(0);
  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        name: "",
        poster: "",
        rating: "",
        summary: "",
        trailer: "",
        actors: [],
        producer: "",
        year: "",
      },
      validationSchema: movieValidationSchema,
      onSubmit: (newmovie) => {
        console.log("onsubmit", newmovie);
        addMovie(newmovie);
      },
    });
  function addMovie(newmovie) {
    fetch(`${API}/movies/add`, {
      method: "POST",
      body: JSON.stringify(newmovie),
      headers: {
        "content-Type": "application/json",
      },
    }).then(() => navigate("/movies"));

    console.log(newmovie);
    // setMovieList([...movieList, newmovie]);
  }
  const handleActorsChange = (event) => {
    const selectedActors = event.target.value;
    handleChange({
      target: {
        name: "actors",
        value: selectedActors,
      },
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="add-movie-form">
          <TextField
            id="standard-basic"
            label="Name"
            variant="standard"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name}
            helperText={touched.name && errors.name ? errors.name : ""}
          />
          <FormControl variant="outlined">
            <InputLabel id="actors-label">Actors</InputLabel>
            <Select
              labelId="actors-label"
              id="outlined-select-actors"
              label="Actors"
              multiple
              value={values.actors.map((actor) => actor.actorName)}
              onChange={handleActorsChange} // Use the new handler for actors
              onBlur={handleBlur}
              error={touched.actors && errors.actors}
              renderValue={(selected) => selected.join(", ")} // Display the selected values
            >
              {actorsList.map((actor) => (
                <MenuItem key={actor} value={actor}>
                  {actor.actorName}
                </MenuItem>
              ))}
            </Select>
            {touched.actors && errors.actors && (
              <FormHelperText error>{errors.actors}</FormHelperText>
            )}
          </FormControl>
          {/* Producer Select Field */}
          <TextField
            id="outlined-select-producer"
            select
            label="Producer"
            variant="outlined"
            name="producer"
            value={values.producer.producerName} // Assuming _id is a unique identifier
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.producer && errors.producer}
            helperText={
              touched.producer && errors.producer ? errors.producer : ""
            }
          >
            {producersList.map((producer) => (
              <MenuItem key={producer._id} value={producer.producerName}>
                {producer.producerName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="standard-basic"
            label="Poster"
            variant="standard"
            name="poster"
            value={values.poster}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.poster && errors.poster}
            helperText={touched.poster && errors.poster ? errors.poster : ""}
          />

          <TextField
            id="standard-basic"
            label="Rating"
            variant="standard"
            name="rating"
            value={values.rating}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.rating && errors.rating}
            helperText={touched.rating && errors.rating ? errors.rating : ""}
          />
          <TextField
            id="standard-basic"
            label="Release Year"
            variant="standard"
            name="year"
            value={values.year}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.year && errors.year}
            helperText={touched.year && errors.year ? errors.year : ""}
            type="number"
          />
          <TextField
            id="standard-basic"
            label="Summary"
            variant="standard"
            name="summary"
            value={values.summary}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.summary && errors.summary}
            helperText={touched.summary && errors.summary ? errors.summary : ""}
          />

          <TextField
            id="standard-basic"
            label="Trailer"
            variant="standard"
            name="trailer"
            value={values.trailer}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.trailer && errors.trailer}
            helperText={touched.trailer && errors.trailer ? errors.trailer : ""}
          />

          <Button type="submit" variant="contained">
            Add Movies
          </Button>
        </div>
      </form>
      <div>
        <Button
          type="button"
          variant="outlined"
          onClick={() => setPopUpOpen(1)}
        >
          Add Actor
        </Button>
        <Button
          type="button"
          variant="outlined"
          onClick={() => setPopUpOpen(2)}
        >
          Add Producer
        </Button>
      </div>
      {popUpOpen && popUpOpen === 1 && <AddActor />}
      {popUpOpen && popUpOpen === 2 && <AddProducer />}
      <Button type="button" variant="contained" onClick={() => setPopUpOpen(0)}>
        Clear
      </Button>
    </div>
  );
}

function AddActor() {
  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        actorName: "",
      },
      validationSchema: actorValidationSchema,
      onSubmit: (newActor) => {
        console.log("onsubmit", newActor);
        addActor(newActor);
      },
    });
  function addActor(newActor) {
    fetch(`${API}/movies/actor`, {
      method: "POST",
      body: JSON.stringify(newActor),
      headers: {
        "content-Type": "application/json",
      },
    });

    console.log(newActor);
    // setMovieList([...movieList, newmovie]);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="add-movie-form">
          <TextField
            id="standard-basic"
            label="Actor Name"
            variant="standard"
            name="actorName"
            value={values.actorName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.actorName && errors.actorName}
            helperText={
              touched.actorName && errors.actorName ? errors.actorName : ""
            }
          />

          <Button type="submit" variant="contained">
            Add Actor
          </Button>
        </div>
      </form>
    </>
  );
}

function AddProducer() {
  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        producerName: "",
      },
      validationSchema: producerValidationSchema,
      onSubmit: (newProducer) => {
        console.log("onsubmit", newProducer);
        addProducer(newProducer);
      },
    });
  function addProducer(newProducer) {
    fetch(`${API}/movies/producer`, {
      method: "POST",
      body: JSON.stringify(newProducer),
      headers: {
        "content-Type": "application/json",
      },
    });

    console.log(newProducer);
    // setMovieList([...movieList, newmovie]);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="add-movie-form">
          <TextField
            id="standard-basic"
            label="Producer Name"
            variant="standard"
            name="producerName"
            value={values.producerName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.producerName && errors.producerName}
            helperText={
              touched.producerName && errors.producerName
                ? errors.producerName
                : ""
            }
          />

          <Button type="submit" variant="contained">
            Add Producer
          </Button>
        </div>
      </form>
    </>
  );
}
