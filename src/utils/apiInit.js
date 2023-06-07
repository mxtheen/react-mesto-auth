import Api from "./Api.js"
const apiConfig = ({
  url: 'https://mesto.nomoreparties.co/v1/cohort-64/',
  headers: {
    authorization: 'b92a68e1-9c05-465c-acf6-54138cb2e2f3',
    'Content-Type': 'application/json'
  }
});
const apiInit = new Api(apiConfig)
export default apiInit

