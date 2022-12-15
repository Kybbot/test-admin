import AbstractLanguage from './AbstractLanguage';

export default class Common extends AbstractLanguage {
  get team() {
    return this.getText({
      EN: 'Team',
      RU: 'Команда',
      UA: 'Команда',
    });
  }

  get informationWarning() {
    return this.getText({
      EN: 'Informational Notes',
      RU: 'Важная информация',
      UA: 'Важлива інформація',
    });
  }

  get customers() {
    return this.getText({
      EN: 'Customers',
      RU: 'Заказчкики',
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

  get managers() {
    return this.getText({
      EN: 'Managers',
      RU: 'Менеджеры',
      UA: 'Менеджери',
    });
  }

  get archive() {
    return this.getText({
      EN: 'Archive',
      RU: 'Архив',
      UA: 'Архів',
    });
  }

  get upcoming_actions() {
    return this.getText({
      EN: 'Upcoming',
      RU: 'Предстоящие',
      UA: 'Майбутні',
    });
  }

  get recurrent_actions() {
    return this.getText({
      EN: 'Recurrent',
      RU: 'Рекуррентные',
      UA: 'Рекурренті',
    });
  }

  get actions() {
    return this.getText({
      EN: 'Actions',
      RU: 'События',
      UA: 'Події',
    });
  }

  get sales_actions() {
    return this.getText({
      EN: 'Sales actions',
      RU: 'События продажи',
      UA: 'Події продажі',
    });
  }

  get telegram_bot() {
    return this.getText({
      EN: 'Connect with Telegram',
      RU: 'Подключить телеграм бота',
      UA: 'Під\'єднати телеграм бота',
    });
  }

  get slack_bot() {
    return this.getText({
      EN: 'Connect to Slack',
      RU: 'Подключить Slack',
      UA: 'Під\'єднати Slack',
    });
  }

  get slack_bot_connected() {
    return this.getText({
      EN: 'Connected to',
      RU: 'Подключён к',
      UA: 'Під\'єднаний до',
    });
  }

  get connectTelegram() {
    return this.getText({
      EN: 'Connect your Telegram account',
      RU: 'Подключите ваш телеграм аккаунт',
      UA: 'Під\'єднайте ваш телеграм акаунт',
    });
  }

  get action() {
    return this.getText({
      EN: 'Action',
      RU: 'Действие',
      UA: 'Дія',
    });
  }

  get search() {
    return this.getText({
      EN: 'Search',
      RU: 'Поиск',
      UA: 'Пошук',
    });
  }

  get global_search() {
    return this.getText({
      EN: 'Global search',
      RU: 'Глобальный поиск',
      UA: 'Глобальний пошук',
    });
  }

  get add_item() {
    return this.getText({
      EN: 'Add item',
      RU: 'Привязать компьютер',
      UA: 'Прив\'язати пк',
    });
  }

  get sales() {
    return this.getText({
      EN: 'Sales',
      RU: 'Продажи',
      UA: 'Продажі',
    });
  }

  get request_vacation() {
    return this.getText({
      EN: 'Request vacation',
      RU: 'Запрос отпуска',
      UA: 'Запит відпустки',
    });
  }

  get user_vacations() {
    return this.getText({
      EN: 'Users vacations',
      RU: 'Отпуска пользователя',
      UA: 'Відпустки користувача',
    });
  }

  get pending() {
    return this.getText({
      EN: 'Pending',
      RU: 'Ожидающее решение',
      UA: 'Очікуючі рішення',
    });
  }

  get current() {
    return this.getText({
      EN: 'Current',
      RU: 'Текущие',
      UA: 'Поточні',
    });
  }

  get future() {
    return this.getText({
      EN: 'Future',
      RU: 'Будущие',
      UA: 'Майбутні',
    });
  }

  get recent() {
    return this.getText({
      EN: 'Recent',
      RU: 'Недавние',
      UA: 'Недавні',
    });
  }

  get no_actions() {
    return this.getText({
      EN: 'No actions',
      RU: 'Нет событий',
      UA: 'Немає подій',
    });
  }

  get no_posts() {
    return this.getText({
      EN: 'No posts',
      RU: 'Нет постов',
      UA: 'Немає постів',
    });
  }

  get reject() {
    return this.getText({
      EN: 'Reject',
      RU: 'Отклонить',
      UA: 'Відмовити',
    });
  }

  get approve() {
    return this.getText({
      EN: 'Approve',
      RU: 'Подтвердить',
      UA: 'Підтвердити',
    });
  }

  get reason() {
    return this.getText({
      EN: 'Reason',
      RU: 'Причина',
      UA: 'Причина',
    });
  }

  get are_you_sure() {
    return this.getText({
      EN: 'Are you sure?',
      RU: 'Вы уверенны?',
      UA: 'Ви впевнені?',
    });
  }

  get cancel() {
    return this.getText({
      EN: 'Cancel',
      RU: 'Отменить',
      UA: 'Відміна',
    });
  }

  get confirm() {
    return this.getText({
      EN: 'Confirm',
      RU: 'Подтвердить',
      UA: 'Підтвердити',
    });
  }

  get no_results() {
    return this.getText({
      EN: 'No results',
      RU: 'Ничего не найдено',
      UA: 'Нічого не знайдено',
    });
  }

  get overtimes() {
    return this.getText({
      EN: 'Overtimes',
      RU: 'Овертаймы',
      UA: 'Овертайми',
    });
  }

  get delete() {
    return this.getText({
      EN: 'Delete',
      RU: 'Удаление',
      UA: 'Видалення',
    });
  }

  get restore() {
    return this.getText({
      EN: 'Restore',
      RU: 'Восстановление',
      UA: 'Відновлення',
    });
  }

  get delete_post() {
    return this.getText({
      EN: 'Delete post',
      RU: 'Удалить пост',
      UA: 'Видалити пост',
    });
  }

  get close() {
    return this.getText({
      EN: 'Close',
      RU: 'Закрыть',
      UA: 'Закрити',
    });
  }

  get clear() {
    return this.getText({
      EN: 'Clear',
      RU: 'Очистить',
      UA: 'Очистити',
    });
  }

  get extend_users() {
    return this.getText({
      EN: 'Extend users',
      RU: 'Разширенная версия',
      UA: 'Розширена версія',
    });
  }

  get reduce_users() {
    return this.getText({
      EN: 'Reduce users',
      RU: 'Обычная версия',
      UA: 'Звичайна версія',
    });
  }

  get lambda_edu() {
    return this.getText({
      EN: 'Academy',
      RU: 'Академия',
      UA: 'Академія',
    });
  }

  get team_actions() {
    return this.getText({
      EN: 'Team actions',
      RU: 'События команды',
      UA: 'Події команди',
    });
  }

  get comments() {
    return this.getText({
      EN: 'Comments',
      RU: 'Комментарии',
      UA: 'Коментарі',
    });
  }

  get edit_post() {
    return this.getText({
      EN: 'Edit post',
      RU: 'Редактировать пост',
      UA: 'Редагувати пост',
    });
  }

  get users_archive() {
    return this.getText({
      EN: 'Archive',
      RU: 'Архив',
      UA: 'Архів',
    });
  }

  get customers_are_informed() {
    return this.getText({
      EN: 'Customers are informed',
      RU: 'Заказчики проинформированы',
      UA: 'Замовники проінформовані',
    });
  }

  get description() {
    return this.getText({
      EN: 'Description',
      RU: 'Описание',
      UA: 'Опис',
    });
  }
}
