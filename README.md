# PH Healthcare

A full-stack healthcare platform for booking doctor consultations, managing appointments, and handling patient–doctor–admin workflows.

## Live Links

| | URL |
|---|---|
| **Client (Frontend)** | https://ph-health-client.vercel.app/ |
| **Server (API)** | https://ph-health-server-main.vercel.app/ |

## Repositories

| | Repo |
|---|---|
| **Server** | https://github.com/thetawhidulislam/ph-health-server |
| **Client** | https://github.com/thetawhidulislam/ph-health-client |

## Tech Stack

**Client**
- Next.js (App Router)
- TanStack Form & TanStack Query
- Tailwind CSS + shadcn/ui
- Zod (validation)

**Server**
- Node.js + Express
- Prisma ORM + PostgreSQL
- better-auth (email/password, Google OAuth, email OTP verification)
- Stripe (payments)
- Cloudinary (file/image uploads)
- Nodemailer + EJS (transactional emails)
- node-cron (scheduled jobs)
- PDFKit (PDF generation)
- Deployed on Vercel

## Core Features

- Role-based access: **Super Admin**, **Admin**, **Doctor**, **Patient**
- Authentication via email/password and Google, with OTP email verification
- Doctor discovery with specialties, schedules, ratings, and reviews
- Appointment booking against available doctor schedules
- Online payments for appointment fees via Stripe
- Patient and doctor dashboards for managing appointments/consultations
- Automated emails (OTP, reminders, notifications)

## Getting Started (Server)

```bash
git clone https://github.com/thetawhidulislam/ph-health-server.git
cd ph-health-server
pnpm install
```

Create a `.env` file with the required variables (database URL, better-auth secret, Stripe keys, Cloudinary credentials, SMTP credentials, etc.), then:

```bash
pnpm build
pnpm start
```

For local development:

```bash
pnpm dev
```

## Getting Started (Client)

```bash
git clone https://github.com/thetawhidulislam/ph-health-client.git
cd ph-health-client
pnpm install
pnpm dev
```

## License

ISC