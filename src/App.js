import {
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AddColor } from "./AddColor";
import { useState } from "react";
import "./App.css";
import { Home } from "./Home";
import Button from "@mui/material/Button";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { MovieDetails } from "./MovieDetails";
import { AddMovie } from "./AddMovie";
import { NotFound } from "./NotFound";
import { MovieList } from "./MovieList";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { EditMovie } from "./EditMovie";
import {BasicForm} from "./BasicForm";
import Dummy from "./Dummy";

function App() {
  // var InitialMovieList = [
  //   {
  //     id: "101",
  //     name: "RRR",
  //     poster:
  //       "https://englishtribuneimages.blob.core.windows.net/gallary-content/2021/6/Desk/2021_6$largeimg_977224513.JPG",
  //     rating: 8.8,
  //     summary:
  //       "RRR is an upcoming Indian Telugu-language period action drama film directed by S. S. Rajamouli, and produced by D. V. V. Danayya of DVV Entertainments.",
  //     trailer: "https://www.youtube.com/embed/xo1P2sQdhC0",
  //   },
  //   {
  //     id: "102",
  //     name: "Iron man 2",
  //     poster:
  //       "https://m.media-amazon.com/images/M/MV5BMTM0MDgwNjMyMl5BMl5BanBnXkFtZTcwNTg3NzAzMw@@._V1_FMjpg_UX1000_.jpg",
  //     rating: 7,
  //     summary:
  //       "With the world now aware that he is Iron Man, billionaire inventor Tony Stark (Robert Downey Jr.) faces pressure from all sides to share his technology with the military. He is reluctant to divulge the secrets of his armored suit, fearing the information will fall into the wrong hands. With Pepper Potts (Gwyneth Paltrow) and Rhodes (Don Cheadle) by his side, Tony must forge new alliances and confront a powerful new enemy.",
  //     trailer: "https://www.youtube.com/embed/wKtcmiifycU",
  //   },
  //   {
  //     id: "103",
  //     name: "No Country for Old Men",
  //     poster:
  //       "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg",
  //     rating: 8.1,
  //     summary:
  //       "A hunter's life takes a drastic turn when he discovers two million dollars while strolling through the aftermath of a drug deal. He is then pursued by a psychopathic killer who wants the money.",
  //     trailer: "https://www.youtube.com/embed/38A__WT3-o0",
  //   },
  //   {
  //     id: "104",
  //     name: "Jai Bhim",
  //     poster:
  //       "https://m.media-amazon.com/images/M/MV5BY2Y5ZWMwZDgtZDQxYy00Mjk0LThhY2YtMmU1MTRmMjVhMjRiXkEyXkFqcGdeQXVyMTI1NDEyNTM5._V1_FMjpg_UX1000_.jpg",
  //     summary:
  //       "A tribal woman and a righteous lawyer battle in court to unravel the mystery around the disappearance of her husband, who was picked up the police on a false case",
  //     rating: 8.8,
  //     trailer: "https://www.youtube.com/embed/zPL6iM-jiSk",
  //   },
  //   {
  //     id: "105",
  //     name: "The Avengers",
  //     rating: 8,
  //     summary:
  //       "Marvel's The Avengers (classified under the name Marvel Avengers\n Assemble in the United Kingdom and Ireland), or simply The Avengers, is\n a 2012 American superhero film based on the Marvel Comics superhero team\n of the same name.",
  //     poster:
  //       "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
  //     trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
  //   },
  //   {
  //     id: "106",
  //     name: "Interstellar",
  //     poster: "https://m.media-amazon.com/images/I/A1JVqNMI7UL._SL1500_.jpg",
  //     rating: 8.6,
  //     summary:
  //       "When Earth becomes uninhabitable in the future, a farmer and ex-NASA\n pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team\n of researchers, to find a new planet for humans.",
  //     trailer: "https://www.youtube.com/embed/Lm8p5rlrSkY",
  //   },
  //   {
  //     id: "107",
  //     name: "Baahubali",
  //     poster: "https://flxt.tmsimg.com/assets/p11546593_p_v10_af.jpg",
  //     rating: 8,
  //     summary:
  //       "In the kingdom of Mahishmati, Shivudu falls in love with a young warrior woman. While trying to woo her, he learns about the conflict-ridden past of his family and his true legacy.",
  //     trailer: "https://www.youtube.com/embed/sOEg_YZQsTI",
  //   },
  //   {
  //     id: "108",
  //     name: "Ratatouille",
  //     poster:
  //       "https://resizing.flixster.com/gL_JpWcD7sNHNYSwI1ff069Yyug=/ems.ZW1zLXByZC1hc3NldHMvbW92aWVzLzc4ZmJhZjZiLTEzNWMtNDIwOC1hYzU1LTgwZjE3ZjQzNTdiNy5qcGc=",
  //     rating: 8,
  //     summary:
  //       "Remy, a rat, aspires to become a renowned French chef. However, he fails to realise that people despise rodents and will never enjoy a meal cooked by him.",
  //     trailer: "https://www.youtube.com/embed/NgsQ8mVkN8w",
  //   },
  // ];
  const navigate = useNavigate();
  const[mode,setMode]=useState('light');
  const Theme = createTheme({
    palette: {
      mode: mode,
    },
  });
  return (
    <ThemeProvider theme={Theme} >
      <Paper elevation={0} style={{minHeight:"100vh",borderRadius:"0px"}}>
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
      <Toolbar>
          <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
          {/* <Button color="inherit" onClick={() => navigate("/color-game")}>COlor Game</Button> */}
          <Button color="inherit" onClick={() => navigate("/movies")}>Movies</Button>
          <Button color="inherit" onClick={() => navigate("/add-movie")}>Add Movies</Button>
          <Button style={{marginLeft:"auto"}} color="inherit" onClick={()=>setMode(mode==="light"?"dark":"light")} startIcon={mode==="light"?<Brightness4Icon/>:<Brightness7Icon/>}>{mode==="light"?"dark":"light"}mode</Button>
          </Toolbar>
      </AppBar>
      </Box>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/color-game" element={<AddColor />} />
        <Route path="/dummy" element={<Dummy />} />
        <Route
          path="/movies"
          element={
            <MovieList/>
          }
        />
        <Route path="*" element={<Navigate replace to="/404" />} />
        <Route path="404" element={<NotFound />} />

        <Route path="/films" element={<Navigate replace to="/movies" />} />
        <Route
          path="/movies:id"
          element={<MovieDetails/>}
        />
        <Route
          path="/movies/edit/:id"
          element={<EditMovie/>}
        />
        <Route path="/add-movie" element={<AddMovie/>}/>
        <Route path="/basic-form" element={<BasicForm/>}/>
      </Routes>

    </div>
    </Paper>
    </ThemeProvider>
  );
}

export default App;


