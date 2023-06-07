import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from '../contexts/CurrentUserContext'

function EditProfilePopup(props) {
  const [name, setName] = React.useState("")
  const [description, setDescription] = React.useState("")
  const userContext = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setName(userContext.name)
    setDescription(userContext.about)
  }, [userContext, props.isOpen])

  function handleChangeName(e) {
    setName(e.target.value)
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }

  return (
    <PopupWithForm name='edit' title='Редактировать профиль' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
      <input id="input-name" value={name || ""} className="popup__input popup__input_type_name" placeholder="Имя" type="text" name="name"
        required minLength="2" maxLength="40" onChange={handleChangeName} />
      <span id="input-name-error" className="popup__error"></span>
      <input id="input-job" value={description || ""} className="popup__input popup__input_type_job" placeholder="Род деятельности" type="text"
        name="about" required minLength="2" maxLength="200" onChange={handleChangeDescription} />
      <span id="input-job-error" className="popup__error"></span>
    </PopupWithForm>
  )
}
export default EditProfilePopup
