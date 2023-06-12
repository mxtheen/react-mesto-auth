function PopupWithForm(props) {
  return (
    <div className={`popup popup_${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__content popup__content_${props.name}`}>
        <button type="button" className="popup__close-button popup__close-button_edit" onClick={props.onClose}></button>
        <form className={`popup__form popup__form_${props.name}`} name={`form__${props.name}`} onSubmit={props.onSubmit}>
          <h2 className={`popup__title popup__title_${props.name}`}>{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__save-button popup__save-button_edit">{props.buttonContent || 'Сохранить'}</button>
        </form>
      </div>
    </div>
  )
}
export default PopupWithForm
