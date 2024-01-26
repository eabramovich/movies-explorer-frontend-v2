import React from "react";
import { Routes, Route } from "react-router-dom";
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

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});

  const user = {
    name: "Евгения", 
    email: "ewg.abramovich2014@yandex.ru",
  }

  React.useEffect(() => {
    setCurrentUser(user);
  }, []);

  const [cards, setCards] = React.useState([
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1692613101426-37cf9831bd79",
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
      isShortFilm: true,
      isSaved: true,
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1692613101426-37cf9831bd79",
      nameRU: "33 слова о дизайне",
      duration: "1ч 42м",
      isShortFilm: true,
      isSaved: false,
    },
    {
      id: "3",
      image: "https://images.unsplash.com/photo-1692613101426-37cf9831bd79",
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
      isShortFilm: true,
      isSaved: true,
    },
    {
      id: "4",
      image: "https://images.unsplash.com/photo-1692613101426-37cf9831bd79",
      nameRU: "33 слова о дизайне",
      duration: "1ч42м",
      isShortFilm: true,
      isSaved: true,
    },
    {
      id: "5",
      image: "https://images.unsplash.com/photo-1692613101426-37cf9831bd79",
      nameRU: "Рудбой",
      duration: "1ч 42м",
      isShortFilm: true,
      isSaved: true,
    },
    {
      id: "6",
      image: "https://images.unsplash.com/photo-1692613101426-37cf9831bd79",
      nameRU: "Скейт -  кухня",
      duration: "1ч 47м",
      isShortFilm: true,
      isSaved: true,
    },
  ]);

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn}}>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/movies" element={<Movies cards={cards} />} />
        <Route path="/saved-movies" element={<SavedMovies cards={cards} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/about-project-component" component={AboutProject} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
