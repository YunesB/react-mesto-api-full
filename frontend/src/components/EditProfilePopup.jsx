import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState();
  const [about, setAbout] = React.useState();

  React.useEffect(() => {
    currentUser.name && setName(currentUser.name);
    currentUser.about && setAbout(currentUser.about);
  }, [currentUser]);

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about,
    });
  }

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleAboutChange(evt) {
    setAbout(evt.target.value);
  }


  return (
    <PopupWithForm
      isOpen={props.isOpen ? "popup_opened" : ""}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="popupFormInfo"
      title="Редактировать профиль"
      buttonName="Сохранить" >
      <label className="popup__field">
        <input
          minLength="2"
          maxLength="40"
          type="text"
          className="popup__input popup__input_data_name"
          name="name" placeholder="Имя" required
          id="name-input"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__error" id="name-input-error"></span>
      </label>
      <label className="popup__field">
        <input minLength="2"
          maxLength="200"
          type="text" className="popup__input popup__input_data_info"
          name="info" placeholder="О себе" required
          id="data-input"
          value={about}
          onChange={handleAboutChange}
        />
        <span className="popup__error" id="data-input-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
