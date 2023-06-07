import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext'

function Card(props) {
  const userContext = React.useContext(CurrentUserContext)
  const isOwn = props.card.owner._id === userContext._id;
  const isLiked = props.card.likes.some(i => i._id === userContext._id);

  function handleLikeClick (){
    props.onCardLike(props.card)
  }

  function handleCardDelete(){
    props.onCardDelete(props.card)
  }

  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <article className="element">
      {isOwn && <button type="button" className="element__remove-button" onClick={handleCardDelete}/>}
      <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="element__caption">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__like-container">
          <button className={`element__like-button ${isLiked ? "element__like-button_active" : ""}`} onClick={handleLikeClick}></button>
          <p className="element__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
    </article>
  )
}
export default Card
