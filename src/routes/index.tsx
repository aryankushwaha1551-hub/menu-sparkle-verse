import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Sparkles, QrCode, ScanLine, BarChart3, Check, ArrowRight,
  Utensils, Smartphone, Eye, TrendingUp, Clock, Leaf,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-3 md:py-4">
          <Link to="/" className="font-display text-xl md:text-2xl font-semibold peach-text tracking-wide">
            MenuVerse
          </Link>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#benefits" className="transition-colors hover:text-foreground">Benefits</a>
            <a href="#demo" className="transition-colors hover:text-foreground">Live demo</a>
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#analytics" className="transition-colors hover:text-foreground">Analytics</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-1 md:gap-2">
            <Link to="/auth" className="hidden sm:block">
              <Button variant="ghost" className="text-foreground hover:text-primary">Sign in</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-primary text-primary-foreground hover:opacity-90 gold-glow rounded-full px-4 md:px-5">
                Start free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pt-32 md:pt-36 pb-16 md:pb-24">
        <div className="absolute inset-0 gold-grid-bg opacity-30" />
        <div className="absolute inset-x-0 top-1/3 -translate-y-1/2 h-[520px] bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklab,_var(--peach)_18%,_transparent),_transparent_65%)]" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 md:px-6 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div className="text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-[11px] uppercase tracking-[0.18em] peach-text">
              <Sparkles className="h-3 w-3" /> 3D · AR · QR menus for India
            </div>
            <h1 className="font-display text-[2.5rem] leading-[1.05] sm:text-5xl md:text-6xl xl:text-7xl font-semibold">
              Every dish, <span className="italic peach-text">served</span> in 3D — before it hits the table.
            </h1>
            <p className="mx-auto lg:mx-0 mt-5 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Guests scan a QR, spin your dish in photoreal 3D, and place it on their own table in AR.
              Built for restaurants, cafés, hotels and cloud kitchens across India.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <Link to="/auth">
                <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 gold-glow rounded-full px-7 h-12 text-base">
                  Start free <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <a href="#demo">
                <Button size="lg" variant="outline" className="rounded-full px-7 h-12 text-base border-[color:var(--sage)]/50 text-foreground hover:bg-[color:var(--sage)]/10">
                  See a live dish
                </Button>
              </a>
            </div>
            <p className="mt-5 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              No credit card · Live in 5 minutes · Works on every phone
            </p>
          </div>

          <HeroDemo />
        </div>
      </section>

      {/* PRODUCT BENEFITS */}
      <section id="benefits" className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">Why MenuVerse</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold">Menus that sell themselves.</h2>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Diners order more of what they can actually see. Here's what changes on day one.
          </p>
        </div>
        <div className="grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: TrendingUp, stat: "+38%", label: "Higher ticket size", desc: "3D previews shift diners toward premium plates and signature dishes." },
            { icon: Clock, stat: "2 min", label: "Faster ordering", desc: "No questions, no callbacks — guests decide the moment they scan." },
            { icon: Leaf, stat: "0", label: "App downloads needed", desc: "AR runs directly in Safari and Chrome. Just scan and place." },
          ].map((b) => (
            <div key={b.label} className="glass rounded-3xl p-6 md:p-7 transition-all hover:-translate-y-1 hover:sage-glow">
              <div className="flex items-center justify-between">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--sage)]/15 sage-text">
                  <b.icon className="h-5 w-5" />
                </div>
                <div className="font-display text-3xl md:text-4xl peach-text">{b.stat}</div>
              </div>
              <h3 className="mt-5 text-lg font-semibold cream-text">{b.label}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE 3D DEMO */}
      <section id="demo" className="relative mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">Live 3D menu</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold">
              Spin it. Zoom it. <span className="italic peach-text">Almost taste it.</span>
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg leading-relaxed">
              Every dish becomes an interactive model. Guests inspect garnishes, portion size and
              plating from every angle — the way they'd survey a real table.
            </p>
            <ul className="mt-6 space-y-3 text-sm md:text-base">
              {[
                "Photoreal GLB / USDZ models via Cloudinary",
                "Drag to rotate, pinch to zoom — on any phone",
                "Native AR: place the dish on the guest's real table",
                "One-tap 'Order on WhatsApp' from every dish",
              ].map((l) => (
                <li key={l} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[color:var(--sage)]/20 sage-text">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/90">{l}</span>
                </li>
              ))}
            </ul>
          </div>

          <DemoTurntable />
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">Setup</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold">Three steps to a scannable menu.</h2>
        </div>
        <div className="grid gap-5 md:gap-6 md:grid-cols-3">
          {[
            { n: "01", icon: Utensils, title: "Upload your dish", desc: "Paste a Cloudinary link to your 3D model — GLB for Android, USDZ for iPhone." },
            { n: "02", icon: QrCode,   title: "Print the QR", desc: "A unique, brand-styled QR is generated for every dish. Ready for menus, table tents and posters." },
            { n: "03", icon: Smartphone, title: "Guests scan & explore", desc: "The dish opens instantly in 3D — no app, no login. AR is one tap away." },
          ].map((s) => (
            <div key={s.n} className="glass rounded-3xl p-7 md:p-8 relative overflow-hidden">
              <div className="font-display text-[5.5rem] md:text-[6.5rem] leading-none font-semibold opacity-10 peach-text absolute -top-3 right-4 select-none">
                {s.n}
              </div>
              <div className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[color:var(--sage)]/15 sage-text mb-5">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="relative font-display text-xl md:text-2xl font-semibold">{s.title}</h3>
              <p className="relative mt-2 text-sm md:text-base text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RESTAURANT ANALYTICS */}
      <section id="analytics" className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <AnalyticsPreview />
          <div className="order-first lg:order-last">
            <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">Analytics</p>
            <h2 className="font-display text-3xl md:text-5xl font-semibold">
              See <span className="italic peach-text">what's being craved</span> — in real time.
            </h2>
            <p className="mt-4 text-muted-foreground md:text-lg leading-relaxed">
              Track every scan, every 3D spin, every AR placement. Discover which dishes drive
              orders and which ones need better plating — before Friday service.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { k: "Scans / day", v: "1,284" },
                { k: "Top dish", v: "Butter Chicken" },
                { k: "AR views", v: "62%" },
              ].map((m) => (
                <div key={m.k} className="rounded-2xl border border-[color:var(--sage)]/25 bg-card/40 p-3">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.k}</div>
                  <div className="mt-1 font-display text-base md:text-lg cream-text">{m.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-24">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <p className="text-xs uppercase tracking-[0.22em] sage-text mb-3">Pricing</p>
          <h2 className="font-display text-3xl md:text-5xl font-semibold">Simple plans. Priced in ₹.</h2>
          <p className="mt-4 text-muted-foreground md:text-lg">Choose the plan that fits your kitchen. Upgrade or cancel any time.</p>
        </div>
        <div className="grid gap-5 md:gap-6 md:grid-cols-3 items-stretch">
          {[
            { name: "Starter", price: "999", dishes: "Up to 10 dishes", features: ["QR generation", "3D & AR viewer", "Basic analytics", "Email support"] },
            { name: "Professional", price: "2,499", dishes: "Up to 50 dishes", popular: true, features: ["Everything in Starter", "Priority AR rendering", "Advanced analytics", "Custom branding", "Priority support"] },
            { name: "Enterprise", price: "4,999", dishes: "Unlimited dishes", features: ["Everything in Pro", "Multi-location", "Dedicated manager", "API access", "Uptime SLA"] },
          ].map((p) => (
            <div
              key={p.name}
              className={`glass rounded-3xl p-7 md:p-8 relative flex flex-col ${p.popular ? "gold-glow border-[color:var(--peach)]/50" : ""}`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[10px] font-semibold text-primary-foreground uppercase tracking-[0.18em]">
                  Most popular
                </div>
              )}
              <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
              <div className="mt-4">
                <span className="text-4xl md:text-5xl font-semibold peach-text font-display">₹{p.price}</span>
                <span className="text-muted-foreground text-sm">/month</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.dishes}</p>
              <ul className="mt-6 space-y-3 text-sm flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 mt-0.5 sage-text shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/auth" className="mt-8">
                <Button
                  className={`w-full rounded-full h-11 ${
                    p.popular
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-secondary text-foreground border border-[color:var(--sage)]/40 hover:bg-[color:var(--sage)]/10"
                  }`}
                >
                  Get started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative mx-auto max-w-6xl px-4 md:px-6 py-20 md:py-24">
        <div className="relative overflow-hidden rounded-[2rem] glass p-8 md:p-14 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklab,_var(--peach)_20%,_transparent),_transparent_65%)]" />
          <div className="relative">
            <h2 className="font-display text-3xl md:text-5xl font-semibold">
              Ready to plate up your <span className="italic peach-text">first 3D menu?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground md:text-lg">
              Set up your restaurant, upload your first dish and print the QR — all before lunch service.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/auth">
                <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 gold-glow rounded-full px-8 h-12 text-base">
                  Create my restaurant <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <a href="#demo">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-12 text-base border-[color:var(--sage)]/50 hover:bg-[color:var(--sage)]/10">
                  Try the live demo
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[color:var(--sage)]/20 mt-4">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl font-semibold peach-text">MenuVerse</div>
          <nav className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
            <a href="#benefits" className="hover:text-foreground">Benefits</a>
            <a href="#demo" className="hover:text-foreground">Demo</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <Link to="/auth" className="hover:text-foreground">Sign in</Link>
          </nav>
          <p className="text-xs md:text-sm text-muted-foreground">
            © {new Date().getFullYear()} MenuVerse · Crafted for hospitality.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Hero product demo: dish + QR + AR-on-table ---------- */
function HeroDemo() {
  return (
    <div className="relative mx-auto w-full max-w-[540px] aspect-square">
      {/* soft floor glow */}
      <div className="absolute inset-x-8 bottom-8 h-40 rounded-full bg-[radial-gradient(ellipse_at_center,_color-mix(in_oklab,_var(--peach)_28%,_transparent),_transparent_70%)] blur-2xl" />

      {/* Central 3D dish */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[54%] anim-float">
        <PlateSVG size={320} />
      </div>

      {/* QR card — top-left */}
      <div className="absolute left-0 top-6 md:top-10 rotate-[-6deg] glass rounded-2xl p-3 md:p-4 w-[130px] md:w-[160px] shadow-xl">
        <div className="relative rounded-lg overflow-hidden bg-[color:var(--cream)] p-2">
          <QRSVG className="w-full h-auto" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[color:var(--peach)]/60 via-[color:var(--peach)]/10 to-transparent anim-scan mix-blend-screen" />
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] uppercase tracking-widest sage-text">
          <ScanLine className="h-3 w-3" /> Scan me
        </div>
      </div>

      {/* AR phone — bottom-right */}
      <div className="absolute right-0 bottom-2 md:bottom-6 rotate-[5deg] w-[150px] md:w-[190px]">
        <div className="rounded-[26px] border border-[color:var(--sage)]/40 bg-card/90 p-2 shadow-2xl sage-glow">
          <div className="relative overflow-hidden rounded-[20px] aspect-[9/16] bg-gradient-to-b from-[oklch(0.22_0.02_60)] to-[oklch(0.14_0.01_60)]">
            {/* table surface */}
            <div className="absolute inset-x-0 bottom-0 h-2/5 bg-[linear-gradient(180deg,transparent,color-mix(in_oklab,var(--sage)_18%,transparent))]" />
            {/* AR reticle */}
            <div className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2">
              <div className="absolute inset-0 rounded-full border border-[color:var(--peach)]/60 w-24 h-24 -translate-x-1/2 -translate-y-1/2 anim-pulse-ring" />
              <div className="w-24 h-24 rounded-full border border-dashed border-[color:var(--peach)]/50 -translate-x-1/2 -translate-y-1/2" />
            </div>
            {/* placed dish */}
            <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 anim-ar-rise">
              <PlateSVG size={110} />
            </div>
            {/* top bar */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between px-3 py-2 text-[9px] uppercase tracking-widest text-[color:var(--cream)]/80">
              <span className="inline-flex items-center gap-1"><Eye className="h-2.5 w-2.5" /> AR view</span>
              <span className="sage-text">Live</span>
            </div>
          </div>
        </div>
      </div>

      {/* floating chip */}
      <div className="absolute right-2 top-4 glass rounded-full px-3 py-1.5 text-[10px] uppercase tracking-widest sage-text hidden md:inline-flex items-center gap-1.5">
        <Sparkles className="h-3 w-3" /> No app required
      </div>
    </div>
  );
}

/* Turntable demo card in the 3D-menu section */
function DemoTurntable() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="glass rounded-[2rem] p-6 md:p-8 sage-glow">
        <div className="flex items-center justify-between mb-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 sage-text uppercase tracking-widest">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--peach)]" /> Live 3D
          </span>
          <span>Drag · pinch · tap AR</span>
        </div>
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[radial-gradient(ellipse_at_center,_oklch(0.18_0.01_60),_oklch(0.09_0.005_60))]">
          <div className="absolute inset-0 gold-grid-bg opacity-30" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 anim-dish-spin">
            <PlateSVG size={280} />
          </div>
          {/* controls */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {["3D", "AR", "Order"].map((t, i) => (
              <span key={t}
                className={`px-3 py-1.5 rounded-full text-[11px] uppercase tracking-widest border ${
                  i === 0
                    ? "bg-primary text-primary-foreground border-transparent"
                    : "border-[color:var(--sage)]/40 text-foreground/90 bg-card/60"
                }`}
              >{t}</span>
            ))}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div>
            <div className="font-display text-lg cream-text">Butter Chicken</div>
            <div className="text-xs text-muted-foreground">Signature · Serves 2</div>
          </div>
          <div className="font-display text-lg peach-text">₹ 480</div>
        </div>
      </div>
    </div>
  );
}

/* Analytics preview panel */
function AnalyticsPreview() {
  const bars = [42, 58, 34, 71, 46, 88, 62];
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const top = [
    { name: "Butter Chicken", scans: 428, pct: 92 },
    { name: "Paneer Tikka",   scans: 312, pct: 68 },
    { name: "Hyderabadi Biryani", scans: 274, pct: 60 },
  ];
  return (
    <div className="glass rounded-[2rem] p-5 md:p-7 sage-glow">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-2 sage-text uppercase tracking-widest">
          <BarChart3 className="h-3.5 w-3.5" /> This week
        </span>
        <span>Live · updated 2s ago</span>
      </div>

      {/* chart */}
      <div className="mt-5 rounded-2xl bg-card/40 border border-[color:var(--sage)]/20 p-4">
        <div className="flex items-end gap-2 md:gap-3 h-36">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 justify-end">
              <div
                className="w-full rounded-t-md gold-gradient"
                style={{ height: `${h}%`, opacity: i === 5 ? 1 : 0.75 }}
              />
              <span className="text-[10px] text-muted-foreground">{days[i]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* top dishes */}
      <div className="mt-5 space-y-3">
        {top.map((d) => (
          <div key={d.name}>
            <div className="flex items-center justify-between text-sm">
              <span className="cream-text">{d.name}</span>
              <span className="text-muted-foreground">{d.scans} scans</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full rounded-full bg-[color:var(--sage)]/15 overflow-hidden">
              <div className="h-full rounded-full gold-gradient" style={{ width: `${d.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Decorative SVGs ---------- */
function PlateSVG({ size = 260 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 260 260" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <radialGradient id="plate" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#F4EEE4" />
          <stop offset="70%" stopColor="#E8DFCE" />
          <stop offset="100%" stopColor="#B8AE9A" />
        </radialGradient>
        <radialGradient id="curry" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#F2B38F" />
          <stop offset="60%" stopColor="#C77A54" />
          <stop offset="100%" stopColor="#7A3A22" />
        </radialGradient>
        <radialGradient id="shine" cx="35%" cy="30%" r="30%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* shadow */}
      <ellipse cx="130" cy="215" rx="105" ry="14" fill="#000" opacity="0.45" />
      {/* plate rim */}
      <ellipse cx="130" cy="140" rx="120" ry="42" fill="url(#plate)" />
      <ellipse cx="130" cy="136" rx="120" ry="42" fill="#0a0a0a" opacity="0.15" />
      {/* plate top */}
      <ellipse cx="130" cy="128" rx="120" ry="42" fill="url(#plate)" />
      {/* curry */}
      <ellipse cx="130" cy="124" rx="86" ry="28" fill="url(#curry)" />
      {/* garnish dots */}
      <circle cx="105" cy="118" r="4" fill="#91A58F" />
      <circle cx="150" cy="130" r="3.5" fill="#91A58F" />
      <circle cx="135" cy="112" r="3" fill="#F4EEE4" />
      <circle cx="120" cy="132" r="2.5" fill="#F4EEE4" />
      <circle cx="160" cy="118" r="2.5" fill="#F4EEE4" />
      {/* highlight */}
      <ellipse cx="105" cy="112" rx="30" ry="10" fill="url(#shine)" />
    </svg>
  );
}

function QRSVG({ className = "" }: { className?: string }) {
  // deterministic pseudo-random pattern
  const size = 21;
  const cells: boolean[] = [];
  let s = 7;
  for (let i = 0; i < size * size; i++) {
    s = (s * 9301 + 49297) % 233280;
    cells.push(s / 233280 > 0.55);
  }
  const finder = (x: number, y: number) => (
    <g key={`f-${x}-${y}`}>
      <rect x={x} y={y} width={7} height={7} fill="#0a0a0a" />
      <rect x={x + 1} y={y + 1} width={5} height={5} fill="#F4EEE4" />
      <rect x={x + 2} y={y + 2} width={3} height={3} fill="#0a0a0a" />
    </g>
  );
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} shapeRendering="crispEdges" aria-hidden>
      <rect width={size} height={size} fill="#F4EEE4" />
      {cells.map((on, i) => {
        const x = i % size, y = Math.floor(i / size);
        // skip finder zones
        if ((x < 8 && y < 8) || (x > size - 9 && y < 8) || (x < 8 && y > size - 9)) return null;
        return on ? <rect key={i} x={x} y={y} width={1} height={1} fill="#0a0a0a" /> : null;
      })}
      {finder(0, 0)}
      {finder(size - 7, 0)}
      {finder(0, size - 7)}
    </svg>
  );
}