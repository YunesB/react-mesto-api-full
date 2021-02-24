import React from 'react';
import Card from './Card.jsx';
import loading from '../images/loading.svg';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';

function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile-info">
                    <div className="profile-info__image-container">
                        <button type="button" className="profile-info__avatar-customizaton" onClick={props.onEditAvatar}>
                        </button>
                        <img src={currentUser.avatar || loading} alt="Аватар" className="profile-info__image" />
                    </div>
                    <div className="profile-info__container">
                        <div className="profile-info__name-box">
                            <h1 className="profile-info__name">{currentUser.name || 'Загрузка данных...'}</h1>
                            <button type="button" className="profile-info__customization" onClick={props.onEditProfile}></button>
                        </div>
                        <p className="profile-info__job">{currentUser.about || ''}</p>
                    </div>
                </div>
                <button type="button" className="profile__button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="cards">
                    {props.cards.map((card) => (
                        <Card
                            card={card}
                            key={card._id}
                            onCardClick={props.onCardClick}
                            onLikeClick={props.onLikeClick}
                            onDeleteClick={props.onDeleteClick}
                        />
                    ))}
                </ul>
            </section>
            <footer className="footer">
                <p className="footer__credit">{props.text}</p>
            </footer>
        </main>
    );
}

export default Main;
