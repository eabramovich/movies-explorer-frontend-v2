import React from "react";
import "./AuthForm.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

function AuthForm({ name, buttonText }) {
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();
  console.log(values);
  console.log(errors);

  return (
    <form className="auth-form" name={`${name}`} noValidate>
      <div className="auth-form__labels-wrapper">
        {name === "register" && (
          <>
            <label htmlFor="username" className="auth-form__label">
              Имя
            </label>
            <input
              required
              className={`auth-form__input ${errors.username ? "auth-form__input_error_active" : "" }`}
              type="text"
              id="username"
              name="username"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              value={values.username ? values.username : ""}
              onChange={handleChange}
            />
            <span className={`auth-form__item-error ${errors.username ? "auth-form__item-error_active" : ""}`}>{errors.username}</span>
          </>
        )}
        <label htmlFor="email" className="auth-form__label">
          E-mail
        </label>
        <input
          required
          className={`auth-form__input ${errors.email ? "auth-form__input_error_active" : ""}`}
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          value={values.email ? values.email : ""}
          onChange={handleChange}
        />
        <span className={`auth-form__item-error ${errors.email ? "auth-form__item-error_active" : ""}`}>{errors.email}</span>
        <label htmlFor="password" className="auth-form__label">
          Пароль
        </label>
        <input
          required
          className={`auth-form__input ${errors.password ? "auth-form__input_error_active" : "" }`}
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          minLength="8"
          maxLength="40"
          value={values.password ? values.password : ""}
          onChange={handleChange}
        />
        <span className={`auth-form__item-error ${errors.password ? "auth-form__item-error_active" : ""}`}>
          {errors.password}
        </span>
      </div>
      <button
        type="submit"
        className={`auth-form__button ${
          name === "login" ? "auth-form__button_type_login" : ""
        }`}
      >
        {buttonText}
      </button>
    </form>
  );
}

export default AuthForm;
