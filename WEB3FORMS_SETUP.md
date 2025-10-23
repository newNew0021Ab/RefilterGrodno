# Настройка Web3Forms для формы бронирования

## Текущий статус

✅ Форма настроена для работы на Netlify  
✅ Код отправляет данные напрямую в Web3Forms API  
⚠️ Web3Forms ключ требует активации/верификации  

## Что нужно сделать

### 1. Получите новый Web3Forms access key

1. Перейдите на https://web3forms.com
2. Нажмите "Get Started for Free"
3. Введите ваш email (куда будут приходить заявки)
4. Подтвердите email
5. Скопируйте ваш **Access Key**

### 2. Обновите ключ в коде

Откройте файл `client/src/components/sections/booking-section.tsx` и замените ключ на строке 64:

```typescript
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "ВАШ_НОВЫЙ_КЛЮЧ";
```

### 3. Проверьте настройки Web3Forms

В dashboard Web3Forms (https://web3forms.com/dashboard):

1. **Email уведомлений**: Укажите email, куда будут приходить заявки
2. **Имя отправителя**: "Refilter - Заявки DPF"
3. **Автоответ**: Можно настроить автоматический ответ клиенту
4. **Webhook** (опционально): Для интеграции с CRM/Telegram

### 4. Тестирование

После обновления ключа:

```bash
# Локально в Replit
npm run dev
# Затем заполните и отправьте форму на сайте
```

Проверьте:
- ✅ Форма отправляется без ошибок
- ✅ Email приходит на указанный адрес
- ✅ Все данные передаются правильно

### 5. Деплой на Netlify

После успешного тестирования:

1. Закоммитьте изменения в Git
2. Netlify автоматически задеплоит обновленную версию
3. Проверьте форму на продакшн сайте

## Альтернатива: Использование переменной окружения

### Для большей безопасности используйте env переменную:

**В Replit:**
- Secrets уже настроены (не используем по вашему запросу)

**На Netlify:**
1. Site settings → Environment variables
2. Добавьте переменную:
   - Key: `VITE_WEB3FORMS_ACCESS_KEY`
   - Value: ваш Web3Forms access key
3. Redeploy сайт

**В коде (уже настроено):**
```typescript
const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || "fallback_key";
```

## Проверка работы формы

### Тест через curl:

```bash
curl -X POST https://api.web3forms.com/submit \
  -H "Content-Type: application/json" \
  -d '{
    "access_key": "YOUR_WEB3FORMS_KEY",
    "name": "Test",
    "email": "test@test.com",
    "message": "Test message"
  }'
```

Успешный ответ:
```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Troubleshooting

### "This method is not allowed"
- Ключ не активирован
- Email не подтвержден
- Аккаунт требует верификации
→ Создайте новый ключ на https://web3forms.com

### "Rate limited"
- Слишком много запросов за короткое время
→ Подождите 5-10 минут

### "Invalid access key"
- Ключ неправильный или устарел
→ Проверьте ключ в Web3Forms dashboard

### Форма не отправляется на фронтенде
1. Откройте консоль браузера (F12)
2. Проверьте ошибки в Network tab
3. Убедитесь, что ключ правильный

## Поддержка

- Web3Forms Docs: https://web3forms.com/docs
- Web3Forms Support: support@web3forms.com
- Dashboard: https://web3forms.com/dashboard

## Текущая настройка

**Где находится код формы:**
- `client/src/components/sections/booking-section.tsx` (строка 60-121)

**Формат данных, отправляемых в Web3Forms:**
```json
{
  "access_key": "...",
  "name": "Имя клиента",
  "phone": "+375291234567",
  "Тип автомобиля": "Легковой автомобиль",
  "Желаемая дата": "2025-10-25",
  "Сообщение": "Комментарий",
  "subject": "Новая заявка на чистку DPF от [Имя]"
}
```
