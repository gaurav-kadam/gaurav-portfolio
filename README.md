# Gaurav Ravindra Kadam Portfolio

A premium full stack developer portfolio built with React, Vite, Tailwind CSS, Framer Motion, Django REST Framework, and PostgreSQL-ready backend configuration.

## Tech Stack

- Frontend: React, Vite, Tailwind CSS, Framer Motion, React Router, React Icons, Axios
- Backend: Django, Django REST Framework, django-cors-headers, python-dotenv
- Database: PostgreSQL-ready configuration with SQLite fallback for local development

## Project Structure

```text
portfolio-gaurav-ravindra-kadam/
├── backend/
│   ├── apps/
│   │   ├── contact/
│   │   ├── profile/
│   │   ├── projects/
│   │   └── skills/
│   ├── portfolio_backend/
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── animations/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   └── services/
│   └── package.json
└── README.md
```

## Backend Setup

1. Open a terminal in [`backend`](/c:/Projects/PortFolio/portfolio-gaurav-ravindra-kadam/backend).
2. Create a virtual environment if you want one:

```powershell
python -m venv .venv
.venv\Scripts\activate
```

3. Install dependencies:

```powershell
python -m pip install -r requirements.txt
```

4. Create your environment file:

```powershell
Copy-Item .env.example .env
```

5. Run migrations and seed the portfolio data:

```powershell
python manage.py migrate
python manage.py seed_portfolio
```

6. Start the API server:

```powershell
python manage.py runserver
```

## Frontend Setup

1. Open a terminal in [`frontend`](/c:/Projects/PortFolio/portfolio-gaurav-ravindra-kadam/frontend).
2. Install dependencies:

```powershell
cmd /c npm.cmd install
```

3. Create the frontend environment file:

```powershell
Copy-Item .env.example .env
```

4. Start the development server:

```powershell
cmd /c npm.cmd run dev
```

## API Endpoints

- `GET /api/profile/`
- `GET /api/projects/`
- `GET /api/skills/`
- `POST /api/contact/`

## Deployment Notes

### Frontend

- Deploy to Vercel or Netlify
- Set `VITE_API_BASE_URL` to your backend API URL

### Backend

- Deploy Django to Render or AWS EC2
- Set `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`, and PostgreSQL credentials
- Serve static files from `staticfiles/` and media from `media/`

### Database

- Use PostgreSQL in production
- Local development falls back to SQLite when PostgreSQL environment variables are not provided

## Validation

The project has been validated locally with:

```powershell
python manage.py check
python manage.py migrate
python manage.py seed_portfolio
cmd /c npm.cmd run lint
cmd /c npm.cmd run build
```
