import AbstractLanguage from './AbstractLanguage';

export default class InputsPages extends AbstractLanguage {
  get firs_name() {
    return this.getText({
      EN: 'First name',
      RU: 'Имя',
      UA: 'Ім\'я',
    });
  }

  get full_name() {
    return this.getText({
      EN: 'Full name',
      RU: 'Полное имя',
      UA: 'Повне ім\'я',
    });
  }

  get last_name() {
    return this.getText({
      EN: 'Last name',
      RU: 'Фамилия',
      UA: 'Прізвище',
    });
  }

  get linkedin() {
    return this.getText({
      EN: 'LinkedIn',
      RU: 'LinkedIn',
      UA: 'LinkedIn',
    });
  }

  get email() {
    return this.getText({
      EN: 'Email',
      RU: 'Эл. почта',
      UA: 'Ел. пошта',
    });
  }

  get post_title() {
    return this.getText({
      EN: 'Title',
      RU: 'Заголовок',
      UA: 'Заголовок',
    });
  }

  get second_email() {
    return this.getText({
      EN: 'Second email',
      RU: 'Вторая эл. почта',
      UA: 'Друга ел. пошта',
    });
  }

  get photo() {
    return this.getText({
      EN: 'Photo URL',
      RU: 'Ссылка на фото',
      UA: 'Посилання на фото',
    });
  }

  get file() {
    return this.getText({
      EN: 'Photo file',
      RU: 'Выберите фото',
      UA: 'Виберіть фото',
    });
  }

  get telegramId() {
    return this.getText({
      EN: 'Telegram ID',
      RU: 'Телеграм ID',
      UA: 'Телеграм ID',
    });
  }

  get birthday() {
    return this.getText({
      EN: 'Birthday',
      RU: 'День рождения',
      UA: 'День народження',
    });
  }

  get edit() {
    return this.getText({
      EN: 'Edit',
      RU: 'Редактирование',
      UA: 'Редагування',
    });
  }

  get save_changes() {
    return this.getText({
      EN: 'Save changes',
      RU: 'Сохранить изменения',
      UA: 'Зберегти зміни',
    });
  }

  get save() {
    return this.getText({
      EN: 'Save',
      RU: 'Сохранить',
      UA: 'Зберегти',
    });
  }

  get add() {
    return this.getText({
      EN: 'Add',
      RU: 'Добавить',
      UA: 'Додати',
    });
  }

  get add_user() {
    return this.getText({
      EN: 'Add user',
      RU: 'Создание пользователя',
      UA: 'Створення користувача',
    });
  }

  get add_developer() {
    return this.getText({
      EN: 'Add developer',
      RU: 'Добавление разработчика',
      UA: 'Додавання розробника',
    });
  }

  get add_teammate() {
    return this.getText({
      EN: 'Add teammate',
      RU: 'Добавление разработчика',
      UA: 'Додавання розробника',
    });
  }

  get add_manager() {
    return this.getText({
      EN: 'Add manager',
      RU: 'Добавление менеджера',
      UA: 'Додавання менеджера',
    });
  }

  get add_customer() {
    return this.getText({
      EN: 'Add customer',
      RU: 'Добавление заказчика',
      UA: 'Додавання замовника',
    });
  }

  get add_project() {
    return this.getText({
      EN: 'Add project',
      RU: 'Добавление проекта',
      UA: 'Додавання проекту',
    });
  }

  get role() {
    return this.getText({
      EN: 'Role',
      RU: 'Роль',
      UA: 'Роль',
    });
  }

  get english() {
    return this.getText({
      EN: 'English',
      RU: 'Английский',
      UA: 'Англійська',
    });
  }

  get grade() {
    return this.getText({
      EN: 'Grade',
      RU: 'Уровень',
      UA: 'Рівень',
    });
  }

  get hire_date() {
    return this.getText({
      EN: 'Hire date',
      RU: 'Дата найма',
      UA: 'Дата найму',
    });
  }

  get customer() {
    return this.getText({
      EN: 'Customer',
      RU: 'Заказчик',
      UA: 'Замовник',
    });
  }

  get project_name() {
    return this.getText({
      EN: 'Project name',
      RU: 'Имя проекта',
      UA: 'Назва проекту',
    });
  }

  get customer_name() {
    return this.getText({
      EN: 'Customer name',
      RU: 'Имя заказчика',
      UA: 'І\'мя замовника',
    });
  }

  get start_date() {
    return this.getText({
      EN: 'Start date',
      RU: 'Дата начала',
      UA: 'Дата початку',
    });
  }

