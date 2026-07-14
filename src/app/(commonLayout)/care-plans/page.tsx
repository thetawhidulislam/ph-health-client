import Link from "next/link";
import { ArrowRight, CalendarCheck2, HeartPulse, ShieldCheck, Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserInfo } from "@/services/auth.service";
import Footer from "@/components/modules/Footer/Footer";

const plans = [
  {
    title: "Preventive wellness",
    description: "Annual screenings, coaching, and reminders for healthier daily routines.",
    badge: "Popular",
  },
  {
    title: "Chronic care support",
    description: "Ongoing coordination for diabetes, hypertension, and recovery follow-up.",
    badge: "Recommended",
  },
  {
    title: "Family care coordination",
    description: "Shared visibility for parents, caregivers, and primary support contacts.",
    badge: "Flexible",
  },
];

export default async function CarePlansPage() {
  const currentUser = await getUserInfo();

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Care plans</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Personalized healthcare pathways for every stage of life.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            PH Healthcare uses real patient data and care history to recommend support plans that are practical, measurable, and easy to follow.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={currentUser ? "/dashboard" : "/login"}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
            >
              {currentUser ? "Open your dashboard" : "Create your account"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card key={plan.title} className="border-border/70 shadow-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <HeartPulse className="h-6 w-6" />
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  {plan.badge}
                </span>
              </div>
              <CardTitle className="mt-4">{plan.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <CardDescription>{plan.description}</CardDescription>
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarCheck2 className="h-4 w-4 text-primary" />
                Updated from your recent care activity
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="rounded-3xl border border-border/70 bg-linear-to-br from-primary/10 via-background to-card p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          <Sparkles className="h-4 w-4" /> Intelligent care coordination
        </div>
        <h2 className="mt-3 text-2xl font-semibold">Plans adapt to real health data, appointments, and follow-ups.</h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Patients can review their recommendations, track progress, and stay aligned with their care team through one secure experience.
        </p>
        <div className="mt-6 flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" />
          Data-driven recommendations powered by your connected care records
        </div>
      </section>
         <Footer />
    </main>
  );
}
