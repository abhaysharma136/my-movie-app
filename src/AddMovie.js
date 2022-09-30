import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { API } from "./global.js";

const movieValidationSchema = yup.object({
  name: yup.string().required("please Enter Movie Name"),
  poster: yup
    .string()
    .required("please Enter Movie Poster")
    .min(10, "Enter bigger poster"),
  rating: yup.number().required("please Enter Movie Rating").min(1).max(10),
  summary: yup
    .string()
    .required("please Enter Movie Summary")
    .min(20, "Enter Bigger Summary"),
  trailer: yup
    .string()
    .required("please Enter Movie Trailer")
    .min(10, "Please Enter Bigger trailer"),
});

export function AddMovie(newmovie) {
  // const [name, setName] = useState("");
  // const [poster, setPoster] = useState("");
  // const [rating, setRating] = useState("");
  // const [summary, setSummary] = useState("");
  // const [trailer, setTrailer] = useState("");

  // const newmovie = {
  //   name: name,
  //   poster: poster,
  //   rating: rating,
  //   summary: summary,
  //   trailer: trailer,
  // };
  const navigate = useNavigate();

  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        name: "",
        poster: "",
        rating: "",
        summary: "",
        trailer: "",
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
    </div>
  );
}
