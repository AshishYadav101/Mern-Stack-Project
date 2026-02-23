# Expense Tracker Backend

Minimal Express + MongoDB backend for the Expense Tracker.

Setup

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:

```bash
cd Backend
npm install
```

3. Run in development:

```bash
npm run dev
```

API endpoints (prefix `/api`):

- `POST /api/auth/register` — body: `{ username, email, password, isAdmin }`
- `POST /api/auth/login` — body: `{ email, password }`
- `GET /api/transactions` — auth required; admin sees all
- `POST /api/transactions` — auth required; create transaction
- `DELETE /api/transactions/:id` — auth required; owner or admin
