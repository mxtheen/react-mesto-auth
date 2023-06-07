import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from '../contexts/CurrentUserContext'

function EditAvatarPopup(props) {
  const userContext = React.useContext(CurrentUserContext)
  const avatarRef = React.useRef()

  React.useEffect(() => {
    avatarRef.current.value = ""
  }, [userContext])

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }


  return (
    <PopupWithForm name='update-avatar' title='Обновить аватар' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} >
      <input id="input-avatar" className="popup__input popup__input_type_link" placeholder="Ссылка на аватар" type="url"
        name="avatar" required ref={avatarRef} />
      <span id="input-avatar-error" className="popup__error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
