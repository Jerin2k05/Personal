# Arise & Shine Ministries

The application is split into independent frontend and backend projects:

- `frontend/` — React, Vite, and React Router
- `backend/` — Express, MongoDB/Mongoose, and Nodemailer

## Run locally

### Backend

1. Install dependencies: `cd backend` then `npm install`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI`, SMTP connection values, and any production CORS origins.
3. Start the API: `npm run dev` (or `npm start`).

The API listens on port `5000` by default. It requires a reachable MongoDB instance to start. SMTP must be configured for email notifications. Prayer requests are saved even when SMTP delivery fails; failed notifications are retried automatically with a bounded backoff.

### Frontend

1. Install dependencies: `cd frontend` then `npm install`.
2. Start the site: `npm run dev`.

Vite proxies `/api` requests to `http://localhost:5000` by default. Set `VITE_API_PROXY_TARGET` in the frontend environment to use a different local API URL. For a deployed frontend/API on separate origins, set `VITE_API_BASE_URL` to the API's `/api` base URL and configure `CORS_ORIGINS` in the backend.

## API

- `GET /api/health` — API and database health
- `POST /api/prayer-requests` — validated, rate-limited prayer request submission

Notifications always go to `ariseandshineofficial@gmail.com`; the submitted visitor email is only used as the reply-to address. There is intentionally no public endpoint for reading prayer requests.

## Content

The History page avoids publishing unconfirmed dates or milestones. Add chronological details only after ministry leadership confirms them. Phone, address, and office hours are omitted until confirmed.

Use HTTPS in production. Keep `.env` files and all SMTP/database credentials out of source control; configure them in the hosting provider's secret manager.
