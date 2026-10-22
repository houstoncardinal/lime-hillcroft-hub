import { Link, useRouterState } from "@tanstack/react-router";
import * as Nav from "@radix-ui/react-navigation-menu";
import { ArrowRight, ChevronDown, ShoppingBag } from "lucide-react";
import { useRef, useState, type MouseEvent } from "react";

import { serviceNav, type NavItem } from "@/components/site/nav";
import { ALTERNATES, type Lang } from "@/components/site/seo";
import { servicePath } from "@/components/services/paths";
import { cn } from "@/lib/utils";

const T = {
  en: {
    products: "Products",
    services: "Services",
    leasing: "Leasing",
    prepaid: "Prepaid",
    location: "Location",
    allServices: "All services",
  },
  es: {
    products: "Productos",
    services: "Servicios",
    leasing: "Arrendamiento",
    prepaid: "Prepago",
    location: "Ubicación",
    allServices: "Todos los servicios",
  },
};

const trigger =
  "group inline-flex h-10 cursor-pointer items-center gap-1 rounded-full px-2.5 text-sm xl:px-3 text-white/75 outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-primary data-[state=open]:bg-white/10 data-[state=open]:text-white";

function Panel({
  items,
  footer,
  wide,
  pathname,
}: {
  pathname: string;
  items: NavItem[];
  footer: { label: string; href: string };
  wide?: boolean;
}) {
  return (
    <Nav.Content className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in-0 data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out-0">
      <div
        className={cn(
          "surface-light rounded-3xl border border-ink/10 bg-white p-3 text-ink shadow-2xl shadow-ink/25 ring-1 ring-black/5",
          wide ? "w-[40rem]" : "w-[34rem]",
        )}
      >
        <ul className="grid grid-cols-2 gap-1">
          {items.map((i) => (
            <li key={i.href}>
              <Nav.Link asChild active={pathname === i.href}>
                <Link
                  to={i.href}
                  aria-current={pathname === i.href ? "page" : undefined}
                  className="group/item flex items-start gap-3 rounded-2xl p-3 outline-none transition hover:bg-secondary focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-primary data-[active]:bg-secondary"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover/item:bg-primary group-hover/item:text-primary-foreground">
                    <i.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-semibold text-ink">{i.label}</span>
                    <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                      {i.hint}
                    </span>
                  </span>
                </Link>
              </Nav.Link>
            </li>
          ))}
        </ul>
        <Nav.Link asChild>
          <Link
            to={footer.href}
            className="mt-2 flex items-center justify-between rounded-2xl bg-ink px-4 py-3 text-sm font-semibold text-white outline-none transition hover:bg-ink-soft focus-visible:ring-2 focus-visible:ring-primary"
          >
            {footer.label} <ArrowRight className="h-4 w-4" />
          </Link>
        </Nav.Link>
      </div>
    </Nav.Content>
  );
}

/** Main navigation for laptops and desktops (lg+): Products and Services dropdowns + key pages. */
export function DesktopNav({ lang }: { lang: Lang }) {
  const t = T[lang];
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // Hovering opens a menu; the click that usually follows shouldn't immediately close it.
  const [value, setValue] = useState("");
  const openedAt = useRef(0);
  const onValueChange = (v: string) => {
    if (v) openedAt.current = Date.now();
    setValue(v);
  };
  const keepOpen = (id: string) => (e: MouseEvent) => {
    if (value === id && Date.now() - openedAt.current < 700) e.preventDefault();
  };
  const link = (label: string, href: string) => (
    <Nav.Item>
      <Nav.Link asChild active={pathname === href}>
        <Link
          to={href}
          className="inline-flex h-10 items-center rounded-full px-2.5 text-sm text-white/75 xl:px-3 transition hover:text-white data-[active]:text-white"
        >
          {label}
        </Link>
      </Nav.Link>
    </Nav.Item>
  );

  return (
    <Nav.Root
      aria-label="Main"
      delayDuration={80}
      value={value}
      onValueChange={onValueChange}
      className="relative hidden lg:block"
    >
      <Nav.List className="flex items-center gap-0.5 xl:gap-1.5">
        {/** Products = the online store: one tap, no dropdown, always visible. */}
        <Nav.Item>
          <Nav.Link asChild active={pathname === ALTERNATES.shop[lang]}>
            <Link
              to={ALTERNATES.shop[lang]}
              aria-current={pathname === ALTERNATES.shop[lang] ? "page" : undefined}
              className={
                pathname === ALTERNATES.shop[lang]
                  ? "inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-2.5 text-sm font-semibold !text-primary-foreground transition xl:px-3"
                  : "inline-flex h-10 items-center gap-1.5 rounded-full bg-primary/15 px-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground xl:px-3"
              }
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {t.products}
            </Link>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item value="services" className="relative">
          <Nav.Trigger className={trigger} onClick={keepOpen("services")}>
            {t.services}
            <ChevronDown
              className="h-3.5 w-3.5 transition group-data-[state=open]:rotate-180"
              aria-hidden="true"
            />
          </Nav.Trigger>
          <Panel
            pathname={pathname}
            items={serviceNav(lang)}
            footer={{ label: t.allServices, href: ALTERNATES.services[lang] }}
            wide
          />
        </Nav.Item>
        {/** The online store is the main commercial page — always one tap away. */}
        <Nav.Item>
          <Nav.Link asChild active={pathname === ALTERNATES.shop[lang]}>
            <Link
              to={ALTERNATES.shop[lang]}
              aria-current={pathname === ALTERNATES.shop[lang] ? "page" : undefined}
              className={
                pathname === ALTERNATES.shop[lang]
                  ? "inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-2.5 text-sm font-semibold !text-primary-foreground transition xl:px-3"
                  : "inline-flex h-10 items-center gap-1.5 rounded-full bg-primary/15 px-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground xl:px-3"
              }
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {t.shop}
            </Link>
          </Nav.Link>
        </Nav.Item>
        {link(t.leasing, ALTERNATES.leasing[lang])}
        {link(t.prepaid, servicePath(lang, "prepaid-plans"))}
        {link(t.location, ALTERNATES.location[lang])}
      </Nav.List>
    </Nav.Root>
  );
}
