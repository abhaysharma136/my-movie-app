import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState, useEffect } from "react";
import { API } from "./global.js";

export function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  const getMovies = () => {
    const res = fetch(`${API}/movies/${id}`, {
      method: "GET",
    });
    res.then((data) => data.json()).then((mv) => setMovie(mv));
  };
  useEffect(() => getMovies(), []);

  const navigate = useNavigate();
  return (
    <div className="movie-details-container">
      <h1 className="movie-details-heading">{movie?.name}</h1>
      <h3 className="movie-details-heading">{movie?.year}</h3>
      <div className="movie-details-inner-container1">
        <img
          src={movie?.poster}
          alt={movie?.name}
          className="movie-detail-poster"
        />
        <div className="movie-details-trailer">
          <iframe
            src={movie.trailer}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer autoplay clipboard-write encrypted-media gyroscope picture-in-picture"
            allowFullScreen={true}
          ></iframe>
        </div>
      </div>

      <div>
        <h3 className="movie-details-heading">{movie?.summary}</h3>
        <div
          style={{ display: "flex", gap: "5px" }}
          className="movie-details-heading"
        >
          <h3>Actors </h3>
          {movie?.producers?.map((ele, ind) => (
            <h3 key={ind}>{ele}</h3>
          ))}
        </div>
        <div
          style={{ display: "flex", gap: "5px" }}
          className="movie-details-heading"
        >
          <h3>Actors </h3>
          {movie?.actors?.map((ele, ind) => (
            <h3 key={ind}>{ele}</h3>
          ))}
        </div>
      </div>

      <Button
        onClick={() => navigate(-1)}
        variant="outlined"
        startIcon={<ArrowBackIosIcon />}
      >
        Back
      </Button>
    </div>
  );
}
