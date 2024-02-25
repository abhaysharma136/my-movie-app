import { API } from "../global";

export const getAllProducers = async () => {
    try {
      const response = await fetch(`${API}/movies/producers`, { method: "GET" });
      const data = await response.json();
      console.log("all producers", data);
      return data;
    } catch (error) {
      console.error("Error fetching producers:", error);
      throw error;
    }
  };