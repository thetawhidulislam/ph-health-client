"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialState = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function ContactPage() {
  const [values, setValues] = useState(initialState);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) {
      setStatus("error");
      setMessage("Please complete the required fields before sending your message.");
      return;
    }

    setStatus("success");
    setMessage("Thanks for contacting PH Healthcare. Our support team will get back to you shortly.");
    setValues(initialState);
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-border/70 bg-card p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">Contact us</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">We are here to help with your care journey.</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Reach out for appointment support, general questions, or help understanding our services.
          </p>

          <div className="mt-8 space-y-4">
            <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/40 p-4">
              <Mail className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Email support</p>
                <p className="text-sm text-muted-foreground">support@phhealthcare.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/40 p-4">
              <Phone className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Call us</p>
                <p className="text-sm text-muted-foreground">+880 2 5555 2029</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-2xl border border-border/70 bg-muted/40 p-4">
              <MapPin className="mt-0.5 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Visit our clinic</p>
                <p className="text-sm text-muted-foreground">House 18, Road 7, Banani, Dhaka</p>
              </div>
            </div>
          </div>
        </div>

        <Card className="border-border/70 shadow-sm">
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
            <CardDescription>We usually reply within one business day.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="name">Name</label>
                  <Input id="name" value={values.name} onChange={(event) => setValues((prev) => ({ ...prev, name: event.target.value }))} placeholder="Your full name" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="email">Email</label>
                  <Input id="email" type="email" value={values.email} onChange={(event) => setValues((prev) => ({ ...prev, email: event.target.value }))} placeholder="name@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="subject">Subject</label>
                <Input id="subject" value={values.subject} onChange={(event) => setValues((prev) => ({ ...prev, subject: event.target.value }))} placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="message">Message</label>
                <Textarea id="message" rows={5} value={values.message} onChange={(event) => setValues((prev) => ({ ...prev, message: event.target.value }))} placeholder="Tell us about your needs or concern." />
              </div>
              {status !== "idle" && (
                <div className={`flex items-start gap-2 rounded-2xl border p-3 text-sm ${status === "success" ? "border-emerald-500/30 bg-emerald-50 text-emerald-700" : "border-red-500/30 bg-red-50 text-red-700"}`}>
                  {status === "success" ? <CheckCircle2 className="mt-0.5 h-4 w-4" /> : <AlertCircle className="mt-0.5 h-4 w-4" />}
                  <span>{message}</span>
                </div>
              )}
              <Button type="submit" className="w-full rounded-full">Send message</Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
