import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getServiceBySlug } from "../services-data";

const ServiceDetailsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return (
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
          <ArrowLeft className="h-4 w-4" /> Back to services
        </Link>
        <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-semibold">Service not found</h1>
          <p className="mt-3 text-muted-foreground">The requested healthcare service could not be found.</p>
        </div>
      </main>
    );
  }

  const Icon = service.icon;

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <Link href="/services" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
        <ArrowLeft className="h-4 w-4" /> Back to services
      </Link>

      <section className="overflow-hidden rounded-3xl border border-border/70 bg-card shadow-sm">
        <div className="bg-linear-to-br from-[#202938] via-[#2b3548] to-[#465468] p-8 text-white">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
            <Icon className="h-7 w-7" />
          </div>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.3em] text-slate-200">Service details</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{service.title}</h1>
          <p className="mt-4 max-w-3xl text-lg text-slate-200">{service.description}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm">
              <Clock3 className="h-4 w-4" /> {service.meta}
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm">
              <ShieldCheck className="h-4 w-4" /> Secure care coordination
            </span>
          </div>
        </div>

        <div className="grid gap-6 p-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">What this service includes</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {service.highlights.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Patient benefits</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {service.benefits.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <Card className="border-border/70 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CalendarDays className="h-5 w-5 text-primary" /> Ready to book?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Continue to the consultation experience to speak with a clinician or review upcoming availability.
                </p>
                <Link
                  href="/consultation"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
                >
                  Explore doctor availability
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailsPage;
