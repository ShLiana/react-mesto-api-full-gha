import React from "react";
import successIcon from "../images/successfulAuthorization.png";
import unsuccessIcon from "../images/unsuccessfulAuthorization.png";

const InfoTooltip = ({ isOpen, onClose, success }) => {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__cross"
          onClick={onClose}
          aria-label="Кнопка закрыть"
        ></button>
        <div className="popup__registration-result">
          <img
            src={success ? successIcon : unsuccessIcon}
            alt={
              success ? "Регистрация прошла успешно" : "Регистрация не прошла"
            }
            className="popup__registration-result-icon"
          />
          <h3 className="popup__warning-text">
            {success
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </h3>
        </div>
      </div>
    </div>
  );
};


export default InfoTooltip;

