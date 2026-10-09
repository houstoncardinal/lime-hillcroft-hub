import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Bell,
  Cctv,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  MapPin,
  Plus,
  Radio,
  Square,
  Columns2,
  VideoOff,
} from "lucide-react";

import { CameraEditor } from "@/admin/cameras/editor";
import type { StreamStatus } from "@/admin/cameras/players";
import { SOURCE_INFO, isConnected } from "@/admin/cameras/sources";
import { CameraTile } from "@/admin/cameras/tile";
import { useNow } from "@/admin/hooks";
import { useAdminData } from "@/admin/store";
import type { Camera, CameraZone } from "@/admin/types";
import { Badge, Button, CardTitle, GlassCard, PageHeader, StatTile } from "@/admin/ui";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/admin/cameras")({
  component: Cameras,
});

const LAYOUTS = [
  { cols: 1, icon: Square, label: "1 per row" },
  { cols: 2, icon: Columns2, label: "2 per row" },
  { cols: 3, icon: LayoutGrid, label: "3 per row" },
] as const;
const GRID: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 xl:grid-cols-3",
};
const LAYOUT_KEY = "tic-camera-layout";

function Cameras() {
  const data = useAdminData();
  const now = useNow(1000);
  const [cols, setCols] = useState<number>(() => {
    try {
      return Number(localStorage.getItem(LAYOUT_KEY)) || 3;
    } catch {
      return 3;
    }
  });
  const [zone, setZone] = useState<CameraZone | "all">("all");
  const [editing, setEditing] = useState<Camera | "new" | null>(null);
  const [focusId, setFocusId] = useState<string | null>(null);
  const [statuses, setStatuses] = useState<Record<string, StreamStatus>>({});

  const all = data.cameras;
  const zones = [...new Set(all.map((c) => c.zone))];
  const shown = all.filter((c) => zone === "all" || c.zone === zone);
  const connected = all.filter(isConnected);
  const live = connected.filter((c) => statuses[c.id] === "live").length;
  const focusIndex = shown.findIndex((c) => c.id === focusId);
  const focus = shown[focusIndex];

  const chooseLayout = (n: number) => {
    setCols(n);
    try {
      localStorage.setItem(LAYOUT_KEY, String(n));
    } catch {
      // ignore
    }
  };

  return (
    <>
      <PageHeader
        title="Cameras"
        description="Live view of every store camera in one place. Slots are ready — connect each one when your camera system is installed."
        actions={
          <>
            <div className="glass flex gap-1 rounded-xl p-1" role="group" aria-label="Layout">
              {LAYOUTS.map((l) => (
                <button
                  key={l.cols}
                  type="button"
                  aria-label={l.label}
                  aria-pressed={cols === l.cols}
                  title={l.label}
                  onClick={() => chooseLayout(l.cols)}
                  className={cn(
                    "flex h-8 w-9 cursor-pointer items-center justify-center rounded-lg transition",
                    cols === l.cols
                      ? "bg-white/12 text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <l.icon className="h-4 w-4" />
                </button>
              ))}
            </div>
            <Button tone="primary" onClick={() => setEditing("new")}>
              <Plus className="h-4 w-4" /> Add camera
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        <StatTile
          label="Cameras"
          value={all.length.toString()}
          icon={Cctv}
          hint={`${all.filter((c) => c.enabled).length} shown on the wall`}
        />
        <StatTile
          label="Live now"
          value={`${live}`}
          icon={Radio}
          hint={connected.length ? `of ${connected.length} connected` : "None connected yet"}
        />
        <StatTile
          label="Waiting to connect"
          value={(all.length - connected.length).toString()}
          icon={VideoOff}
          hint="Slots ready for your system"
        />
        <StatTile
          label="Areas covered"
          value={zones.length.toString()}
          icon={MapPin}
          hint={zones.slice(0, 3).join(" · ") || "—"}
        />
      </div>

      {zones.length > 1 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {(["all", ...zones] as const).map((z) => (
            <button
              key={z}
              type="button"
              aria-pressed={zone === z}
              onClick={() => setZone(z)}
              className={cn(
                "cursor-pointer rounded-full px-4 py-1.5 text-sm font-medium transition",
                zone === z
                  ? "bg-primary text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground",
              )}
            >
              {z === "all" ? "All areas" : z}
            </button>
          ))}
        </div>
      )}

      <GlassCard className="mt-4 p-4">
        {shown.length === 0 ? (
          <div className="flex flex-col items-center py-16 text-center">
            <Cctv className="h-8 w-8 text-primary" />
            <p className="mt-3 font-semibold">No cameras yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add a slot for each camera in the store.
            </p>
            <Button tone="primary" className="mt-5" onClick={() => setEditing("new")}>
              <Plus className="h-4 w-4" /> Add camera
            </Button>
          </div>
        ) : (
          <div className={cn("grid gap-3", GRID[cols])}>
            {shown.map((c) => (
              <CameraTile
                key={`${c.id}-${c.source}-${c.url}-${c.deviceId}-${c.enabled}`}
                camera={c}
                now={now}
                onOpen={() => setFocusId(c.id)}
                onEdit={() => setEditing(c)}
                onStatus={(s) => setStatuses((m) => (m[c.id] === s ? m : { ...m, [c.id]: s }))}
              />
            ))}
          </div>
        )}
      </GlassCard>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_1.2fr]">
        <GlassCard>
          <CardTitle
            title="Activity"
            description="Motion, people and alerts from your camera system"
            actions={<Badge tone="info">Ready</Badge>}
          />
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-white/12 px-6 py-10 text-center">
            <Bell className="h-6 w-6 text-primary" />
            <p className="mt-3 text-sm font-medium">No events yet</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Once the camera system is connected, motion and person alerts with snapshots will show
              up here, newest first.
            </p>
          </div>
        </GlassCard>

        <GlassCard>
          <CardTitle
            title="Connecting your camera system"
            description="About 15 minutes once the cameras are installed"
          />
          <ol className="space-y-4 text-sm">
            {[
              [
                "Install the cameras and recorder",
                "Any IP camera system works — the recorder (NVR) or a small bridge app publishes each camera for browsers.",
              ],
              [
                "Publish each camera over https",
                "Turn on HLS or WebRTC in your recorder, or run go2rtc / MediaMTX / Frigate on a store computer in front of the RTSP cameras.",
              ],
              [
                "Paste each address into its slot",
                "Open a slot → Connect → pick the connection type → Test connection → Save.",
              ],
              [
                "Use a viewer account",
                "Give the dashboard a camera account that can only watch, not change settings.",
              ],
            ].map(([t, b], i) => (
              <li key={t} className="flex gap-3">
                <span className="tabular flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium">{t}</p>
                  <p className="mt-0.5 text-muted-foreground">{b}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-xs text-muted-foreground">
            Supported:{" "}
            {(["hls", "webrtc", "mjpeg", "snapshot", "embed"] as const)
              .map((s) => SOURCE_INFO[s].label.split(" (")[0]?.split(" —")[0])
              .join(" · ")}
            . Want to try it now? Add a camera with “This device's camera”.
          </p>
        </GlassCard>
      </div>

      {focus && (
        <Dialog open onOpenChange={(o) => !o && setFocusId(null)}>
          <DialogContent className="glass-strong w-[calc(100%-1rem)] rounded-3xl border-white/10 p-4 text-foreground sm:max-w-5xl sm:p-5">
            <div className="flex items-center justify-between gap-3 pr-8">
              <div>
                <DialogTitle className="text-lg">{focus.name}</DialogTitle>
                <DialogDescription className="text-xs">
                  {focus.zone} · {SOURCE_INFO[focus.source].label}
                </DialogDescription>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  tone="ghost"
                  aria-label="Previous camera"
                  disabled={focusIndex <= 0}
                  onClick={() => setFocusId(shown[focusIndex - 1]?.id ?? null)}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="tabular self-center text-xs text-muted-foreground">
                  {focusIndex + 1} / {shown.length}
                </span>
                <Button
                  size="sm"
                  tone="ghost"
                  aria-label="Next camera"
                  disabled={focusIndex >= shown.length - 1}
                  onClick={() => setFocusId(shown[focusIndex + 1]?.id ?? null)}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CameraTile
              key={`focus-${focus.id}`}
              camera={focus}
              now={now}
              large
              onEdit={() => {
                setFocusId(null);
                setEditing(focus);
              }}
            />
          </DialogContent>
        </Dialog>
      )}

      {editing && (
        <CameraEditor
          camera={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  );
}
