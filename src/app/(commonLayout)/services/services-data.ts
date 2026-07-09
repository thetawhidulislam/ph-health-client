import { BrainCircuit, HeartPulse, Microscope, Pill } from "lucide-react";

export type ServiceItem = {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  meta: string;
  icon: typeof HeartPulse;
  highlights: string[];
  benefits: string[];
};

export const services: ServiceItem[] = [
  {
    slug: "primary-care",
    title: "Primary Care",
    shortDescription: "Preventive checkups, routine treatment, and ongoing support for everyday health needs.",
    description:
      "Our primary care team helps patients stay ahead of common health concerns with thoughtful checkups, ongoing monitoring, and clear next steps.",
    meta: "Same-week appointments",
    icon: HeartPulse,
    highlights: [
      "Routine wellness visits and preventive screenings",
      "Support for chronic condition management",
      "Coordinated follow-up care and referrals",
    ],
    benefits: [
      "Fast access to general practice support",
      "Personalized care plans for long-term wellbeing",
      "Streamlined follow-up through digital reminders",
    ],
  },
  {
    slug: "specialist-consultations",
    title: "Specialist Consultations",
    shortDescription: "Fast access to experienced specialists across medicine, pediatrics, and diagnostics.",
    description:
      "Book specialist appointments with confidence through a guided experience that helps you reach the right clinician quickly.",
    meta: "Virtual or in-clinic",
    icon: BrainCircuit,
    highlights: [
      "Access to experienced specialists in core disciplines",
      "Virtual and in-person care options",
      "Clear referral and continuity of care support",
    ],
    benefits: [
      "Faster specialist access for urgent concerns",
      "Transparent availability and scheduling",
      "Care coordination across visits and follow-ups",
    ],
  },
  {
    slug: "diagnostics",
    title: "Diagnostics",
    shortDescription: "Reliable lab tests and imaging support to guide accurate care decisions.",
    description:
      "Diagnostic services provide patients and clinicians with timely answers so care plans can be made with clarity and confidence.",
    meta: "Results shared quickly",
    icon: Microscope,
    highlights: [
      "Blood work, imaging, and routine tests",
      "Quick reporting and follow-up review",
      "Support for early detection and treatment planning",
    ],
    benefits: [
      "Fewer delays in getting actionable results",
      "Patient-friendly explanations of findings",
      "Seamless integration with ongoing care",
    ],
  },
  {
    slug: "medication-support",
    title: "Medication Support",
    shortDescription: "Personalized medication guidance and follow-up plans for better adherence.",
    description:
      "Medication support helps patients stay informed, organized, and comfortable while managing prescriptions and recovery plans.",
    meta: "Refill reminders included",
    icon: Pill,
    highlights: [
      "Medication reviews and refill guidance",
      "Adherence support and treatment reminders",
      "Clear communication around side effects and next steps",
    ],
    benefits: [
      "Greater confidence in daily treatment routines",
      "Reduced uncertainty around prescription plans",
      "Ongoing support between visits",
    ],
  },
];

export const getServiceBySlug = (slug: string) =>
  services.find((service) => service.slug === slug);
