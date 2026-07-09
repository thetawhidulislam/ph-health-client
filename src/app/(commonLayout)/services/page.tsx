import Link from "next/link";
import { ArrowRight, BrainCircuit, Clock3, HeartPulse, Microscope, Pill, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    title: "Primary Care",
    description: "Preventive checkups, routine treatment, and ongoing support for everyday health needs.",
    meta: "Same-week appointments",
    icon: HeartPulse,
  },
  {
    title: "Specialist Consultations",
    description: "Fast access to experienced specialists across medicine, pediatrics, and diagnostics.",
    meta: "Virtual or in-clinic",
    icon: BrainCircuit,
  },
  {
    title: "Diagnostics",
    description: "Reliable lab tests and imaging support to guide accurate care decisions.",
    meta: "Results shared quickly",
    icon: Microscope,
  },
  {
    title: "Medication Support",
    description: "Personalized medication guidance and follow-up plans for better adherence.",
    meta: "Refill reminders included",
    icon: Pill,
  },
];

export default function ServicesPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Services</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Care pathways designed for clarity, comfort, and continuity.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Whether you need a routine assessment or specialist guidance, PH Healthcare helps you move from concern to care with confidence.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/consultation" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/80">
              Explore doctors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.title} className="group rounded-3xl border border-border/70 bg-card p-0 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
              <CardHeader className="p-6 pb-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4 text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6 pt-0">
                <CardDescription className="text-sm leading-6">{service.description}</CardDescription>
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Clock3 className="h-4 w-4 text-primary" />
                  {service.meta}
                </div>
                <Link href={`/services/${service.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:gap-3">
                  View availability
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="rounded-3xl border border-border/70 bg-linear-to-br from-primary/10 via-background to-card p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          <ShieldCheck className="h-4 w-4" /> Trusted experience
        </div>
        <h2 className="mt-3 text-2xl font-semibold">Every visit is supported by secure scheduling and informed follow-up.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          We combine dependable clinical support with modern digital tools so patients can stay organized and feel supported throughout treatment.
        </p>
      </section>
    </main>
  );
}
