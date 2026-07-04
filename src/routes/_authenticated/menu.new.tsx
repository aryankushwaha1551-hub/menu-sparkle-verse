import { createFileRoute } from "@tanstack/react-router";
import { DishForm } from "@/components/DishForm";

export const Route = createFileRoute("/_authenticated/menu/new")({ component: New });
function New() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Add a New Dish</h1>
        <p className="text-muted-foreground mt-1">Fill in the details — a QR code is generated automatically.</p>
      </div>
      <DishForm />
    </div>
  );
}