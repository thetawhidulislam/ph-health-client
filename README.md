# PH Healthcare

A full-stack healthcare platform for booking doctor consultations, managing appointments, and handling patient–doctor–admin workflows. Patients can search doctors by specialty, check schedules and reviews, book and pay for appointments online, while admins and doctors manage the entire operation from role-based dashboards.

---

## 📸 Screenshot

<p align="center">
  <a href="https://ph-health-client.vercel.app/" target="_blank">
    <img src="https://api.microlink.io/?url=https://ph-health-client.vercel.app/&screenshot=true&meta=false&embed=screenshot.url" alt="PH Healthcare Screenshot" width="100%" />
  </a>
</p>

---

## Live Links

| | URL |
|---|---|
| **Client (Frontend)** | https://ph-health-client.vercel.app/ |
| **Server (API)** | https://ph-health-server-main.vercel.app/ |

## Repositories

| | Repo |
|---|---|
| **Client** | https://github.com/thetawhidulislam/ph-health-client |
| **Server** | https://github.com/thetawhidulislam/ph-health-server |

---

## Tech Stack

**Client**
- Next.js (App Router)
- TypeScript
- TanStack Form & TanStack Query
- Tailwind CSS + shadcn/ui
- Zod (validation)

**Server**
- Node.js + Express
- TypeScript
- Prisma ORM + PostgreSQL
- better-auth (email/password, Google OAuth, email OTP verification)
- Stripe (payments)
- Cloudinary (file/image uploads)
- Nodemailer + EJS (transactional emails)
- node-cron (scheduled jobs)
- PDFKit (PDF generation)
- Deployed on Vercel

---

## Core Features

- Role-based access: **Super Admin**, **Admin**, **Doctor**, **Patient**
- Authentication via email/password and Google, with OTP email verification
- Doctor discovery with specialties, schedules, ratings, and reviews
- Appointment booking against available doctor schedules
- Online payments for appointment fees via Stripe
- Patient and doctor dashboards for managing appointments/consultations
- Automated emails (OTP, reminders, notifications)
- PDF generation for prescriptions/invoices
- Scheduled background jobs (e.g. appointment reminders, cleanup tasks)

---

## Dependencies

**Client — core**
```
next
react
typescript
```

**Client — data & forms**
```
@tanstack/react-query
@tanstack/react-form
zod
```

**Client — UI**
```
tailwindcss
shadcn/ui (Radix UI primitives)
lucide-react
```

**Server — core**
```
express
typescript
```

**Server — database**
```
prisma
@prisma/client
pg
```

**Server — auth, payments & storage**
```
better-auth
stripe
cloudinary
```

**Server — utilities**
```
nodemailer
ejs
node-cron
pdfkit
dotenv
cors
```

> For exact package versions, check `package.json` in each repo — the client and server are separate Next.js/Node projects, each with their own dependency list.

---

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

Create a `.env.local` file with the required variables (API base URL, better-auth config, Stripe public key, etc.) before running.

Open [http://localhost:3000](http://localhost:3000) to view the client. Make sure the server is running and correctly referenced in your environment variables for full functionality.

---

## Author

**Tawhidul Islam** — Full Stack Developer

- GitHub: [@thetawhidulislam](https://github.com/thetawhidulislam)
- LinkedIn: [thetawhidulislam](https://www.linkedin.com/in/thetawhidulislam/)
- Portfolio: [tawhidulislam.vercel.app](https://tawhidulislam.vercel.app/)

## License

ISC