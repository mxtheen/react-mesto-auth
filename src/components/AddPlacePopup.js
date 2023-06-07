import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState("")
  const [link, setLink] = React.useState("")

  React.useEffect(() => {
    setTitle('');
    setLink('')
  }, [props.isOpen])

  function handleChangeTitle(e) {
    setTitle(e.target.value)
  }
  function handleChangeLink(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: title,
      link: link
    })
  }

  return (
    <PopupWithForm name='add' title='Новое место' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} buttonContent="Создать">
      <input id="input-title" value={title || ""} className="popup__input popup__input_type_title" placeholder="Название" type="text"
        name="title" required minLength="2" maxLength="30" onChange={handleChangeTitle} />
      <span id="input-title-error" className="popup__error"></span>
      <input id="input-link" value={link || ""} className="popup__input popup__input_type_link" placeholder="Ссылка на картинку" type="url"
        name="link" required onChange={handleChangeLink} />
      <span id="input-link-error" className="popup__error"></span>
    </PopupWithForm>
  )
}
export default AddPlacePopup
