import AbstractLanguage from './AbstractLanguage';

export default class Navigation extends AbstractLanguage {
  get you() {
    return this.getText({
      EN: 'You',
      RU: 'Вы',
      UA: 'Ви',
    });
  }

  get team() {
    return this.getText({
      EN: 'Team',
      RU: 'Команда',
      UA: 'Команда',
    });
  }

  get academy() {
    return this.getText({
      EN: 'Academy',
      RU: 'Академия',
      UA: 'Академія',
    });
  }

  get actions() {
    return this.getText({
      EN: 'Actions',
      RU: 'События',
      UA: 'Події',
    });
  }

  get customers() {
    return this.getText({
      EN: 'Customers',
      RU: 'Заказчики',
      UA: 'Замовники',
    });
  }

  get projects() {
    return this.getText({
      EN: 'Projects',
      RU: 'Проекты',
      UA: 'Проекти',
    });
  }

  get sales() {
    return this.getText({
      EN: 'Sales',
      RU: 'Продажи',
      UA: 'Продажі',
    });
  }
}
