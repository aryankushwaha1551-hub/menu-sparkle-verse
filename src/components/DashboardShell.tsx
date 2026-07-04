import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import type { ReactNode } from "react";
import {
  LayoutDashboard,
  FolderTree,
  Boxes,
  QrCode,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

const NAV = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/categories", label: "Categories", icon: FolderTree },
  { to: "/menu", label: "3D Models", icon: Boxes },
  { to: "/qr-codes", label: "QR Codes", icon: QrCode },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function DashboardShell({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/" });
  };

  const NavList = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex-1 space-y-1">
      {NAV.map((n) => {
        const active = pathname === n.to || (n.to !== "/dashboard" && pathname.startsWith(n.to));
        return (
          <Link
            key={n.to}
            to={n.to}
            onClick={onClick}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-primary/15 text-primary border border-primary/30"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-foreground"
            }`}
          >
            <n.icon className="h-4 w-4" />
            {n.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-sidebar border-r border-sidebar-border p-4 fixed inset-y-0 left-0">
        <Link to="/dashboard" className="font-display text-2xl font-bold gold-text px-2 py-4">
          MenuVerse
        </Link>
        <div className="mt-4 flex-1 flex flex-col">
          <NavList />
          <Button
            variant="ghost"
            onClick={signOut}
            className="justify-start gap-3 text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> Sign out
          </Button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-40 glass flex items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="font-display text-xl font-bold gold-text">
          MenuVerse
        </Link>
        <button onClick={() => setOpen(true)} className="p-2 rounded-lg hover:bg-secondary">
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="relative w-72 bg-sidebar border-r border-sidebar-border p-4 flex flex-col">
            <div className="flex items-center justify-between">
              <span className="font-display text-2xl font-bold gold-text">MenuVerse</span>
              <button onClick={() => setOpen(false)} className="p-2 rounded-lg hover:bg-secondary">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-6 flex-1 flex flex-col">
              <NavList onClick={() => setOpen(false)} />
              <Button variant="ghost" onClick={signOut} className="justify-start gap-3">
                <LogOut className="h-4 w-4" /> Sign out
              </Button>
            </div>
          </aside>
        </div>
      )}

      <main className="flex-1 lg:ml-64 pt-16 lg:pt-0">
        <div className="max-w-7xl mx-auto p-6 md:p-10">{children}</div>
      </main>
    </div>
  );
}