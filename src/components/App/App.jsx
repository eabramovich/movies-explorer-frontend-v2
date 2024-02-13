import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRouteElement from "./../ProtectedRoute/ProtectedRoute";
import "../App/App.css";
import "../../contexts/CurrentUserContext";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import Login from "../Login/Login";
import PageNotFound from "../PageNotFound/PageNotFound";
import AboutProject from "../AboutProject/AboutProject";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { CurrentMoviesContext } from "../../contexts/CurrentMoviesContext";
import mainApi from "../../utils/MainApi";
import moviesApi from "../../utils/MoviesApi";
import MoviesList from "../../utils/MoviesList";


function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  // const [cards, setCards] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  //const moviesList = new MoviesList([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    console.log("123");
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      console.log("345");
      mainApi
        .getUserInfo(token)
        .then((res) => {
          console.log(res);
          setIsLoggedIn(true);
          setCurrentUser({
            name: res.data.name,
            email: res.data.email,
          });
        })
        .catch((err) => {
          console.log(err);
        });

      // console.log(localStorage.getItem("moviesSearchResult"));
      // const movies = JSON.parse(localStorage.getItem("moviesSearchResult"));
      // //const movies = localStorage.getItem("moviesSearchResult");
      // const moviesSearchText = localStorage.getItem("moviesSearchText");
      // console.log(movies);
      // if (movies) {
      //   setMoviesSearchResult(movies);
      //   setMoviesSearchText(moviesSearchText);
      // }
    }
  }, []);

  React.useEffect(() => {
    console.log("set cards");
    if(isLoggedIn) {
      const token = localStorage.getItem("token");
      Promise.all([moviesApi.getFilms(), mainApi.getSavedMovies(token)])
      .then((movies, savedMovies) => {
        //console.log(res);
        // setCards(movies);
        // moviesList.setInitialCards(movies);
        setSavedMovies(savedMovies);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  }, [isLoggedIn]);

  const handleLogin = ({ email, password }) => {
    return mainApi
      .signin({ email, password })
      .then((res) => {
        setIsLoggedIn(true);
        console.log(res);
        console.log(res.token);
        localStorage.setItem("token", res.token);
        navigate("/movies", { replace: true });
        return res;
      })
      .catch((err) => {
        console.log(err);
        let jsonError = {};
        try {
          jsonError = JSON.parse(err.message);
        } catch {
          jsonError = {
            message: "Ошибка при авторизации. Пожалуйста, повторите попытку.",
          };
        }
        return Promise.reject(jsonError.message);
      });
  };

  const handleRegister = ({ name, email, password }) => {
    return mainApi
      .signup({ name, email, password })
      .then((res) => {
        console.log(res);
        handleLogin({ email, password });
        //return res;
      })
      .catch((err) => {
        let jsonError = {};
        try {
          jsonError = JSON.parse(err.message);
        } catch {
          jsonError = {
            message: "Ошибка при регистрации. Пожалуйста, повторите попытку.",
          };
        }
        return Promise.reject(jsonError.message);
      });
  };

  const saveMovie = (movie) => {
    const token = localStorage.getItem("token");
    mainApi.addNewMovie(movie, token)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    })
  }

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <CurrentMoviesContext.Provider
        value={{
          //moviesList,
          saveMovie,
          //moviesSearchResult,
          //isMoviesFilterEnabled,
          //setIsMoviesFilterEnabled,
        }}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={
              <ProtectedRouteElement
                element={Movies}
                //cards={moviesSearchResult}
                //onSearch={onMoviesSearch}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRouteElement element={SavedMovies}  />
            }
          />
          <Route
            path="/profile"
            element={<ProtectedRouteElement element={Profile} />}
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/about-project-component" component={AboutProject} />
        </Routes>
      </CurrentMoviesContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
