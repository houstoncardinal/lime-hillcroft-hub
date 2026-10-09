import { Link, Outlet, createFileRoute, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import {
  BarChart3,
  Banknote,
  Clock,
  ExternalLink,
  LayoutDashboard,
  Lock,
  Menu,
  Package,
  Settings,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";

import { settings, useAdminData } from "@/admin/store";
import { Button, Field, Input } from "@/admin/ui";
import { DotRing } from "@/components/site/logo";
import { ThemeSwitcher } from "@/components/site/theme-switcher";
import { ADMIN_THEME_KEY, SITE_THEME_KEY, applyTheme, storedTheme } from "@/components/site/themes";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin")({
  // Data lives in the browser (local mode), so the dashboard renders client-side only.
  ssr: false,
  head: () => ({
    meta: [{ title: "Dashboard · TIC Wireless" }, { name: "robots", content: "noindex, nofollow" }],
  }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/inventory", label: "Inventory", icon: Package },
  { to: "/admin/time-clock", label: "Time clock", icon: Clock },
  { to: "/admin/employees", label: "Employees", icon: Users },
  { to: "/admin/payroll", label: "Payroll", icon: Banknote },
  { to: "/admin/analytics", label: "Website stats", icon: BarChart3 },
  { to: "/admin/shopify", label: "Shopify", icon: ShoppingBag },
  { to: "/admin/settings", label: "Settings", icon: Settings },
] as const;

const UNLOCK_KEY = "tic-admin-unlocked";

function AdminLayout() {
  const data = useAdminData();
  const [unlocked, setUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(UNLOCK_KEY) === "1";
    } catch {
      return false;
    }
  });

  // Dark glass theme on <html> so portalled dialogs and toasts match.
  // The dashboard has its own color theme; restore the website's when leaving.
  useEffect(() => {
    document.documentElement.classList.add("admin-theme");
    applyTheme(storedTheme(ADMIN_THEME_KEY));
    return () => {
      document.documentElement.classList.remove("admin-theme");
      applyTheme(storedTheme(SITE_THEME_KEY));
    };
  }, []);

  const unlock = () => {
    try {
      sessionStorage.setItem(UNLOCK_KEY, "1");
    } catch {
      // ignore
    }
    setUnlocked(true);
  };
  const lock = () => {
    try {
      sessionStorage.removeItem(UNLOCK_KEY);
    } catch {
      // ignore
    }
    setUnlocked(false);
  };

  return (
    <div className="relative min-h-svh overflow-x-hidden text-foreground">
      <Backdrop />
      {unlocked && data.settings.passcodeHash ? (
        <Shell onLock={lock} demo={data.settings.demo} />
      ) : (
        <Gate hasPasscode={Boolean(data.settings.passcodeHash)} onUnlock={unlock} />
      )}
      <Toaster position="bottom-right" theme="dark" />
    </div>
  );
}

function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,color-mix(in_oklab,var(--ink)_80%,white),color-mix(in_oklab,var(--ink)_80%,black)_60%)]" />
      <div className="absolute -left-32 -top-32 h-[38rem] w-[38rem] rounded-full bg-primary/20 blur-[140px]" />
      <div className="absolute -bottom-40 right-0 h-[34rem] w-[34rem] rounded-full bg-slate/30 blur-[140px]" />
      <div className="absolute left-1/2 top-1/3 h-[24rem] w-[24rem] rounded-full bg-primary/8 blur-[120px]" />
      <div className="grain absolute inset-0 opacity-30" />
    </div>
  );
}

