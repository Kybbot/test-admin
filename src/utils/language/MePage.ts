import AbstractLanguage from './AbstractLanguage';

export default class MePage extends AbstractLanguage {
  get info() {
    return this.getText({
      EN: 'Info',
      RU: 'Информация',
      UA: 'Інформація',
    });
  }

  get welcome() {
    return this.getText({
      EN: 'Welcome',
      RU: 'Добро пожаловать',
      UA: 'Ласкаво просимо',
    });
  }

  get role() {
    return this.getText({
      EN: 'Role',
      RU: 'Роль',
      UA: 'Роль',
    });
  }

  get birthday() {
    return this.getText({
      EN: 'Birthday',
      RU: 'День рождения',
      UA: 'День народження',
    });
  }

  get telegramId() {
    return this.getText({
      EN: 'Telegram ID',
      RU: 'Телеграм ID',
      UA: 'Телеграм ID',
    });
  }

  get english() {
    return this.getText({
      EN: 'English',
      RU: 'Английский',
      UA: 'Англійська',
    });
  }

  get email() {
    return this.getText({
      EN: 'Email',
      RU: 'Почта',
      UA: 'Пошта',
    });
  }

  get workload() {
    return this.getText({
      EN: 'Workload',
      RU: 'Загруженность',
      UA: 'Навантаження',
    });
  }

  get projects() {
    return this.getText({
      EN: 'Projects',
      RU: 'Проекты',
      UA: 'Проекти',
    });
  }

  get calendar() {
    return this.getText({
      EN: 'Calendar',
      RU: 'Календарь',
      UA: 'Календар',
    });
  }

  get inventory() {
    return this.getText({
      EN: 'Inventory',
      RU: 'Инвентарь',
      UA: 'Інвентар',
    });
  }

  get dashboard() {
    return this.getText({
      EN: 'Dashboard',
      RU: 'Таблица',
      UA: 'Таблиця',
    });
  }

  get quick_actions() {
    return this.getText({
      EN: 'Quick actions',
      RU: 'Быстрые действия',
      UA: 'Швидкі дії',
    });
  }

  get mne_pizda() {
    return this.getText({
      EN: 'Mne pizda',
      RU: 'Мне пизда',
      UA: 'Мені пизда',
    });
  }

  get i_need_help_with() {
    return this.getText({
      EN: 'Taking fire, need assistance',
      RU: 'Мне нужна помощь с ...',
      UA: 'Мені потрібна допомога з ...',
    });
  }

  get team_vacations() {
    return this.getText({
      EN: 'Team vacations',
      RU: 'Отпуска команды',
      UA: 'Відпустки команди',
    });
  }

  get take_vacation() {
    return this.getText({
      EN: 'Take vacation',
      RU: 'Взять отпуск',
      UA: 'Взяти відпустку',
    });
  }

  get take_sick_leave() {
    return this.getText({
      EN: 'Take sick leave',
      RU: 'Взять больничный',
      UA: 'Взяти  відпустку по хворобі',
    });
  }

  get extend_sick_leave() {
    return this.getText({
      EN: 'Extend sick leave',
      RU: 'Продлить больничный',
      UA: 'Продовжити відпуску по хворобі',
    });
  }

  get copy_token() {
    return this.getText({
      EN: 'Copy token',
      RU: 'Копировать токен',
      UA: 'Копіювати токен',
    });
  }

  get other() {
    return this.getText({
      EN: 'Other',
      RU: 'Прочее',
      UA: 'Інше',
    });
  }

  get mangers() {
    return this.getText({
      EN: 'Managers',
      RU: 'Менеджеры',
      UA: 'Менеджери',
    });
  }

  get sales() {
    return this.getText({
      EN: 'Sales',
      RU: 'Продажи',
      UA: 'Продажі',
    });
  }

  get my_vacations() {
    return this.getText({
      EN: 'My vacations',
      RU: 'Мои отпуска',
      UA: 'Мої відпустки',
    });
  }

  get change_password() {
    return this.getText({
      EN: 'Change password',
      RU: 'Изменить пароль',
      UA: 'Змінити пароль',
    });
  }

  get change_language() {
    return this.getText({
      EN: 'Change language',
      RU: 'Изменить язык',
      UA: 'Змінити мову',
    });
  }

  get logout() {
    return this.getText({
      EN: 'Log out',
      RU: 'Выйти',
      UA: 'Вийти',
    });
  }

  get disconnect() {
    return this.getText({
      EN: 'Disconnect',
      RU: 'Отключить',
      UA: 'Від\'єднати',
    });
  }

  get token_was_copied() {
    return this.getText({
      EN: 'Token was copied successfully',
      RU: 'Токен был успешно скопирован',
      UA: 'Токен було вдало скопійовано',
    });
  }

