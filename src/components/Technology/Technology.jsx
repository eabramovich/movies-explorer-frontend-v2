import React from "react";
import "./Technology.css";

function Technology() {
  return (
    <section className="technology section">
      <h3 className="section-title">Технологии</h3>
      <div className="technology__content">
        <h2 className="section-caption">7 технологий</h2>
        <p className="technology__description">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="technology__items">
          <li className="technology__name">HTML</li>
          <li className="technology__name">CSS</li>
          <li className="technology__name">JS</li>
          <li className="technology__name">React</li>
          <li className="technology__name">Git</li>
          <li className="technology__name">Express.js</li>
          <li className="technology__name">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Technology;
