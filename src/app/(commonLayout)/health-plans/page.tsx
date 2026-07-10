import Link from "next/link";
import { ArrowRight, HeartHandshake, ShieldCheck } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const coverageOptions = [
  "Preventive care support",
  "Specialist coordination",
  "Digital follow-up plans",
];

export default function HealthPlansPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Health plans</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Care plans tailored to everyday health goals and long-term wellbeing.</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Choose a plan that supports prevention, continuity of care, and a smoother experience across appointments and follow-ups.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/care-plans" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/80">
              Explore care plans
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {coverageOptions.map((item) => (
            <Card key={item} className="border-border/70 shadow-sm">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">{item}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Flexible support designed around real patient needs.</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="rounded-3xl border border-border/70 bg-linear-to-br from-primary/10 via-background to-card p-8 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            <ShieldCheck className="h-4 w-4" /> Continuity of care
          </div>
          <h2 className="mt-3 text-2xl font-semibold">Plans help patients stay connected to clinicians, reminders, and follow-up actions.</h2>
        </section>
      </section>
    </main>
  );
}
