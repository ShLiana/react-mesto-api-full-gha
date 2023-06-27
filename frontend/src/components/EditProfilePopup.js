import React from "react";
import PopupWithForm from "../components/PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isPageLoading }) => {
  const [name, setName] = React.useState("currentUser.name");
  const [description, setDescription] = React.useState("currentUser.about");
  //подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]); //Форма заполняется как при загрузуке данных с сервера, так и при каждом открытии попапа

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    //запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаем значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      userName: name,
      userJob: description,
    });
  }

  return (
    <PopupWithForm
      name={"editProfile"}
      title={"Редактировать профиль"}
      text={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isPageLoading={isPageLoading}
      renderLoadingText="Сохранение..."
    >
      <input
        className="popup__input popup__input_type_name"
        id="user-name-input"
        name="userName"
        type="text"
        placeholder="Имя пользователя"
        minLength="2"
        maxLength="40"
        value={name || ""}
        onChange={handleNameChange}
        required
      />
      <span className="user-name-input-error popup__input-error" />
      <input
        className="popup__input popup__input_type_job"
        id="user-job-input"
        name="userJob"
        type="text"
        placeholder="Род деятельности"
        minLength="2"
        maxLength="200"
        value={description || ""}
        onChange={handleDescriptionChange}
        required
      />
      <span className="user-job-input-error popup__input-error" />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
