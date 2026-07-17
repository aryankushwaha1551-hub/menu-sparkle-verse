import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Copy, RefreshCw } from "lucide-react";
import { generateQrDataUrl, viewerUrl } from "@/lib/menuverse";

// Phase 1.1: QR/table-card production is internal-only. Restaurant clients
// see the Table Cards portal instead; this page ships with the admin portal.
export const Route = createFileRoute("/_authenticated/qr-codes")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  component: QRPage,
});

function QRPage() {
  const [rows, setRows] = useState<any[]>([]);
  const [q, setQ] = useState("");

  const load = async () => {
    const { data: r } = await (supabase as any).from("restaurants").select("id").maybeSingle();
    if (!r) return;
    const { data } = await (supabase as any)
      .from("menu_items")
      .select("id, name, slug, thumbnail_url, qr_codes(qr_data_url), scans(count)")
      .eq("restaurant_id", r.id);
    setRows(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const filtered = useMemo(
    () => rows.filter((x) => !q || x.name.toLowerCase().includes(q.toLowerCase())),
    [rows, q],
  );

  const regen = async (item: any) => {
    const dataUrl = await generateQrDataUrl(viewerUrl(item.slug));
    const existing = item.qr_codes?.[0];
    if (existing) {
      await (supabase as any).from("qr_codes").update({ qr_data_url: dataUrl }).eq("menu_item_id", item.id);
    } else {
      const { data: r } = await (supabase as any).from("restaurants").select("id").maybeSingle();
      await (supabase as any).from("qr_codes").insert({ menu_item_id: item.id, restaurant_id: r.id, qr_data_url: dataUrl });
    }
    toast.success("QR regenerated"); load();
  };

  const copy = (slug: string) => { navigator.clipboard.writeText(viewerUrl(slug)); toast.success("Link copied"); };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">QR Codes</h1>
        <p className="text-muted-foreground mt-1">Download, share, or regenerate QR codes for every dish.</p>
      </div>
      <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by dish name…" className="max-w-md bg-input focus-visible:ring-primary" />
      <div className="glass rounded-2xl overflow-hidden">
        <div className="divide-y divide-border/40">
          {filtered.length === 0 && <div className="p-10 text-center text-muted-foreground">No QR codes yet. Add a dish to generate one.</div>}
          {filtered.map((item) => {
            const qr = item.qr_codes?.[0]?.qr_data_url;
            const scans = item.scans?.[0]?.count ?? 0;
            return (
              <div key={item.id} className="p-4 flex flex-wrap items-center gap-4">
                <div className="h-14 w-14 rounded-xl overflow-hidden bg-muted shrink-0">
                  {item.thumbnail_url ? <img src={item.thumbnail_url} className="w-full h-full object-cover" alt={item.name} /> : <div className="w-full h-full flex items-center justify-center text-2xl">🍽️</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold truncate">{item.name}</div>
                  <div className="text-xs text-muted-foreground">{scans} scans</div>
                </div>
                <div className="h-16 w-16 rounded-lg bg-white p-1 shrink-0">
                  {qr ? <img src={qr} alt="QR" className="w-full h-full" /> : <div className="w-full h-full flex items-center justify-center text-[10px] text-black">No QR</div>}
                </div>
                <div className="flex gap-2">
                  {qr && <a href={qr} download={`${item.slug}.png`}><Button variant="outline" size="sm" className="border-primary/30 rounded-lg"><Download className="h-3 w-3 mr-1" />PNG</Button></a>}
                  <Button variant="outline" size="sm" onClick={() => copy(item.slug)} className="border-primary/30 rounded-lg"><Copy className="h-3 w-3 mr-1" />Link</Button>
                  <Button variant="outline" size="sm" onClick={() => regen(item)} className="border-primary/30 rounded-lg"><RefreshCw className="h-3 w-3" /></Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}