import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(evt) {
        evt.preventDefault();   
        props.onCreateCard({
            name,
            link
        });
        setName('');
        setLink('');
    }

    function handlePlaceChange(evt) {
        setName(evt.target.value);
    }

    function handleImageChange(evt) {
        setLink(evt.target.value);
    }

    return (
        <PopupWithForm 
            isOpen={props.isOpen ? "popup_opened" : ""}
            onClose={props.onClose}
            onSubmit={handleSubmit}
            name="popupFormCard" 
            title="Новое место" 
            buttonName="Создать">
                <label className="popup__field">
                  <input 
                    minLength="2" 
                    maxLength="30" type="text" 
                    className="popup__input popup__input_data_name" 
                    name="name" placeholder="Название" required
                    id="place-input"
                    onChange={handlePlaceChange}
                    value={name}
                  />
                  <span className="popup__error" id="place-input-error"></span>
                </label>
                <label className="popup__field">
                  <input 
                    minLength="2"
                    type="url" 
                    className="popup__input popup__input_data_info" 
                    name="link" placeholder="Ссылка на картинку" required
                    id="url-input"
                    onChange={handleImageChange}
                    value={link}
                  />
                  <span className="popup__error" id="url-input-error"></span>
                </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
