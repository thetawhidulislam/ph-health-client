import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-primary">PH Healthcare</h2>

            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Your trusted healthcare platform. Easily find experienced doctors,
              book appointments, and receive quality medical care anytime,
              anywhere.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>

            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/doctors" className="hover:text-primary">
                  Doctors
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact</h3>

            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />

                <a
                  href="mailto:support@phhealthcare.com"
                  className="hover:text-primary"
                >
                  support@phhealthcare.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />

                <a href="tel:+880123456789" className="hover:text-primary">
                  +880 1234-567890
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />

                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>

            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border p-3 transition hover:bg-primary hover:text-white"
              >
                <FaFacebookF size={18} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border p-3 transition hover:bg-primary hover:text-white"
              >
                <FaLinkedinIn size={18} />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border p-3 transition hover:bg-primary hover:text-white"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} PH Healthcare. All rights reserved.
            </p>

            <div className="flex gap-5 text-sm">
              <Link
                href="/privacy-policy"
                className="text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms-and-conditions"
                className="text-muted-foreground hover:text-primary"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
