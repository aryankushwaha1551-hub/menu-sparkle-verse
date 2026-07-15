import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles, QrCode, ScanLine, Check, ArrowRight, Utensils,
  Smartphone, Nfc, Palette, Settings2, ClipboardList, PackageCheck,
  RefreshCw, Rocket, Send, Eye, ChefHat, Building2, Hotel, Cake,
  Truck, Store, ShieldCheck, Layers, HandMetal,
} from "lucide-react";

import heroDish from "@/assets/hero-dish.jpg";
import phoneDish from "@/assets/phone-dish.jpg";
import nfcCard from "@/assets/nfc-card.jpg";
import tapNfc from "@/assets/tap-nfc.jpg";
import arTable from "@/assets/ar-table.jpg";
import restaurantInterior from "@/assets/restaurant-interior.jpg";
import ownerAnalytics from "@/assets/owner-analytics.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MenuVerse — Done-for-you 3D & AR Menus for Restaurants" },
      {
        name: "description",
        content:
          "MenuVerse creates a complete interactive 3D & AR menu experience for your restaurant — branded NFC + QR table cards, setup, hosting and maintenance handled by our team.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Delivers />
      <NfcSection />
      <HowItWorks />
      <InteractiveDemo />
      <RestaurantBenefits />
      <Analytics />
      <Packages />
      <TrustSection />
      <FinalCta />
      <ContactForm />
      <Footer />
      <StickyQuote />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const links = [
    { href: "#experience", label: "Experience" },
    { href: "#how", label: "How It Works" },
    { href: "#nfc", label: "NFC + QR" },
    { href: "#packages", label: "Packages" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-[color:var(--background)]/75 border-b border-[color:var(--sage)]/15"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-3.5 md:py-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--peach)]/15 border border-[color:var(--peach)]/30">
            <Utensils className="h-4 w-4 peach-text" />
          </span>
          <span className="font-display text-xl md:text-2xl font-semibold cream-text tracking-wide">
            MenuVerse
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-8 text-sm text-[color:var(--muted-foreground)]">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[color:var(--cream)] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href="#demo" className="hidden sm:block">
            <Button variant="ghost" className="text-[color:var(--cream)] hover:text-[color:var(--peach)]">
              View Demo
            </Button>
          </a>
          <a href="#contact">
            <Button className="bg-[color:var(--peach)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--peach-hover)] rounded-full px-4 md:px-5 font-medium">
              Get a Quote
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 md:pt-40 pb-16 md:pb-24">
      <div className="absolute inset-0 opacity-40 gold-grid-bg" />
      <div className="absolute inset-x-0 top-1/4 h-[520px] bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklab,_var(--peach)_16%,_transparent),_transparent_65%)]" />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-4 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] sage-text mb-5">
            <Sparkles className="h-3 w-3" /> Done-for-you · 3D · AR · NFC + QR
          </div>
          <h1 className="font-display text-[2.4rem] leading-[1.05] sm:text-5xl md:text-6xl xl:text-7xl font-semibold cream-text">
            Let guests <span className="italic peach-text">experience</span> every dish before they order.
          </h1>
          <p className="mx-auto lg:mx-0 mt-6 max-w-xl text-base md:text-lg text-[color:var(--muted-foreground)] leading-relaxed">
            Send us your dish photos and MenuVerse will create your complete interactive 3D and AR menu —
            including branded NFC + QR table cards, setup, hosting and maintenance.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <a href="#contact">
              <Button size="lg" className="bg-[color:var(--peach)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--peach-hover)] gold-glow rounded-full px-7 h-12 text-base font-semibold">
                Get a Quote <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </a>
            <a href="#demo">
              <Button size="lg" variant="outline" className="rounded-full px-7 h-12 text-base border-[color:var(--sage)]/50 text-[color:var(--cream)] hover:bg-[color:var(--sage)]/10 bg-transparent">
                View Live Demo
              </Button>
            </a>
          </div>
          <p className="mt-5 text-xs uppercase tracking-[0.2em] text-[color:var(--muted-foreground)]">
            Done-for-you setup · No technical work required
          </p>
        </div>

        <HeroCollage />
      </div>
    </section>
  );
}

