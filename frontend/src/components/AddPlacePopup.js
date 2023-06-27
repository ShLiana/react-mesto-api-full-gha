import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onSubmit({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    if (props.isOpen) {
      setName("");
      setLink("");
    }
  }, [props.isOpen]);

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onCloseClick}
      name={"addCardPopup"}
      title={"Новое место"}
      text={"Создать"}
      onSubmit={handleSubmit}
      isPageLoading={props.isPageLoading}
      renderLoadingTextBtn="Добавление..."
    >
      <input
        className="popup__input popup__input_type_title"
        id="place-name-input"
        name="name"
        type="text"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        value={name}
        onChange={handleNameChange}
        required
      />
      <span className="place-name-input-error popup__input-error" />
      <input
        className="popup__input popup__input_type_link"
        id="place-link-input"
        name="link"
        type="URL"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleLinkChange}
        required
      />
      <span className="place-link-input-error popup__input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
