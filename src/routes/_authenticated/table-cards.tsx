import { createFileRoute } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";

export const Route = createFileRoute("/_authenticated/table-cards")({
  component: TableCards,
});

function TableCards() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl font-bold">Table Cards</h1>
        <p className="text-muted-foreground mt-1">
          Track your branded NFC + QR table cards and request replacements.
        </p>
      </div>
      <div className="glass rounded-2xl p-14 text-center">
        <CreditCard className="h-10 w-10 mx-auto text-primary" />
        <h3 className="font-display text-xl font-semibold mt-4">Card management coming soon</h3>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Your MenuVerse account manager will share shipment details and replacement requests will
          appear here.
        </p>
      </div>
    </div>
  );
}
