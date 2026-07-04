import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Sparkles, QrCode, ScanLine, BarChart3, Check } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link to="/" className="font-display text-2xl font-bold gold-text tracking-wide">
            MenuVerse
          </Link>
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">Features</a>
            <a href="#how" className="transition-colors hover:text-foreground">How it works</a>
            <a href="#pricing" className="transition-colors hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex gap-2">
            <Link to="/auth">
              <Button variant="ghost" className="text-foreground hover:text-primary">Sign In</Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-primary text-primary-foreground hover:opacity-90 gold-glow">Start Free</Button>
            </Link>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden pt-40 pb-28">
        <div className="absolute inset-0 gold-grid-bg opacity-40" />
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[520px] bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.14),_transparent_60%)]" />
        <div className="relative mx-auto max-w-5xl px-6 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-widest text-primary">
            <Sparkles className="h-3 w-3" /> Premium 3D Menu Platform
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold leading-[1.05]">
            Bring Your Menu to <span className="gold-text italic">Life</span> in 3D
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Let customers explore every dish in interactive 3D and Augmented Reality
            before ordering. Built for restaurants, cafés, hotels &amp; cloud kitchens in India.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link to="/auth">
              <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 gold-glow rounded-2xl px-8 h-12 text-base">
                Start Free
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="rounded-2xl px-8 h-12 text-base border-primary/40 text-foreground hover:bg-primary/10">
              Book a Demo
            </Button>
          </div>
          <p className="mt-6 text-xs uppercase tracking-widest text-muted-foreground">
            No credit card required · Setup in 5 minutes
          </p>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold">Everything you need to wow diners</h2>
          <p className="mt-4 text-muted-foreground">A complete toolkit built for the next generation of hospitality.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Sparkles, title: "Interactive 3D Food Models", desc: "Photorealistic dishes customers can spin, zoom and inspect from every angle." },
            { icon: QrCode, title: "Instant QR Generation", desc: "Every dish gets a unique QR code you can print, share or place on tables." },
            { icon: ScanLine, title: "AR on Android & iPhone", desc: "Customers place the dish on their own table — no app required." },
            { icon: BarChart3, title: "Real-time Analytics", desc: "See scans, top-viewed dishes and device breakdown as it happens." },
          ].map((f) => (
            <div key={f.title} className="glass rounded-2xl p-6 transition-all hover:-translate-y-1 hover:gold-glow">
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-display text-xl font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold">How it works</h2>
          <p className="mt-4 text-muted-foreground">Three steps from setup to scanning.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { n: "01", title: "Upload your 3D model link", desc: "Paste your Cloudinary GLB/USDZ URLs — we handle the rest." },
            { n: "02", title: "Auto-generate QR code", desc: "A unique, printable QR is created for every dish instantly." },
            { n: "03", title: "Customer scans & views in AR", desc: "Diners explore the dish in 3D and place it on their own table." },
          ].map((s) => (
            <div key={s.n} className="glass rounded-2xl p-8 relative overflow-hidden">
              <div className="font-display text-7xl font-bold opacity-15 gold-text absolute -top-2 right-4 select-none">
                {s.n}
              </div>
              <h3 className="font-display text-2xl font-semibold relative">{s.title}</h3>
              <p className="mt-3 text-muted-foreground relative">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold">Simple, transparent pricing</h2>
          <p className="mt-4 text-muted-foreground">Choose the plan that fits your kitchen.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3 items-stretch">
          {[
            { name: "Starter", price: "999", dishes: "10 dishes", features: ["QR generation", "3D & AR viewer", "Basic analytics", "Email support"] },
            { name: "Professional", price: "2,499", dishes: "50 dishes", popular: true, features: ["Everything in Starter", "Priority AR support", "Advanced analytics", "Custom branding", "Priority support"] },
            { name: "Enterprise", price: "4,999", dishes: "Unlimited dishes", features: ["Everything in Pro", "Multi-location", "Dedicated manager", "API access", "SLA"] },
          ].map((p) => (
            <div
              key={p.name}
              className={`glass rounded-2xl p-8 relative flex flex-col ${p.popular ? "gold-glow border-primary/50" : ""}`}
            >
              {p.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="font-display text-2xl font-semibold">{p.name}</h3>
              <div className="mt-4">
                <span className="text-4xl font-bold gold-text">₹{p.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.dishes}</p>
              <ul className="mt-6 space-y-3 text-sm flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className="h-4 w-4 mt-0.5 text-primary shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link to="/auth" className="mt-8">
                <Button
                  className={`w-full rounded-xl h-11 ${
                    p.popular
                      ? "bg-primary text-primary-foreground hover:opacity-90"
                      : "bg-secondary text-foreground border border-primary/30 hover:bg-primary/10"
                  }`}
                >
                  Get Started
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/50 mt-10">
        <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="font-display text-xl font-bold gold-text">MenuVerse</div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} MenuVerse. Crafted for hospitality.
          </p>
        </div>
      </footer>
    </div>
  );
}