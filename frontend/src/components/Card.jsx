import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';

function Card(props) {
    const cardData = props.card;
    const currentUser = React.useContext(CurrentUserContext);
    const isOwned = cardData.owner === currentUser._id;
    const isLiked = cardData.likes.some(i => i === currentUser._id);

    function handleCardClick() {
        props.onCardClick(cardData);
    }

    function handleLikeClick() {
        props.onLikeClick(cardData)
    }

    function handleDeleteClick() {
        props.onDeleteClick(cardData)
    }

    return (
        <li className="card">
            <img
                src={cardData.link}
                alt={cardData.name}
                className="card__image"
                onClick={handleCardClick}
            />
            {isOwned ? <button type="button" className='card__delete-button' onClick={handleDeleteClick}></button> : ''}
            <div className="card__box">
                <h2 className="card__title">{cardData.name}</h2>
                <div className="card__like-box">
                    <button type="button" className={`card__like ${isLiked ? 'card__like_state_posted' : ''}`} onClick={handleLikeClick}></button>
                    <p className="card__like-counter">{cardData.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;