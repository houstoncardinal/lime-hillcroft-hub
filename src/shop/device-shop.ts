import { useEffect, useState } from "react";

import { getDevicePrices, type DevicePrice } from "@/shop/storefront";

// Links /devices pages to their Shopify products. The Shopify handle is the device id, except
// where the site's id predates the Shopify import (docs/shopify/tic-wireless-devices-shopify.csv).
const HANDLES: Record<string, string> = { "iphone-18": "iphone-18-pro-max" };

export const shopHandle = (deviceId: string) => HANDLES[deviceId] ?? deviceId;

let prices: Promise<Record<string, DevicePrice>> | null = null;

/**
 * Live "from" prices for every device in Shopify, fetched once per visit and shared by all cards.
 * Empty until loaded, and stays empty when the store isn't connected.
 */
export function useDevicePrices() {
  const [data, setData] = useState<Record<string, DevicePrice>>({});
  useEffect(() => {
    let live = true;
    prices ??= getDevicePrices().catch(() => ({}));
    void prices.then((p) => live && setData(p));
    return () => {
      live = false;
    };
  }, []);
  return data;
}
