import React from "react";
import Card from "./Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  // const [userName, setUserName] = React.useState("");
  // const [userDescription, setUserDescription] = React.useState("");
  // const [userAvatar, setUserAvatar] = React.useState("");
  // const [cards, setCards] = React.useState([]);
  //Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);
  const { name, about, avatar } = currentUser;

  //console.log(cards);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <button
            type="button"
            className="profile__edit-avatar-button"
            onClick={onEditAvatar}
            aria-label="Редактировать аватар"
            title="Редактировать аватар"
          ></button>
          <img
            className="profile__avatar"
            src={avatar}
            alt="Фотография пользователя"
          />

          <div className="profile__edit-info">
            <div className="profile__user-info">
              <h1 className="profile__user-name">{name}</h1>
              <p className="profile__user-job">{about}</p>
            </div>
            <button
              type="button"
              className="profile__edit-button"
              onClick={onEditProfile}
              aria-label="Редактировать профиль"
              title="Редактировать профиль"
            ></button>
          </div>
        </div>
        <button
          type="button"
          className="profile__add-button"
          onClick={onAddPlace}
          aria-label="Добавить фотографии"
          title="Добавить фотографии"
        ></button>
      </section>      

      <section className="gallery">
        <ul className="gallery__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
