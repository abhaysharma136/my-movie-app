import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import { API } from "../global.js";
import { Button, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchActors } from "../store/movies/moviesSlice.js";
const actorValidationSchema = yup.object({
  actorName: yup.string().required("Actor's Name Can't be empty"),
});

export default function AddActor() {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        actorName: "",
      },
      validationSchema: actorValidationSchema,
      onSubmit: async (newactor, { resetForm }) => {
        try {
          console.log("onsubmit", newactor);
          await addActor(newactor);
          dispatch(fetchActors());
          resetForm();
        } catch (error) {
          console.error("Error adding movie:", error);
        }
      },
    });
  async function addActor(newactor) {
    try {
      const response = await fetch(`${API}/movies/actor`, {
        method: "POST",
        body: JSON.stringify(newactor),
        headers: {
          "content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to add actor: ${response.statusText}`);
      }

      console.log(newactor);
      // setMovieList([...movieList, newmovie]);
    } catch (error) {
      console.error("Error adding actor:", error);
    }
  }
  useEffect(() => {
    // Dispatch fetchMovies action when the component mounts
    dispatch(fetchActors());
  }, [dispatch]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="add-movie-form">
          <TextField
            id="standard-basic"
            label="Name"
            variant="outlined"
            name="actorName"
            value={values.actorName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.actorName && errors.actorName ? true : false}
            helperText={
              touched.actorName && errors.actorName ? errors.actorName : ""
            }
          />
        </div>
        <Stack direction="row" justifyContent="center">
          <Button type="submit" variant="text">
            Add Actor
          </Button>
        </Stack>
      </form>
    </div>
  );
}
