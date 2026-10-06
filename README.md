# AI Task Manager

Учебный проект по практике **ИСиП**.

**Руководитель практики:** Шукин Антон Андреевич, Директор ООО E-Coft.

Приложение для управления задачами: создание, просмотр, изменение статуса и удаление.
Проект состоит из трёх частей: **backend** (Node.js + Express), **frontend** (React + Vite),
**Python-скрипт** для экспорта задач в CSV и **PostgreSQL** для хранения данных.

---

## Стек технологий

- **Frontend:** React + Vite + Axios
- **Backend:** Node.js + Express
- **База данных:** PostgreSQL
- **Дополнительно:** Python 3 (psycopg2, python-dotenv)
- **Контроль версий:** Git
- **Контейнеризация (опционально):** Docker + Docker Compose

---

## Структура проекта

```
ai-task-manager/
├── backend/                     # Node.js + Express API
│   ├── src/
│   │   ├── db.js                # подключение к PostgreSQL
│   │   ├── app.js               # настройка Express
│   │   ├── routes/
│   │   │   └── tasks.js         # маршруты для /tasks
│   │   └── controllers/
│   │       └── tasksController.js  # логика CRUD
│   ├── server.js                # точка входа backend
│   ├── .env                     # переменные окружения (не коммитится)
│   ├── .env.example             # шаблон для .env
│   └── package.json
├── frontend/                    # React-приложение
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx     # форма создания задачи
│   │   │   └── TaskTable.jsx    # таблица задач
│   │   ├── api.js               # запросы к backend
│   │   ├── App.jsx              # главный компонент
│   │   └── main.jsx
│   └── package.json
├── db/
│   └── init.sql                 # SQL-скрипт создания таблицы tasks
├── python/
│   ├── export_tasks.py          # выгрузка задач в CSV
│   ├── requirements.txt         # зависимости Python
│   └── venv/                    # виртуальное окружение (не коммитится)
├── docker-compose.yml           # запуск всего проекта в Docker
└── README.md
```

---

## Что делает каждый файл

### Backend

| Файл | Назначение |
|------|------------|
| `backend/server.js` | Точка входа. Запускает Express-сервер на порту 3000 |
| `backend/src/app.js` | Настраивает Express, подключает CORS и маршруты |
| `backend/src/db.js` | Создаёт пул соединений с PostgreSQL, читает `.env` |
| `backend/src/routes/tasks.js` | Определяет URL и методы для задач (GET/POST/PUT/DELETE) |
| `backend/src/controllers/tasksController.js` | Логика CRUD: получение, создание, смена статуса, удаление |
| `backend/.env` | Переменные окружения (пароль БД, порт). Не коммитится |

### Frontend

| Файл | Назначение |
|------|------------|
| `frontend/src/main.jsx` | Точка входа React |
| `frontend/src/App.jsx` | Главный компонент — управляет состоянием задач |
| `frontend/src/api.js` | Обёртки над axios для запросов к backend |
| `frontend/src/components/TaskForm.jsx` | Форма создания задачи |
| `frontend/src/components/TaskTable.jsx` | Таблица задач со статусами и кнопкой удаления |

### База данных

| Файл | Назначение |
|------|------------|
| `db/init.sql` | Создаёт таблицу `tasks` с полями `id`, `title`, `description`, `status`, `created_at` |

### Python

| Файл | Назначение |
|------|------------|
| `python/export_tasks.py` | Подключается к PostgreSQL, выгружает все задачи в `tasks_export.csv` |
| `python/requirements.txt` | Список зависимостей (`psycopg2-binary`, `python-dotenv`) |

### Docker

| Файл | Назначение |
|------|------------|
| `docker-compose.yml` | Описывает три сервиса: `db`, `backend`, `frontend` |
| `backend/Dockerfile` | Инструкция сборки backend-образа |
| `frontend/Dockerfile` | Инструкция сборки frontend-образа |

## Запуск через Docker (рекомендуется)

**Не нужно** устанавливать PostgreSQL, Node.js или создавать базу данных вручную — всё автоматически.

### Требования

- Docker Desktop — [скачать](https://www.docker.com/products/docker-desktop/)

### Шаги

1. Установите и запустите Docker Desktop.
2. Распакуйте архив в удобную папку, например `C:\Users\ИмяВашегоПользователя\Desktop\task_manager`.
3. Откройте терминал **в этой папке**:
   - В проводнике Windows: наберите `powershell` в адресной строке → Enter.
   - Или «Пуск» → PowerShell → `cd C:\Users\ИмяВашегоПользователя\Desktop\task_manager`
4. Выполните одну команду:
   ```
   docker compose up --build -d
   ```
5. Подождите 1–2 минуты (первый запуск скачивает образы).
6. Откройте в браузере: http://localhost:5173

База данных и таблица создадутся **автоматически**.

### Остановить

```
docker compose down
```
### Если нужно запустить снова
```
docker compose up -d(т.к у вас уже все загруженно)
```

### Полный сброс (удалить все данные)

```
docker compose down -v
```
