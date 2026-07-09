import Link from "next/link";
import { ArrowRight, HeartHandshake, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";

const principles = [
  {
    title: "Clinical clarity",
    description: "Every care decision is supported by transparent information and guided next steps.",
    icon: Stethoscope,
  },
  {
    title: "Patient safety",
    description: "Security, privacy, and dependable communication remain at the forefront of every experience.",
    icon: ShieldCheck,
  },
  {
    title: "Human-centered care",
    description: "Technology should remove friction while preserving compassion and personal attention.",
    icon: HeartHandshake,
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">About PH Healthcare</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">A modern healthcare platform built around trust and convenience.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            PH Healthcare brings specialists, care coordination, and patient communication together in one secure environment.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/consultation" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/80">
              Book a consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-muted">
              Contact our team
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            <Sparkles className="h-4 w-4" /> Our mission
          </div>
          <h2 className="mt-3 text-2xl font-semibold">Helping patients access the right care at the right time.</h2>
          <p className="mt-4 text-muted-foreground leading-7">
            We believe healthcare should feel clear, responsive, and personal. Our platform simplifies appointment booking, supports specialist discovery, and gives patients a dependable place to stay informed.
          </p>
        </div>
        <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
          <h2 className="text-2xl font-semibold">How we support care</h2>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li>• Guided specialist discovery for common and specialized care needs.</li>
            <li>• Secure scheduling with reminders and follow-up support.</li>
            <li>• Clear communication between patients and healthcare providers.</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {principles.map((principle) => {
          const Icon = principle.icon;
          return (
            <div key={principle.title} className="rounded-3xl border border-border/70 bg-card p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{principle.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{principle.description}</p>
            </div>
          );
        })}
      </section>
    </main>
  );
}
