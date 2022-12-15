import AbstractLanguage from './AbstractLanguage';

export default class Authorization extends AbstractLanguage {
  get authorization_header() {
    return this.getText({
      EN: 'Login',
      RU: 'Авторизация',
      UA: 'Авторизація',
    });
  }

  get authorization_email() {
    return this.getText({
      EN: 'Email',
      RU: 'Эл. почта',
      UA: 'Ел. пошта',
    });
  }

  get authorization_password() {
    return this.getText({
      EN: 'Password',
      RU: 'Пароль',
      UA: 'Пароль',
    });
  }

  get something_went_wrongh() {
    return this.getText({
      EN: 'Something went wrong',
      RU: 'Что-то пошло не так',
      UA: 'Щось пішло не так',
    });
  }
}
