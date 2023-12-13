// import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const RequireAuth = ({ children }) => {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" replace></Navigate>;
    }

    return children;
};

RequireAuth.propTypes = {
    children: PropTypes.node.isRequired,
};

export default RequireAuth;