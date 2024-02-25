import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
// import { useNavigate } from "react-router-dom";
import { API } from "../global.js";
import { Button, Stack, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchProducers } from "../store/movies/moviesSlice.js";

const producerValidationSchema = yup.object({
  producerName: yup.string().required("Producer's Name Can't be empty"),
});
export default function AddProducer() {
  const dispatch = useDispatch();
  const { handleSubmit, handleChange, handleBlur, touched, values, errors } =
    useFormik({
      initialValues: {
        producerName: "",
      },
      validationSchema: producerValidationSchema,
      onSubmit: async (newproducer, { resetForm }) => {
        console.log("onsubmit", newproducer);
        try {
          console.log("onsubmit", newproducer);
          await addProducer(newproducer);
          dispatch(fetchProducers());
          resetForm();
        } catch (error) {
          console.error("Error adding movie:", error);
        }
      },
    });
  async function addProducer(newproducer) {
    try {
      const response = await fetch(`${API}/movies/producer`, {
        method: "POST",
        body: JSON.stringify(newproducer),
        headers: {
          "content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to add movie: ${response.statusText}`);
      }

      console.log(newproducer);
      // setMovieList([...movieList, newmovie]);
    } catch (error) {
      console.error("Error adding movie:", error);
    }
  }
  useEffect(() => {
    // Dispatch fetchMovies action when the component mounts
    dispatch(fetchProducers());
  }, [dispatch]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="add-movie-form">
          <TextField
            id="standard-basic"
            label="Name"
            variant="outlined"
            name="producerName"
            value={values.producerName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.producerName && errors.producerName ? true : false}
            helperText={
              touched.producerName && errors.producerName
                ? errors.producerName
                : ""
            }
          />
        </div>
        <Stack direction="row" justifyContent="center">
          <Button type="submit" variant="text">
            Add Producer
          </Button>
        </Stack>
      </form>
    </div>
  );
}
