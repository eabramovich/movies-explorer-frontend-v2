import React from "react";
import "./AuthForm.css";

function AuthForm({ name, buttonText }) {
  return (
    <form className="auth-form" name={`${name}`}>
      <div className="auth-form__labels-wrapper">
        {name === "register" && (
          <>
            <label htmlFor="username" className="auth-form__label">
              Имя
            </label>
            <input
              className="auth-form__input"
              type="text"
              id="username"
              name="username"
              placeholder="Имя"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="auth-form__item-error" />
          </>
        )}
        <label htmlFor="email" className="auth-form__label">
          E-mail
        </label>
        <input
          className="auth-form__input"
          type="email"
          id="email"
          name="email"
          placeholder="E-mail"
          required
        />
        <span className="auth-form__item-error" />
        <label htmlFor="password" className="auth-form__label">
          Пароль
        </label>
        <input
          className="auth-form__input auth-form__input_error_active"
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          minLength="8"
          maxLength="40"
          required
        />
        <span className="auth-form__item-error auth-form__item-error_active">
          Что-то пошло не так...
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