function HeroCollage() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] aspect-[5/6] lg:aspect-[6/7]">
      {/* Dish photo */}
      <div className="absolute left-0 top-0 w-[62%] rounded-3xl overflow-hidden border border-[color:var(--sage)]/25 shadow-2xl">
        <img src={heroDish} alt="Signature restaurant dish" width={800} height={800} className="w-full h-auto object-cover anim-float" />
      </div>
      {/* Phone showing interactive dish */}
      <div className="absolute right-0 top-[18%] w-[46%] rounded-[28px] overflow-hidden border border-[color:var(--sage)]/30 shadow-2xl sage-glow">
        <img src={phoneDish} alt="Smartphone showing the interactive MenuVerse dish" width={512} height={640} loading="lazy" className="w-full h-auto object-cover" />
      </div>
      {/* NFC card */}
      <div className="absolute left-[6%] bottom-0 w-[54%] rounded-2xl overflow-hidden border border-[color:var(--sage)]/25 shadow-xl">
        <img src={nfcCard} alt="Branded MenuVerse NFC and QR table card" width={640} height={480} loading="lazy" className="w-full h-auto object-cover" />
      </div>
      {/* Flow arrow chip */}
      <div className="absolute right-[4%] bottom-[4%] glass rounded-full px-3 py-1.5 text-[10px] uppercase tracking-widest sage-text flex items-center gap-1.5">
        <ScanLine className="h-3 w-3" /> Tap · Scan · Explore
      </div>
    </div>
  );
}

