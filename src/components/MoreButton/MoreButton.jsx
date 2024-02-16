import React from "react";
import "./MoreButton.css";

function MoreButton({ onClick }) {
    return (
        <button className="more-button" type="button" onClick={onClick}>Еще</button>
    );
}

export default MoreButton;