  get email_was_copied() {
    return this.getText({
      EN: 'Email was copied successfully',
      RU: 'Email был успешно скопирован',
      UA: 'Email було вдало скопійовано',
    });
  }

  get add_tags() {
    return this.getText({
      EN: 'Add tags',
      RU: 'Добавить теги',
      UA: 'Додати теги',
    });
  }

  get assign_computer() {
    return this.getText({
      EN: 'Assign computer',
      RU: 'Добавить компьютер',
      UA: 'Додати комп\'ютер',
    });
  }

  get vacations() {
    return this.getText({
      EN: 'Vacations',
      RU: 'Отпуска',
      UA: 'Відпустки',
    });
  }

  get create_action() {
    return this.getText({
      EN: 'Create action',
      RU: 'Создать событие',
      UA: 'Створити подію',
    });
  }

  get sick_leaves() {
    return this.getText({
      EN: 'Sick leaves',
      RU: 'Больничные',
      UA: 'Відпустки по хворобі',
    });
  }

  get holidays() {
    return this.getText({
      EN: 'Holidays',
      RU: 'Праздники',
      UA: 'Свята',
    });
  }

  get my_sick_leaves() {
    return this.getText({
      EN: 'My sick leaves',
      RU: 'Мои больничные',
      UA: 'Мої відпустки по хворобі',
    });
  }

  get customers() {
    return this.getText({
      EN: 'Customers',
      RU: 'Заказчики',
      UA: 'Замовники',
    });
  }

  get team() {
    return this.getText({
      EN: 'Team',
      RU: 'Команда',
      UA: 'Команда',
    });
  }

  get time() {
    return this.getText({
      EN: 'Time',
      RU: 'Время',
      UA: 'Час',
    });
  }

  get used() {
    return this.getText({
      EN: 'Used',
      RU: 'Использовано',
      UA: 'Використано',
    });
  }

  get total() {
    return this.getText({
      EN: 'Total',
      RU: 'Всего',
      UA: 'Всього',
    });
  }

  get no_sick_leaves() {
    return this.getText({
      EN: 'No sick leaves',
      RU: 'Нет больничных',
      UA: 'Немає відпусток по хворобі',
    });
  }

  get available() {
    return this.getText({
      EN: 'Available',
      RU: 'Доступно',
      UA: 'Доступно',
    });
  }

  get panic_toast() {
    return this.getText({
      EN: 'Panic activated',
      RU: 'Паника активирована',
      UA: 'Тiкай з городу, тобi пiзда',
    });
  }

  get sick_toast() {
    return this.getText({
      EN: 'Sick leave notification sent to administrator',
      RU: 'Уведомление о больничном отправлено администратору',
      UA: 'Повідомлення про хворобу відпралене адміністратору',
    });
  }

  get money_toast() {
    return this.getText({
      EN: 'Money request was sent',
      RU: 'Запрос увеличения зарплаты отправлен',
      UA: 'Запит збільшення зарплати відправлено',
    });
  }

  get help_toast() {
    return this.getText({
      EN: 'Help request was sent',
      RU: 'Запрос помощи отправлен',
      UA: 'Запит допомоги відправлено',
    });
  }

  get want_more_money() {
    return this.getText({
      EN: 'Want more money',
      RU: 'Хочу больше денег',
      UA: 'Хочу більше грошей',
    });
  }

  get show_all() {
    return this.getText({
      EN: 'Show all',
      RU: 'Показать все',
      UA: 'Показати всі',
    });
  }

  get show_active() {
    return this.getText({
      EN: 'Show active only',
      RU: 'Показать только активные',
      UA: 'Показати тільки активні',
    });
  }

  get team_actions() {
    return this.getText({
      EN: 'Team actions',
      RU: 'События команды',
      UA: 'Події команди',
    });
  }

  get team_tags() {
    return this.getText({
      EN: 'Team tags',
      RU: 'Теги команды',
      UA: 'Теги команди',
    });
  }

  get delete_user() {
    return this.getText({
      EN: 'Delete user',
      RU: 'Удалить юзера',
      UA: 'Видалити користувача',
    });
  }

  get restore_user() {
    return this.getText({
      EN: 'Restore user',
      RU: 'Восстановить пользователя',
      UA: 'Відновити користувача',
    });
  }

  get restore() {
    return this.getText({
      EN: 'Restore',
      RU: 'Восстановить',
      UA: 'Відновити',
    });
  }

  get restore_project() {
    return this.getText({
      EN: 'Restore project',
      RU: 'Восстановить проект',
      UA: 'Відновити проект',
    });
  }
}
