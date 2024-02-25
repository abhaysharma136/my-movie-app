import { createSlice } from "@reduxjs/toolkit";
import { getAllMovies } from "../../API/movies";
import { getAllActors } from "../../API/actors";
import { getAllProducers } from "../../API/producers";

const initialState = {
  moviesArray: [],
  actorsArray: [],
  producersArray: [],
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies: (state, action) => {
      state.moviesArray = action.payload;
    },
    setActors: (state, action) => {
      state.actorsArray = action.payload;
    },
    setProducers: (state, action) => {
      state.producersArray = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setMovies, setActors, setProducers } = moviesSlice.actions;
// Thunk to fetch movies
export const fetchMovies = () => async (dispatch) => {
  try {
    const movies = await getAllMovies();
    dispatch(setMovies(movies));
  } catch (error) {
    console.error("Error fetching movies:", error);
    // Handle error or dispatch an error action
  }
};

export const fetchActors = () => async (dispatch) => {
  try {
    const actors = await getAllActors();
    dispatch(setActors(actors));
  } catch (error) {
    console.error("Error fetching actors:", error);
    // Handle error or dispatch an error action
  }
};

export const fetchProducers = () => async (dispatch) => {
    try {
      const producers = await getAllProducers();
      dispatch(setProducers(producers));
    } catch (error) {
      console.error("Error fetching producers:", error);
      // Handle error or dispatch an error action
    }
  };
export default moviesSlice.reducer;
