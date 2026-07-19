import { createFileRoute } from "@tanstack/react-router";
import { LifeBuoy, Mail, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/_authenticated/support")({
  component: Support,
});

function Support() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="font-display text-3xl font-bold">Support</h1>
        <p className="text-muted-foreground mt-1">
          The MenuVerse team is here whenever you need us.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <a
          href="mailto:hello@menuverse.in"
          className="glass rounded-2xl p-6 hover:border-primary/40 transition-colors"
        >
          <Mail className="h-6 w-6 text-primary" />
          <h3 className="font-display text-xl font-semibold mt-3">Email</h3>
          <p className="text-muted-foreground text-sm mt-1">hello@menuverse.in</p>
        </a>
        <a
          href="https://wa.me/919999999999"
          target="_blank"
          rel="noopener noreferrer"
          className="glass rounded-2xl p-6 hover:border-primary/40 transition-colors"
        >
          <MessageCircle className="h-6 w-6 text-primary" />
          <h3 className="font-display text-xl font-semibold mt-3">WhatsApp</h3>
          <p className="text-muted-foreground text-sm mt-1">
            Priority chat with your account manager
          </p>
        </a>
      </div>
      <div className="glass rounded-2xl p-6 flex items-start gap-4">
        <LifeBuoy className="h-6 w-6 text-primary shrink-0 mt-1" />
        <div>
          <h3 className="font-display text-lg font-semibold">Done-for-you promise</h3>
          <p className="text-muted-foreground text-sm mt-1">
            MenuVerse owns setup, hosting, updates, and analytics. You will never be asked to handle
            3D files, hosting, or QR generation.
          </p>
        </div>
      </div>
    </div>
  );
}
