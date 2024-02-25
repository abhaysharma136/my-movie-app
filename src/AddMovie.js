import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./global.js";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AddActor from "./Components/addActor.jsx";
import AddProducer from "./Components/addProducer.jsx";
import * as React from "react";
import { SwipeableDrawer } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchActors, fetchProducers } from "./store/movies/moviesSlice.js";
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
  year: yup.number().required("Please Enter Movie Year"),
  actors: yup
    .array()
    .nullable()
    .test(
      "atLeastOneActor",
      "Please select at least one actor",
      function (value) {
        return value && value.length > 0;
      }
    ),
  producers: yup
    .array()
    .nullable()
    .test(
      "atLeastOneActor",
      "Please select at least one producer",
      function (value) {
        return value && value.length > 0;
      }
    ),
});

export function AddMovie(newmovie) {
  const dispatch = useDispatch();
  const actorsArray = useSelector((state) => state.movies.actorsArray);
  console.log("ActorsList Redux : ", actorsArray);
  let actorNames = actorsArray.map((actor) => actor.actorName);
  console.log("ActorNames : ", actorNames);

  const producersArray = useSelector((state) => state.movies.producersArray);
  console.log("ProducersList Redux : ", producersArray);
  let producersNames = producersArray.map((producer) => producer.producerName);
  console.log("ActorNames : ", actorNames);
  // async function fetchActorsFromAPI() {
  //   try {
  //     const response = await fetch(`${API}/movies/actors`); // Replace with your actual API endpoint
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch actors");
  //     }

  //     const actorsList = await response.json();
  //     return actorsList;
  //   } catch (error) {
  //     console.error("Error fetching actors:", error.message);
  //     throw error;
  //   }
  // }
  // const [actorsList, setActorsList] = useState([]);
  // console.log(actorsList);

  useEffect(() => {
    // Dispatch fetchMovies action when the component mounts
    dispatch(fetchActors());
    dispatch(fetchProducers());
  }, [dispatch]);

  // async function fetchProducersFromAPI() {
  //   try {
  //     const response = await fetch(`${API}/movies/producers`); // Replace with your actual API endpoint
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch producers");
  //     }

  //     const prodcuersList = await response.json();
  //     return prodcuersList;
  //   } catch (error) {
  //     console.error("Error fetching producers:", error.message);
  //     throw error;
  //   }
  // }
  // const [producersList, setProducersList] = useState([]);
  // console.log("producerName", producersList);

  // useEffect(() => {
  //   async function fetchActors() {
  //     try {
  //       const fetchedProducers = await fetchProducersFromAPI();
  //       setProducersList(fetchedProducers);
  //     } catch (error) {
  //       // Handle error if needed
  //     }
  //   }

  //   fetchActors();
  // }, []);

  const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        name: "",
        poster: "",
        rating: "",
        summary: "",
        trailer: "",
        actors: [],
        producers: [],
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

  // const actorNames = [
  //   "Oliver Hansen",
  //   "Van Henry",
  //   "April Tucker",
  //   "Ralph Hubbard",
  //   "Omar Alexander",
  //   "Carlos Abbott",
  //   "Miriam Wagner",
  //   "Bradley Wilkerson",
  //   "Virginia Andrews",
  //   "Kelly Snyder",
  // ];

  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const theme = useTheme();
  const handleChangeActors = (event) => {
    const {
      target: { value },
    } = event;

    // Use handleChange from useFormik to update form values
    handleChange("actors")({ target: { value } });
  };

  // handlechange function to update from useFormik to update form values of producers
  // const producersNames = [
  //   "Oliver Hansen",
  //   "Van Henry",
  //   "April Tucker",
  //   "Ralph Hubbard",
  //   "Omar Alexander",
  //   "Carlos Abbott",
  //   "Miriam Wagner",
  //   "Bradley Wilkerson",
  //   "Virginia Andrews",
  //   "Kelly Snyder",
  // ];
  const handleChangeProducers = (event) => {
    const {
      target: { value },
    } = event;

    // Use handleChange from useFormik to update form values
    handleChange("producers")({ target: { value } });
  };

  // State to render the Add Actors or Add producers Buttons
  // const [toggleButton, setTogglButton] = useState(false);

  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="add-movie-form">
          <TextField
            id="standard-basic"
            label="Name"
            variant="outlined"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && errors.name ? true : false}
            helperText={touched.name && errors.name ? errors.name : ""}
          />

          <TextField
            id="standard-basic"
            label="Poster"
            variant="outlined"
            name="poster"
            value={values.poster}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.poster && errors.poster ? true : false}
            helperText={touched.poster && errors.poster ? errors.poster : ""}
          />

          <TextField
            type="number"
            id="standard-basic"
            label="Rating"
            variant="outlined"
            name="rating"
            value={values.rating}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.rating && errors.rating ? true : false}
            helperText={touched.rating && errors.rating ? errors.rating : ""}
          />
          <TextField
            id="standard-basic"
            label="Release Year"
            variant="outlined"
            name="year"
            value={values.year}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.year && errors.year ? true : false}
            helperText={touched.year && errors.year ? errors.year : ""}
            type="number"
          />
          <TextField
            id="standard-basic"
            label="Summary"
            variant="outlined"
            name="summary"
            value={values.summary}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.summary && errors.summary ? true : false}
            helperText={touched.summary && errors.summary ? errors.summary : ""}
          />

          <TextField
            id="standard-basic"
            label="Trailer"
            variant="outlined"
            name="trailer"
            value={values.trailer}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.trailer && errors.trailer ? true : false}
            helperText={touched.trailer && errors.trailer ? errors.trailer : ""}
          />
          <div style={{ textAlign: "left" }}>
            <FormControl sx={{ width: 300 }}>
              <InputLabel id="demo-multiple-name-label">Name</InputLabel>
              <Select
                name="actors"
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={values.actors}
                onChange={handleChangeActors}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
                onBlur={handleBlur}
              >
                {actorNames.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, values.actors, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {touched.actors && errors.actors && (
                <div style={{ color: "red" }}>{errors.actors}</div>
              )}
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
                value={values.producers}
                onChange={handleChangeProducers}
                input={<OutlinedInput label="Name" />}
                MenuProps={MenuProps}
                onBlur={handleBlur}
              >
                {producersNames.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, values.producers, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
              {touched.producers && errors.producers && (
                <div style={{ color: "red" }}>{errors.producers}</div>
              )}
            </FormControl>
          </div>
          <Button type="submit" variant="contained">
            Add Movies
          </Button>
          <React.Fragment>
            <Button type="button" onClick={toggleDrawer("bottom", true)}>
              want to add new producers or actors?
            </Button>
            <SwipeableDrawer
              anchor={"bottom"}
              open={state["bottom"]}
              onClose={toggleDrawer("bottom", false)}
              onOpen={toggleDrawer("bottom", true)}
            >
              <div>
                <AddActor />
                <AddProducer />
              </div>
            </SwipeableDrawer>
          </React.Fragment>
        </div>
      </form>
    </div>
  );
}
