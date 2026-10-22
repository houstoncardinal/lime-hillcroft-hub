import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, MailCheck, ShoppingBag, UserRound } from "lucide-react";
import { useState, type FormEvent } from "react";

import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/shop/use-session";
import { Button } from "@/components/ui/button";

const T = {
  en: {
    title: "Your TIC Wireless account",
    subtitle: "Sign in or create an account to keep your cart on every device.",
    signIn: "Sign in",
    signUp: "Create account",
    email: "Email",
    password: "Password",
    passwordHint: "At least 6 characters",
    emailPlaceholder: "you@example.com",
    passwordPlaceholder: "Your password",
    newPasswordPlaceholder: "Choose a password",
    signingIn: "Signing in…",
    creating: "Creating your account…",
    checkEmail: "Check your email",
    checkEmailBody:
      "We sent you a confirmation link. Open it to finish creating your account, then come back to sign in.",
    backToShop: "Back to the shop",
    continueShopping: "Continue shopping",
    signedInAs: "You're signed in as",
    signOut: "Sign out",
    badCredentials: "That email and password didn't match. Try again.",
    genericError: "Something went wrong. Please try again.",
  },
  es: {
    title: "Tu cuenta de TIC Wireless",
    subtitle: "Inicia sesión o crea una cuenta para mantener tu carrito en todos tus dispositivos.",
    signIn: "Iniciar sesión",
    signUp: "Crear cuenta",
    email: "Correo electrónico",
    password: "Contraseña",
    passwordHint: "Mínimo 6 caracteres",
    emailPlaceholder: "tu@ejemplo.com",
    passwordPlaceholder: "Tu contraseña",
    newPasswordPlaceholder: "Elige una contraseña",
    signingIn: "Iniciando sesión…",
    creating: "Creando tu cuenta…",
    checkEmail: "Revisa tu correo",
    checkEmailBody:
      "Te enviamos un enlace de confirmación. Ábrelo para terminar de crear tu cuenta y luego vuelve para iniciar sesión.",
    backToShop: "Volver a la tienda",
    continueShopping: "Seguir comprando",
    signedInAs: "Iniciaste sesión como",
    signOut: "Cerrar sesión",
    badCredentials: "Ese correo y contraseña no coinciden. Intenta de nuevo.",
    genericError: "Algo salió mal. Intenta de nuevo.",
  },
};

type Search = { redirect?: string | undefined; lang?: "es" | undefined };

/** Only same-origin paths may be redirect targets — never an external URL. */
function safeRedirect(value: string | undefined): string | null {
  if (!value || !value.startsWith("/") || value.startsWith("//")) return null;
  return value;
}

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): Search => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
    lang: search.lang === "es" ? "es" : undefined,
  }),
  head: ({ search }) => {
    const es = (search as Search).lang === "es";
    return {
      meta: [
        { title: es ? "Iniciar sesión — TIC Wireless" : "Sign in — TIC Wireless" },
        {
          name: "description",
          content: es
            ? "Inicia sesión o crea tu cuenta de TIC Wireless para guardar tu carrito en todos tus dispositivos."
            : "Sign in or create your TIC Wireless account to keep your cart on every device.",
        },
        { property: "og:title", content: es ? "Iniciar sesión — TIC Wireless" : "Sign in — TIC Wireless" },
        {
          property: "og:description",
          content: es
            ? "Inicia sesión o crea tu cuenta de TIC Wireless para guardar tu carrito en todos tus dispositivos."
            : "Sign in or create your TIC Wireless account to keep your cart on every device.",
        },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { name: "robots", content: "noindex" },
      ],
    };
  },
  component: AuthPage,
});

function AuthPage() {
  const { redirect, lang } = Route.useSearch();
  const es = lang === "es";
  const t = T[es ? "es" : "en"];
  const navigate = useNavigate();
  const session = useSession();

  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmSent, setConfirmSent] = useState(false);

  const shopPath = es ? "/es/tienda" : "/shop";
  const destination = safeRedirect(redirect) ?? shopPath;

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      if (mode === "signIn") {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password });
        if (err) {
          setError(t.badCredentials);
          return;
        }
        void navigate({ to: destination });
      } else {
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth` },
        });
        if (err) {
          setError(err.message || t.genericError);
          return;
        }
        // With email confirmation on, signUp returns no session until the link is clicked.
        if (!data.session) setConfirmSent(true);
        else void navigate({ to: destination });
      }
    } catch {
      setError(t.genericError);
    } finally {
      setBusy(false);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    void navigate({ to: destination });
  };

  const inputClass =
    "h-12 w-full rounded-xl border border-input bg-background px-4 text-sm text-foreground outline-none transition focus:ring-2 focus:ring-primary";

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-16">
      <div className="w-full max-w-md">
        <div className="text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <UserRound className="h-7 w-7" aria-hidden="true" />
          </span>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-foreground">{t.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.subtitle}</p>
        </div>

        {session.ready && session.email ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <p className="text-sm text-muted-foreground">{t.signedInAs}</p>
            <p className="mt-1 truncate font-semibold text-foreground">{session.email}</p>
            <div className="mt-5 flex flex-col gap-2">
              <Button onClick={() => void navigate({ to: destination })}>
                <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                {t.continueShopping}
              </Button>
              <Button variant="outline" onClick={() => void signOut()}>
                {t.signOut}
              </Button>
            </div>
          </div>
        ) : confirmSent ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MailCheck className="h-6 w-6" aria-hidden="true" />
            </span>
            <h2 className="mt-3 text-lg font-semibold text-foreground">{t.checkEmail}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t.checkEmailBody}</p>
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => {
                setConfirmSent(false);
                setMode("signIn");
              }}
            >
              {t.signIn}
            </Button>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
            <div className="grid grid-cols-2 gap-1 rounded-xl bg-secondary p-1">
              {(["signIn", "signUp"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => {
                    setMode(m);
                    setError(null);
                  }}
                  aria-pressed={mode === m}
                  className={
                    mode === m
                      ? "h-10 rounded-lg bg-background text-sm font-semibold text-foreground shadow"
                      : "h-10 rounded-lg text-sm font-semibold text-muted-foreground transition hover:text-foreground"
                  }
                >
                  {m === "signIn" ? t.signIn : t.signUp}
                </button>
              ))}
            </div>

            <form onSubmit={(e) => void submit(e)} className="mt-5 space-y-4">
              <div>
                <label htmlFor="auth-email" className="mb-1.5 block text-sm font-medium text-foreground">
                  {t.email}
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t.emailPlaceholder}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="auth-password" className="mb-1.5 block text-sm font-medium text-foreground">
                  {t.password}
                </label>
                <input
                  id="auth-password"
                  type="password"
                  required
                  minLength={6}
                  autoComplete={mode === "signIn" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "signIn" ? t.passwordPlaceholder : t.newPasswordPlaceholder}
                  className={inputClass}
                />
                {mode === "signUp" && (
                  <p className="mt-1.5 text-xs text-muted-foreground">{t.passwordHint}</p>
                )}
              </div>
              {error && (
                <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm font-medium text-destructive">
                  {error}
                </p>
              )}
              <Button type="submit" disabled={busy} className="h-12 w-full text-base">
                {busy && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                {busy
                  ? mode === "signIn"
                    ? t.signingIn
                    : t.creating
                  : mode === "signIn"
                    ? t.signIn
                    : t.signUp}
              </Button>
            </form>
          </div>
        )}

        <p className="mt-6 text-center">
          <Link to={shopPath} className="text-sm font-medium text-primary hover:underline">
            {t.backToShop}
          </Link>
        </p>
      </div>
    </div>
  );
}
