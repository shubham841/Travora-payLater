# Travora-PayLater

Travora-PayLater is a full-stack travel financing platform enabling travel agents to offer EMI-based trip bookings. It includes a multi-step agent onboarding flow with document uploads, secure authentication via Clerk, and persistent storage in PostgreSQL.

---

## 🗂️ Folder Structure

```
Travora-PayLater/
├── .clerk/               # Clerk authentication configs
├── .next/                # Next.js build files
├── node_modules/         # Node dependencies
├── prisma/               # Optional: Prisma ORM setup
├── public/               # Public assets
├── server/               # Express backend
│   ├── config/           # DB config + table creation
│   ├── controllers/      # Route handler logic
│   ├── routes/           # API routes
│   └── uploads/          # Uploaded documents
├── src/                  # Frontend Next.js app
│   ├── app/              # App routes (/agent/onboarding, etc.)
│   ├── components/       # UI components
│   ├── lib/              # Utilities
│   └── middleware.js     # Middleware setup (e.g. Clerk)
├── .env                  # Shared environment variables
├── .env.local            # Local Clerk keys
├── .gitignore
├── index.js              # Unused root entry
├── package.json          # Project dependencies
├── package-lock.json
```

---

## 🧪 Tech Stack

* **Frontend**: Next.js 14, React, Tailwind CSS
* **Authentication**: [Clerk.dev](https://clerk.dev)
* **Backend**: Node.js + Express.js
* **Database**: PostgreSQL (hosted locally)
* **Uploads**: Multer (files saved to `server/uploads/`)
* **ORM**: Using `pg` driver (no Prisma)

---

## ⚙️ Local Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/Travora-PayLater.git
cd Travora-PayLater
```

### 2. Install Dependencies

```bash
npm install              # installs frontend & root dependencies
cd server
npm install              # installs backend dependencies
```

### 3. Setup PostgreSQL Locally

* Ensure PostgreSQL is installed and running.
* Create a new user and database:

```sql
CREATE DATABASE agentdb;
CREATE USER travora WITH PASSWORD 'admin';
GRANT ALL PRIVILEGES ON DATABASE agentdb TO travora;
```

### 4. Configure Environment Variables

**In `server/.env`:**

```env
DATABASE_URL=postgresql://travora:admin@localhost:5432/agentdb
PORT=5000
```

**In root `.env.local`:**

```env
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_FRONTEND_API=your_clerk_frontend_api
```

### 5. Create Database Table

Run the DB init script:

```bash
cd server/config
node createTable.js
```

### 6. Start the Backend

```bash
cd server
node index.js
```

Logs:

```
✅ Connected to PostgreSQL database successfully.
Server running on port 5000
```

### 7. Start the Frontend

```bash
cd ..
npm run dev
```

Visit: `http://localhost:3000`

---

## 📊 Features

### Agent Onboarding

* Multi-step form (basic info, business details, payout info)
* Auto-filled data from Clerk (email, phone)
* ID proof & business registration uploads
* Onboarding data sent to Express backend and stored in PostgreSQL

### Clerk Integration

* Email + phone verification
* Public metadata flag `agentOnboarded` ensures users can only onboard once

### API Routes

* `POST /api/agent/onboarding` — receives form + documents
* `PATCH /api/agent/mark-onboarded/:clerkUserId` — sets onboarding metadata in Clerk

---

## 🚧 Contributing

* All environment-specific values are kept in `.env` and `.env.local`
* Keep `server/uploads/` in `.gitignore`
* Use descriptive commits and follow team PR guidelines

---

## 🚀 Deployment (Coming Soon)

Planned deployment setup includes:

* Vercel for Next.js frontend
* Railway or Render for Express API
* Supabase or NeonDB for PostgreSQL

---

## 🚫 Troubleshooting

* "`Error: password must be string`" — check your `.env` file formatting
* "`permission denied for schema public`" — ensure your Postgres user has correct privileges
* Server exits immediately — if DB fails to connect, check credentials & access

---

## 🌟 Credits

Developed by Team Travora, 2025.

```

Let me know if you want the README to include screenshots or live demo instructions as well!

```
















This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
