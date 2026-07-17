# SaaStack

Multi-tenant SaaS dashboard with authentication, team management, subscriptions, and activity tracking. Built with Next.js 16, TypeScript, Prisma 7, and SQLite.

## Features

- **Multi-Tenant Architecture** — Organizations, roles, and permissions
- **Authentication** — Email/password with NextAuth v5
- **User Management** — Invite, assign roles, manage team members
- **Subscription Billing** — Plan management, usage tracking, invoices
- **Activity Logs** — Complete audit trail with filtering
- **Settings** — Organization config, API keys, security, notifications
- **Dashboard** — Revenue charts, user growth, recent activity

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict)
- **Database:** SQLite + Prisma 7 ORM
- **Auth:** NextAuth v5
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui
- **Charts:** Recharts
- **Icons:** Lucide React
- **Deployment:** Netlify

## Getting Started

```bash
# Clone
git clone https://github.com/Raja-Abbas/saastack.git
cd saastack

# Install
npm install

# Setup database
npx prisma db push
npx prisma generate

# Seed demo data
npx tsx prisma/seed.ts

# Run dev server
npm run dev -- --webpack
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with features and pricing |
| `/dashboard` | Overview with charts and stats |
| `/users` | Team management and invitations |
| `/subscription` | Plan details and billing |
| `/settings` | Organization, security, API keys |
| `/activity` | Audit log with filtering |

## License

MIT
