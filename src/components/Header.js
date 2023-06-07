import headerImage from "../images/headerLogo.svg"

function Header() {
  return (
    <header className="header">
      <img className="header__logo"
        src={headerImage}
        alt="Место - логотип" />
    </header>
  );
}

export default Header;
