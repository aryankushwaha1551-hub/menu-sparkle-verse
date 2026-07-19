import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/_authenticated/update-requests")({
  component: UpdateRequests,
});

function UpdateRequests() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl font-bold">Update Requests</h1>
        <p className="text-muted-foreground mt-1">
          Request menu updates — new dishes, price changes, or replacement photos.
        </p>
      </div>
      <div className="glass rounded-2xl p-14 text-center">
        <Mail className="h-10 w-10 mx-auto text-primary" />
        <h3 className="font-display text-xl font-semibold mt-4">
          Send your update to the MenuVerse team
        </h3>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          We'll process every update within one business day and notify you when it goes live.
        </p>
        <a href="mailto:hello@menuverse.in?subject=Menu%20update%20request">
          <Button className="mt-6 bg-primary text-primary-foreground rounded-xl">
            Email your account manager
          </Button>
        </a>
      </div>
    </div>
  );
}
