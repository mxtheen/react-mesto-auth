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
import * as auth from "../utils/auth.js"
import CurrentUserContext from '../contexts/CurrentUserContext'
import React from 'react';
import Login from './Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';
import PageNotFound from './PageNotFound';
import ProtectedRouteElement from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setAddProfileOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false)
  const [isDeleteConfirmPopupOpen, setDeleteConfirmPopup] = React.useState(false)
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = React.useState([])
  const [loggedIn, setLoggedIn] = React.useState(false)
  const [email, setEmail] = React.useState("")
  const [isSucces, setIsSucces] = React.useState(false)

  const navigate = useNavigate()

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

  function handleLogin(email, password) {
    auth.login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token)
          setEmail(email)
          navigate("/")
          handleLoggedIn()
        }
      })
      .catch((err) => {
        handleInfoTooltipOpen()
        setIsSucces(false)
        console.log(err)
      })
  }

  function handleCheckToken() {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      auth.checkToken(jwt)
        .then((data) => {
          setEmail(data.data.email)
          handleLoggedIn()
          navigate("/")
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  React.useEffect(() => {
    handleCheckToken()
  }, [])

  function handleSignOut() {
    localStorage.removeItem("jwt")
    navigate("/sign-in")
    setLoggedIn(false)
  }


  function handleLoggedIn() {
    setLoggedIn(true)
  }

  function handleInfoTooltipOpen() {
    setInfoTooltipOpen(true)
  }

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
    setDeleteConfirmPopup(false)
    setInfoTooltipOpen(false)
    setSelectedCard(null)
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header email={email} signOut={handleSignOut} loggedIn={loggedIn}/>
      <Routes>
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        <Route path="/sign-up" element={<Register handleSucces={setIsSucces} onRegister={handleInfoTooltipOpen} />}/>
        <Route path="/" element={<ProtectedRouteElement
          loggedIn={loggedIn}
          element={Main}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          cards={cards}
        ></ProtectedRouteElement>} />
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      <PopupWithForm name='confirmation' title='Вы уверены?' isOpen={isDeleteConfirmPopupOpen} onClose={closeAllPopups} buttonContent="Да"/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      <InfoTooltip isSucces={isSucces} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
