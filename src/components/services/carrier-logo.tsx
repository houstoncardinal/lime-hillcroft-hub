import logo0 from "@/assets/carriers/t-mobile.svg.asset.json";
import logo1 from "@/assets/carriers/verizon.svg.asset.json";
import logo2 from "@/assets/carriers/att.png.asset.json";
import logo3 from "@/assets/carriers/cricket.png.asset.json";
import logo4 from "@/assets/carriers/simple-mobile.png.asset.json";
import logo5 from "@/assets/carriers/tracfone.png.asset.json";
import logo6 from "@/assets/carriers/h2o.png.asset.json";
import logo7 from "@/assets/carriers/lyca.png.asset.json";
import logo8 from "@/assets/carriers/gen-mobile.png.asset.json";
import { cn } from "@/lib/utils";

const LOGOS: Record<string, string> = {
  "t-mobile": logo0.url,
  "verizon": logo1.url,
  "att": logo2.url,
  "cricket": logo3.url,
  "simple-mobile": logo4.url,
  "tracfone": logo5.url,
  "h2o": logo6.url,
  "lyca": logo7.url,
  "gen-mobile": logo8.url,
};

export function CarrierLogo({ id, name, className }: { id: string; name: string; className?: string }) {
  return <span className={cn("inline-flex h-10 w-20 shrink-0 items-center justify-center rounded-md bg-brand-surface px-2", className)}><img src={LOGOS[id]} alt={`${name} logo`} width={100} height={40} className="max-h-full w-full object-contain" decoding="async" /></span>;
}
