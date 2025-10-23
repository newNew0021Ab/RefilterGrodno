# Refilter - Сайт по чистке DPF/FAP фильтров

## Обзор проекта
Профессиональный продающий лендинг для сервиса по чистке DPF/FAP фильтров в Гродно. Сайт разработан с акцентом на максимальную конверсию и генерацию лидов.

## Технологии
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Валидация**: Zod
- **Формы**: React Hook Form
- **UI компоненты**: Shadcn/ui
- **Карты**: Yandex Maps API
- **Шрифты**: Manrope (заголовки), Inter (текст)

## Основные функции (MVP)

### 1. Hero-секция
- Яркий hero-блок с градиентом на фоновом изображении
- Ценностное предложение и USP
- Dual CTA (Записаться онлайн / Позвонить)
- Trust indicators (120+ авто, с 2018 года, гарантия)

### 2. Интерактивный калькулятор стоимости
- Выбор типа авто (легковой/кроссовер/грузовой)
- Опции: срочная промывка (+30%), снятие/установка (+60 BYN)
- Мгновенный расчет цены
- CTA "Записаться по этой цене"

### 3. Блок цен
- 4 основные услуги в карточках
- Дополнительные услуги
- Выделение популярного варианта
- Гарантийный баннер (6 месяцев / 50 000 км)

### 4. Процесс чистки
- 5 шагов процесса с timeline
- Фото до/после чистки фильтра
- Описание используемой технологии

### 5. Форма онлайн-записи
- Валидация всех полей (имя, телефон, тип авто, дата)
- **Отправка напрямую в Web3Forms API** (работает на Netlify без backend)
- Web3Forms access key встроен в код (публичный ключ, безопасно)
- Success state с подтверждением
- Error handling
- Email уведомления через Web3Forms

### 6. FAQ секция
- 8 частых вопросов в аккордеоне
- Ответы о гарантии, сроках, технологии, ценах

### 7. Контакты
- Интерактивная Яндекс.Карта
- Адрес: г. Гродно, ул. Низинная, д. 5
- Телефон: +375 29 836 96 55
- Часы работы: Пн–Пт 9:00–19:00, Сб 9:00–14:00

### 8. Sticky floating buttons
- Кнопка звонка (оранжевая, слева)
- Кнопка записи (синяя, справа)
- Появляются при прокрутке >300px
- Blur backdrop эффект

### 9. SEO-оптимизация
- Метатеги для поисковой выдачи
- Open Graph для соцсетей
- Семантическая разметка
- Оптимизация под запросы "чистка DPF Гродно"

## Структура проекта

```
/client
  /src
    /components
      /layout       - Header, Footer
      /sections     - Hero, Calculator, Pricing, Process, Booking, FAQ, Contacts
      /ui           - Shadcn компоненты, Sticky buttons
    /pages          - Home page
/server
  routes.ts         - API endpoints для заявок
  storage.ts        - In-memory storage для заявок
/shared
  schema.ts         - Zod схемы и TypeScript типы
```

## API Endpoints

### POST /api/bookings
Создание новой заявки на чистку фильтра

**Request body:**
```json
{
  "name": "Иван Иванов",
  "phone": "+375291234567",
  "vehicleType": "car|crossover|truck",
  "preferredDate": "2025-01-15",
  "message": "Дополнительная информация"
}
```

**Response:** 201 Created
```json
{
  "id": "uuid",
  "name": "Иван Иванов",
  "phone": "+375291234567",
  "vehicleType": "car",
  "preferredDate": "2025-01-15",
  "message": "...",
  "createdAt": "2025-01-10T10:00:00.000Z"
}
```

### GET /api/bookings
Получение всех заявок (для администратора)

### GET /api/bookings/:id
Получение конкретной заявки

## Дизайн-система

### Цветовая палитра
- **Primary (Deep Blue)**: `210 85% 25%` - надежность, профессионализм
- **Accent (Electric Orange)**: `25 95% 55%` - CTA кнопки, срочность
- **Success (Emerald)**: `150 70% 45%` - гарантии, успех

### Типографика
- **Заголовки**: Manrope (700/800 weight)
- **Текст**: Inter (400/500/600 weight)
- **Числа/цены**: Manrope (800 weight)

### Компоненты
- Используются Shadcn/ui компоненты
- Custom градиенты для hero и акцентных блоков
- Плавные анимации через Framer Motion
- Hover/active states через elevation utilities

## Запуск проекта

