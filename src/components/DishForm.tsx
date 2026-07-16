import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { SPICE_LEVELS, slugify, viewerUrl, generateQrDataUrl } from "@/lib/menuverse";

export function DishForm({ existing }: { existing?: any }) {
  const navigate = useNavigate();
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [cats, setCats] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [f, setF] = useState<any>(existing ?? {
    name: "", description: "", price: "", prep_time: "", category_id: "",
    is_veg: true, spice_level: "none", is_available: true, is_featured: false,
    thumbnail_url: "", glb_url: "", usdz_url: "",
  });

  useEffect(() => { (async () => {
    const { data: r } = await (supabase as any).from("restaurants").select("id").maybeSingle();
    if (!r) return;
    setRestaurantId(r.id);
    const { data: c } = await (supabase as any).from("categories").select("*").eq("restaurant_id", r.id);
    setCats(c ?? []);
  })(); }, []);

  const set = (k: string, v: any) => setF((p: any) => ({ ...p, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurantId) return;
    setSaving(true);
    try {
      const payload = { ...f, price: Number(f.price) || 0, restaurant_id: restaurantId, category_id: f.category_id || null };
      let id = existing?.id;
      if (existing) {
        const { error } = await (supabase as any).from("menu_items").update(payload).eq("id", existing.id);
        if (error) throw error;
      } else {
        const slug = slugify(f.name);
        const { data, error } = await (supabase as any).from("menu_items").insert({ ...payload, slug }).select().single();
        if (error) throw error;
        id = data.id;
        const qr = await generateQrDataUrl(viewerUrl(slug));
        await (supabase as any).from("qr_codes").insert({ menu_item_id: id, restaurant_id: restaurantId, qr_data_url: qr });
      }
      toast.success(existing ? "Dish updated" : "Dish added & QR generated");
      navigate({ to: "/menu" });
    } catch (err: any) { toast.error(err?.message ?? "Failed"); }
    finally { setSaving(false); }
  };

  const inp = (k: string, label: string, extra: any = {}) => (
    <div>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <Input value={f[k] ?? ""} onChange={(e) => set(k, e.target.value)}
        className="mt-1 bg-input focus-visible:ring-primary h-11" {...extra} />
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-6 max-w-3xl">
      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-xl font-semibold gold-text">Basic Info</h2>
        {inp("name", "Dish Name", { required: true })}
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Description</Label>
          <Textarea value={f.description ?? ""} onChange={(e) => set("description", e.target.value)} className="mt-1 bg-input focus-visible:ring-primary" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground">Price (₹)</Label>
            <div className="mt-1 relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input type="number" step="0.01" required value={f.price} onChange={(e) => set("price", e.target.value)} className="pl-7 bg-input focus-visible:ring-primary h-11" />
            </div>
          </div>
          {inp("prep_time", "Preparation Time", { placeholder: "20 mins" })}
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Category</Label>
          <select value={f.category_id ?? ""} onChange={(e) => set("category_id", e.target.value)} className="mt-1 w-full h-11 rounded-md bg-input border border-border px-3 text-sm">
            <option value="">— None —</option>
            {cats.map((c) => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
          </select>
        </div>
      </div>

      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-xl font-semibold gold-text">Properties</h2>
        <div className="flex items-center justify-between">
          <Label>Veg / Non-Veg</Label>
          <div className="flex items-center gap-3">
            <span className={f.is_veg ? "text-green-400" : "text-muted-foreground"}>🌿 Veg</span>
            <Switch checked={!f.is_veg} onCheckedChange={(v) => set("is_veg", !v)} />
            <span className={!f.is_veg ? "text-red-400" : "text-muted-foreground"}>🍖 Non-Veg</span>
          </div>
        </div>
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Spice Level</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {SPICE_LEVELS.map((s) => (
              <button type="button" key={s.value} onClick={() => set("spice_level", s.value)}
                className={`px-4 py-2 rounded-xl border text-sm transition-all ${f.spice_level === s.value ? "bg-primary/15 border-primary text-primary" : "border-border hover:border-primary/40"}`}>
                {s.emoji} {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between"><Label>Available</Label>
          <Switch checked={f.is_available} onCheckedChange={(v) => set("is_available", v)} />
        </div>
        <div className="flex items-center justify-between"><Label>Featured dish</Label>
          <Switch checked={f.is_featured} onCheckedChange={(v) => set("is_featured", v)} />
        </div>
      </div>

      <div className="glass rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold gold-text">Media assets</h2>
          <span className="text-[10px] uppercase tracking-wider px-2 py-1 rounded-full border border-primary/30 text-primary/80">Internal — MenuVerse team</span>
        </div>
        <p className="text-xs text-muted-foreground">Restaurant clients should send dish photos to the MenuVerse team — these fields are prepared and populated internally.</p>
        {inp("thumbnail_url", "Dish photo URL")}
        {inp("glb_url", "Interactive asset URL (Android)")}
        {inp("usdz_url", "Interactive asset URL (iOS)")}
      </div>

      <Button type="submit" disabled={saving} className="bg-primary text-primary-foreground gold-glow rounded-xl h-12 px-8">
        {saving ? "Saving…" : existing ? "Update dish" : "Save dish & issue table card"}
      </Button>
    </form>
  );
}