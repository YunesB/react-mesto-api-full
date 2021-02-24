import React from 'react';
import PopupWithForm from './PopupWithForm.jsx';

function ConfirmationPopup(props) {

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onConfirm(props.card);
    }

    return (
      <PopupWithForm 
          isOpen={props.isOpen ? "popup_opened" : ""}
          onClose={props.onClose}
          onSubmit={handleSubmit}
          name="popupConfirm" 
          title="Вы уверены?" 
          buttonName="Да">
      </PopupWithForm>
    );
}

export default ConfirmationPopup;