/* ---------------- WHAT WE DELIVER ---------------- */
function Delivers() {
  const items = [
    { icon: ChefHat,    title: "Interactive Signature Dishes", desc: "Guests can rotate, zoom and explore selected dishes before ordering." },
    { icon: Palette,    title: "Branded Digital Menu",         desc: "A premium menu experience designed around your restaurant's identity." },
    { icon: Nfc,        title: "NFC + QR Table Cards",         desc: "Guests simply tap or scan to open the experience instantly." },
    { icon: Settings2,  title: "Setup and Maintenance",        desc: "We handle launch, hosting, updates and ongoing support." },
  ];
  return (
    <section id="experience" className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center mb-14">
        <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">What MenuVerse delivers</p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold cream-text">
          Everything your restaurant needs, <span className="italic peach-text">handled by us.</span>
        </h2>
      </div>
      <div className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <div key={it.title} className="glass rounded-3xl p-6 md:p-7 transition-all hover:-translate-y-1 hover:sage-glow flex flex-col">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--sage)]/15 sage-text mb-5 border border-[color:var(--sage)]/25">
              <it.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-xl cream-text mb-2">{it.title}</h3>
            <p className="text-sm text-[color:var(--muted-foreground)] leading-relaxed flex-1">{it.desc}</p>
            {i === 0 && (
              <div className="mt-5 rounded-xl overflow-hidden border border-[color:var(--sage)]/20">
                <img src={heroDish} alt="Signature dish preview" width={400} height={220} loading="lazy" className="w-full h-28 object-cover" />
              </div>
            )}
            {i === 1 && (
              <div className="mt-5 rounded-xl overflow-hidden border border-[color:var(--sage)]/20">
                <img src={phoneDish} alt="Branded digital menu preview" width={400} height={220} loading="lazy" className="w-full h-28 object-cover" />
              </div>
            )}
            {i === 2 && (
              <div className="mt-5 rounded-xl overflow-hidden border border-[color:var(--sage)]/20">
                <img src={nfcCard} alt="NFC and QR card preview" width={400} height={220} loading="lazy" className="w-full h-28 object-cover" />
              </div>
            )}
            {i === 3 && (
              <div className="mt-5 rounded-xl overflow-hidden border border-[color:var(--sage)]/20">
                <img src={restaurantInterior} alt="Restaurant setup" width={400} height={220} loading="lazy" className="w-full h-28 object-cover" />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- NFC + QR SECTION ---------------- */
function NfcSection() {
  const bullets = [
    "No app download required",
    "Works directly from the guest's phone",
    "Designed to match your restaurant's branding",
    "QR backup included on every card",
    "Menu can be updated without reprinting cards",
  ];
  return (
    <section id="nfc" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklab,_var(--sage)_14%,_transparent),_transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">Branded NFC + QR table cards</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold cream-text">
              One tap. One scan. <span className="italic peach-text">A completely new menu experience.</span>
            </h2>
            <p className="mt-5 text-[color:var(--muted-foreground)] text-base md:text-lg leading-relaxed">
              Place a branded MenuVerse card on every table. Guests can tap using NFC or scan the QR code
              to instantly explore your restaurant's signature dishes.
            </p>
            <ul className="mt-7 grid sm:grid-cols-2 gap-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm text-[color:var(--cream)]/90">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--sage)]/20 border border-[color:var(--sage)]/40 sage-text">
                    <Check className="h-3 w-3" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 rounded-3xl overflow-hidden border border-[color:var(--sage)]/25 shadow-xl">
              <img src={tapNfc} alt="Guest tapping phone on branded NFC table card" width={1280} height={720} loading="lazy" className="w-full h-auto object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden border border-[color:var(--sage)]/25">
              <img src={nfcCard} alt="Front of branded MenuVerse table card" width={640} height={480} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-3xl overflow-hidden border border-[color:var(--sage)]/25 sage-glow">
              <img src={phoneDish} alt="Interactive menu opening on the phone" width={640} height={480} loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    { icon: Send,          n: "01", title: "Send Your Details",     desc: "Share your restaurant information, menu, and clear photos of the dishes you want to feature." },
    { icon: PackageCheck,  n: "02", title: "Choose Your Package",   desc: "Select the number of dishes and table cards required, then confirm the project." },
    { icon: ChefHat,       n: "03", title: "We Create Everything",  desc: "Our team prepares your complete branded interactive menu experience." },
    { icon: Eye,           n: "04", title: "Review and Approve",    desc: "You review the menu and request any necessary corrections before launch." },
    { icon: Rocket,        n: "05", title: "Launch at Your Restaurant", desc: "We provide the NFC + QR cards and activate the complete experience." },
  ];
  return (
    <section id="how" className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center mb-14">
        <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">How it works</p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold cream-text">
          From your dish photos to a <span className="italic peach-text">launched experience.</span>
        </h2>
      </div>

      <ol className="relative">
        {/* vertical line on md+ */}
        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 bottom-2 w-px bg-[color:var(--sage)]/25" />
        <div className="space-y-6 md:space-y-14">
          {steps.map((s, i) => (
            <li
              key={s.n}
              className={`relative grid md:grid-cols-2 gap-6 md:gap-14 items-center ${
                i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="glass rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[color:var(--peach)]/12 peach-text border border-[color:var(--peach)]/30">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="font-display text-4xl peach-text opacity-70">{s.n}</div>
                </div>
                <h3 className="mt-5 font-display text-2xl cream-text">{s.title}</h3>
                <p className="mt-2 text-[color:var(--muted-foreground)] leading-relaxed">{s.desc}</p>
              </div>
              <div className="hidden md:flex items-center justify-center">
                <span className="h-3 w-3 rounded-full bg-[color:var(--peach)] shadow-[0_0_0_6px_color-mix(in_oklab,var(--peach)_20%,transparent)]" />
              </div>
            </li>
          ))}
        </div>
      </ol>
    </section>
  );
}

/* ---------------- INTERACTIVE DEMO ---------------- */
function InteractiveDemo() {
  return (
    <section id="demo" className="relative mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">Interactive demo</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold cream-text">
            See what your <span className="italic peach-text">guests will experience.</span>
          </h2>
          <p className="mt-5 text-[color:var(--muted-foreground)] md:text-lg leading-relaxed">
            A sample interactive dish, exactly as your guests would see it after tapping or scanning
            a MenuVerse table card.
          </p>
          <ul className="mt-6 space-y-3 text-sm md:text-base">
            {[
              "Rotate and zoom to inspect the plate",
              "View the dish on your table in AR",
              "See ingredients, dietary info and price",
              "Restaurant branding throughout",
            ].map((l) => (
              <li key={l} className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--sage)]/20 border border-[color:var(--sage)]/40 sage-text">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-[color:var(--cream)]/90">{l}</span>
              </li>
            ))}
          </ul>
        </div>

        <DemoCard />
      </div>
    </section>
  );
}

function DemoCard() {
  return (
    <div className="glass rounded-[28px] p-4 md:p-5 relative">
      <div className="absolute -top-3 left-5 rounded-full bg-[color:var(--sage)]/20 border border-[color:var(--sage)]/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] sage-text">
        Sample guest experience
      </div>

      {/* Dish stage */}
      <div className="relative rounded-2xl overflow-hidden bg-[color:var(--surface)] aspect-[4/3]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklab,_var(--peach)_18%,_transparent),_transparent_65%)]" />
        <img
          src={heroDish}
          alt="Sample signature dish rotating in 3D"
          width={1280} height={960} loading="lazy"
          className="absolute inset-0 w-full h-full object-cover anim-float"
        />
        {/* rotate control */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-[color:var(--cream)]">
          <RefreshCw className="h-3.5 w-3.5 sage-text" /> Drag to rotate · pinch to zoom
        </div>
      </div>

      {/* Meta */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-[11px] uppercase tracking-widest sage-text">Aurum Restaurant</div>
          <h3 className="font-display text-2xl cream-text truncate">Malai Butter Chicken</h3>
          <p className="text-sm text-[color:var(--muted-foreground)] mt-1">
            Tandoor-roasted chicken in a slow-cooked cashew, tomato and cream gravy, finished with kasuri methi.
          </p>
        </div>
        <div className="shrink-0 text-right">
          <div className="font-display text-2xl peach-text">₹ 620</div>
          <div className="mt-1 flex flex-wrap justify-end gap-1.5 text-[10px]">
            <span className="px-2 py-0.5 rounded-full border border-[color:var(--sage)]/40 sage-text">Chef's Pick</span>
            <span className="px-2 py-0.5 rounded-full border border-[color:var(--sage)]/40 sage-text">Mild</span>
          </div>
        </div>
      </div>

      <a href="#contact" className="mt-5 block">
        <Button className="w-full h-11 rounded-full bg-[color:var(--peach)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--peach-hover)] font-semibold">
          <Smartphone className="h-4 w-4 mr-2" /> View on your table
        </Button>
      </a>
    </div>
  );
}

/* ---------------- RESTAURANT BENEFITS ---------------- */
function RestaurantBenefits() {
  const items = [
    "Help guests understand the dish before ordering",
    "Give premium dishes greater visibility",
    "Create a modern and memorable restaurant experience",
    "Reduce uncertainty around portion size and presentation",
    "Update menu details without reprinting the full menu",
    "See which dishes attract the most guest interest",
  ];
  return (
    <section className="relative mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="relative rounded-3xl overflow-hidden border border-[color:var(--sage)]/25 shadow-2xl">
          <img src={arTable} alt="Signature dish appearing on the table in AR" width={1280} height={1024} loading="lazy" className="w-full h-auto object-cover" />
          <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[color:var(--background)] via-[color:var(--background)]/60 to-transparent">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest sage-text">
              <HandMetal className="h-3.5 w-3.5" /> AR on the guest's own table
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">Restaurant benefits</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold cream-text">
            Turn signature dishes into your <span className="italic peach-text">strongest sales experience.</span>
          </h2>
          <ul className="mt-8 grid sm:grid-cols-2 gap-3.5">
            {items.map((b) => (
              <li key={b} className="flex items-start gap-3 rounded-2xl border border-[color:var(--sage)]/20 bg-[color:var(--surface)]/60 p-4">
                <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color:var(--sage)]/20 border border-[color:var(--sage)]/40 sage-text">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-[color:var(--cream)]/90 leading-relaxed">{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ANALYTICS ---------------- */
function Analytics() {
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="order-2 lg:order-1">
          <div className="rounded-3xl overflow-hidden border border-[color:var(--sage)]/25 shadow-2xl">
            <img src={ownerAnalytics} alt="Restaurant owner viewing MenuVerse analytics" width={1280} height={1024} loading="lazy" className="w-full h-auto object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            {[
              { k: "NFC taps + QR scans", v: "Live" },
              { k: "Top dishes", v: "Ranked" },
              { k: "Device split", v: "iOS / Android" },
            ].map((m) => (
              <div key={m.k} className="rounded-2xl border border-[color:var(--sage)]/25 bg-[color:var(--card)]/60 p-3">
                <div className="text-[10px] uppercase tracking-widest text-[color:var(--muted-foreground)]">{m.k}</div>
                <div className="mt-1 font-display text-base cream-text">{m.v}</div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-[color:var(--muted-foreground)] italic">
            Sample dashboard preview. MenuVerse provides and maintains this system for your restaurant.
          </p>
        </div>

        <div className="order-1 lg:order-2">
          <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">Analytics</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold cream-text">
            Understand what catches <span className="italic peach-text">your guests' attention.</span>
          </h2>
          <p className="mt-5 text-[color:var(--muted-foreground)] md:text-lg leading-relaxed">
            See how guests engage with your menu — which dishes they open, when they open them, and
            from which devices. We take care of the setup, hosting and reporting.
          </p>
          <ul className="mt-7 grid gap-2.5">
            {[
              "Total NFC taps and QR scans",
              "Most viewed dishes",
              "Popular viewing times",
              "Device breakdown",
              "Individual dish engagement",
            ].map((f) => (
              <li key={f} className="flex items-start gap-3 text-sm text-[color:var(--cream)]/90">
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--sage)]/20 border border-[color:var(--sage)]/40 sage-text">
                  <Check className="h-3 w-3" />
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PACKAGES ---------------- */
function Packages() {
  const plans = [
    {
      name: "Signature Experience",
      tagline: "Perfect for a focused, standout menu",
      features: [
        "Up to 5 signature dishes",
        "Branded interactive menu",
        "NFC + QR table cards",
        "Setup and launch",
        "Hosting and support",
      ],
      cta: "Request Quote",
    },
    {
      name: "Restaurant Showcase",
      tagline: "Most restaurants start here",
      popular: true,
      features: [
        "Up to 10 signature dishes",
        "Custom restaurant branding",
        "Additional NFC + QR cards",
        "Analytics access",
        "Priority updates",
      ],
      cta: "Request Quote",
    },
    {
      name: "Custom Experience",
      tagline: "For groups and multi-location brands",
      features: [
        "More dishes or multiple locations",
        "Custom card quantity",
        "Advanced branding",
        "Custom integrations",
        "Dedicated support",
      ],
      cta: "Contact Us",
    },
  ];
  return (
    <section id="packages" className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center mb-12">
        <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">Packages</p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold cream-text">
          Choose a package. <span className="italic peach-text">We handle everything.</span>
        </h2>
      </div>
      <div className="grid gap-5 md:gap-6 md:grid-cols-3 items-stretch">
        {plans.map((p) => (
          <div
            key={p.name}
            className={`relative flex flex-col rounded-3xl p-7 md:p-8 border transition-all ${
              p.popular
                ? "bg-[color:var(--card)] border-[color:var(--peach)]/50 gold-glow"
                : "bg-[color:var(--surface)]/70 border-[color:var(--sage)]/25 hover:border-[color:var(--sage)]/45"
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[color:var(--peach)] px-3 py-1 text-[10px] font-semibold text-[color:var(--primary-foreground)] uppercase tracking-[0.18em]">
                Most Popular
              </div>
            )}
            <h3 className="font-display text-2xl cream-text">{p.name}</h3>
            <p className="mt-1.5 text-sm text-[color:var(--muted-foreground)]">{p.tagline}</p>
            <div className="mt-5 rounded-xl bg-[color:var(--background)]/60 border border-[color:var(--sage)]/20 px-4 py-3">
              <div className="text-[11px] uppercase tracking-widest sage-text">Custom pricing</div>
              <div className="mt-1 font-display text-lg peach-text">Tailored to your restaurant</div>
            </div>
            <ul className="mt-6 space-y-3 text-sm flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5">
                  <Check className="h-4 w-4 mt-0.5 sage-text shrink-0" />
                  <span className="text-[color:var(--cream)]/90">{f}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="mt-8">
              <Button
                className={`w-full rounded-full h-11 font-semibold ${
                  p.popular
                    ? "bg-[color:var(--peach)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--peach-hover)]"
                    : "bg-transparent text-[color:var(--cream)] border border-[color:var(--sage)]/50 hover:bg-[color:var(--sage)]/10"
                }`}
              >
                {p.cta}
              </Button>
            </a>
          </div>
        ))}
      </div>
      <p className="mt-8 text-center text-sm text-[color:var(--muted-foreground)]">
        Pricing depends on the number of dishes, locations, table cards and required customisation.
      </p>
    </section>
  );
}

