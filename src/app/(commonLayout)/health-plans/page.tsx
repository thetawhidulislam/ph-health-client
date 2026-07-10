import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  HeartHandshake,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Footer from "@/components/modules/Footer/Footer";

const features = [
  {
    title: "Preventive Care",
    description:
      "Regular health checkups help detect problems before they become serious.",
    icon: ShieldCheck,
  },
  {
    title: "Expert Doctors",
    description:
      "Consult highly qualified specialists from different medical fields.",
    icon: Stethoscope,
  },
  {
    title: "Easy Scheduling",
    description: "Book appointments online within seconds from any device.",
    icon: CalendarDays,
  },
  {
    title: "Family Support",
    description:
      "Manage healthcare for your entire family in one secure account.",
    icon: Users,
  },
];

export default function HealthPlansPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[36px] border border-border bg-linear-to-br from-primary/15 via-background to-primary/5 px-8 py-20 shadow-xl lg:px-16">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              PH Healthcare Plans
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-6xl">
              Affordable Healthcare
              <br />
              <span className="text-primary">Plans For Everyone</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Choose the healthcare plan that fits your lifestyle. Get access to
              experienced doctors, digital healthcare, priority appointments,
              and continuous medical support.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/doctors"
                className="inline-flex items-center rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
              >
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center rounded-full border border-border bg-background px-7 py-4 font-semibold text-foreground transition-all duration-300 hover:bg-muted hover:scale-105"
              >
                Contact Us
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-8">
              <div>
                <h3 className="text-3xl font-bold text-primary">12K+</h3>
                <p className="text-muted-foreground">Happy Patients</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-primary">45+</h3>
                <p className="text-muted-foreground">Expert Doctors</p>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-primary">98%</h3>
                <p className="text-muted-foreground">Success Rate</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto mt-24 max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-semibold uppercase tracking-[0.3em] text-primary">
            Why Choose Us
          </p>

          <h2 className="mt-4 text-4xl font-bold">Healthcare Made Simple</h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="rounded-3xl transition-all hover:-translate-y-2 hover:shadow-xl"
              >
                <CardHeader>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  <CardTitle className="mt-6">{feature.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      {/* Statistics */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-border bg-card p-10 shadow-lg">
          <div className="mb-12 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
              Trusted By Thousands
            </p>

            <h2 className="mt-3 text-4xl font-bold text-foreground">
              Healthcare You Can Trust
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Trusted by thousands of patients with experienced doctors, quality
              care, and reliable healthcare services.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: "45+",
                label: "Expert Doctors",
              },
              {
                value: "12K+",
                label: "Happy Patients",
              },
              {
                value: "98%",
                label: "Success Rate",
              },
              {
                value: "24/7",
                label: "Support",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-border bg-background p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-primary hover:shadow-xl"
              >
                <h3 className="text-5xl font-bold text-primary">
                  {item.value}
                </h3>

                <p className="mt-3 text-muted-foreground">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Why Patients Trust Us */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="font-semibold uppercase tracking-[0.3em] text-primary">
              Why Patients Trust Us
            </p>

            <h2 className="mt-4 text-4xl font-bold">
              Better Healthcare,
              <br />
              Better Experience
            </h2>

            <p className="mt-6 text-lg text-muted-foreground">
              Our mission is to make healthcare more accessible, affordable, and
              convenient for everyone. With experienced doctors, secure medical
              records, and online appointment booking, your healthcare journey
              becomes easier than ever.
            </p>

            <div className="mt-8 space-y-5">
              {[
                "Verified & Experienced Doctors",
                "Easy Online Appointment Booking",
                "Affordable Healthcare Plans",
                "Secure Digital Medical Records",
                "24/7 Customer Support",
                "Trusted by Thousands of Patients",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <BadgeCheck className="h-5 w-5 text-primary" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-linear-to-br from-primary/10 via-primary/5 to-background p-10">
            <div className="grid gap-6 sm:grid-cols-2">
              <Card className="rounded-3xl border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <HeartHandshake className="mx-auto h-12 w-12 text-primary" />

                  <h3 className="mt-5 text-2xl font-bold">Patient First</h3>

                  <p className="mt-3 text-muted-foreground">
                    Every healthcare decision is made with patient wellbeing in
                    mind.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <ShieldCheck className="mx-auto h-12 w-12 text-primary" />

                  <h3 className="mt-5 text-2xl font-bold">Secure Care</h3>

                  <p className="mt-3 text-muted-foreground">
                    Your medical information is always safe and protected.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <CalendarDays className="mx-auto h-12 w-12 text-primary" />

                  <h3 className="mt-5 text-2xl font-bold">Easy Booking</h3>

                  <p className="mt-3 text-muted-foreground">
                    Schedule appointments online within seconds.
                  </p>
                </CardContent>
              </Card>

              <Card className="rounded-3xl border-0 shadow-md">
                <CardContent className="p-8 text-center">
                  <Users className="mx-auto h-12 w-12 text-primary" />

                  <h3 className="mt-5 text-2xl font-bold">Family Friendly</h3>

                  <p className="mt-3 text-muted-foreground">
                    Healthcare plans designed for individuals and families.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[36px] border border-border bg-linear-to-br from-primary/15 via-background to-primary/5 px-8 py-16 text-center shadow-xl lg:px-16">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <HeartHandshake className="h-10 w-10 text-primary" />
          </div>

          <h2 className="mt-8 text-4xl font-bold text-foreground lg:text-5xl">
            Ready To Start
            <br />
            <span className="text-primary">Your Healthcare Journey?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Join thousands of satisfied patients who trust PH Healthcare for
            quality medical services, experienced doctors, and affordable
            healthcare plans.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-5">
            <Link
              href="/doctors"
              className="inline-flex items-center rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground transition-all duration-300 hover:scale-105 hover:bg-primary/90"
            >
              Book Appointment
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center rounded-full border border-border bg-background px-8 py-4 font-semibold text-foreground transition-all duration-300 hover:scale-105 hover:bg-muted"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
