# How to run the project

## Prerequisites

- **Node.js** (v18+)
- **MongoDB** running locally (e.g. `mongodb://localhost:27017`) or a cloud URI in `Backend/.env`

## 1. Backend

```powershell
cd Backend
npm install
```

Copy environment (if not already done):

- Copy `Backend\.env.example` to `Backend\.env`
- Set `MONGO_URI` and `JWT_SECRET` in `Backend\.env`

Start the API:

```powershell
npm run dev
```

Or without nodemon:

```powershell
node server.js
```

Backend runs at **http://localhost:5000**.

## 2. Frontend

```powershell
cd Frontend\expensetracker
npm install
npm run dev
```

Frontend runs at **http://localhost:5173** (or the port Vite prints).

## 3. Use the app

- Open **http://localhost:5173** in the browser.
- Landing page: **Home**, **Features**, **About**, **Login** / **Register** in the navbar.
- After login, use **Dashboard** and the rest of the app.

## If you see "Connection failed"

- Ensure the **backend is running** on port 5000.
- Ensure **MongoDB** is running and `MONGO_URI` in `Backend\.env` is correct.
- If the frontend runs on another host/port, set `VITE_API_URL=http://localhost:5000/api` in `Frontend/expensetracker/.env` (optional; default is `http://localhost:5000/api`).

## Windows "spawn EPERM" errors

If `npm run dev` fails with `Error: spawn EPERM` (often with Vite/nodemon):

- Run the terminal (or Cursor) as **Administrator**, or
- Add the project folder to **Windows Defender exclusions**, or
- Run backend with: `node server.js` instead of `npm run dev`.
