import React from "react";
import "./AuthForm.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function AuthForm({ name, buttonText, onSubmit }) {
  const { values, errors, isValid, handleChange, resetForm } =
    useFormWithValidation();
  const submitButtonRef = React.useRef();
  const [errorMessage, setErrorMessage] = React.useState(null);
  //console.log(values);
  //console.log(errors);

  React.useEffect(() => {
    if(isValid) {
      submitButtonRef.current.disabled = false;
    } else {
      submitButtonRef.current.disabled = true;
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log(values);
    onSubmit(values)
    .then((res) => {
      //console.log(res);
    })
    .catch((err) => {
      //console.log(err);
      setErrorMessage(err);
    })
  }

  return (
    <form className="auth-form" name={`${name}`} onSubmit={handleSubmit} noValidate>
      <div className="auth-form__labels-wrapper">
        {name === "register" && (
          <>
            <label htmlFor="name" className="auth-form__label">
              Имя
            </label>
            <input
              required
              className={`auth-form__input ${
                errors.name ? "auth-form__input_error_active" : ""
              }`}
              type="text"
              id="name"
              name="name"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              value={values.name ? values.name : ""}
              onChange={handleChange}
            />
            <span
              className={`auth-form__item-error ${
                errors.name ? "auth-form__item-error_active" : ""
              }`}
            >
              {errors.name}
            </span>
          </>
        )}
        <label htmlFor="email" className="auth-form__label">
          E-mail
        </label>
        <input
          required
          className={`auth-form__input ${
            errors.email ? "auth-form__input_error_active" : ""
          }`}
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          value={values.email ? values.email : ""}
          onChange={handleChange}
        />
        <span
          className={`auth-form__item-error ${
            errors.email ? "auth-form__item-error_active" : ""
          }`}
        >
          {errors.email}
        </span>
        <label htmlFor="password" className="auth-form__label">
          Пароль
        </label>
        <input
          required
          className={`auth-form__input ${
            errors.password ? "auth-form__input_error_active" : ""
          }`}
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          minLength="5"
          maxLength="40"
          value={values.password ? values.password : ""}
          onChange={handleChange}
        />
        <span
          className={`auth-form__item-error ${
            errors.password ? "auth-form__item-error_active" : ""
          }`}
        >
          {errors.password}
        </span>
      </div>
      <div className="auth-button-wrapper">
      <span className={`auth-form__error-message ${errorMessage ? "auth-form__error-message_active" : "" }`}>{errorMessage}</span>
      <button
        type="submit"
        ref={submitButtonRef}
        className={`auth-form__button ${
          name === "login" ? "auth-form__button_type_login" : ""
        } ${isValid ? "auth-form__button_active" : ""}`}
      >
        {buttonText}
      </button>
      </div>
    </form>
  );
}

export default AuthForm;
