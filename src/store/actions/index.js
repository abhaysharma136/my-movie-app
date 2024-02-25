export const ADD_MOVIE = 'ADD_MOVIE';

export const setMovies = (newMovie) => ({
  type: ADD_MOVIE,
  payload: newMovie,
});