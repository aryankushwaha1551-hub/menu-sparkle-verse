import { createFileRoute } from "@tanstack/react-router";
import { Eye } from "lucide-react";

export const Route = createFileRoute("/_authenticated/menu-preview")({
  component: MenuPreview,
});

function MenuPreview() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl font-bold">Menu Preview</h1>
        <p className="text-muted-foreground mt-1">
          Preview the interactive menu MenuVerse builds for your restaurant.
        </p>
      </div>
      <div className="glass rounded-2xl p-14 text-center">
        <Eye className="h-10 w-10 mx-auto text-primary" />
        <h3 className="font-display text-xl font-semibold mt-4">
          Your live menu preview will appear here
        </h3>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
          Once the MenuVerse team publishes your dishes, you'll be able to walk
          through the exact experience your guests see after tapping your table
          card.
        </p>
      </div>
    </div>
  );
}
