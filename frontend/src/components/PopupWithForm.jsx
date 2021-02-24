function PopupWithForm(props) {
    return (
        <div className={`popup ${props.isOpen ? ' popup_opened ' : " "}`} id={props.name}>
          <div className="popup__container">
            <h2 className="popup__heading">{props.title}</h2>
            <form className="popup__form" name={props.name} id={`${props.name}form`} onSubmit={props.onSubmit} noValidate>
              <fieldset className="popup__set">
                {props.children}
                <button type="submit" className="popup__button" >Сохранить</button>
              </fieldset>  
            </form>
            <button className="popup__close" type="button" onClick={props.onClose}></button>
          </div>
        </div>
    );
}

export default PopupWithForm;
