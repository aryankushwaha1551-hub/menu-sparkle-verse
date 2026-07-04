import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/dashboard" });
    });
  }, [navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/dashboard" },
        });
        if (error) throw error;
        toast.success("Account created! Welcome to MenuVerse.");
        navigate({ to: "/settings" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate({ to: "/dashboard" });
      }
    } catch (err: any) {
      toast.error(err?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 gold-grid-bg opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.10),_transparent_65%)]" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="block text-center mb-8 font-display text-3xl font-bold gold-text">
          MenuVerse
        </Link>
        <div className="glass rounded-2xl p-8 gold-glow">
          <h1 className="font-display text-2xl font-semibold text-center">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-sm text-muted-foreground text-center mt-1">
            {mode === "login" ? "Sign in to manage your menu" : "Start your 3D menu in minutes"}
          </p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-muted-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 bg-input border-border focus-visible:ring-primary focus-visible:border-primary h-11"
                placeholder="you@restaurant.com"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-xs uppercase tracking-wider text-muted-foreground">Password</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 bg-input border-border focus-visible:ring-primary focus-visible:border-primary h-11"
                placeholder="••••••••"
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 bg-primary text-primary-foreground hover:opacity-90 rounded-xl gold-glow font-semibold"
            >
              {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
            </Button>
          </form>

          <div className="mt-6 text-sm text-center text-muted-foreground">
            {mode === "login" ? (
              <>
                New to MenuVerse?{" "}
                <button onClick={() => setMode("signup")} className="text-primary hover:underline">
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-primary hover:underline">
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link to="/" className="hover:text-primary transition-colors">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}