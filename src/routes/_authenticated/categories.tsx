import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

// Phase 1.1: Internal category management is off-limits to restaurant clients
// until roles land. Redirect any authenticated user back to their dashboard.
export const Route = createFileRoute("/_authenticated/categories")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  component: Categories,
});

const SUGGESTIONS = [
  { name: "Pizza", emoji: "🍕" }, { name: "Burger", emoji: "🍔" },
  { name: "Coffee", emoji: "☕" }, { name: "Desserts", emoji: "🍰" },
  { name: "Main Course", emoji: "🍛" }, { name: "Specials", emoji: "⭐" },
];

function Categories() {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [list, setList] = useState<any[]>([]);
  const [name, setName] = useState(""); const [emoji, setEmoji] = useState("🍽️");

  const refresh = async (rid: string) => {
    const { data } = await (supabase as any).from("categories").select("*").eq("restaurant_id", rid).order("created_at");
    setList(data ?? []);
  };

  useEffect(() => { (async () => {
    const { data: r } = await (supabase as any).from("restaurants").select("id").maybeSingle();
    if (r) { setRestaurantId(r.id); await refresh(r.id); }
  })(); }, []);

  const add = async (n: string, em: string) => {
    if (!restaurantId || !n.trim()) return;
    const { error } = await (supabase as any).from("categories").insert({ restaurant_id: restaurantId, name: n.trim(), emoji: em || "🍽️" });
    if (error) return toast.error(error.message);
    setName(""); setEmoji("🍽️"); toast.success("Category added"); refresh(restaurantId);
  };

  const del = async (id: string) => {
    await (supabase as any).from("categories").delete().eq("id", id);
    if (restaurantId) refresh(restaurantId);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-3xl font-bold">Categories</h1>
        <p className="text-muted-foreground mt-1">Organize your menu into sections.</p>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); add(name, emoji); }} className="glass rounded-2xl p-4 flex flex-wrap gap-3 items-end">
        <div className="w-20">
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Emoji</label>
          <Input value={emoji} onChange={(e) => setEmoji(e.target.value)} className="text-center text-lg h-11 bg-input" />
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="text-xs uppercase tracking-wider text-muted-foreground">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Starters" className="h-11 bg-input focus-visible:ring-primary" />
        </div>
        <Button type="submit" className="bg-primary text-primary-foreground h-11 rounded-xl">Add</Button>
      </form>

      {list.length === 0 && (
        <div>
          <div className="text-sm text-muted-foreground mb-3">Quick suggestions:</div>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button key={s.name} onClick={() => add(s.name, s.emoji)} className="glass rounded-xl px-4 py-2 text-sm hover:border-primary/60 transition-colors">
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c) => (
          <div key={c.id} className="glass rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{c.emoji}</span>
              <span className="font-medium">{c.name}</span>
            </div>
            <button onClick={() => del(c.id)} className="text-muted-foreground hover:text-destructive p-2 rounded-lg hover:bg-secondary">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}