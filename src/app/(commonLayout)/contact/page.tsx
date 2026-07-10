"use client";

import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Footer from "@/components/modules/Footer/Footer";

export default function ContactPage() {
  return (
    <>
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <section className="mb-16 text-center">
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Need Medical Assistance?
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            We are Always Here
            <span className="text-primary"> For You</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Whether you need to book an appointment, contact our support team,
            or find the right specialist, PH Healthcare is just one click away.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/consultation">
              <Button size="lg">
                Book Appointment
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/doctors">
              <Button variant="outline" size="lg">
                Find Doctors
              </Button>
            </Link>
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="rounded-3xl">
            <CardContent className="space-y-4 p-8">
              <Phone className="h-10 w-10 text-primary" />

              <h3 className="text-xl font-semibold">Emergency Contact</h3>

              <p className="text-muted-foreground">
                Available 24 hours for emergency medical assistance.
              </p>

              <a
                href="tel:+880123456789"
                className="font-semibold text-primary"
              >
                +880 1234-567890
              </a>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardContent className="space-y-4 p-8">
              <Mail className="h-10 w-10 text-primary" />

              <h3 className="text-xl font-semibold">Email Support</h3>

              <p className="text-muted-foreground">
                Get help from our support team anytime.
              </p>

              <a
                href="mailto:support@phhealthcare.com"
                className="font-semibold text-primary"
              >
                support@phhealthcare.com
              </a>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardContent className="space-y-4 p-8">
              <MapPin className="h-10 w-10 text-primary" />

              <h3 className="text-xl font-semibold">Visit Hospital</h3>

              <p className="text-muted-foreground">
                House 18, Road 7, Banani, Dhaka, Bangladesh.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardContent className="space-y-4 p-8">
              <Clock3 className="h-10 w-10 text-primary" />

              <h3 className="text-xl font-semibold">Working Hours</h3>

              <div className="space-y-2 text-muted-foreground">
                <p>Mon - Fri : 8:00 AM - 8:00 PM</p>
                <p>Saturday : 9:00 AM - 5:00 PM</p>
                <p>Sunday : Emergency Only</p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mt-16 rounded-3xl bg-primary p-10 text-center text-primary-foreground">
          <CalendarDays className="mx-auto mb-5 h-14 w-14" />

          <h2 className="text-4xl font-bold">Ready to Meet Our Specialists?</h2>

          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Book your appointment online and receive expert healthcare from our
            experienced doctors with a simple, secure, and convenient process.
          </p>

          <Link href="/consultation" className="mt-6 inline-block">
            <Button size="lg">
              Book Appointment
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </>
  );
}
