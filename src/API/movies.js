import { API } from "../global";

export const getAllMovies = async () => {
  try {
    const response = await fetch(`${API}/movies`, { method: "GET" });
    const data = await response.json();
    console.log("ssss", data);
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const deleteMovie = async (id) => {
  try {
    await fetch(`${API}/movies/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

