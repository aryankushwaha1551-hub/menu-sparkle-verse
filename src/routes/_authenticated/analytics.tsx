import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/analytics")({ component: Analytics });

function Analytics() {
  const [total, setTotal] = useState(0);
  const [top, setTop] = useState<any[]>([]);
  const [mobile, setMobile] = useState(0); const [desktop, setDesktop] = useState(0);

  useEffect(() => { (async () => {
    const { data: r } = await (supabase as any).from("restaurants").select("id").maybeSingle();
    if (!r) return;
    const { data: scans, count } = await (supabase as any).from("scans")
      .select("menu_item_id, device_type", { count: "exact" }).eq("restaurant_id", r.id);
    setTotal(count ?? 0);
    const m = (scans ?? []).filter((s: any) => s.device_type === "mobile").length;
    const d = (scans ?? []).length - m;
    setMobile(m); setDesktop(d);
    const grouped: Record<string, number> = {};
    (scans ?? []).forEach((s: any) => { grouped[s.menu_item_id] = (grouped[s.menu_item_id] ?? 0) + 1; });
    const ids = Object.keys(grouped).sort((a, b) => grouped[b] - grouped[a]).slice(0, 5);
    if (ids.length) {
      const { data: items } = await (supabase as any).from("menu_items").select("id, name, thumbnail_url").in("id", ids);
      setTop((items ?? []).map((i: any) => ({ ...i, count: grouped[i.id] })).sort((a: any, b: any) => b.count - a.count));
    }
  })(); }, []);

  const totalDev = mobile + desktop || 1;
  const mp = Math.round((mobile / totalDev) * 100), dp = 100 - mp;

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="font-display text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground mt-1">See how customers are engaging with your menu.</p>
      </div>
      <div className="glass rounded-2xl p-8">
        <div className="text-sm text-muted-foreground uppercase tracking-wider">Total Scans (all time)</div>
        <div className="mt-2 text-6xl font-display font-bold gold-text">{total}</div>
      </div>
      <div className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl font-semibold mb-4">Top 5 most viewed dishes</h2>
        {top.length === 0 ? (
          <div className="text-muted-foreground text-sm">No scans yet.</div>
        ) : (
          <div className="space-y-3">
            {top.map((t) => (
              <div key={t.id} className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-lg overflow-hidden bg-muted shrink-0">
                  {t.thumbnail_url ? <img src={t.thumbnail_url} className="w-full h-full object-cover" alt={t.name} /> : <div className="w-full h-full flex items-center justify-center text-xl">🍽️</div>}
                </div>
                <div className="flex-1 font-medium">{t.name}</div>
                <div className="gold-text font-bold">{t.count}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="glass rounded-2xl p-6 space-y-4">
        <h2 className="font-display text-xl font-semibold">Device breakdown</h2>
        <div>
          <div className="flex justify-between text-sm mb-1"><span>📱 Mobile</span><span>{mp}%</span></div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden"><div className="h-full gold-gradient" style={{ width: `${mp}%` }} /></div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1"><span>💻 Desktop</span><span>{dp}%</span></div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden"><div className="h-full gold-gradient" style={{ width: `${dp}%` }} /></div>
        </div>
      </div>
    </div>
  );
}