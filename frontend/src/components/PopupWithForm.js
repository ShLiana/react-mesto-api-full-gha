import React from "react";

const PopupWithForm = ({
  name,
  title,
  children,
  text,
  isOpen,
  onClose,
  onSubmit,
  isPageLoading,
  renderLoadingText,
}) => {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
        type="button"
          className="popup__cross"
          onClick={onClose}
          aria-label="Завершить редактирование"
        ></button>
        <h2 className="popup__header">{title}</h2>

        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__save-button" type="submit">
            {isPageLoading ? renderLoadingText : text}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupWithForm;