function Gate({ hasPasscode, onUnlock }: { hasPasscode: boolean; onUnlock: () => void }) {
  const [code, setCode] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    if (!hasPasscode) {
      if (code.length < 6) return setError("Use at least 6 characters.");
      if (code !== confirm) return setError("Passcodes don't match.");
      setBusy(true);
      await settings.setPasscode(code);
      onUnlock();
      return;
    }
    setBusy(true);
    if (await settings.checkPasscode(code)) onUnlock();
    else setError("Incorrect passcode.");
    setBusy(false);
  };

  return (
    <main className="flex min-h-svh items-center justify-center p-5">
      <form onSubmit={submit} className="glass-strong w-full max-w-sm rounded-[2rem] p-8">
        <DotRing
          className="mx-auto h-14 w-14"
          rings={[
            { r: 80, count: 12, dot: 9, className: "fill-primary" },
            { r: 52, count: 10, dot: 6.5, className: "fill-slate" },
          ]}
        />
        <h1 className="mt-5 text-center text-2xl font-semibold">
          {hasPasscode ? "Welcome back" : "Set up your dashboard"}
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          {hasPasscode
            ? "Enter the dashboard passcode."
            : "Create a passcode to lock the TIC Wireless dashboard on this device."}
        </p>
        <div className="mt-6 space-y-3">
          <Field label="Passcode">
            <Input
              type="password"
              autoFocus
              autoComplete={hasPasscode ? "current-password" : "new-password"}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </Field>
          {!hasPasscode && (
            <Field label="Confirm passcode">
              <Input
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </Field>
          )}
          {error && <p className="text-sm text-red-300">{error}</p>}
          <Button tone="primary" size="lg" className="w-full" type="submit" disabled={busy}>
            <Lock className="h-4 w-4" /> {hasPasscode ? "Unlock" : "Create passcode"}
          </Button>
        </div>
        <p className="mt-5 text-center text-xs text-muted-foreground">
          Local mode — data is stored on this device only.
        </p>
      </form>
    </main>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav aria-label="Dashboard" className="space-y-1">
      {NAV.map(({ to, label, icon: Icon, ...rest }) => {
        const active = "exact" in rest ? pathname === to : pathname.startsWith(to);
        return (
          <Link
            key={to}
            to={to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
              active
                ? "glass text-foreground"
                : "text-muted-foreground hover:bg-white/6 hover:text-foreground",
            )}
          >
            <Icon className={cn("h-4 w-4", active && "text-primary")} />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  return (
    <Link to="/admin" className="flex items-center gap-2.5 px-2">
      <DotRing
        className="h-8 w-8"
        rings={[
          { r: 80, count: 12, dot: 9, className: "fill-primary" },
          { r: 52, count: 10, dot: 6.5, className: "fill-slate" },
        ]}
      />
      <span>
        <span className="block text-sm font-semibold leading-tight">TIC Wireless</span>
        <span className="block text-xs text-muted-foreground">Store dashboard</span>
      </span>
    </Link>
  );
}

function Shell({ onLock, demo }: { onLock: () => void; demo: boolean }) {
  const [open, setOpen] = useState(false);
  const footer = (
    <div className="space-y-1">
      <ThemeSwitcher
        storageKey={ADMIN_THEME_KEY}
        showLabel
        className="w-full rounded-xl px-3 py-2.5 text-muted-foreground hover:bg-white/6 hover:text-foreground"
      />
      <a
        href="/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-white/6 hover:text-foreground"
      >
        <ExternalLink className="h-4 w-4" /> View website
      </a>
      <button
        type="button"
        onClick={onLock}
        className="flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground transition hover:bg-white/6 hover:text-foreground"
      >
        <Lock className="h-4 w-4" /> Lock dashboard
      </button>
    </div>
  );

  return (
    <div className="lg:pl-72">
      {/* Desktop sidebar */}
      <aside className="glass fixed inset-y-3 left-3 z-30 hidden w-64 flex-col justify-between rounded-3xl p-4 lg:flex">
        <div>
          <Brand />
          <div className="mt-8">
            <NavLinks />
          </div>
        </div>
        {footer}
      </aside>

      {/* Mobile top bar + drawer */}
      <div className="glass sticky top-0 z-30 flex items-center justify-between rounded-b-2xl px-4 py-3 lg:hidden">
        <Brand />
        <Button tone="ghost" size="sm" aria-label="Open menu" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="glass-strong absolute inset-y-3 left-3 flex w-72 flex-col justify-between rounded-3xl p-4">
            <div>
              <div className="flex items-center justify-between">
                <Brand />
                <Button
                  tone="ghost"
                  size="sm"
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="mt-8">
                <NavLinks onNavigate={() => setOpen(false)} />
              </div>
            </div>
            {footer}
          </aside>
        </div>
      )}

      <main className="mx-auto max-w-[1400px] px-4 pb-16 pt-6 sm:px-6 lg:px-8 lg:pt-8">
        {demo && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-400/25 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            <span>
              <strong className="font-semibold">Sample data.</strong> Products, staff, shifts and
              website numbers are placeholders so you can explore. Clear them in Settings when
              you're ready to go live.
            </span>
            <Link
              to="/admin/settings"
              className="rounded-lg bg-amber-400/20 px-3 py-1.5 font-medium hover:bg-amber-400/30"
            >
              Go to Settings
            </Link>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}
