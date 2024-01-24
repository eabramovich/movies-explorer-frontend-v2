import React from "react";
import { Link } from "react-router-dom";
import "./AboutMe.css";
import studentPhoto from "./../../images/student_photo.png";

function AboutMe() {
  return (
    <section className="about-me section">
      <h3 className="section-title">Студент</h3>
      <div className="about-me__content">
        <div className="about-me__text-wrapper">
          <div className="about-me__main-information">
            <h2 className="section-caption">Евгения</h2>
            <p className="about-me__subtitle">Фронтенд-разработчик, 33 года</p>
            <p className="about-me__description">
              <p className="about-me__description-item">
                Я родилась в городе Новочеркасск. Там же я успешно завершила
                обучение в Южно-Российском государственном политехническом
                университете (НПИ) по специальности "Автоматические системы
                обработки информации и управления" (АСOиУ). В настоящее время я
                проживаю в Санкт-Петербурге.
              </p>
              <p className="about-me__description-item">
                В IT работаю с 2013 года с перерывом на декрет. Последние 4 года
                работаю в консалтинговой компании и занимаюсь поддержкой и
                внедрением SAP.
              </p>
              {/* <p className="about-me__description-item">
                В свободное время занимаюсь йогой и хожу на различные групповые
                занятия в фитнес студию. Люблю слушать подкасты по психологии и
                нейропсихологии.
              </p> */}
            </p>
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
