import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { formatRupees, spiceMeta, whatsappHref } from "@/lib/menuverse";
import { Share2, MessageCircle, Sparkles } from "lucide-react";

export const Route = createFileRoute("/view/$slug")({
  ssr: false,
  component: Viewer,
});

function Viewer() {
  const { slug } = Route.useParams();
  const [dish, setDish] = useState<any>(null);
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { (async () => {
    const { data } = await (supabase as any).from("menu_items").select("*, restaurants(*)").eq("slug", slug).maybeSingle();
    if (data) {
      setDish(data); setRestaurant(data.restaurants);
      const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
      (supabase as any).from("scans").insert({
        menu_item_id: data.id, restaurant_id: data.restaurant_id,
        device_type: isMobile ? "mobile" : "desktop",
      });
    }
    setLoading(false);
  })(); }, [slug]);

  const share = async () => {
    try {
      if (navigator.share) await navigator.share({ title: dish.name, url: window.location.href });
      else { navigator.clipboard.writeText(window.location.href); toast.success("Link copied"); }
    } catch {}
  };

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><div className="shimmer h-40 w-80 rounded-2xl" /></div>;
  if (!dish) return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Dish not found.</div>;

  const s = spiceMeta(dish.spice_level);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-lg mx-auto px-5 pt-6 pb-24">
        {/* Restaurant */}
        <div className="flex items-center gap-3 mb-6">
          {restaurant?.logo_url && <img src={restaurant.logo_url} alt={restaurant.name} className="h-10 w-10 rounded-full object-cover border border-primary/30" />}
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Presented by</div>
            <div className="font-semibold">{restaurant?.name}</div>
          </div>
        </div>

        {/* Name + badges */}
        <h1 className="font-display text-4xl font-bold gold-text leading-tight">{dish.name}</h1>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className={`px-2 py-1 rounded-full border ${dish.is_veg ? "border-green-500/40 text-green-400" : "border-red-500/40 text-red-400"}`}>
            {dish.is_veg ? "🌿 Veg" : "🍖 Non-Veg"}
          </span>
          <span className="px-2 py-1 rounded-full border border-primary/30">{s.emoji} {s.label}</span>
          {dish.prep_time && <span className="px-2 py-1 rounded-full border border-border">⏱ {dish.prep_time}</span>}
        </div>

        <div className="mt-4 text-3xl font-bold">{formatRupees(dish.price)}</div>
        {dish.description && <p className="mt-3 text-muted-foreground leading-relaxed">{dish.description}</p>}

        {/* 3D viewer */}
        <div className="mt-6 glass rounded-2xl p-2">
          {dish.glb_url ? (
            <model-viewer
              src={dish.glb_url}
              ios-src={dish.usdz_url ?? undefined}
              ar
              ar-modes="webxr scene-viewer quick-look"
              camera-controls
              auto-rotate
              shadow-intensity="1"
              style={{ width: "100%", height: "380px", background: "transparent", borderRadius: "16px" }}
            />
          ) : (
            <div className="h-[380px] rounded-2xl bg-muted flex items-center justify-center text-muted-foreground text-center px-6">
              {dish.thumbnail_url ? (
                <img src={dish.thumbnail_url} alt={dish.name} className="max-h-full rounded-2xl" />
              ) : (
                <div>
                  <div className="font-medium text-foreground">This interactive dish experience is being prepared.</div>
                  <div className="text-sm mt-1">Explore other signature dishes from {restaurant?.name ?? "this restaurant"}.</div>
                </div>
              )}
            </div>
          )}
        </div>

        {dish.glb_url && (
          <>
            <a href={dish.glb_url} rel="ar" className="block mt-4">
              <Button className="w-full h-12 bg-primary text-primary-foreground gold-glow rounded-xl text-base font-semibold">
                <Sparkles className="h-4 w-4 mr-2" /> View in Your Space 🪄
              </Button>
            </a>
            <p className="text-center text-xs text-muted-foreground mt-2">Tap AR to place this dish on your table</p>
          </>
        )}

        {/* Actions */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <a href={whatsappHref(restaurant?.phone, `I want to order ${dish.name}`)} target="_blank" rel="noopener noreferrer">
            <Button className="w-full h-12 rounded-xl bg-green-600 hover:bg-green-500 text-white">
              <MessageCircle className="h-4 w-4 mr-2" /> Order via WhatsApp
            </Button>
          </a>
          <Button variant="outline" onClick={share} className="h-12 rounded-xl border-primary/30 hover:bg-primary/10">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </div>

        <div className="mt-10 text-center text-xs gold-text opacity-70">Powered by MenuVerse</div>
      </div>
    </div>
  );
}