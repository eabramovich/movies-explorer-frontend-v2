import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [moviesSearchResult, setMoviesSearchResult] = React.useState(() => {
    const moviesSearchResult = localStorage.getItem("moviesSearchResult");
    return moviesSearchResult ? JSON.parse(moviesSearchResult) : [];
  });
  const [savedMovies, setSavedMovies] = React.useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    const path = location.pathname;
    if (token) {
      mainApi
      .getUserInfo(token)
      .then((res) => {
        setIsLoggedIn(true);
        setCurrentUser({
          name: res.data.name,
          email: res.data.email,
        });
        navigate(path, { replace: true });
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
        localStorage.setItem("token", res.token);
        navigate("/movies", { replace: true });
        return res;
      })
      .catch((err) => {
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
        handleLogin({ email, password });
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
    return mainApi
      .addNewMovie(movie, token)
      .then((res) => {
        setSavedMovies([...savedMovies, res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMovie = (movie) => {
    const token = localStorage.getItem("token");
    const movieId = savedMovies.find(
      (savedMovie) => savedMovie.movieId === movie.movieId
    )._id;
    return mainApi
      .removeMovie(movieId, token)
      .then((res) => {
        setSavedMovies(
          savedMovies.filter(
            (savedMovie) => savedMovie.movieId !== movie.movieId
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn }}
    >
      <CurrentMoviesContext.Provider
        value={{
          saveMovie,
          deleteMovie,
          savedMovies,
          setSavedMovies,
          moviesSearchResult,
          setMoviesSearchResult,
        }}
      >
        <Routes>
          <Route path="/" element={<Main />} />
          <Route
            path="/movies"
            element={<ProtectedRouteElement element={Movies} />}
          />
          <Route
            path="/saved-movies"
            element={<ProtectedRouteElement element={SavedMovies} />}
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
