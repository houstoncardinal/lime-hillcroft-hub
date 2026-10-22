import {
  Gamepad2,
  Globe,
  Headphones,
  KeyRound,
  Laptop,
  Plug,
  Receipt,
  Repeat,
  Router,
  ShoppingBag,
  Smartphone,
  Wallet,
  Wrench,
} from "lucide-react";

import { servicePath } from "@/components/services/paths";
import { SHOP_ENABLED } from "@/components/site/features";
import { ALTERNATES, type Lang } from "@/components/site/seo";

// One source for the site's navigation: the desktop dropdowns, the mobile menu and the footer
// all list these, so every product and service page is reachable from every device.

export type NavItem = {
  label: string;
  /** One line under the label in the dropdowns. */
  hint: string;
  href: string;
  icon: typeof Smartphone;
};

const L = {
  en: {
    allDevices: ["All phones & tablets", "iPhone 11–18, Galaxy S20–S26 & iPad"],
    phones: ["Unlocked phones", "iPhone, Samsung Galaxy & Motorola"],
    iphone18: ["iPhone 18", "iPhone 18 Pro Max in store, leasing"],
    consoles: ["Game consoles", "PS5, Xbox & Nintendo Switch 2"],
    laptops: ["Laptops & tablets", "MacBook, iPad & Galaxy Tab"],
    accessories: ["Accessories", "Cases, glass, chargers & mounts"],
    audio: ["Audio & smartwatches", "JBL, AirPods, Galaxy Buds & Watch"],
    shop: ["Shop online", "Phones, tablets & accessories"],
    prepaid: ["Prepaid plans & prices", "12 carriers, from $10/mo"],
    repair: ["Phone repair", "Same-day screens & batteries"],
    iphoneRepair: ["iPhone repair", "Screens, batteries & charging ports"],
    samsungRepair: ["Samsung Galaxy repair", "Galaxy & Android screens, batteries"],
    unlocking: ["Phone unlocking", "Use any carrier"],
    xfinity: ["Xfinity Prepaid internet", "Home internet, set up in store"],
    trade: ["Buy · Sell · Trade", "Trade in or sell your phone"],
    bills: ["Bill payments", "Pay your phone bill in person"],
    recharge: ["International recharge", "Top up phones abroad"],
  },
  es: {
    allDevices: ["Todos los celulares y tabletas", "iPhone 11–18, Galaxy S20–S26 y iPad"],
    phones: ["Celulares desbloqueados", "iPhone, Samsung Galaxy y Motorola"],
    iphone18: ["iPhone 18", "iPhone 18 Pro Max en tienda, a pagos"],
    consoles: ["Consolas", "PS5, Xbox y Nintendo Switch 2"],
    laptops: ["Laptops y tabletas", "MacBook, iPad y Galaxy Tab"],
    accessories: ["Accesorios", "Fundas, micas, cargadores y soportes"],
    audio: ["Audio y relojes", "JBL, AirPods, Galaxy Buds y Watch"],
    shop: ["Tienda en línea", "Celulares, tabletas y accesorios"],
    prepaid: ["Planes prepagados y precios", "12 compañías, desde $10/mes"],
    repair: ["Reparación de celulares", "Pantallas y baterías el mismo día"],
    iphoneRepair: ["Reparación de iPhone", "Pantallas, baterías y puertos de carga"],
    samsungRepair: ["Reparación de Samsung", "Pantallas y baterías de Galaxy y Android"],
    unlocking: ["Liberación de celulares", "Usa cualquier compañía"],
    xfinity: ["Internet prepagado Xfinity", "Internet en casa, activado aquí"],
    trade: ["Compra · Venta · Intercambio", "Vende o cambia tu celular"],
    bills: ["Pago de facturas", "Paga tu factura en persona"],
    recharge: ["Recargas internacionales", "Recargas a celulares en el extranjero"],
  },
};

const item = ([label, hint]: string[], href: string, icon: typeof Smartphone): NavItem => ({
  label: label ?? "",
  hint: hint ?? "",
  href,
  icon,
});

/** The kinds of products in the store. */
export function productNav(lang: Lang): NavItem[] {
  const t = L[lang];
  return [
    item(t.allDevices, ALTERNATES.devices[lang], Smartphone),
    item(t.phones, servicePath(lang, "unlocked-phones"), Smartphone),
    item(t.iphone18, ALTERNATES.iphone18[lang], Smartphone),
    item(t.consoles, ALTERNATES.consoles[lang], Gamepad2),
    item(t.laptops, ALTERNATES.laptops[lang], Laptop),
    item(t.accessories, ALTERNATES.accessories[lang], Plug),
    item(t.audio, `${ALTERNATES.accessories[lang]}#audio`, Headphones),
    ...(SHOP_ENABLED ? [item(t.shop, ALTERNATES.shop[lang], ShoppingBag)] : []),
  ];
}

/** Every service page. */
export function serviceNav(lang: Lang): NavItem[] {
  const t = L[lang];
  return [
    item(t.prepaid, servicePath(lang, "prepaid-plans"), Wallet),
    item(t.repair, servicePath(lang, "phone-repair"), Wrench),
    item(t.iphoneRepair, servicePath(lang, "iphone-repair"), Wrench),
    item(t.samsungRepair, servicePath(lang, "samsung-repair"), Wrench),
    item(t.unlocking, servicePath(lang, "phone-unlocking"), KeyRound),
    item(t.xfinity, servicePath(lang, "xfinity-prepaid-internet"), Router),
    item(t.trade, servicePath(lang, "buy-sell-trade"), Repeat),
    item(t.bills, servicePath(lang, "bill-payments"), Receipt),
    item(t.recharge, servicePath(lang, "international-recharge"), Globe),
  ];
}
