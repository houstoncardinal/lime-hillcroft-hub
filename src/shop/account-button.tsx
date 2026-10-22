import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { LogOut, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import type { Lang } from "@/components/site/seo";
import { signOutCustomer, useSession } from "@/shop/use-session";

const T = {
  en: { signIn: "Sign in", account: "Your account", signOut: "Sign out", signedInAs: "Signed in as" },
  es: { signIn: "Entrar", account: "Tu cuenta", signOut: "Cerrar sesión", signedInAs: "Sesión iniciada como" },
};

/**
 * Header sign-in affordance. Signed out: a "Sign in" pill that remembers where the shopper was.
 * Signed in: their email with a sign-out menu. Renders nothing until the session check finishes,
 * so the header never flashes the wrong state.
 */
export function AccountButton({ lang }: { lang: Lang }) {
  const t = T[lang];
  const { ready, email } = useSession();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  if (!ready) return null;

  if (!email) {
    return (
      <Link
        to="/auth"
        search={{ lang: lang === "es" ? "es" : undefined, redirect: pathname }}
        className="inline-flex h-11 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-white/80 ring-1 ring-white/20 transition hover:bg-white/10 hover:text-white"
      >
        <UserRound className="h-4 w-4 text-primary" aria-hidden="true" />
        <span className="hidden sm:inline">{t.signIn}</span>
      </Link>
    );
  }

  return (
    <div ref={wrap} className="relative">
      <button
        type="button"
        aria-label={t.account}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-primary ring-1 ring-primary/40 transition hover:bg-primary hover:text-primary-foreground"
      >
        <UserRound className="h-5 w-5" aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-ink/10 bg-white p-3 text-ink shadow-2xl shadow-ink/25 ring-1 ring-black/5">
          <p className="px-2 text-xs font-medium text-muted-foreground">{t.signedInAs}</p>
          <p className="truncate px-2 text-sm font-semibold text-ink">{email}</p>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              void signOutCustomer().then(() => navigate({ to: ALTERNATE_HOME[lang] }));
            }}
            className="mt-2 flex h-10 w-full items-center gap-2 rounded-xl px-3 text-sm font-semibold text-ink transition hover:bg-secondary"
          >
            <LogOut className="h-4 w-4 text-primary" aria-hidden="true" />
            {t.signOut}
          </button>
        </div>
      )}
    </div>
  );
}

const ALTERNATE_HOME: Record<Lang, string> = { en: "/", es: "/es" };
