import React from "react";
import "./WelcomeTitle.css";

function WelcomeTitle({ text }) {
    return (
        <h2 className="welcome-title">{text}</h2>
    );
}

export default WelcomeTitle;