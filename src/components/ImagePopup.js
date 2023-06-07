function ImagePopup(props) {
  return (
    <div className={`popup popup_scale-image ${props.card ? "popup_opened" : ""}`}>
      <div className="popup__content-scale-image">
        <button type="button" className="popup__close-button popup__close-button_image" onClick={props.onClose}></button>
        <figure className="popup__figure">
          <img className="popup__image" src={props.card ? props.card.link : ''} alt={props.card ? props.card.name : ''} />
          <figcaption className="popup__caption">{props.card ? props.card.name : ''}</figcaption>
        </figure>
      </div>
    </div>
  )
}
export default ImagePopup
