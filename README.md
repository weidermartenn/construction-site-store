<p align="center">
  <img src="https://mir-otkritki.ru/_ph/120/2/994288447.gif?1647287197" width="120" alt="Hello gif" />
</p>

<h1 align="center">Журнал работ</h1>

<p align="center">
  Веб-приложение для учёта выполненных работ на строительном объекте.
</p>

---

## Стек

| Слой | Технология | Почему |
|------|-----------|--------|
| Frontend | React + TypeScript + Vite | Быстрая сборка, строгая типизация, компонентный подход |
| Стили | Tailwind CSS | Утилитарный подход, не нужно писать отдельные CSS файлы |
| Серверный стейт | TanStack Query | Кеширование, автоматический refetch, удобные мутации |
| Backend | NestJS | Модульная архитектура, встроенная валидация, DI из коробки |
| ORM | Prisma | Типобезопасные запросы, удобные миграции |
| БД | PostgreSQL | Надёжная реляционная БД, хорошая поддержка в Prisma |
| Контейнеризация | Docker | Изолированная БД, не зависит от локального окружения |

---

## Запуск

### Требования

- [Node.js](https://nodejs.org/) >= 20
- [Docker](https://www.docker.com/)

### 1. Клонировать репозиторий

```bash
git clone <repo-url>
cd construction-site-store
```

### 2. Поднять базу данных

Создайте файл `.env` в корне проекта на основе `.env.example`:

```bash
cp .env.example .env
```

Заполните переменные в `.env` и запусти контейнер:

```bash
docker-compose up -d
```

### 3. Запустить бэкенд

```bash
cd backend
cp .env.example .env
npm install
npm run migrate:dev
npm run start:dev
```

Бэкенд будет доступен на `http://localhost:3000`

### 4. Запустить фронтенд

```bash
cd frontend
npm install
npm run dev
```

Приложение будет доступно на `http://localhost:5173`

---

## Переменные окружения

Создайте файл `backend/.env` по образцу `backend/.env.example`:

```env
DATABASE_URL="postgresql://admin:admin@localhost:5432/construction_site?schema=public"
```