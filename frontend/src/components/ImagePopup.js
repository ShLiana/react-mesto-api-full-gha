import React from "react";

const ImagePopup = (props) => {
  return (
    <div className={`popup zoomPopup ${props.card ? "popup_opened" : ""}`}>
      <div className="popup__zoom-container">
        <button
          className="popup__cross"
          onClick={props.onClose}
          type="button"
        ></button>
        <div className="zoomPopup__photo-cards-info">
          <img
            className="zoomPopup__photo-cards-img"
            src={props.card?.link}
            alt={props.card?.name}
          />
          <h2 className="zoomPopup__photo-cards-text">{props.card?.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default ImagePopup;
