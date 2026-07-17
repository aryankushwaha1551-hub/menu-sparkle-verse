import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw } from "lucide-react";

export const Route = createFileRoute("/_authenticated/update-requests")({
  component: UpdateRequests;
});
