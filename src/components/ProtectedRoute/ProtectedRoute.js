import React from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
    const { isLoggedIn } = React.useContext(CurrentUserContext);
    return isLoggedIn ? (
        <Component {...props} />
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRouteElement;