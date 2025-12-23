"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import SectionDividerWave from "./SectionDividerWave";

const BOOKING_URL = "https://your-booking-link.com";
const WEBHOOK_ENDPOINT = "https://your-webhook-endpoint.com";

type FormState = "idle" | "loading" | "success" | "error";

const gallery = [
  "/images/IMG_8151.jpg",
  "/images/IMG_5848.jpg",
  "https://images.unsplash.com/photo-1516515658359-702e59da84e7?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1503951914875-1c548999296d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
];

const services = [
  {
    name: "Haircut",
    price: "$50",
    time: "45 min",
  },
  {
    name: "Haircut + Beard",
    price: "$60",
    time: "1 hr",
  },
  {
    name: "Lineup",
    price: "$25",
    time: "20 min",
  },
];

const serviceIcons: Record<string, React.ReactNode> = {
  Haircut: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3.5 12 12m0 0-7 8M12 12l7-8M12 12l7 8" />
      <circle cx="3.5" cy="3.5" r="1.4" />
      <circle cx="19.5" cy="3.5" r="1.4" />
    </svg>
  ),
  "Haircut + Beard": (
    <Image
      src="/360_F_509310851_hZTnlVmEgIO2klAbxiRrsQF8gHM1oTlI.jpg"
      alt="Haircut and Beard"
      width={32}
      height={32}
      className="h-8 w-8 object-contain mix-blend-multiply"
    />
  ),
  "Beard Trim": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 9c1.4 1.6 3.4 2.5 6 2.5s4.6-.9 6-2.5" />
      <path d="M7.5 7.5c.9.9 2.3 1.4 4.5 1.4s3.6-.5 4.5-1.4" />
      <path d="M9 12.2c.8.7 1.7 1 3 1s2.2-.3 3-1" />
    </svg>
  ),
  Lineup: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="h-8 w-8"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Scissors */}
      <path d="M6 4l6 6m0 0-5 5" />
      <circle cx="6" cy="4" r="1.2" fill="#000000" />
      <path d="M18 4l-6 6m0 0 5 5" />
      <circle cx="18" cy="4" r="1.2" fill="#000000" />
      {/* Comb - rectangular handle with teeth */}
      <rect x="10" y="8" width="4" height="2" fill="#000000" />
      <line x1="10.5" y1="10" x2="10.5" y2="18" strokeWidth="1.5" />
      <line x1="11.5" y1="10" x2="11.5" y2="17" strokeWidth="1.5" />
      <line x1="12.5" y1="10" x2="12.5" y2="17" strokeWidth="1.5" />
      <line x1="13.5" y1="10" x2="13.5" y2="18" strokeWidth="1.5" />
    </svg>
  ),
};

const renderServiceIcon = (name: string) => serviceIcons[name] ?? serviceIcons["Haircut"];

const highlights = [
  "Modern fades & precision tapers",
  "Beard sculpting specialists",
  "Family-friendly atmosphere",
  "By-appointment punctuality",
  "Premium products",
  "5-star client care",
];

export default function ClientHome() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      service: formData.get("service"),
      message: formData.get("message"),
      honeypot: formData.get("website"),
    };

    if (payload.honeypot) {
      return; // basic spam trap
    }

    setFormState("loading");
    setMessage("");

    try {
      const res = await fetch(WEBHOOK_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      setFormState("success");
      setMessage("Thanks! We received your request and will confirm shortly.");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setFormState("error");
      setMessage("Something went wrong. Please try again or call us.");
    }
  };

  const serviceOptions = useMemo(
    () =>
      services.map((service) => (
        <option key={service.name} value={service.name}>
          {service.name}
        </option>
      )),
    []
  );

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-glow" />
        <div className="hero-glow-2" />
      </div>

      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-8 px-5 py-4">
          <div className="text-lg font-semibold tracking-tight text-slate-900">
            JBCUTZ
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
            <a className="nav-link" href="#about">
              About
            </a>
            <a className="nav-link" href="#services">
              Services
            </a>
            <a className="nav-link" href="#gallery">
              Gallery
            </a>
            <a className="nav-link" href="#contact">
              Contact
            </a>
            <a
              className="button button-primary"
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
            >
              Book Now
            </a>
          </nav>
        </div>
      </header>

      <main className="relative z-10 flex flex-col gap-20 pb-16 pt-10 md:pt-14">
        <section className="relative w-full overflow-hidden px-0 pb-10 pt-14 text-center md:pb-14 md:pt-20">
          <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-4 px-6">
            <h1 className="brand-title brand-animated text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
              JBCUTZ
            </h1>
            <p className="max-w-2xl text-lg text-slate-600 md:text-xl">
              Modern Cuts. Classic Style. Your next great look starts here.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <a
                className="button button-primary"
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
              >
                Book Now
              </a>
              <a className="button button-ghost" href="#services">
                View Services
              </a>
            </div>
          </div>
          <SectionDividerWave />
        </section>
        <div className="content-container mx-auto flex max-w-6xl flex-col gap-24 px-5">
          <section id="gallery" className="section">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                Gallery
              </h2>
            </div>

            <div className="space-y-6">
              <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-soft">
                <div className="aspect-[3/1.6] w-full overflow-hidden bg-slate-100 flex items-center justify-center">
                  <img
                    src={gallery[galleryIndex]}
                    alt={`Gallery highlight ${galleryIndex + 1}`}
                    className="h-full w-full object-contain transition duration-500"
                  />
                </div>
                <button
                  type="button"
                  aria-label="Previous photo"
                  className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-soft hover:bg-white"
                  onClick={() =>
                    setGalleryIndex(
                      (galleryIndex - 1 + gallery.length) % gallery.length
                    )
                  }
                >
                  ←
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2.5 shadow-soft hover:bg-white"
                  onClick={() => setGalleryIndex((galleryIndex + 1) % gallery.length)}
                >
                  →
                </button>
                <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/80 px-3 py-2 backdrop-blur">
                  {gallery.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      aria-label={`Go to photo ${idx + 1}`}
                      onClick={() => setGalleryIndex(idx)}
                      className={`h-2 w-2 rounded-full ${
                        galleryIndex === idx ? "bg-indigo-600" : "bg-slate-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {gallery.map((src, idx) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setGalleryIndex(idx)}
                    className={`overflow-hidden rounded-2xl border ${
                      galleryIndex === idx
                        ? "border-indigo-500 ring-2 ring-indigo-200"
                        : "border-slate-200"
                    } bg-white shadow-soft transition`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={src}
                        alt={`Gallery haircut ${idx + 1}`}
                        className="h-full w-full object-cover transition duration-500 hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section id="services" className="section">
            <div className="section-heading">
              <p className="eyebrow">Services</p>
              <h2 className="section-title">Tailored cuts, clear pricing</h2>
              <p className="section-lead">
                Transparent pricing with the right time blocked for a flawless finish.
                Choose your service and lock in your slot.
              </p>
            </div>
            <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.name}
                  className="group rounded-3xl border border-slate-200 bg-white/95 px-8 py-8 text-center shadow-strong transition hover:-translate-y-1 hover:shadow-strong"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 text-xl text-indigo-700 shadow-strong">
                    {renderServiceIcon(service.name)}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    {service.name}
                  </h3>
                  <div className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                    <span>{service.time}</span>
                  </div>
                  <p className="mt-4 text-3xl font-bold text-slate-900">
                    {service.price}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <a
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:shadow-strong"
                href="#booking"
              >
                Book Now
              </a>
            </div>
          </section>

          <section id="about" className="section">
            <div className="section-heading">
              <p className="eyebrow">About</p>
              <h2 className="section-title">Your barber, your story</h2>
              <p className="section-lead">
                Drop in a photo on the left and tell your clients who you are on the right.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-[1fr_0.9fr] md:items-center">
              <div className="flex h-full items-center justify-center">
                <div className="flex h-64 w-64 items-center justify-center rounded-full border-2 border-dashed border-slate-300 bg-white shadow-soft">
                  <span className="text-sm font-semibold text-slate-400">
                    Your photo
                  </span>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-soft md:p-6 lg:p-5">
                <h3 className="text-xl font-semibold text-slate-900">Tell your story</h3>
                <p className="mt-3 text-slate-600 text-sm">
                  Use this space to describe yourself, your experience, and what clients can expect.
                </p>
              </div>
            </div>
          </section>

          <section
            id="booking"
            className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 px-8 py-12 text-white shadow-strong"
          >
            <div className="absolute inset-0 opacity-30 mix-blend-overlay">
              <div className="absolute left-10 top-10 h-24 w-24 rounded-full bg-white/30 blur-3xl" />
              <div className="absolute right-10 bottom-8 h-28 w-28 rounded-full bg-white/20 blur-3xl" />
            </div>
            <div className="relative grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div>
                <p className="eyebrow text-white/80">Book Now</p>
                <h2 className="text-3xl font-semibold leading-tight">
                  Ready for your next cut?
                </h2>
                <p className="mt-3 max-w-xl text-white/85">
                  Lock in your time, arrive to a ready chair, and walk out
                  feeling sharp.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    className="button button-light"
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Book your spot
                  </a>
                  <a className="button button-outline-light" href="#services">
                    Browse services
                  </a>
                </div>
              </div>
              <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur">
                <div className="grid grid-cols-3 gap-3 text-center text-sm font-semibold text-white">
                  <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2">
                    On-time
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2">
                    Detail-first
                  </div>
                  <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-2">
                    Clean tools
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="section">
            <div className="section-heading">
              <p className="eyebrow">Contact</p>
              <h2 className="section-title">Have a question? Let’s talk.</h2>
              <p className="section-lead">
                Prefer to book directly? Call or message. Otherwise, send a note
                and we’ll confirm your appointment.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
                <h3 className="text-lg font-semibold text-slate-900">
                  Shop Details
                </h3>
                <div className="space-y-3 text-slate-700">
                  <p>
                    <span className="font-semibold text-slate-900">
                      Phone:
                    </span>{" "}
                    (555) 123-4567
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">
                      Address:
                    </span>{" "}
                    123 Main St, Your City, CA
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">
                      Hours:
                    </span>{" "}
                    Tue-Sat 9am-7pm
                  </p>
                  <a
                    className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-700"
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Reserve now <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-soft">
                <h3 className="text-lg font-semibold text-slate-900">
                  Find us on Google Maps
                </h3>
                <div className="mt-4 aspect-[16/9] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                  {/* Replace the src with your Google Maps embed URL */}
                  <iframe
                    className="h-full w-full"
                    src=""
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Shop location"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-gradient-to-r from-indigo-100 via-indigo-50 to-purple-100 text-slate-800">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-base font-semibold text-slate-900">JBCUTZ</p>
            <p className="text-sm">Modern Cuts. Classic Style.</p>
            <p className="text-sm">123 Main St, Your City, CA</p>
            <p className="text-sm">Tue–Sat · 9am–7pm · (555) 123-4567</p>
          </div>
          <div className="flex flex-col items-center gap-3 md:items-end">
            <div className="flex gap-3 text-sm font-semibold text-indigo-700">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="hover:text-indigo-500">
                Book Now
              </a>
              <span className="text-slate-300">•</span>
              <a href="#services" className="hover:text-indigo-500">
                Services
              </a>
              <span className="text-slate-300">•</span>
              <a href="#contact" className="hover:text-indigo-500">
                Contact
              </a>
            </div>
            <div className="flex gap-3 text-sm text-slate-500">
              <span>Instagram</span>
              <span>•</span>
              <span>TikTok</span>
              <span>•</span>
              <span>Facebook</span>
            </div>
            <p className="text-xs text-slate-500">
              © {new Date().getFullYear()} JBCUTZ. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

