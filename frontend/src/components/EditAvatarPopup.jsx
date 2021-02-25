import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      avatar: avatarRef.current.value
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = '';
  })

  return (
    <PopupWithForm
      isOpen={props.isOpen ? "popup_opened" : ""}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="popupFormAvatar"
      title="Обновить аватар"
      buttonName="Сохранить">
      <label className="popup__field">
        <input
          minLength="2"
          type="url"
          className="popup__input popup__input_data_info"
          name="avatar" placeholder="Ссылка на картинку" required
          id="avatar-input"
          ref={avatarRef}
        />
        <span className="popup__error" id="url-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
