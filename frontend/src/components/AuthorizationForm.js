import React from "react";
import { Link } from "react-router-dom";

const AuthorizationForm = ({
  name,
  title,
  children,
  buttonName,
  onSubmit,
  register,
}) => {
  return (
    <div className="authorization">
      <form
        className={`authorization__form authorization__form_${name}" name="${name}`}
        onSubmit={onSubmit}
      >
        <h2 className="authorization__title">{title}</h2>
        {children}
        <button className="authorization__button" type="submit" name="submit">
          {buttonName}
        </button>
      </form>
      {register && (
        <Link to="/sign-in" className="authorization__text-hint">
          Уже зарегистрированы? Войти
        </Link>
      )}
    </div>
  );
};

export default AuthorizationForm;
