import Link from "next/link";
import { ArrowRight, Pill, ShieldCheck, Sparkles } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/modules/Footer/Footer";

const medicineHighlights = [
  {
    title: "Medication guidance",
    description: "Personalized counseling on dosage, timing, and safe usage.",
  },
  {
    title: "Refill reminders",
    description: "Receive timely alerts so treatment plans stay on track.",
  },
  {
    title: "Verified prescriptions",
    description: "Support from licensed pharmacists and care coordinators.",
  },
];

export default function MedicinePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Medicines</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Medication support that keeps care simple and dependable.</h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Review treatment plans, request refills, and get helpful reminders through one secure healthcare experience.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/consultation" className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary/80">
              Book a consultation
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {medicineHighlights.map((item) => (
            <Card key={item.title} className="border-border/70 shadow-sm">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Pill className="h-6 w-6" />
                </div>
                <CardTitle className="mt-4">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="rounded-3xl border border-border/70 bg-linear-to-br from-primary/10 via-background to-card p-8 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-primary">
            <ShieldCheck className="h-4 w-4" /> Trusted guidance
          </div>
          <h2 className="mt-3 text-2xl font-semibold">Every prescription plan is reviewed in context with your care journey.</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Patients stay informed with clear refill workflows, safer medication education, and follow-up support when needed.
          </p>
          <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Built for everyday wellness and long-term care plans
          </div>
        </section>
      </section>
         <Footer />
    </main>
  );
}