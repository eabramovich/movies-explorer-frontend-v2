import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import "./Profile.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function Profile() {
  const { currentUser, isLoggedIn, setIsLoggedIn } =
    React.useContext(CurrentUserContext);
  const saveButtonRef = React.useRef();
  const [values, setValues] = React.useState({
    username: currentUser.name,
    email: currentUser.email,
  });
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] = React.useState(true);
  const navigate = useNavigate();

  React.useEffect(() => {
    console.log(isValid);
    if (
      isValid &&
      (currentUser.name !== values.username ||
        currentUser.email !== values.email)
    ) {
      setIsSaveButtonDisabled(false);
    } else {
      setIsSaveButtonDisabled(true);
    }
  }, [
    isValid,
    currentUser.name,
    currentUser.email,
    values.username,
    values.email,
  ]);

  const handleEditClick = (e) => {
    e.preventDefault();
    setIsEditing(true);
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value.trim();
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    localStorage.removeItem("moviesSearchResult");
    localStorage.removeItem("moviesSearchText");
    localStorage.removeItem("isMoviesFilterEnabled");
    localStorage.removeItem("savedMoviesSearchResult");
    localStorage.removeItem("savedMoviesSearchText");
    localStorage.removeItem("isSavedMoviesFilterEnabled");
    navigate("/");
  };

  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main className="profile">
        <h1 className="welcome-title welcome-title_location_profile">
          Привет, {currentUser.name}!
        </h1>
        <form className="profile__form" noValidate>
          <div className="profile__form-field">
            <label htmlFor="username" className="profile__form-label">
              Имя
            </label>
            <div className="profile__input-wrapper">
              <input
                required
                type="text"
                className={`profile__form-input ${
                  isEditing
                    ? "profile__form-input_type_edit-mode"
                    : "profile__form-input_type_read-only"
                } ${
                  errors.username ? "profile__form-input_type_error_active" : ""
                }`}
                id="username"
                name="username"
                minLength="2"
                maxLength="40"
                value={values.username}
                onChange={handleChange}
                readOnly={!isEditing}
              />
              <span
                className={`profile__form-item-error ${
                  errors.username ? "profile__form-item-error_active" : ""
                }`}
              >
                {errors.username}
              </span>
            </div>
          </div>
          <div className="profile__form-field">
            <label htmlFor="email" className="profile__form-label">
              E-mail
            </label>
            <div className="profile__input-wrapper">
              <input
                required
                type="email"
                className={`profile__form-input ${
                  isEditing
                    ? "profile__form-input_type_edit-mode"
                    : "profile__form-input_type_read-only"
                } ${
                  errors.email ? "profile__form-input_type_error_active" : ""
                }`}
                id="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                readOnly={!isEditing}
              />
              <span
                className={`profile__form-item-error ${
                  errors.email ? "profile__form-item-error_active" : ""
                }`}
              >
                {errors.email}
              </span>
            </div>
          </div>
          {isEditing ? (
            <button
              type="submit"
              className="profile__form-button profile__form-button_type_save"
              ref={saveButtonRef}
              onClick={handleSubmit}
              disabled={isSaveButtonDisabled}
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
