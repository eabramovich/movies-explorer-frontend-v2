import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import "./Profile.css";
import mainApi from "../../utils/MainApi";
import { emailRegex, message } from "../../utils/constants";

function Profile() {
  const { currentUser, setCurrentUser, isLoggedIn, setIsLoggedIn } =
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
  const [isUserInfoUpdated, setIsUserInfoUpdated] = React.useState(true);
  const [submitMessage, setSubmitMessage] = React.useState("");
  const navigate = useNavigate();

  React.useEffect(() => {
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
    setIsSaveButtonDisabled(true);
    setSubmitMessage("");
    setIsEditing(true);
  };

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value.trim();
    if (name === "email") {
      const isValidEmail = emailRegex.test(value);
      const errorMessage =
        !isValidEmail && !target.validationMessage
          ? message.validationMessage.incorrectEmail
          : target.validationMessage;
      setErrors({ ...errors, [name]: errorMessage });
    } else {
      setErrors({ ...errors, [name]: target.validationMessage });
    }
    setValues({ ...values, [name]: value });
    setIsValid(target.closest("form").checkValidity());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const resultBody = {};
    if (currentUser.name !== values.username) {
      resultBody.name = values.username;
    }
    if (currentUser.email !== values.email) {
      resultBody.email = values.email;
    }

    mainApi
      .updateUserInfo(resultBody, token)
      .then((res) => {
        setIsUserInfoUpdated(true);
        setSubmitMessage("Данные профиля обновлены");
        setIsEditing(false);
        setCurrentUser({
          name: res.data.name,
          email: res.data.email,
        });
      })
      .catch((err) => {
        const error = JSON.parse(err.message);
        setIsUserInfoUpdated(false);
        setSubmitMessage(error.message);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("movies");
    localStorage.removeItem("moviesSearchResult");
    localStorage.removeItem("moviesSearchText");
    localStorage.removeItem("isMoviesFilterEnabled");
    setIsLoggedIn(false);
    setCurrentUser({});
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
                autoComplete="off"
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
          <span
            className={`profile__submit-message ${
              !isUserInfoUpdated
                ? "profile__message_type_error"
                : "profile__message_type_successfull"
            }`}
          >
            {submitMessage}
          </span>
          {isEditing ? (
            <button
              type="submit"
              className="profile__form-button profile__form-button_type_save"
              ref={saveButtonRef}
              onClick={handleSubmit}
              disabled={isSaveButtonDisabled}
              onSubmit={handleSubmit}
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
