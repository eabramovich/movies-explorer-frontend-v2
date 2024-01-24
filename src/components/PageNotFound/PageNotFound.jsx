import React from "react";
import { Link } from "react-router-dom";

import "./PageNotFound.css";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <h3 className="page-not-found__title">404</h3>
      <p className="page-not-found__text">Страница не найдена</p>

      <Link className="page-not-found__link-back" to="/">
        Назад
      </Link>
    </div>
  );
}

export default PageNotFound;
