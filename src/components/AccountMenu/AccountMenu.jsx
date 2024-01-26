import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./AccountMenu.css";
import accountIcon from "../../images/account_icon.svg";

function AccountMenu({ isLoggedIn }) {
  const location = useLocation();
  const { hash, pathname, search } = location;

  return (
    <ul className="account-menu">
      <li>
        <Link
          to="/profile"
          className={`account-menu__link ${
            isLoggedIn && pathname !== "/"
              ? "account-menu__link_theme_light"
              : ""
          }`}
        >
          Аккаунт
          <span className="account-menu__icon-frame">
            <img
              src={accountIcon}
              className="account-menu__icon"
              alt="Иконка аккаунта"
            />
          </span>
        </Link>
      </li>
    </ul>
  );
}

export default AccountMenu;
