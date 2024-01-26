import React from "react";
import { Link } from "react-router-dom";
import "./Portfolio.css";

function Portfolio() {
  return (
    <div className="portfolio section">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__projects">
        <li className="portfolio__project">
          <Link to="https://github.com/eabramovich/how-to-learn" className="portfolio__project-link" target="_blank">
            Статичный сайт
          </Link>
        </li>
        <li className="portfolio__project">
        <Link to="https://github.com/eabramovich/russian-travel" className="portfolio__project-link" target="_blank">
            Адаптивный сайт
          </Link>
        </li>
        <li className="portfolio__project">
        <Link to="https://github.com/eabramovich/react-mesto-api-full-gha" className="portfolio__project-link" target="_blank">
            Одностраничное приложение
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
