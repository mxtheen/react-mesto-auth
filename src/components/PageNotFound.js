import { Link } from "react-router-dom"
import anxiousFace from "../images/Anxious-face-with-sweat.svg"
function PageNotFound() {
  return (
    <section className="not-found">
      <div className="not-found__container">
        <img className="not-found__image" src={anxiousFace} alt=""></img>
        <h2 className="not-found__title">Ошибка: 404</h2>
        <p className="not-found__subtitle">Тут ничего нет, попробуйте вернуться <Link to='/' className="not-found__link">назад!</Link></p>
      </div>
    </section>
  )
}
export default PageNotFound
