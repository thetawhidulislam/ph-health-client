import Link from "next/link";
import { ArrowRight, BadgeCheck, CalendarDays, ShieldCheck, Sparkles, Stethoscope, Users } from "lucide-react";

import { ThemeToggle } from "@/components/shared/theme-toggle";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "Smart scheduling",
    description: "Book visits in seconds with real-time availability and automated reminders.",
    icon: CalendarDays,
  },
  {
    title: "Trusted care",
    description: "Connect with verified specialists and monitor progress through one secure hub.",
    icon: ShieldCheck,
  },
  {
    title: "Patient-first support",
    description: "Enjoy clear communication, digital follow-ups, and compassionate service at every step.",
    icon: Users,
  },
];

const stats = [
  { value: "24/7", label: "Virtual assistance" },
  { value: "98%", label: "Patient satisfaction" },
  { value: "150+", label: "Specialists onboard" },
];

const services = [
  "Primary care",
  "Diagnostics",
  "Telemedicine",
  "Wellness plans",
  "Preventive coaching",
];

const faqs = [
  {
    question: "How quickly can I book an appointment?",
    answer: "Most appointments can be booked within minutes, and confirmation is sent instantly.",
  },
  {
    question: "Do you support telehealth visits?",
    answer: "Yes, secure virtual consultations are available for eligible care needs.",
  },
  {
    question: "Can I manage my family’s care in one place?",
    answer: "Absolutely. The dashboard lets you organize visits, records, and reminders for multiple profiles.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
              <Stethoscope className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-muted-foreground uppercase">PH Healthcare</p>
              <p className="text-base font-semibold">Care that connects</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
            <Link href="#features" className="transition hover:text-primary">Features</Link>
            <Link href="#services" className="transition hover:text-primary">Services</Link>
            <Link href="#about" className="transition hover:text-primary">About</Link>
            <Link href="#faq" className="transition hover:text-primary">FAQ</Link>
            <Link href="/login" className="transition hover:text-primary">Login</Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/login"
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
            >
              Get started
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Modern healthcare management, simplified
          </div>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
            Feel confident about every visit, every plan, and every follow-up.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground sm:text-xl">
            PH Healthcare brings appointments, specialists, and patient support together in one elegant experience.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/consultation"
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
            >
              Book a consultation
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/services"
              className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition hover:bg-muted"
            >
              Explore services
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" /> HIPAA-ready workflows
            </span>
            <span className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" /> Secure messaging
            </span>
          </div>
        </div>

        <Card className="overflow-hidden border-border/70 shadow-xl shadow-primary/10">
          <CardContent className="grid gap-4 p-6 sm:p-8">
            <div className="rounded-3xl bg-linear-to-br from-primary/90 to-cyan-500/70 p-6 text-primary-foreground">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] opacity-90">Today’s overview</p>
              <h2 className="mt-3 text-3xl font-semibold">3 care updates ready</h2>
              <p className="mt-2 text-sm opacity-90">Your care team has prepared next steps for your wellness plan.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/70 bg-card p-4">
                <p className="text-sm text-muted-foreground">Upcoming appointment</p>
                <p className="mt-2 text-lg font-semibold">Tue, 9:30 AM</p>
              </div>
              <div className="rounded-2xl border border-border/70 bg-card p-4">
                <p className="text-sm text-muted-foreground">Prescription refill</p>
                <p className="mt-2 text-lg font-semibold">Ready to review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Why patients choose us</p>
            <h2 className="text-3xl font-semibold sm:text-4xl">Everything you need for better care</h2>
          </div>
          <p className="max-w-2xl text-muted-foreground">From scheduling to follow-ups, our platform combines clinical support and user-friendly tools.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="border-border/70">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section id="services" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-6 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Services</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">A complete care journey in one dashboard</h2>
            <p className="mt-4 text-muted-foreground">Manage care plans, diagnostics, and medical guidance with confidence.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <div key={service} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <BadgeCheck className="h-4 w-4" />
                </div>
                <span className="font-medium">{service}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/70 text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-semibold text-primary">{stat.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid gap-6 rounded-3xl border border-border/70 bg-linear-to-br from-primary/10 to-background p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">About PH Healthcare</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Built to reduce friction and improve outcomes</h2>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>Whether you are managing chronic care, preparing for a checkup, or following recovery plans, the platform helps patients and providers stay aligned.</p>
            <p>Intuitive dashboards, secure communications, and responsive design make the experience feel personal and dependable every day.</p>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Frequently asked questions</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Questions patients often ask</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {faqs.map((faq) => (
            <Card key={faq.question} className="border-border/70">
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{faq.answer}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/70 bg-card/60">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold">PH Healthcare</p>
            <p className="mt-2 text-sm text-muted-foreground">Helping patients and providers connect with clarity and care.</p>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <Link href="#features" className="transition hover:text-primary">Features</Link>
            <Link href="#services" className="transition hover:text-primary">Services</Link>
            <Link href="#faq" className="transition hover:text-primary">FAQ</Link>
            <a href="mailto:support@phhealthcare.com" className="transition hover:text-primary">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
