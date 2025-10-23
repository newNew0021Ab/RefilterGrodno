# Инструкция по деплою на Netlify

## Быстрый старт

### 1. Подготовка проекта

Ваш проект уже настроен для работы на Netlify! Форма бронирования отправляет данные напрямую в Web3Forms API без использования backend.

### 2. Настройка в Netlify

1. **Подключите репозиторий:**
   - Перейдите на [Netlify](https://netlify.com)
   - Нажмите "Add new site" → "Import an existing project"
   - Выберите ваш Git репозиторий

2. **Настройки сборки:**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **Переменные окружения (опционально):**
   
   Web3Forms ключ уже встроен в код, но вы можете переопределить его:
   
   - Перейдите в `Site settings` → `Environment variables`
   - Добавьте переменную:
     - Key: `VITE_WEB3FORMS_ACCESS_KEY`
     - Value: ваш Web3Forms access key

### 3. Деплой

Нажмите "Deploy site" - и всё готово! ✅

## Важные моменты

### Web3Forms Configuration

- **Access key уже в коде:** Форма бронирования использует встроенный Web3Forms ключ
- **Работает на static хостинге:** Не требует backend сервера
- **Email уведомления:** Настроены через Web3Forms dashboard на https://web3forms.com

### Что работает на Netlify:

✅ Форма бронирования (отправка напрямую в Web3Forms)  
✅ Все статические страницы  
✅ Калькулятор цен  
✅ Контактная информация  
✅ FAQ секция  

### Что НЕ работает (backend функции):

❌ API endpoint `/api/bookings` (не нужен для Netlify)  
❌ Локальное сохранение заявок в базу данных (заявки идут на email через Web3Forms)

## Проверка работы формы

После деплоя:

1. Откройте ваш сайт на Netlify
2. Перейдите к секции "Запишитесь на чистку"
3. Заполните и отправьте форму
4. Проверьте email, указанный в Web3Forms dashboard

## Troubleshooting

### Форма не отправляется?

1. Проверьте консоль браузера (F12) на наличие ошибок
2. Убедитесь, что Web3Forms access key действителен
3. Проверьте email настройки в Web3Forms dashboard: https://web3forms.com

### Нужен backend?

Если вам нужно сохранять заявки в базу данных, рассмотрите:
- Netlify Functions (serverless)
- Отдельный backend на Replit/Heroku/Railway
- Используйте встроенные Netlify Forms

## Дополнительная настройка

### Netlify Forms (альтернатива Web3Forms)

Если хотите использовать встроенные Netlify Forms вместо Web3Forms:

1. Добавьте атрибут `netlify` к форме в коде
2. Netlify автоматически обработает форму
3. Просматривайте заявки в Netlify dashboard → Forms

## Поддержка

Если возникли вопросы:
- Web3Forms: https://web3forms.com/docs
- Netlify: https://docs.netlify.com
