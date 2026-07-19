import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/settings")({ component: Settings });

function Settings() {
  const [r, setR] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const { data } = await (supabase as any).from("restaurants").select("*").maybeSingle();
      setR(data ?? {});
      setLoading(false);
    })();
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await (supabase as any)
      .from("restaurants")
      .update({
        name: r.name,
        logo_url: r.logo_url,
        phone: r.phone,
        email: r.email,
        address: r.address,
        instagram: r.instagram,
        website: r.website,
        opening_hours: r.opening_hours,
      })
      .eq("id", r.id);
    setSaving(false);
    if (error) toast.error(error.message);
    else toast.success("Settings saved");
  };

  if (loading) return <div className="shimmer h-40 rounded-2xl" />;

  const field = (k: string, label: string, extra: any = {}) => (
    <div>
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      <Input
        value={r[k] ?? ""}
        onChange={(e) => setR({ ...r, [k]: e.target.value })}
        className="mt-1 bg-input border-border focus-visible:ring-primary h-11"
        {...extra}
      />
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="font-display text-3xl font-bold">Restaurant Settings</h1>
        <p className="text-muted-foreground mt-1">Configure how your menu appears to customers.</p>
      </div>
      <form onSubmit={save} className="glass rounded-2xl p-6 space-y-4">
        {field("name", "Restaurant Name")}
        {field("logo_url", "Logo image URL")}
        {field("phone", "Contact number (with country code, e.g. 91…)", {
          placeholder: "919999999999",
        })}
        {field("email", "Email", { type: "email" })}
        <div>
          <Label className="text-xs uppercase tracking-wider text-muted-foreground">Address</Label>
          <Textarea
            value={r.address ?? ""}
            onChange={(e) => setR({ ...r, address: e.target.value })}
            className="mt-1 bg-input border-border focus-visible:ring-primary"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {field("instagram", "Instagram Handle")}
          {field("website", "Website URL")}
        </div>
        {field("opening_hours", "Opening Hours", { placeholder: "Mon–Sun 11am–11pm" })}
        <Button
          disabled={saving}
          className="bg-primary text-primary-foreground gold-glow rounded-xl h-11 px-8"
        >
          {saving ? "Saving…" : "Save changes"}
        </Button>
      </form>
    </div>
  );
}
