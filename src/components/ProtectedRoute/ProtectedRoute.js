import React from "react";
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
    const { isLoggedIn } = React.useContext(CurrentUserContext);
    console.log(isLoggedIn);
    console.log('123')
    return isLoggedIn ? (
        <Component {...props} />
    ) : (
        <Navigate to="/" replace />
    );
};

export default ProtectedRouteElement;