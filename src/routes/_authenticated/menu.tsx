import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

// Phase 1.1: Internal production tooling. Not exposed to restaurant clients
// until the admin portal + role system land. Preserve the code, block access.
export const Route = createFileRoute("/_authenticated/menu")({
  beforeLoad: () => {
    throw redirect({ to: "/dashboard" });
  },
  component: () => <Outlet />,
});