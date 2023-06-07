import addImage from "../images/vector_plus__image.svg"
import React from "react";
import Card from "./Card";
import CurrentUserContext from '../contexts/CurrentUserContext'

function Main(props) {
  const userContext = React.useContext(CurrentUserContext)
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button className="profile__avatar-button" onClick={props.onEditAvatar}>
            <img className="profile__avatar" src={userContext.avatar} alt="Аватар" />
          </button>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__title">{userContext.name}</h1>
              <button type="button" className="profile__edit-button" onClick={props.onEditProfile}></button>
            </div>
            <p className="profile__subtitle">{userContext.about}</p>
          </div>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
          <img className="profile__add-image" src={addImage}
            alt="Добавить изображение" />
        </button>
      </section>
      <section className="elements" aria-label="Блок с изображениями">
        {props.cards.map((card) => (
          <Card key={card._id} onCardClick={props.onCardClick} onCardDelete={props.onCardDelete} onCardLike={props.onCardLike} card={card}>
          </Card>
        ))}
      </section>
    </main>
  );
}

export default Main;
