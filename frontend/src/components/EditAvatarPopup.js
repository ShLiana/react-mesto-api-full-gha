import React from "react";
import PopupWithForm from "../components/PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isPageLoading }) {
  const ref = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      userAvatar: ref.current.value,
    });
  }

  // Очищаем форму от предыдущей ссылки
  React.useEffect(() => {
    ref.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name={"editAvatarPopup"}
      title={"Обновить аватар"}
      text={"Сохранить"}
      onSubmit={handleSubmit}
      isPageLoading={isPageLoading}
      renderLoadingText="Обновление..."
    >
      <input
        ref={ref}
        className="popup__input popup__input_type_name"
        id="userAvatar"
        name="userAvatar"
        type="url"
        placeholder="Ссылка на аватар"
        required
        minLength="2"
        maxLength="100"
      />
      <span className="userAvatar-error popup__input-error" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
