import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <h3 className="footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h3>
      <div className="footer__content">
        <p className="footer__copyright">&copy; 2024</p>
        <nav>
          <ul className="footer__nav">
            <li className="footer__nav-item">
              <Link
                to="https://practicum.yandex.ru/"
                className="footer__nav-link"
                target="_blank"
              >
                Яндекс.Практикум
              </Link>
            </li>
            <li className="footer__nav-item">
              <Link
                to="https://github.com/eabramovich"
                className="footer__nav-link"
                target="_blank"
              >
                Github
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
