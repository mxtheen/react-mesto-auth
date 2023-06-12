import { Link, useNavigate } from "react-router-dom"
import React from "react"
import * as auth from "../utils/auth"

function Register(props) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const navigate = useNavigate()

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    auth.register(email, password)
      .then(() => {
        props.onRegister()
        props.handleSucces(true)
        navigate("/sign-in")
      })
      .catch((err) => {
        props.onRegister()
        props.handleSucces(false)
        console.log(err)
      })
  }
  return (
    <section className="auth">
      <div className="authorization">
        <form className="authorization__form" onSubmit={handleSubmit}>
          <h2 className="authorization__title">Регистрация</h2>
          <input className="authorization__input" type="email" placeholder="Email" value={email} onChange={handleEmailChange} ></input>
          <input className="authorization__input" type="password" placeholder="Пароль" value={password} onChange={handlePasswordChange} autoComplete="on"></input>
          <button type="submit" className="authorization__button">Зарегистрироваться</button>
          <Link to="/sign-in" className="authorization__link">Уже зарегистрированы? Войти</Link>
        </form>
      </div>
    </section>
  )
}
export default Register
