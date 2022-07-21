import {
  useNavigate,
  useParams
} from "react-router-dom";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useState,useEffect } from "react";
import { API } from "./global.js";

export function MovieDetails() {
  
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const styles = {
    color: movie.rating >= 8 ? "green" : "red",
  };
  const getMovies=()=>{
    const res=fetch(`${API}/movies/${id}`,{
      method:"GET",
    });
    res.then((data)=>data.json()).then((mv)=>setMovie(mv));
  }
  useEffect(()=>getMovies(),[]);


  const navigate = useNavigate();
  return (
    <div>
      <iframe
        width="100%"
        height="550"
        src={movie.trailer}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
      <div className="movie-details-container">
        <div className="movie-specs">
          <h2 className="movie-name">{movie.name}</h2>
          <p style={styles} className="movie-rating">
            {movie.rating}⭐
          </p>
        </div>
        <p className="movie-summary">{movie.summary}</p>
      </div>
      <Button onClick={() => navigate(-1)} variant="outlined" startIcon={<ArrowBackIosIcon />}>
        Back
      </Button>
    </div>
  );
}