  get deadline() {
    return this.getText({
      EN: 'Deadline',
      RU: 'Дэдлайн',
      UA: 'Дедлайн',
    });
  }

  get description() {
    return this.getText({
      EN: 'Description',
      RU: 'Описание',
      UA: 'Опис',
    });
  }

  get repeat() {
    return this.getText({
      EN: 'Repeat',
      RU: 'Повторение',
      UA: 'Повторення',
    });
  }

  get message() {
    return this.getText({
      EN: 'Message',
      RU: 'Сообщение',
      UA: 'Повідомлення',
    });
  }

  get mention() {
    return this.getText({
      EN: 'Mention',
      RU: 'Ответственные',
      UA: 'Відповідальні',
    });
  }

  get assign_developer() {
    return this.getText({
      EN: 'Assign developer',
      RU: 'Привязать разработчика',
      UA: 'Прив\'язати розробника',
    });
  }

  get assign_customer() {
    return this.getText({
      EN: 'Assign customer',
      RU: 'Привязать заказчика',
      UA: 'Прив\'язати замовника',
    });
  }

  get assign_project() {
    return this.getText({
      EN: 'Assign project',
      RU: 'Привязать проект',
      UA: 'Прив\'язати проект',
    });
  }

  get create_action() {
    return this.getText({
      EN: 'Create action',
      RU: 'Создать событие',
      UA: 'Створити подію',
    });
  }

  get create_post() {
    return this.getText({
      EN: 'Create post',
      RU: 'Создать пост',
      UA: 'Створити пост',
    });
  }

  get edit_action() {
    return this.getText({
      EN: 'Edit action',
      RU: 'Изменение события',
      UA: 'Змінити подію',
    });
  }

  get password() {
    return this.getText({
      EN: 'Password',
      RU: 'Пароль',
      UA: 'Пароль',
    });
  }

  get status() {
    return this.getText({
      EN: 'Status',
      RU: 'Статус',
      UA: 'Статус',
    });
  }

  get required() {
    return this.getText({
      EN: 'This field is required',
      RU: 'Это обязательное поле',
      UA: 'Це обов\'язкове поле',
    });
  }

  get not_valid() {
    return this.getText({
      EN: 'Data isn\'t valid',
      RU: 'Данные не валидны',
      UA: 'Данні не валідні',
    });
  }

  get link() {
    return this.getText({
      EN: 'Link',
      RU: 'Ссылка',
      UA: 'Посилання',
    });
  }

  get contact_name() {
    return this.getText({
      EN: 'Contact name',
      RU: 'Контактное имя',
      UA: 'Контакте ім\'я',
    });
  }

  get title() {
    return this.getText({
      EN: 'Title',
      RU: 'Должность',
      UA: 'Посада',
    });
  }

  get phone() {
    return this.getText({
      EN: 'Phone',
      RU: 'Номер телефона',
      UA: 'Номер телефону',
    });
  }

  get country() {
    return this.getText({
      EN: 'Country',
      RU: 'Страна',
      UA: 'Країна',
    });
  }

  get timezone() {
    return this.getText({
      EN: 'Timezone',
      RU: 'Часовой пояс',
      UA: 'Часовий пояс',
    });
  }

  get budget() {
    return this.getText({
      EN: 'Budget',
      RU: 'Бюджет',
      UA: 'Бюджет',
    });
  }

  get tier() {
    return this.getText({
      EN: 'Tier',
      RU: 'Уровень',
      UA: 'Рівень',
    });
  }

  get opportunity() {
    return this.getText({
      EN: 'Opportunity',
      RU: 'Возможность',
      UA: 'Можливість',
    });
  }

  get technologies() {
    return this.getText({
      EN: 'Technologies',
      RU: 'Технологии',
      UA: 'Технології',
    });
  }

  get requirements() {
    return this.getText({
      EN: 'Requirements',
      RU: 'Требования',
      UA: 'Запити',
    });
  }

  get add_overtime() {
    return this.getText({
      EN: 'Add overtime',
      RU: 'Добавить овертайм',
      UA: 'Додати овертайм',
    });
  }

  get comment() {
    return this.getText({
      EN: 'Comment',
      RU: 'Комментарий',
      UA: 'Коментар',
    });
  }

  get change_user() {
    return this.getText({
      EN: 'Change user',
      RU: 'Перераспределить',
      UA: 'Переросподілити',
    });
  }

