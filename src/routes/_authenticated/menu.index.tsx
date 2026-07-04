import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Pencil, Trash2, QrCode } from "lucide-react";
import { formatRupees } from "@/lib/menuverse";

export const Route = createFileRoute("/_authenticated/menu/")({ component: Library });

function Library() {
  const [items, setItems] = useState<any[]>([]);
  const [cats, setCats] = useState<any[]>([]);
  const [q, setQ] = useState(""); const [cat, setCat] = useState(""); const [veg, setVeg] = useState(""); const [avail, setAvail] = useState("");
  const [rid, setRid] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data: r } = await (supabase as any).from("restaurants").select("id").maybeSingle();
    if (!r) return;
    setRid(r.id);
    const [{ data: mi }, { data: c }] = await Promise.all([
      (supabase as any).from("menu_items").select("*, categories(name, emoji)").eq("restaurant_id", r.id).order("created_at", { ascending: false }),
      (supabase as any).from("categories").select("*").eq("restaurant_id", r.id),
    ]);
    setItems(mi ?? []); setCats(c ?? []); setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => items.filter((i) => {
    if (q && !i.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (cat && i.category_id !== cat) return false;
    if (veg === "veg" && !i.is_veg) return false;
    if (veg === "nonveg" && i.is_veg) return false;
    if (avail === "yes" && !i.is_available) return false;
    if (avail === "no" && i.is_available) return false;
    return true;
  }), [items, q, cat, veg, avail]);

  const del = async (id: string) => {
    if (!confirm("Delete this dish?")) return;
    const { error } = await (supabase as any).from("menu_items").delete().eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Deleted"); load(); }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold">3D Models Library</h1>
          <p className="text-muted-foreground mt-1">All your dishes in one place.</p>
        </div>
        <Link to="/menu/new"><Button className="bg-primary text-primary-foreground gold-glow rounded-xl"><Plus className="h-4 w-4 mr-1" />Add Dish</Button></Link>
      </div>

      <div className="glass rounded-2xl p-4 grid gap-3 md:grid-cols-4">
        <Input placeholder="Search dishes…" value={q} onChange={(e) => setQ(e.target.value)} className="bg-input focus-visible:ring-primary" />
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-10 rounded-md bg-input border border-border px-3 text-sm">
          <option value="">All categories</option>
          {cats.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
        </select>
        <select value={veg} onChange={(e) => setVeg(e.target.value)} className="h-10 rounded-md bg-input border border-border px-3 text-sm">
          <option value="">Veg & Non-Veg</option><option value="veg">Veg only</option><option value="nonveg">Non-Veg only</option>
        </select>
        <select value={avail} onChange={(e) => setAvail(e.target.value)} className="h-10 rounded-md bg-input border border-border px-3 text-sm">
          <option value="">Any availability</option><option value="yes">Available</option><option value="no">Unavailable</option>
        </select>
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1,2,3].map((i) => <div key={i} className="shimmer h-60 rounded-2xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="glass rounded-2xl p-14 text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="font-display text-xl font-semibold">No dishes yet</h3>
          <p className="text-muted-foreground mt-1">Add your first dish to get started.</p>
          <Link to="/menu/new"><Button className="mt-6 bg-primary text-primary-foreground gold-glow rounded-xl">Add Your First Dish</Button></Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((d) => (
            <div key={d.id} className="glass rounded-2xl overflow-hidden flex flex-col">
              <div className="aspect-video bg-muted overflow-hidden">
                {d.thumbnail_url
                  ? <img src={d.thumbnail_url} alt={d.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full flex items-center justify-center text-4xl text-muted-foreground">🍽️</div>}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-semibold">{d.name}</div>
                  <div className="text-sm">{d.is_veg ? "🌿" : "🍖"}</div>
                </div>
                <div className="text-sm gold-text font-semibold mt-1">{formatRupees(d.price)}</div>
                {d.categories && <div className="mt-2 text-xs text-muted-foreground">{d.categories.emoji} {d.categories.name}</div>}
                <div className="mt-4 flex gap-2 pt-4 border-t border-border/40">
                  <Link to="/menu/$id/edit" params={{ id: d.id }} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full rounded-lg border-primary/30"><Pencil className="h-3 w-3 mr-1" />Edit</Button>
                  </Link>
                  <Link to="/qr-codes"><Button variant="outline" size="sm" className="rounded-lg border-primary/30"><QrCode className="h-3 w-3" /></Button></Link>
                  <Button variant="outline" size="sm" onClick={() => del(d.id)} className="rounded-lg text-destructive border-destructive/30 hover:bg-destructive/10"><Trash2 className="h-3 w-3" /></Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}