import headerLogo from "../images/headerLogo.svg"
import { Link, Route, Routes } from "react-router-dom"

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место - логотип" />
      {props.loggedIn ? (
        <div className="header__user-info">
          <p className="header__email">{props.loggedIn ? props.email : ""}</p>
          <Link to="/sign-in" className="header__link" onClick={props.signOut}>Выйти</Link>
        </div>
      )
        : (
          <div className="header__user-info">
            <p className="header__email">{props.loggedIn ? "email" : ""}</p>
            <Routes>
              <Route path="/sign-up" element={
                <Link to="/sign-in" className="header__link">Войти</Link>
              } />
              <Route path="/sign-in" element={
                <Link to="/sign-up" className="header__link">Регистрация</Link>
              } />
            </Routes>
          </div>
        )

      }

    </header>
  );
}

export default Header;
