import React from "react";
import { Navigate } from "react-router-dom";

// защитите роут /, чтобы на него не смогли перейти неавторизованные пользователи
const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return props.isLoggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default ProtectedRouteElement;