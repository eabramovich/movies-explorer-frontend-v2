import React from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import Logo from "../Logo/Logo";
import AuthForm from "../AuthForm/AuthForm";

function Login({ onLogin }) {
  return (
      <main className="auth-content">
        <div className="auth-content__header">
          <Logo />
          <h1 className="welcome-title">Рады видеть!</h1>
        </div>
        <AuthForm name="login" buttonText="Войти" onSubmit={onLogin}/>
        <div className="auth-content__login-register">
        <p className="auth-content__login-register-text">Еще не зарегистрированы?</p>
        <Link to="/signup" className="auth-content__login-link">
          Регистрация
        </Link>
      </div>
      </main>
  );
}

export default Login;