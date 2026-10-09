import type { Camera, CameraSource } from "@/admin/types";

export const SOURCE_INFO: Record<
  CameraSource,
  { label: string; hint: string; placeholder: string }
> = {
  none: {
    label: "Not connected yet",
    hint: "Keep this slot ready and connect it when your camera system is installed.",
    placeholder: "",
  },
  hls: {
    label: "HLS stream (.m3u8)",
    hint: "Most recorders (NVRs) and bridges like go2rtc, MediaMTX and Frigate can publish HLS. A few seconds of delay.",
    placeholder: "https://cameras.example.com/front/index.m3u8",
  },
  webrtc: {
    label: "WebRTC (WHEP) — lowest delay",
    hint: "Near-instant video from a go2rtc or MediaMTX WHEP endpoint.",
    placeholder: "https://cameras.example.com/front/whep",
  },
  mjpeg: {
    label: "MJPEG stream",
    hint: "A continuous image stream many IP cameras offer out of the box.",
    placeholder: "https://cameras.example.com/front/mjpeg",
  },
  snapshot: {
    label: "Snapshot image (auto-refresh)",
    hint: "A still image URL that refreshes every few seconds. Works with almost any camera.",
    placeholder: "https://cameras.example.com/front/snapshot.jpg",
  },
  embed: {
    label: "Embed / share link",
    hint: "A shareable live-view page from a cloud camera service.",
    placeholder: "https://…",
  },
  device: {
    label: "This device's camera",
    hint: "A USB or built-in camera on this computer or tablet — handy for testing the wall.",
    placeholder: "",
  },
};

export const isConnected = (c: Camera) => c.enabled && c.source !== "none";
