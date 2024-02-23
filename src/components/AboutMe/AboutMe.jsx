import React from "react";
import { Link } from "react-router-dom";
import "./AboutMe.css";
import studentPhoto from "./../../images/student_photo.png";

function AboutMe() {
  return (
    <section className="about-me section">
      <h2 className="section-title">Студент</h2>
      <div className="about-me__content">
        <div className="about-me__text-wrapper">
          <div className="about-me__main-information">
            <h3 className="about-me__title">Евгения</h3>
            <p className="about-me__subtitle">Фронтенд-разработчик, 34 года</p>
            <div className="about-me__description">
              <p className="about-me__description-item">
                Я родилась в городе Новочеркасск. Там же успешно завершила
                обучение в Южно-Российском государственном политехническом
                университете (НПИ) по специальности "Автоматические системы
                обработки информации и управления" (АСOиУ). В настоящее время 
                проживаю в городе Санкт-Петербург.
              </p>
              <p className="about-me__description-item">
                В IT работаю с 2013 года. Последние 4 года занимаюсь поддержкой и
                внедрением SAP систем.
              </p>
            </div>
          </div>
          <Link
            to="https://github.com/eabramovich"
            className="about-me__repository-link"
            target="_blank"
          >
            Github
          </Link>
        </div>

        <img
          className="about-me__student-photo"
          src={studentPhoto}
          alt="Фотография студента"
        />
      </div>
    </section>
  );
}

export default AboutMe;
