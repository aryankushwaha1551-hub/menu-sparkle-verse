import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DishForm } from "@/components/DishForm";

export const Route = createFileRoute("/_authenticated/menu/$id/edit")({ component: Edit });

function Edit() {
  const { id } = Route.useParams();
  const [item, setItem] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const { data } = await (supabase as any)
        .from("menu_items")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      setItem(data);
    })();
  }, [id]);
  if (!item) return <div className="shimmer h-40 rounded-2xl" />;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Edit Dish</h1>
        <p className="text-muted-foreground mt-1">{item.name}</p>
      </div>
      <DishForm existing={item} />
    </div>
  );
}
