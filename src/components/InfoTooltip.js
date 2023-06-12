import succImg from "../images/succesful_registration.svg"
import failImg from "../images/failedRegistration.svg"

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__content">
        <button type="button" className="popup__close-button" onClick={props.onClose}></button>
        {props.isSucces ?
          <div className="authorization__info">
            <img className="authorization__info-image" src={succImg} alt="Все успешно!"></img>
            <h2 className="authorization__info-caption">Вы успешно зарегистрировались!</h2>
          </div>
          :
          <div className="authorization__info">
            <img className="authorization__info-image" src={failImg} alt="Что-то пошло не так!"></img>
            <h2 className="authorization__info-caption">Что-то пошло не так! Попробуйте ещё раз.</h2>
          </div>
        }
      </div>
    </div>
  )
}
export default InfoTooltip