/* ---------------- TRUST ---------------- */
function TrustSection() {
  const kinds = [
    { icon: Store,     label: "Premium cafés" },
    { icon: Utensils,  label: "Restaurants" },
    { icon: Hotel,     label: "Hotels and resorts" },
    { icon: Cake,      label: "Bakeries & dessert studios" },
    { icon: Truck,     label: "Cloud kitchens" },
    { icon: Building2, label: "Restaurant groups" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-24">
      <div className="mx-auto max-w-2xl text-center mb-10">
        <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">Built for</p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold cream-text">
          Designed for modern <span className="italic peach-text">hospitality businesses.</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {kinds.map((k) => (
          <div key={k.label} className="flex flex-col items-center text-center gap-2.5 rounded-2xl border border-[color:var(--sage)]/25 bg-[color:var(--surface)]/60 p-5 hover:sage-glow transition-all">
            <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--sage)]/15 sage-text border border-[color:var(--sage)]/25">
              <k.icon className="h-5 w-5" />
            </div>
            <div className="text-sm cream-text">{k.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-[color:var(--muted-foreground)] italic">
        Sample categories. Client work will be published here as it launches.
      </p>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCta() {
  return (
    <section className="relative mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-28">
      <div className="relative overflow-hidden rounded-[2rem] border border-[color:var(--sage)]/25 bg-[color:var(--card)] p-8 md:p-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_color-mix(in_oklab,_var(--peach)_20%,_transparent),_transparent_65%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr] items-center">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-semibold cream-text leading-[1.05]">
              Your guests should not have to <span className="italic peach-text">imagine the dish.</span>
            </h2>
            <p className="mt-3 font-display text-2xl md:text-3xl cream-text">Let them experience it.</p>
            <p className="mt-5 text-[color:var(--muted-foreground)] md:text-lg leading-relaxed max-w-xl">
              Send us your menu and dish photos. We'll create and launch the complete MenuVerse experience for your restaurant.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#contact">
                <Button size="lg" className="bg-[color:var(--peach)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--peach-hover)] gold-glow rounded-full px-7 h-12 text-base font-semibold">
                  Get a Quote <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
              <a href="#demo">
                <Button size="lg" variant="outline" className="rounded-full px-7 h-12 text-base border-[color:var(--sage)]/50 text-[color:var(--cream)] hover:bg-[color:var(--sage)]/10 bg-transparent">
                  View Demo
                </Button>
              </a>
            </div>
          </div>
          <div className="relative aspect-[5/4]">
            <div className="absolute left-0 top-0 w-[70%] rounded-2xl overflow-hidden border border-[color:var(--sage)]/25">
              <img src={heroDish} alt="Premium signature dish" width={720} height={720} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute right-0 top-[15%] w-[46%] rounded-[24px] overflow-hidden border border-[color:var(--sage)]/25 sage-glow">
              <img src={phoneDish} alt="Phone showing dish" width={480} height={600} loading="lazy" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-[8%] bottom-0 w-[52%] rounded-2xl overflow-hidden border border-[color:var(--sage)]/25">
              <img src={nfcCard} alt="Branded NFC and QR card" width={640} height={480} loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT FORM ---------------- */
function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="mx-auto max-w-5xl px-4 md:px-6 py-20 md:py-28">
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">Request a quote</p>
        <h2 className="font-display text-3xl md:text-5xl font-semibold cream-text">
          Tell us about your <span className="italic peach-text">restaurant.</span>
        </h2>
        <p className="mt-4 text-[color:var(--muted-foreground)] md:text-lg">
          Share your details and menu — we'll come back with a tailored proposal.
        </p>
      </div>

      {sent ? (
        <div className="glass rounded-3xl p-10 text-center">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--sage)]/15 sage-text border border-[color:var(--sage)]/40">
            <Check className="h-5 w-5" />
          </div>
          <h3 className="mt-4 font-display text-2xl cream-text">Thank you — request received.</h3>
          <p className="mt-2 text-[color:var(--muted-foreground)]">
            The MenuVerse team will reach out shortly to discuss your restaurant.
          </p>
        </div>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="glass rounded-3xl p-6 md:p-8 grid gap-4 md:grid-cols-2"
        >
          <Field label="Restaurant name" name="restaurant" required />
          <Field label="Contact person" name="contact" required />
          <Field label="Phone number" name="phone" type="tel" required />
          <Field label="Email address" name="email" type="email" required />
          <Field label="City" name="city" required />
          <SelectField label="Restaurant type" name="type" options={["Restaurant", "Café", "Hotel / Resort", "Bakery / Dessert studio", "Cloud kitchen", "Restaurant group"]} />
          <Field label="Number of dishes to feature" name="dishes" type="number" placeholder="e.g. 8" />
          <Field label="Approximate number of tables" name="tables" type="number" placeholder="e.g. 20" />
          <FileField label="Menu upload (PDF, image)" name="menu" accept=".pdf,image/*" />
          <FileField label="Dish photos (multiple)" name="dishPhotos" accept="image/*" multiple />
          <SelectField label="Preferred package" name="pkg" options={["Signature Experience", "Restaurant Showcase", "Custom Experience", "Not sure — please advise"]} />
          <div className="md:col-span-2">
            <label className="block text-sm text-[color:var(--cream)]/90 mb-1.5">Message</label>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded-xl bg-[color:var(--background)]/70 border border-[color:var(--sage)]/25 focus:border-[color:var(--peach)]/60 outline-none px-3.5 py-2.5 text-sm cream-text placeholder:text-[color:var(--muted-foreground)]"
              placeholder="Anything you'd like us to know about your restaurant, brand or menu."
            />
          </div>
          <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center gap-4 sm:justify-between">
            <p className="text-xs text-[color:var(--muted-foreground)] flex items-start gap-2">
              <ShieldCheck className="h-3.5 w-3.5 mt-0.5 sage-text shrink-0" />
              Your files are used only to assess and prepare your restaurant project.
            </p>
            <Button type="submit" size="lg" className="bg-[color:var(--peach)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--peach-hover)] gold-glow rounded-full px-7 h-12 font-semibold">
              Request My MenuVerse Quote
            </Button>
          </div>
        </form>
      )}
    </section>
  );
}

function Field(props: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const { label, ...rest } = props;
  return (
    <div>
      <label className="block text-sm text-[color:var(--cream)]/90 mb-1.5">{label}</label>
      <input
        {...rest}
        className="w-full rounded-xl bg-[color:var(--background)]/70 border border-[color:var(--sage)]/25 focus:border-[color:var(--peach)]/60 outline-none px-3.5 py-2.5 text-sm cream-text placeholder:text-[color:var(--muted-foreground)]"
      />
    </div>
  );
}

function SelectField({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <div>
      <label className="block text-sm text-[color:var(--cream)]/90 mb-1.5">{label}</label>
      <select
        name={name}
        defaultValue=""
        className="w-full rounded-xl bg-[color:var(--background)]/70 border border-[color:var(--sage)]/25 focus:border-[color:var(--peach)]/60 outline-none px-3.5 py-2.5 text-sm cream-text"
      >
        <option value="" disabled>Select…</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function FileField({ label, name, accept, multiple }: { label: string; name: string; accept?: string; multiple?: boolean }) {
  return (
    <div>
      <label className="block text-sm text-[color:var(--cream)]/90 mb-1.5">{label}</label>
      <div className="rounded-xl border border-dashed border-[color:var(--sage)]/40 bg-[color:var(--background)]/50 px-3.5 py-3 flex items-center gap-3">
        <ClipboardList className="h-4 w-4 sage-text shrink-0" />
        <input
          type="file"
          name={name}
          accept={accept}
          multiple={multiple}
          className="text-xs text-[color:var(--muted-foreground)] file:mr-3 file:rounded-full file:border-0 file:bg-[color:var(--sage)]/20 file:px-3 file:py-1.5 file:text-xs file:font-medium file:cream-text hover:file:bg-[color:var(--sage)]/30 cursor-pointer w-full"
        />
      </div>
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-[color:var(--sage)]/20 mt-4">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid gap-6 md:grid-cols-3 items-center">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--peach)]/15 border border-[color:var(--peach)]/30">
            <Utensils className="h-4 w-4 peach-text" />
          </span>
          <span className="font-display text-xl font-semibold cream-text">MenuVerse</span>
        </div>
        <nav className="flex flex-wrap justify-center gap-5 text-sm text-[color:var(--muted-foreground)]">
          <a href="#experience" className="hover:text-[color:var(--cream)]">Experience</a>
          <a href="#how" className="hover:text-[color:var(--cream)]">How It Works</a>
          <a href="#nfc" className="hover:text-[color:var(--cream)]">NFC + QR</a>
          <a href="#packages" className="hover:text-[color:var(--cream)]">Packages</a>
          <a href="#contact" className="hover:text-[color:var(--cream)]">Contact</a>
        </nav>
        <p className="text-xs md:text-sm text-[color:var(--muted-foreground)] md:text-right">
          © {new Date().getFullYear()} MenuVerse · Crafted for hospitality.
        </p>
      </div>
    </footer>
  );
}

/* ---------------- Sticky mobile CTA ---------------- */
function StickyQuote() {
  return (
    <div className="lg:hidden fixed bottom-3 inset-x-3 z-40">
      <a href="#contact" className="block">
        <Button className="w-full h-12 rounded-full bg-[color:var(--peach)] text-[color:var(--primary-foreground)] hover:bg-[color:var(--peach-hover)] gold-glow font-semibold shadow-2xl">
          Get a Quote
        </Button>
      </a>
    </div>
  );
}

/* silence unused imports if any icons drop later */
export const _icons = { Layers };