  get item_history() {
    return this.getText({
      EN: 'Item history',
      RU: 'История пользователей',
      UA: 'Історія користувачів',
    });
  }

  get no_item_history() {
    return this.getText({
      EN: 'No item history',
      RU: 'Нет истории пользователей',
      UA: 'Не має історії користувачів',
    });
  }

  get old_password() {
    return this.getText({
      EN: 'Old password',
      RU: 'Старый пароль',
      UA: 'Старий пароль',
    });
  }

  get new_password() {
    return this.getText({
      EN: 'New password',
      RU: 'Новый пароль',
      UA: 'Новий пароль',
    });
  }

  get repeat_password() {
    return this.getText({
      EN: 'Repeat password',
      RU: 'Повторите пароль',
      UA: 'Повторіть пароль',
    });
  }

  get dont_match() {
    return this.getText({
      EN: 'Passwords do not match',
      RU: 'Пароли не совпадают',
      UA: 'Паролі не співпадають',
    });
  }

  get available_days() {
    return this.getText({
      EN: 'Available days',
      RU: 'Доступно дней',
      UA: 'Доступно днів',
    });
  }

  get selected_days() {
    return this.getText({
      EN: 'Selected days',
      RU: 'Выбрано дней',
      UA: 'Обрано днів',
    });
  }

  get vacation_start() {
    return this.getText({
      EN: 'Start date',
      RU: 'Начало',
      UA: 'Початок',
    });
  }

  get date() {
    return this.getText({
      EN: 'Date',
      RU: 'Дата',
      UA: 'Дата',
    });
  }

  get vacation_end() {
    return this.getText({
      EN: 'End date',
      RU: 'Конец',
      UA: 'Кінець',
    });
  }

  get selected_desc() {
    return this.getText({
      EN: 'selected days',
      RU: 'выбраные дни',
      UA: 'обрані дні',
    });
  }

  get holidays_desc() {
    return this.getText({
      EN: 'holidays (don\'t count)',
      RU: 'праздники (не считаются)',
      UA: 'свята (не рахуються)',
    });
  }

  get weekends_desc() {
    return this.getText({
      EN: 'weekends (don\'t count)',
      RU: 'выходные (не считаются)',
      UA: 'вихідні (не рахуються)',
    });
  }

  get old_pass_error() {
    return this.getText({
      EN: 'Old password is not correct',
      RU: 'Вы допустили ошибку в старом пароле',
      UA: 'Ви зробили помилку в старому паролі',
    });
  }

  get request() {
    return this.getText({
      EN: 'Request',
      RU: 'Запросить',
      UA: 'Зробити запит',
    });
  }

  get diagonal() {
    return this.getText({
      EN: 'Diagonal',
      RU: 'Диагональ',
      UA: 'Діагональ',
    });
  }

  get model() {
    return this.getText({
      EN: 'Model',
      RU: 'Модель',
      UA: 'Модель',
    });
  }

  get year() {
    return this.getText({
      EN: 'Year',
      RU: 'Год',
      UA: 'Рік',
    });
  }

  get memory() {
    return this.getText({
      EN: 'Memory',
      RU: 'Память',
      UA: 'Пам\'ять',
    });
  }

  get cancel() {
    return this.getText({
      EN: 'Cancel',
      RU: 'Отмена',
      UA: 'Відміна',
    });
  }

  get create() {
    return this.getText({
      EN: 'Create',
      RU: 'Создание',
      UA: 'Створення',
    });
  }

  get unset() {
    return this.getText({
      EN: 'Unset',
      RU: 'Не выбрано',
      UA: 'Не обрано',
    });
  }

  get add_entity() {
    return this.getText({
      EN: 'Add entity',
      RU: 'Добавить сущность',
      UA: 'Додати сутність',
    });
  }

  get assign_user() {
    return this.getText({
      EN: 'Assign user',
      RU: 'Назначить юзера',
      UA: 'Назначити юзера',
    });
  }

  get entities() {
    return this.getText({
      EN: 'Entities',
      RU: 'Сущности',
      UA: 'Сутності',
    });
  }

  get tags() {
    return this.getText({
      EN: 'Tags',
      RU: 'Теги',
      UA: 'Теги',
    });
  }

  get difficulty() {
    return this.getText({
      EN: 'Difficulty',
      RU: 'Сложность',
      UA: 'Складність',
    });
  }

  get toArchive() {
    return this.getText({
      EN: 'To archive',
      RU: 'Архивировать',
      UA: 'Архівувати',
    });
  }
}
