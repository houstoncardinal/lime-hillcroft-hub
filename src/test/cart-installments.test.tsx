import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { CartItem } from "@/shop/cart";

const state = vi.hoisted(() => ({
  items: [] as CartItem[],
  busy: false,
  error: null as string | null,
  syncing: false,
  open: true,
  setOpen: vi.fn(),
  setQuantity: vi.fn(),
  removeItem: vi.fn(),
  syncCart: vi.fn(),
  getCheckoutUrl: vi.fn(() => "https://example.com/checkout"),
}));

vi.mock("@/shop/cart", () => ({
  useCartStore: (select: (s: typeof state) => unknown) => select(state),
  useCartSync: () => {},
  useMounted: () => true,
  cartCount: (items: { quantity: number }[]) => items.reduce((n, l) => n + l.quantity, 0),
  cartSubtotal: (items: { price: number; quantity: number }[]) =>
    items.reduce((n, l) => n + l.price * l.quantity, 0),
}));
vi.mock("@/components/site/tidio", () => ({ setChatHidden: vi.fn() }));
vi.mock("@/components/intl/money", () => ({
  Money: ({ usd }: { usd: number }) => <span>{usd.toFixed(2)}</span>,
}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

import { CartDrawer } from "@/shop/components";

const phone: CartItem = {
  variantId: "gid://shopify/ProductVariant/1",
  handle: "iphone-16",
  title: "iPhone 16",
  variantTitle: null,
  price: 82900,
  image: null,
  quantity: 1,
  lineId: "line-1",
  installments: true,
};
const cable: CartItem = {
  ...phone,
  variantId: "gid://shopify/ProductVariant/2",
  handle: "usb-c-cable",
  title: "USB-C Cable",
  price: 1500,
  lineId: "line-2",
  installments: false,
};

afterEach(cleanup);

describe("cart installment labels", () => {
  it("labels an eligible item with the Shop Pay Installments chip even when paying in full", () => {
    state.items = [phone];
    render(<CartDrawer lang="en" />);
    expect(screen.getByText(/or approximately 4 payments of/)).toBeInTheDocument();
    expect(screen.getByText("Installments available:")).toBeInTheDocument();
  });

  it("does not label small accessories", () => {
    state.items = [cable];
    render(<CartDrawer lang="en" />);
    expect(screen.queryByText(/or approximately 4 payments of/)).toBeNull();
    expect(screen.queryByText("Installments available:")).toBeNull();
  });

  it("keeps the selected-plan badge and summary when the plan is selected", () => {
    state.items = [{ ...phone, lease: true }];
    render(<CartDrawer lang="en" />);
    expect(screen.getByText("Installments selected · confirm at checkout")).toBeInTheDocument();
    expect(screen.getByText("Installments selected")).toBeInTheDocument();
  });

  it("uses Spanish labels on the Spanish cart", () => {
    state.items = [phone];
    render(<CartDrawer lang="es" />);
    expect(screen.getByText(/o aproximadamente 4 pagos de/)).toBeInTheDocument();
    expect(screen.getByText("Pagos a plazos disponibles:")).toBeInTheDocument();
  });
});
