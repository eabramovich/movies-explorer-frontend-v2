import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../Logo/Logo";
import AuthForm from "../AuthForm/AuthForm";

function Register() {
  return (
      <main className="auth-content">
        <div className="auth-content__header">
          <Logo />
          <h1 className="welcome-title">Добро пожаловать!</h1>
        </div>
        <AuthForm name="register" buttonText="Зарегистрироваться" />
        <div className="auth-content__login-register">
        <p className="auth-content__login-register-text">Уже зарегистрированы?</p>
        <Link to="/signin" className="auth-content__login-link">
          Войти
        </Link>
      </div>
      </main>
  );
}

export default Register;
