import { useState,useEffect} from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate,useParams } from "react-router-dom";
import { API } from "./global.js";

export function EditMovie() {
 
  const { id } = useParams();
  console.log(id);
  const [movie, setMovie] = useState(null);
  const getMovies=()=>{
    const res=fetch(`${API}/movies/${id}`,{
      method:"GET",
    });
    res.then((data)=>data.json()).then((mv)=>setMovie(mv));
  }
  useEffect(()=>getMovies(),[]);
  
  
  return (
    <div>
      {movie?<EditMovieForm movie={movie}/>:"...Loading"}
    </div>
  );
}

function EditMovieForm({movie}){
  const [name, setName] = useState(movie.name);
  const [poster, setPoster] = useState(movie.poster);
  const [rating, setRating] = useState(movie.rating);
  const [summary, setSummary] = useState(movie.summary);
  const [trailer, setTrailer] = useState(movie.trailer);
  const newmovie = {
    name: name,
    poster: poster,
    rating: rating,
    summary: summary,
    trailer: trailer,
  };
  const navigate=useNavigate();

  return(
    <div>
<div className="add-movie-form">
        <TextField
        value={name}
          id="standard-basic"
          label="Name"
          variant="standard"
          onChange={(event) => setName(event.target.value)} />
        <TextField
        value={poster}
          id="standard-basic"
          label="Poster"
          variant="standard"
          onChange={(event) => setPoster(event.target.value)} />
        <TextField
          value={rating}
          id="standard-basic"
          label="Rating"
          variant="standard"
          onChange={(event) => setRating(event.target.value)} />
        <TextField
          value={summary}
          id="standard-basic"
          label="Summary"
          variant="standard"
          onChange={(event) => setSummary(event.target.value)} />
        <TextField
          value={trailer}
          id="standard-basic"
          label="Trailer"
          variant="standard"
          onChange={(event) => setTrailer(event.target.value)} />
        <Button
          variant="outlined" color="success"
          onClick={() => {
            fetch(`${API}/movies/${movie.id}`,{
              method:"PUT",
              body:JSON.stringify(newmovie),
              headers:{
                "content-Type":"application/json",
              }
            })
            .then(()=>navigate("/movies"));


            console.log(newmovie);
          }}
        >
          save
        </Button>
      </div>
    </div>
  )
}