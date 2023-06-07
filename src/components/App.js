import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup'
import '../index.css';
import apiInit from '../utils/apiInit';
import CurrentUserContext from '../contexts/CurrentUserContext'
import React from 'react';


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddProfileOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteConfirmPopupOpen, setDeleteConfirmPopup] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    Promise.all([
      apiInit.getUserInfo(),
      apiInit.getInitialCards()
    ])
      .then(([userData, cardData]) => {
        setCurrentUser(userData)
        setCards(cardData)
      })
      .catch((err) => {
        console.log("При получении данных с сервера возникла ошибка:", err)
      })
  }, [])

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setAddProfileOpen(true)
  }
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  function handleUpdateUser(currentUser) {
    apiInit.setUserInfo(currentUser)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      }).catch((err) => {
        console.log("При обновлении информации о пользователе возникла ошибка:", err)
      })
  }

  function handleUpdateAvatar(currentUser) {
    apiInit.changeUserAvatarImage(currentUser)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      }).catch((err) => {
        console.log("При обновлении аватара возникла ошибка:", err)
      })
  }

  function handleCardDelete(card) {
    apiInit.deleteCard(card._id)
      .then(() => {
        setCards((cards => cards.filter((item) => item._id !== card._id)))
      })
      .catch((err) => {
        console.log("При удалении карточки возникла ошибка:", err)
      })
  }

  function handleAddPlaceSubmit(card) {
    apiInit.createNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards])
        closeAllPopups()
      }).catch((err) => {
        console.log("При добавлении нового места возникла ошибка:", err)
      })
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    isLiked ?
      apiInit.deleteLikeCard(card._id)
        .then((newCardData) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCardData : item))
          )
        ).catch((err) => {
          console.log("При лайке карточки возникла ошибка:", err)
        })
      :
      apiInit.putLikeCard(card._id)
        .then((newCardData) =>
          setCards((state) =>
            state.map((item) => (item._id === card._id ? newCardData : item))
          )
        ).catch((err) => {
          console.log("При снятии лайка карточки возникла ошибка:", err)
        })
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false)
    setAddProfileOpen(false)
    setEditAvatarPopupOpen(false)
    setSelectedCard(null)
    setDeleteConfirmPopup(false)
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
        onCardDelete={handleCardDelete}
        onCardLike={handleCardLike}
        cards={cards}
      />
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}></EditAvatarPopup>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>
      <PopupWithForm name='confirmation' title='Вы уверены?' isOpen={isDeleteConfirmPopupOpen} onClose={closeAllPopups} buttonContent="Да"></PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