```bash
npm run dev
```

Приложение будет доступно на порту 5000.

## Следующие шаги (после MVP)
- Интеграция Google Analytics 4
- Отправка заявок на email/Telegram
- Блок отзывов клиентов
- Онлайн-оплата диагностики
- CRM интеграция для автоматического сохранения заявок

## Контактная информация
- **Название**: Refilter
- **Телефон**: +375 29 836 96 55
- **Адрес**: г. Гродно, ул. Низинная, д. 5
- **Часы**: Пн–Пт 9:00–19:00, Сб 9:00–14:00
- **Гарантия**: 6 месяцев или 50 000 км

## Деплой на Netlify

### Быстрый деплой
1. Подключите репозиторий к Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy! ✅

Форма бронирования работает **без backend** - отправляет данные напрямую в Web3Forms API.

Подробная инструкция: см. файл `NETLIFY_DEPLOY.md`

## Оптимизация производительности (Google PageSpeed)

### Реализованные оптимизации (23 октября 2025) - ВЕРСИЯ 2

**Первая попытка оптимизации не сработала** из-за неправильного подхода:
- vite-plugin-image-optimizer не работал на файлах из attached_assets (вне Vite root)
- dns-prefetch не решал проблему render-blocking Google Fonts
- Результат: производительность ухудшилась (LCP 11.8s)

**Правильное решение (реализовано):**

#### 1. **Hero-изображение: Ручная оптимизация с Sharp**
- Конвертировано вручную через Node.js скрипт с Sharp:
  - **AVIF**: 140 KB (экономия 91.5% от оригинала 1,641 KB) ✅
  - **WebP**: 136 KB (экономия 91.7%) ✅  
  - **PNG fallback**: 519 KB (экономия 68.4%) ✅
- Изображения перемещены в `client/src/assets/` (внутри Vite root)
- Обновлен HeroSection с `<picture>` элементом:
  ```jsx
  <picture>
    <source srcSet={heroAvif} type="image/avif" />
    <source srcSet={heroWebp} type="image/webp" />
    <img src={heroPng} alt="..." />
  </picture>
  ```
- **Результат**: Размер hero-изображения уменьшен с 1,641 KB до 140 KB (AVIF)

#### 2. **Self-hosted шрифты через @fontsource**
- Удалены все ссылки на Google Fonts CDN из index.html
- Установлены пакеты: `@fontsource/manrope` и `@fontsource/inter`
- Импортированы в index.css нужные веса (400, 500, 600, 700, 800)
- **Результат**: Нет render-blocking запросов к Google Fonts (~750ms экономия)

#### 3. **Code Splitting (разделение JS-бандлов)**
- Разделение vendor-библиотек (React, React DOM, Wouter) в отдельный chunk
- UI-компоненты (Radix UI) выделены в отдельный модуль
- CSS разделен по страницам (cssCodeSplit: true)
- Уменьшение неиспользуемого JavaScript на ~83 KiB

#### 4. **Netlify Asset Optimization**
- Настроена автоматическая минификация CSS и JS
- Включена компрессия изображений на CDN
- Pretty URLs для лучшей SEO
- Brotli-компрессия (автоматически на Netlify)

#### 5. **SEO: robots.txt**
- Создан корректный robots.txt согласно RFC 9309
- Исправлены все 24 синтаксические ошибки
- Добавлена ссылка на sitemap.xml

### Ожидаемые результаты PageSpeed после деплоя:
- **Image optimization**: уменьшение на ~1,501 KiB (91.5% экономия с AVIF)
- **Render-blocking fonts**: экономия ~750ms (Google Fonts удалены)
- **LCP**: значительное улучшение за счет меньшего hero-изображения
- **JavaScript optimization**: уменьшение на ~83 KiB

### Следующие шаги:
1. **Задеплоить на Netlify** - все оптимизации активируются при сборке
2. **Проверить результаты** в Google PageSpeed Insights
3. При необходимости добавить critical CSS для дальнейшей оптимизации

## Изменения
- 2025-10-23: **Google PageSpeed оптимизации** - dns-prefetch, image optimization, code splitting, Netlify asset optimization, robots.txt fix
- 2025-10-23: Форма переделана для работы на Netlify (Web3Forms API напрямую с frontend)
- 2025-10-21: Миграция проекта в Replit, настройка Web3Forms интеграции
- 2025-01-20: Создан MVP сайта с калькулятором, формой записи, FAQ и контактами
