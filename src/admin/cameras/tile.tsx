import { useRef, useState } from "react";
import { Camera as CameraIcon, Maximize2, RotateCw, Settings2, VideoOff } from "lucide-react";
import { toast } from "sonner";

import { CameraPlayer, type PlayerHandle, type StreamStatus } from "@/admin/cameras/players";
import { saveSnapshot } from "@/admin/cameras/snapshot";
import { isConnected } from "@/admin/cameras/sources";
import type { Camera, CameraPlaceholder } from "@/admin/types";
import { cn } from "@/lib/utils";
import storefront from "@/assets/photos/storefront-3640-sm.jpg";
import counter from "@/assets/photos/store-counter-sm.jpg";
import caseWall from "@/assets/photos/case-wall-sm.jpg";
import display from "@/assets/photos/jbl-display-sm.jpg";
import apple from "@/assets/photos/apple-display-sm.jpg";
import plaza from "@/assets/photos/plaza-sm.jpg";

const PLACEHOLDER_IMAGES: Record<CameraPlaceholder, string> = {
  storefront,
  counter,
  "case-wall": caseWall,
  display,
  apple,
  plaza,
};

export function CameraTile({
  camera,
  now,
  large,
  onOpen,
  onEdit,
  onStatus,
}: {
  camera: Camera;
  now: number;
  large?: boolean;
  onOpen?: () => void;
  onEdit: () => void;
  onStatus?: (s: StreamStatus) => void;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const player = useRef<PlayerHandle>(null);
  const [status, setStatus] = useState<StreamStatus>("idle");
  const [detail, setDetail] = useState<string | undefined>();
  const [attempt, setAttempt] = useState(0);
  const connected = isConnected(camera);

  const snapshot = async () => {
    const el = player.current?.frame();
    if (!el) return void toast.error("Snapshots aren't available for this camera type");
    try {
      await saveSnapshot(el, camera.name);
      toast.success("Snapshot saved");
    } catch {
      toast.error("This camera system doesn't allow snapshots from the browser");
    }
  };

  return (
    <div
      ref={wrap}
      className={cn(
        "group relative overflow-hidden bg-black ring-1 ring-white/10",
        large ? "aspect-video rounded-2xl" : "aspect-video rounded-2xl",
      )}
    >
      {connected ? (
        <CameraPlayer
          key={attempt}
          ref={player}
          camera={camera}
          onStatus={(s, d) => {
            setStatus(s);
            setDetail(d);
            onStatus?.(s);
          }}
        />
      ) : (
        <>
          <img
            src={PLACEHOLDER_IMAGES[camera.placeholder]}
            alt=""
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-35 blur-[3px] grayscale"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 ring-1 ring-white/15 backdrop-blur">
              <VideoOff className="h-5 w-5 text-white/80" />
            </span>
            <p className="text-sm font-medium text-white/90">
              {camera.enabled ? "Not connected" : "Turned off"}
            </p>
            <button
              type="button"
              onClick={onEdit}
              className="cursor-pointer rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/20 backdrop-blur transition hover:bg-white/20"
            >
              {camera.enabled ? "Connect" : "Settings"}
            </button>
          </div>
        </>
      )}

      {connected && status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/70 p-4 text-center backdrop-blur-sm">
          <VideoOff className="h-6 w-6 text-red-300" />
          <p className="text-sm font-medium text-white">Can't reach this camera</p>
          {detail && <p className="max-w-xs text-xs text-white/60">{detail}</p>}
          <div className="mt-1 flex gap-2">
            <button
              type="button"
              onClick={() => setAttempt((a) => a + 1)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs text-white hover:bg-white/25"
            >
              <RotateCw className="h-3 w-3" /> Retry
            </button>
            <button
              type="button"
              onClick={onEdit}
              className="cursor-pointer rounded-full bg-white/15 px-3 py-1 text-xs text-white hover:bg-white/25"
            >
              Settings
            </button>
          </div>
        </div>
      )}

      {/* Top overlay: name, zone, status */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between gap-2 bg-gradient-to-b from-black/70 to-transparent p-3">
        <div className="min-w-0">
          <p className={cn("truncate font-semibold text-white", large ? "text-base" : "text-sm")}>
            {camera.name}
          </p>
          <p className="text-[11px] text-white/60">{camera.zone}</p>
        </div>
        {connected && <StatusPill status={status} />}
      </div>

      {/* Bottom overlay: timestamp + actions */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent p-3">
        <span className="tabular rounded bg-black/40 px-1.5 py-0.5 font-mono text-[11px] text-white/80">
          {new Date(now).toLocaleString("en-US", {
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          })}
        </span>
        <div className="pointer-events-auto flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          {connected && (
            <TileButton label="Snapshot" onClick={() => void snapshot()}>
              <CameraIcon className="h-4 w-4" />
            </TileButton>
          )}
          <TileButton label="Camera settings" onClick={onEdit}>
            <Settings2 className="h-4 w-4" />
          </TileButton>
          <TileButton
            label={onOpen ? "Open" : "Full screen"}
            onClick={() => (onOpen ? onOpen() : void wrap.current?.requestFullscreen?.())}
          >
            <Maximize2 className="h-4 w-4" />
          </TileButton>
        </div>
      </div>
    </div>
  );
}

function TileButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-black/50 text-white ring-1 ring-white/15 backdrop-blur transition hover:bg-white/20"
    >
      {children}
    </button>
  );
}

function StatusPill({ status }: { status: StreamStatus }) {
  if (status === "live")
    return (
      <span className="flex items-center gap-1.5 rounded-full bg-red-600/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> Live
      </span>
    );
  if (status === "error")
    return (
      <span className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-red-300">
        Offline
      </span>
    );
  return (
    <span className="rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/70">
      Connecting
    </span>
  );
}
