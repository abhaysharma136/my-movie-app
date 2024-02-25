import { API } from "../global";

export const getAllActors = async () => {
    try {
      const response = await fetch(`${API}/movies/actors`, { method: "GET" });
      const data = await response.json();
      console.log("all actors", data);
      return data;
    } catch (error) {
      console.error("Error fetching actorss:", error);
      throw error;
    }
  };