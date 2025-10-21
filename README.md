# Blog Platform Monorepo (API + 2 Frontends)

A full‑stack blog platform built as a monorepo with:

- **API**: Node.js + Express + Prisma + PostgreSQL
- **Public site**: React (Vite) + TanStack Query + Tailwind
- **Author dashboard**: React (Vite) + TanStack Query + TinyMCE

Deployed to:
- Database: Render PostgreSQL
- API: Render Web Service
- Frontends: Vercel (2 apps)


## Repository structure

```
.
├─ client/                # Public blog site (Vite + React)
│  ├─ src/
│  └─ package.json
├─ client-author/         # Author/admin dashboard (Vite + React)
│  ├─ src/
│  ├─ package.json
│  └─ vercel.json
├─ server/                # REST API (Express + Prisma)
│  ├─ prisma/
│  ├─ src/
│  └─ package.json          # Render Blueprint (optional one-click deploy)
└─ README.md              # This file
```


## Tech stack

- **Frontend**: React 19, Vite, React Router, TanStack Query, TailwindCSS
- **Editor (author)**: TinyMCE
- **API**: Node.js, Express 5, Prisma ORM, JWT auth, bcrypt
- **Database**: PostgreSQL


## Environment variables

Server requires a `.env` file in `server/` with:
- `DATABASE_URL` — PostgreSQL connection string
- `ACCESS_TOKEN_SECRET` — long random string for JWT signing
- `SALT_ROUNDS` — bcrypt salt rounds (recommended: `10`)
- `PORT` — optional; defaults to `3000`

**Frontend API URL**: Both frontends currently hardcode `http://localhost:3000/api` in `src/services/axios.js`.


## Local development

Prerequisites:
- Node.js 18+ (LTS recommended)
- npm 9+
- A local Postgres instance or a cloud Postgres URL

### 1) API (server)

```powershell
cd server
npm install

# Create .env file with:
# DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/blog_db"
# ACCESS_TOKEN_SECRET="your-secret-key-here"
# SALT_ROUNDS=10

# Prisma setup
npx prisma generate
npx prisma migrate dev --name init

# Run in dev mode (auto-reload)
npm run dev
```

The API runs on `http://localhost:3000` and exposes endpoints under `/api` (e.g. `/api/auth/login`).

### 2) Public site (client)

```powershell
cd client
npm install
npm run dev
```

Runs on `http://localhost:5173` (Vite default). The API URL is hardcoded to `http://localhost:3000/api` in `src/services/axios.js`.

### 3) Author dashboard (client-author)

```powershell
cd client-author
npm install
npm run dev
```

Runs on a different port (Vite auto-assigns). The API URL is hardcoded to `http://localhost:3000/api` in `src/services/axios.js`.


## Scripts

**Server** (`server/package.json`):
- `npm run dev` — start API with file watch (for local development)
- `npm test` — placeholder (no tests configured)

**Frontends** (`client` and `client-author`):
- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist`



## API overview

Key routes (all prefixed with `/api`):
- `POST /auth/register` — register new user
- `POST /auth/login` — login, returns JWT
- `GET /users` — list users
- `GET /posts` — list posts
- `POST /posts` — create post (auth required)

Full endpoint list and examples are documented in `server/README.md`.
