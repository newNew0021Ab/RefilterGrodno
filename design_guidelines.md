# Дизайн-гайдлайн для Refilter — Сервис чистки DPF/FAP фильтров

## Выбор дизайн-подхода

**Референсная база**: Automotive service sites (СТО премиум-класса) + Conversion-focused landing pages (Unbounce, Instapage стиль)

**Принципы дизайна**:
- Trust-first: Профессионализм через чистоту, структуру и реальные фото процесса
- Action-oriented: Каждый экран должен подталкивать к звонку или записи
- Transparency: Открытые цены, понятный процесс, гарантии на виду

## Цветовая палитма

**Основные цвета**:
- Primary (Deep Blue): 210 85% 25% — надежность, профессионализм, техническая экспертиза
- Accent (Electric Orange): 25 95% 55% — призыв к действию, срочность, энергия
- Success (Emerald): 150 70% 45% — гарантия, экологичность, результат

**Поддерживающие**:
- Background Light: 210 20% 98%
- Background Dark: 210 25% 8%
- Text Primary: 210 15% 15%
- Text Secondary: 210 10% 45%
- Border: 210 20% 85%

**Использование**:
- Кнопки CTA (звонок, запись): Accent Orange с white текстом
- Sticky floating buttons: Accent Orange с blur-эффектом
- Цены и гарантия: Deep Blue фон, white текст
- Успешные результаты/до-после: Success Emerald акценты

## Типографика

**Шрифты** (Google Fonts):
- Headings: 'Manrope' — 700/800 weight, современный геометрический sans-serif
- Body: 'Inter' — 400/500/600 weight, отличная читаемость на кириллице
- Accent/Numbers: 'Manrope' — 800 weight для цен и метрик

**Иерархия**:
- H1 Hero: 3xl/4xl (mobile/desktop), 800 weight, tight leading
- H2 Section: 2xl/3xl, 700 weight
- H3 Cards: xl/2xl, 600 weight
- Body: base/lg, 400 weight, relaxed leading
- CTA Buttons: base/lg, 600 weight, uppercase tracking-wide

## Система отступов

**Tailwind spacing primitives**: 4, 6, 8, 12, 16, 20, 24 (px units)
- Component padding: p-6, p-8
- Section spacing: py-16, py-20, py-24
- Grid gaps: gap-6, gap-8
- Button padding: px-8 py-4

## Основные компоненты

### Navigation
- Sticky header с blur backdrop
- Logo (Refilter) слева, phone number справа
- Mobile: hamburger menu с phone number
- Floating CTAs: phone + booking buttons (появляются при скролле)

### Hero Section
**Layout**: Asymmetric split — 60% контент, 40% hero image
- Ценностное предложение: "Профессиональная чистка DPF/FAP фильтров в Гродно"
- Подзаголовок с USP: "Гарантия 6 месяцев или 50 000 км"
- Dual CTA: Primary (Записаться онлайн) + Secondary outline (Позвонить сейчас)
- Trust indicators: "120+ авто в месяц", "Работаем с 2018 года"
- Background: Deep Blue gradient overlay на качественном фото автомобиля/сервиса

### Калькулятор стоимости
**Interactive pricing tool**:
- Карточка с легким shadow и border
- Шаг 1: Выбор типа авто (легковой/кроссовер/грузовой) — большие кликабельные карточки
- Шаг 2: Чекбоксы опций (срочность +30%, снятие/установка)
- Живой расчет: крупные цифры, Accent Orange цвет
- CTA внизу калькулятора: "Записаться по этой цене"

### Блок цен
**Pricing Cards**:
- 3-колоночный grid (desktop), stack mobile
- Карточка популярной услуги: выделена border в Accent Orange, badge "Популярно"
- Каждая карточка: название, цена (крупно), список включенного, CTA кнопка
- Hover effect: легкий lift с shadow

### Процесс чистки
**Step-by-step visualization**:
- Numbered timeline (1-5 шагов)
- Каждый шаг: иконка процесса, заголовок, краткое описание
- До/После: slider comparison с реальными фото фильтров
- Технология: краткое описание оборудования и методов

### Форма записи
**Conversion-optimized form**:
- 4 поля: Имя, Телефон (+375 mask), Тип авто (dropdown), Желаемая дата
- Крупные input fields с четкими labels
- Primary CTA кнопка: "Записаться сейчас"
- Подпись под формой: "Перезвоним в течение 5 минут"
- Success state: зеленая галочка и благодарность

### FAQ Section
**Accordion pattern**:
- 6-8 вопросов о гарантии, сроках, технологии, ценах
- Click to expand с smooth animation
- Icons слева от вопросов

### Контакты
**Two-column layout**:
- Левая: интерактивная Яндекс.Карта с меткой адреса
- Правая: контактная информация (адрес, телефон, часы), иконки мессенджеров (Viber, Telegram)

### Footer
- 3-колоночный: О компании, Услуги (ссылки), Контакты
- Copyright, ссылка на политику конфиденциальности
- Повтор CTA: "Остались вопросы? Позвоните нам"

## Анимации

**Minimal and purposeful**:
- Smooth scroll behavior
- CTA buttons: subtle scale on hover (scale-105)
- Cards: lift effect on hover (translate-y-1 + shadow)
- Форма: shake animation при ошибке валидации
- Calculator: число изменяется с fade transition

## Изображения

**Hero Section**: Крупное качественное фото — автомобиль на подъемнике в чистом современном сервисе (webp, оптимизированное)

**Процесс (До/После)**: Реальные фото DPF фильтров до и после чистки — 2-3 пары изображений

**Background accents**: Абстрактные технические паттерны (hexagons, circuits) с low opacity для визуального интереса

**Team/Service**: Опционально — фото специалистов за работой для доверия

## Специальные элементы конверсии

**Sticky Floating Buttons** (появляются при скролле >300px):
- Bottom right: круглая кнопка "Позвонить" (phone icon) в Accent Orange
- Bottom left: "Записаться" (calendar icon) в Deep Blue
- Blur backdrop на обеих кнопках

**Trust Badges**:
- "Гарантия 6 мес./50000км" — badge с щитом
- "Оплата после результата" — если применимо
- "Оригинальная технология" — если есть

**Urgency Elements**:
- "Запишитесь сегодня — освободилось 2 места" (если есть система бронирования)
- Timer для акций (опционально)

## Mobile Optimization

- Single column layouts
- Larger touch targets (min 48px)
- Simplified navigation
- Phone number — one-tap call
- Калькулятор: вертикальный stack шагов
- Карты цен: swipeable carousel как fallback

Дизайн должен быть чистым, профессиональным и максимально ориентированным на конверсию — каждый элемент служит цели получения звонка или заявки.