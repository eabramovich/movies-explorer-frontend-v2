import React from "react";
import { Link } from "react-router-dom";

import "./PageNotFound.css";

function PageNotFound() {
  return (
    <main className="page-not-found">
      <div className="page-not-found__wrapper">
        <div className="page-not-found__info">
          <h1 className="page-not-found__title">404</h1>
          <p className="page-not-found__text">Страница не найдена</p>
        </div>
        <Link className="page-not-found__link-back" to="/">
          Назад
        </Link>
      </div>
    </main>
  );
}

export default PageNotFound;
