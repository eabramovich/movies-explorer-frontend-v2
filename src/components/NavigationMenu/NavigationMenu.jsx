import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavigationMenu.css";

function NavigationMenu({ isLoggedIn }) {
  const location = useLocation();
  const { hash, pathname, search } = location;

  const menuItems = [
    {
      id: 0,
      name: "Главная",
      link: "/",
    },
    {
      
      id: 1,
      name: "Фильмы",
      link: "/movies",
    },
    {
      id: 2,
      name: "Сохранённые фильмы",
      link: "/saved-movies",
    },
  ];

  return (
    <nav className="navigation">
      {menuItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.link}
          className={({ isActive }) =>
            `navigation__menu-link ${
              isActive ? "navigation__menu-link_active" : ""
            } ${(isLoggedIn && pathname !== "/") ? "navigation__menu-link_theme_light" : ""}`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </nav>
  );
}

export default NavigationMenu;
