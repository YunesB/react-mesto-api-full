import loading from '../images/loading.svg';

function ImagePopup(props) {
    const cardData = props.card;

    return (
        <div className={`popup ${props.isOpen}`} id={props.isOpen}>
          <div className="popup__img-container">
            <img src={cardData.link || loading} alt={cardData.name} className="popup__image"/>
            <button className="popup__close" type="button" onClick={props.onClose}></button>
            <h3 className="popup__img-subline">{cardData.name}</h3>
          </div>
        </div>
    );
}

export default ImagePopup;
