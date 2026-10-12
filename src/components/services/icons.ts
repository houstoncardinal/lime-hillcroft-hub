import { Globe, KeyRound, Receipt, Repeat, Router, Smartphone, Wallet, Wrench } from "lucide-react";

import type { Service } from "@/components/services/data";

export const SERVICE_ICONS: Record<Service["icon"], typeof Globe> = {
  phone: Smartphone,
  plans: Wallet,
  internet: Router,
  repair: Wrench,
  unlock: KeyRound,
  trade: Repeat,
  bill: Receipt,
  globe: Globe,
};
