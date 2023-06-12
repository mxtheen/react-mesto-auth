import React from "react"

function Login(props) {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }
  function handleSubmit(e) {
    e.preventDefault()
    props.handleLogin(email, password)
  }
  return (
    <section className="auth">
      <div className="authorization">
        <form className="authorization__form" onSubmit={handleSubmit}>
          <h2 className="authorization__title">Вход</h2>
          <input className="authorization__input" type="email" placeholder="Email" value={email} onChange={handleEmailChange}></input>
          <input className="authorization__input" type="password" placeholder="Пароль" value={password} onChange={handlePasswordChange} autoComplete="on"></input>
          <button type="submit" className="authorization__button">Войти</button>
        </form>
      </div>
    </section>
  )
}

export default Login
