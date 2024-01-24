import React from 'react';
import "./AboutProject.css"

function AboutProject() {
    return (
        <section id="about-project" className="section about-project">
            <h2 className="section-title">О проекте</h2>
            <ul className="about-project__description">
                <li className="about-project__detail">
                    <h3 className="about-project__detail-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__detail-description">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </li>
                <li className="about-project__detail">
                    <h4 className="about-project__detail-title">На выполнение диплома ушло 5 недель</h4>
                    <p className="about-project__detail-description">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </li>
            </ul>
            <div className="about-project__timeline">
                <div className="about-project__stage">
                    <p className="about-project__stage-duration about-project__stage-duration_type_backend">1 неделя</p>
                    <p className="about-project__stage-title">Back-end</p>
                </div>
                <div className="about-project__stage about-project__stage_type_frontend">
                    <p className="about-project__stage-duration about-project__stage-duration_type_frontend">4 недели</p>
                    <p className="about-project__stage-title">Front-end</p>
                </div>
            </div>
        </section>
    );
}

export default AboutProject;