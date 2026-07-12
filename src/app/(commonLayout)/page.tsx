"use client"

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getDoctors } from "@/services/doctor.service";
import Footer from "@/components/modules/Footer/Footer";

const features = [
  {
    title: "Smart scheduling",
    description:
      "Book visits in seconds with real-time availability and automated reminders.",
    icon: CalendarDays,
  },
  {
    title: "Trusted care",
    description:
      "Connect with verified specialists and monitor progress through one secure hub.",
    icon: ShieldCheck,
  },
  {
    title: "Patient-first support",
    description:
      "Enjoy clear communication, digital follow-ups, and compassionate service at every step.",
    icon: Users,
  },
];

const stats = [
  { value: "45+", label: "Expert Doctors" },
  { value: "12K+", label: "Happy Patients" },
  { value: "98%", label: "Success Rate" },
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
    answer:
      "Most appointments can be booked within minutes, and confirmation is sent instantly.",
  },
  {
    question: "Do you support telehealth visits?",
    answer:
      "Yes, secure virtual consultations are available for eligible care needs.",
  },
  {
    question: "Can I manage my family’s care in one place?",
    answer:
      "Absolutely. The dashboard lets you organize visits, records, and reminders for multiple profiles.",
  },
];

export default function Home() {
  const { data: doctorsResponse, } = useQuery({
    queryKey: ["doctors"],
    queryFn: () => getDoctors(""),
  });
  const bestDoctor = doctorsResponse?.data?.sort(
    (a, b) => b.averageRating - a.averageRating,
  )?.[0];
  console.log(bestDoctor)
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-background to-cyan-500/10" />

        <div className="mx-auto grid min-h-[85vh] max-w-7xl items-center gap-16 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          {/* Left */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <BadgeCheck className="size-4" />
              Trusted by 12,000+ Patients
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Your Health,
              <br />
              <span className="text-primary">Our First Priority</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Book appointments, connect with experienced doctors, access
              medical records, and receive quality healthcare anytime, anywhere.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/consultation"
                className="inline-flex h-12 items-center rounded-full bg-primary px-6 text-primary-foreground transition hover:bg-primary/90"
              >
                Book Appointment
                <ArrowRight className="ml-2 size-4" />
              </Link>

              <Link
                href="/about"
                className="inline-flex h-12 items-center rounded-full border px-6 transition hover:bg-muted"
              >
                Learn More
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              {stats.map((item) => (
                <div key={item.label}>
                  <h3 className="text-3xl font-bold text-primary">
                    {item.value}
                  </h3>

                  <p className="text-muted-foreground">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="relative mx-auto h-150 w-full max-w-md overflow-hidden rounded-[40px] bg-primary/10">
              <Image
                src={bestDoctor?.profilePhoto || "/images/doctor.png"}
                alt={bestDoctor?.name || "Doctor"}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Appointment Card */}
            <div className="absolute -left-6 top-10 rounded-2xl border bg-background p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="font-semibold">{bestDoctor?.name}</h4>

                  <p className="text-sm text-muted-foreground">
                    {bestDoctor?.specialities?.[0]?.specialty?.title || "Specialist"}
                  </p>
                </div>
              </div>
            </div>

            {/* Rating Card */}
            <div className="absolute -right-6 bottom-10 rounded-2xl border bg-background p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-yellow-100 p-3">
                  <Star className="size-5 fill-yellow-400 text-yellow-400" />
                </div>

                <div>
                  <h4 className="font-semibold">
                    {bestDoctor?.averageRating ?? "5.0"}/5 Rating
                  </h4>

                  <p className="text-sm text-muted-foreground">
                    {bestDoctor?.experience} Years Experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="features"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Why patients choose us
            </p>
            <h2 className="text-3xl font-semibold sm:text-4xl">
              Everything you need for better care
            </h2>
          </div>
          <p className="max-w-2xl text-muted-foreground">
            From scheduling to follow-ups, our platform combines clinical
            support and user-friendly tools.
          </p>
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

      <section
        id="services"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="grid gap-6 rounded-3xl border border-border/70 bg-card/80 p-6 shadow-sm lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Services
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              A complete care journey in one dashboard
            </h2>
            <p className="mt-4 text-muted-foreground">
              Manage care plans, diagnostics, and medical guidance with
              confidence.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service) => (
              <div
                key={service}
                className="flex items-center gap-3 rounded-2xl border border-border/70 bg-background/70 p-4"
              >
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
                <p className="text-3xl font-semibold text-primary">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section
        id="about"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="grid gap-6 rounded-3xl border border-border/70 bg-linear-to-br from-primary/10 to-background p-6 lg:grid-cols-[0.95fr_1.05fr] lg:p-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              About PH Healthcare
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Built to reduce friction and improve outcomes
            </h2>
          </div>
          <div className="space-y-3 text-muted-foreground">
            <p>
              Whether you are managing chronic care, preparing for a checkup, or
              following recovery plans, the platform helps patients and
              providers stay aligned.
            </p>
            <p>
              Intuitive dashboards, secure communications, and responsive design
              make the experience feel personal and dependable every day.
            </p>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
      >
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            Frequently asked questions
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            Questions patients often ask
          </h2>
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

     <Footer />
    </main>
  );
}
