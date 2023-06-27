import React, { useState } from "react";
import AuthorizationForm from "./AuthorizationForm.js";

const Login = ({ onLogin }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setUserData((prevState) => ({ ...prevState, [name]: value }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onLogin({
      email: userData.email,
      password: userData.password,
    });
  }
  return (
    <div className="authorization">
      <AuthorizationForm
        name={"login"}
        title={"Вход"}
        buttonName={"Войти"}
        onSubmit={handleSubmit}
      >
        <input
          id="email"
          required
          type="email"
          autoComplete="email"
          className="authorization__input"
          name="email"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          value={userData.email || ""}
          onChange={handleChange}
        />
        <span className="popup__warning-text" id="email-warning-text"></span>
        <input
          id="password"
          required
          type="password"
          autoComplete="password"
          className="authorization__input"
          name="password"
          placeholder="Пароль"
          minLength="6"
          maxLength="200"
          value={userData.password || ""}
          onChange={handleChange}
        />
        <span className="popup__warning-text" id="password-warning-text"></span>
      </AuthorizationForm>
    </div>
  );
};

export default Login;
