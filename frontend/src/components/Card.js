import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `card__like ${
    isLiked ? "card__like_active" : ""
  }`;
  const cardDeleteButtonClassName = `card__delete ${
    isOwn ? "card__delete_visible" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      {isOwn && (
        <button
          className={cardDeleteButtonClassName}
          type="button"
          aria-label="Удалить"
          title="Удалить фотографию"
          onClick={handleCardDelete}
        ></button>
      )}
      <img
        className="card__image"
        alt={card.name}
        src={card.link}
        onClick={handleCardClick}
      />

      <div className="card__caption">
        <h3 className="card__title">{card.name}</h3>
        <div className="like__caption">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Поставить лайк"
            title="Нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="like__counter">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
