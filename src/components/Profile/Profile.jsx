import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import "./Profile.css";

function Profile() {
  const { currentUser, isLoggedIn, setIsLoggedIn } = React.useContext(CurrentUserContext);
  const [isEditing, setIsEditing] = React.useState(false);
  const navigate = useNavigate();

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    localStorage.removeItem("moviesSearchResult");
    navigate("/");
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="profile">
        <h1 className="welcome-title welcome-title_location_profile">
          Привет, {currentUser.name}!
        </h1>
        <form className="profile__form">
          <div className="profile__form-field">
            <label htmlFor="username" className="profile__form-label">
              Имя
            </label>
            <input
              className="profile__form-input profile__form-input_type_read-only"
              type="text"
              id="username"
              name="username"
              value={currentUser.name}
              readOnly={!isEditing}
            />
          </div>
          <div className="profile__form-field">
            <label htmlFor="email" className="profile__form-label">
              E-mail
            </label>
            <input
              className="profile__form-input profile__form-input_type_read-only"
              type="email"
              id="email"
              name="email"
              value={currentUser.email}
              readOnly={!isEditing}
            />
          </div>
          {isEditing ? (
            <button
              type="submit"
              className="profile__form-button profile__form-button_type_save"
              onClick={handleSubmit}
            >
              Сохранить
            </button>
          ) : (
            <button
              type="button"
              className="profile__form-button profile__form-button_type_edit "
              onClick={handleEditClick}
            >
              Редактировать
            </button>
          )}
        </form>
        <Link to="/" className="profile__logout" onClick={handleLogout}>
          Выйти из аккаунта
        </Link>
      </main>
    </>
  );
}

export default Profile;
