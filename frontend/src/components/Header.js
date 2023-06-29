import React from "react";
import logo from "../images/logo.svg";
import { Link, Route, Routes, useLocation } from "react-router-dom";

const Header = ({ isLoggedIn, headerUserEmail, onSignOut }) => {
  const location = useLocation();
  const headerLinkName =
    location.pathname === "/sign-in" ? "Регистрация" : "Войти";
  const buttonText = isLoggedIn ? "Выйти" : headerLinkName;

  return (
    <header className="header">
      <img className="header__logo" alt="Логотип" src={logo} />
      <div className="header__info-block">
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link-btn">
                Регистрация
              </Link>
            }
          ></Route>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link-btn">
                Войти
              </Link>
            }
          ></Route>
          <Route
            path="*"
            element={
              isLoggedIn && (
                <nav className="header__nav">
                  <p className="header__email">{headerUserEmail}</p>
                  <button
                    className="header__link-btn"
                    onClick={() => onSignOut()}
                  >
                    {buttonText}
                  </button>
                </nav>
              )
            }
          ></Route>
        </Routes>
      </div>
    </header>
  );
};

export default Header;
