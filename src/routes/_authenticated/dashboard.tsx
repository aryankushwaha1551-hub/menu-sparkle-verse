import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Boxes, QrCode, ScanLine, Star, Plus } from "lucide-react";
import { formatRupees } from "@/lib/menuverse";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  const [restaurant, setRestaurant] = useState<any>(null);
  const [stats, setStats] = useState({ dishes: 0, qr: 0, scans: 0, featured: 0 });
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: r } = await (supabase as any).from("restaurants").select("*").maybeSingle();
      setRestaurant(r);
      if (r) {
        const [
          { count: dishes },
          { count: qr },
          { count: scans },
          { count: featured },
          { data: recentData },
        ] = await Promise.all([
          (supabase as any)
            .from("menu_items")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", r.id),
          (supabase as any)
            .from("qr_codes")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", r.id),
          (supabase as any)
            .from("scans")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", r.id),
          (supabase as any)
            .from("menu_items")
            .select("*", { count: "exact", head: true })
            .eq("restaurant_id", r.id)
            .eq("is_featured", true),
          (supabase as any)
            .from("menu_items")
            .select("*")
            .eq("restaurant_id", r.id)
            .order("created_at", { ascending: false })
            .limit(6),
        ]);
        setStats({ dishes: dishes ?? 0, qr: qr ?? 0, scans: scans ?? 0, featured: featured ?? 0 });
        setRecent(recentData ?? []);
      }
      setLoading(false);
    })();
  }, []);

  const needsProfile =
    restaurant && (!restaurant.phone || !restaurant.name || restaurant.name === "My Restaurant");

  const statCards = [
    { label: "Dishes in your menu", value: stats.dishes, icon: Boxes },
    { label: "Table cards issued", value: stats.qr, icon: QrCode },
    { label: "Guest scans & taps", value: stats.scans, icon: ScanLine },
    { label: "Signature dishes", value: stats.featured, icon: Star },
  ];

  return (
    <div className="space-y-8">
      {needsProfile && (
        <div className="glass rounded-2xl p-4 flex items-center justify-between border-primary/40">
          <div>
            <div className="font-semibold">Complete your restaurant profile</div>
            <div className="text-sm text-muted-foreground">
              Add your restaurant name, logo and contact number so guests can reach you from your
              menu experience.
            </div>
          </div>
          <Link to="/settings">
            <Button className="bg-primary text-primary-foreground">Complete profile</Button>
          </Link>
        </div>
      )}

      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold">
          Welcome, <span className="gold-text">{restaurant?.name ?? "Restaurant"}</span>
        </h1>
        <p className="text-muted-foreground mt-1">
          Your MenuVerse project at a glance. To add or update a dish, contact the MenuVerse team.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-muted-foreground">
                {s.label}
              </span>
              <s.icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-3 text-3xl font-bold font-display">
              {loading ? <span className="shimmer inline-block h-8 w-16 rounded" /> : s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <a href="mailto:hello@menuverse.app?subject=Menu%20update%20request">
          <Button className="bg-primary text-primary-foreground gold-glow rounded-xl">
            <Plus className="h-4 w-4 mr-1" />
            Request a menu update
          </Button>
        </a>
        <Link to="/qr-codes">
          <Button variant="outline" className="rounded-xl border-primary/40 hover:bg-primary/10">
            View your table cards
          </Button>
        </Link>
      </div>

      <div>
        <h2 className="font-display text-2xl font-semibold mb-4">Your menu preview</h2>
        {recent.length === 0 ? (
          <div className="glass rounded-2xl p-10 text-center">
            <div className="text-muted-foreground">
              Your interactive menu is being prepared by the MenuVerse team. You'll see your dishes
              here once they're ready for review.
            </div>
            <a href="mailto:hello@menuverse.app">
              <Button className="mt-4 bg-primary text-primary-foreground">Contact MenuVerse</Button>
            </a>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recent.map((d) => (
              <div key={d.id} className="glass rounded-2xl overflow-hidden">
                <div className="aspect-video bg-muted overflow-hidden">
                  {d.thumbnail_url ? (
                    <img
                      src={d.thumbnail_url}
                      alt={d.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-4xl">
                      🍽️
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="font-semibold">{d.name}</div>
                  <div className="text-sm gold-text font-semibold mt-1">
                    {formatRupees(d.price)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
