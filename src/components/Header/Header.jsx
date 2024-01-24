import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./Header.css";
import Logo from "../Logo/Logo";
import AccountMenu from "../AccountMenu/AccountMenu";
import NavigationMenu from "../NavigationMenu/NavigationMenu";

function Header({ isLoggedIn }) {
  const location = useLocation();

  const [isBurgerMenuActive, setIsBurgerMenuActive] = React.useState(false);

  return (
    <header
      className={`header ${
        isLoggedIn && location.pathname !== "/"
          ? "header_theme_light"
          : "header_theme_dark"
      }`}
    >
      <Logo />
      {/* {isLoggedIn && (
        <div className={`header__menu-wrapper ${isBurgerMenuActive ? "header__menu-wrapper_burger-active" : ""}`}>
          {isLoggedIn && <NavigationMenu isLoggedIn={isLoggedIn} />}
          {isLoggedIn && <AccountMenu isLoggedIn={isLoggedIn} />}
          <div className={`burger-menu ${isBurgerMenuActive ? "burger-menu_active" : ""} ${location.pathname !== "/" ? "burger-menu_theme_light" : "" }`} onClick={() => setIsBurgerMenuActive(!isBurgerMenuActive)}><span></span></div>
        </div>
      )} */}
      {isLoggedIn && (
        <>
          <div
            className={`header__menu-wrapper ${
              isBurgerMenuActive ? "header__menu-wrapper_burger-active" : ""
            }`}
          >
            <div className="header__menu-content">
              {isLoggedIn && <NavigationMenu isLoggedIn={isLoggedIn} />}
              {isLoggedIn && <AccountMenu isLoggedIn={isLoggedIn} />}
            </div>
          </div>
          <div
            className={`burger-menu ${
              isBurgerMenuActive ? "burger-menu_active" : ""
            } ${location.pathname !== "/" ? "burger-menu_theme_light" : ""}`}
            onClick={() => setIsBurgerMenuActive(!isBurgerMenuActive)}
          >
            <span></span>
          </div>
        </>
      )}
      {/* <div className="header__menu-wrapper">
        {isLoggedIn && <NavigationMenu isLoggedIn={isLoggedIn} />}
        {isLoggedIn && <AccountMenu isLoggedIn={isLoggedIn} />}
      </div> */}
      {!isLoggedIn && (
        <ul className="header__auth-menu">
          <li className="header__auth-menu-item">
            <Link to="/signup" className="header__auth-menu-link">
              Регистрация
            </Link>
          </li>
          <li className="header__auth-menu-item">
            <Link
              to="/signin"
              className="header__auth-menu-link header__login-link"
            >
              Войти
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}

export default Header;
