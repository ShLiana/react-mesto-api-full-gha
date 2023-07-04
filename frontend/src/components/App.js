import React, { useEffect, useState } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute.js";
import Register from "./Register.js";
import Login from "./Login.js";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip.js";

function App() {
  //Переменные состояния, отвечающие состояние попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  //Переменные состояния для попапа открытия карточки
  const [selectedCard, setSelectedCard] = useState(null);

  //Переменные состояния текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  //Переменные состояния карточек
  const [cards, setCards] = useState([]); //пустой массив зависимостей

  //Переменная состояния загрузки страницы
  const [isPageLoading, setIsPageLoading] = useState(false);

  //Переменные состояния зарегистрированного пользователя
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //Переменные состояния успешной регистрации
  const [isSuccessfulRegistration, setIsSuccessfulRegistration] =
    useState(false);

  //Переменная состояния для попапа формы регистрации
  const [infoSuccessOpen, setInfoSuccessOpen] = useState(false);

  // Переменные, отображаемые в хедере
  const [headerUserEmail, setHeaderUserEmail] = useState("");

  //хук хранит состояние и может использоваться для хранения местоположения текущей или предыдущей страницы
  const navigate = useNavigate();

  //функции, отвечающие за открытие попапов
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTooltip() {
    setInfoSuccessOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setInfoSuccessOpen(false);
  }

  //Закрыть попапы по нажатию на Esc
  useEffect(() => {
    if (
      isEditAvatarPopupOpen ||
      isEditProfilePopupOpen ||
      isAddPlacePopupOpen ||
      selectedCard
    ) {
      function handleEscClose(e) {
        if (e.key === "Escape") {
          closeAllPopups();
        }
      }
      document.addEventListener("keyup", handleEscClose);
      return () => {
        document.removeEventListener("keyup", handleEscClose);
      };
    }
  }, [
    isEditAvatarPopupOpen,
    isEditProfilePopupOpen,
    isAddPlacePopupOpen,
    selectedCard,
  ]);

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes?.some((i) => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then(({ data }) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? data : c))
        );
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  //Функция удаления своих карточек
  function handleCardDelete(card) {
    setIsPageLoading(true);
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      })
      .finally(() => setIsPageLoading(false));
  }

  // useEffect(() => {
  //   Promise.all([api.getInitialCards(), api.getUserInfo()]);
  //   api
  //     .getUserInfo()
  //     .then((data) => {
  //       setCurrentUser(data);
  //     })
  //     .catch((err) => {
  //       console.error(`ошибка: ${err}`);
  //     });
  //   api
  //     .getInitialCards()
  //     .then((cards) => {
  //       setCards(cards);
  //     })
  //     .catch((err) => {
  //       console.error(`ошибка: ${err}`);
  //     });
  // }, []);

  //Функция обновления данных пользователя
  function handleUpdateUser(data) {
    setIsPageLoading(true);
    api
      .updateUserInfo(data)
      .then(({ data: user }) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => setIsPageLoading(false));
  }

  //Функция обновления аватара пользователя
  function handleUpdateAvatar(data) {
    setIsPageLoading(true);
    api
      .updateUserAvatar(data)
      .then(({ data: user }) => {
        setCurrentUser(user);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => setIsPageLoading(false));
  }

  //Функция добавления новый карточек
  function handleAddPlaceSubmit(data) {
    setIsPageLoading(true);
    api
      .addNewCard(data)
      .then(({ data }) => {
        setCards([data, ...cards]);
        closeAllPopups(); //Закрытие модальных окон
      })
      .catch((err) => {
        console.error(`Ошибка: ${err}`);
      })
      .finally(() => setIsPageLoading(false));
  }

  // Функция регистрация пользователи
  function handleUserRegistration(data) {
    return auth
      .registerUser(data)
      .then((data) => {
        setIsSuccessfulRegistration(true);
        handleInfoTooltip();
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessfulRegistration(false);
        handleInfoTooltip();
      });
  }

  // Функция авторизация пользователя
  function handleUserAuthorization(userData) {
    return auth
      .loginUser(userData)
      .then((data) => {
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        setHeaderUserEmail(userData.email);
        CheckToken();
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setIsSuccessfulRegistration(false);
        handleInfoTooltip();
      });
  }

  // Проверка токена
  const CheckToken = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
     return;
    }
   // api
     //.setToken()    
      auth
      .checkToken(token)
      .then((data) => {
        setHeaderUserEmail(data.data.email);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  
  useEffect(() => {
    CheckToken();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getInitialCards(), api.getUserInfo()])
      .then(([{ data: cards }, { data: user }]) => {
        setCurrentUser(user);
        setCards(cards.reverse());
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
    }
  }, [isLoggedIn]);

  // Функция, отвечающая за выход пользователя
  function handleSingOut() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    setHeaderUserEmail("");
    navigate("/sign-in");
  }

  return (
    //В качестве значения контекста для провайдера используем currentUser
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="root">
          <Header
            isLoggedIn={isLoggedIn}
            headerUserEmail={headerUserEmail}
            onSignOut={handleSingOut}
          />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  isLoggedIn={isLoggedIn}
                  cards={cards}
                  onEditProfile={handleEditProfileClick}
                  onEditAvatar={handleEditAvatarClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              }
            />
            <Route
              path="/sign-in"
              element={<Login onLogin={handleUserAuthorization} />}
            />
            <Route
              path="/sign-up"
              element={<Register onRegister={handleUserRegistration} />}
            />
          </Routes>

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isPageLoading={isPageLoading}
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isPageLoading={isPageLoading}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
            isPageLoading={isPageLoading}
          />
          <InfoTooltip
            isOpen={infoSuccessOpen}
            onClose={closeAllPopups}
            success={isSuccessfulRegistration}
            name="success"
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <PopupWithForm name="addCardPopup" title="Вы уверены?" text="Да" />
        </div>
        <Footer isLoggedIn={isLoggedIn} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
