import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";

import type { Camera } from "@/admin/types";

// Browser players for the stream formats camera systems (or a bridge such as go2rtc,
// MediaMTX or Frigate in front of RTSP cameras) can publish. Each reports its status.

export type StreamStatus = "idle" | "connecting" | "live" | "error";

export type PlayerHandle = {
  /** The element to capture a snapshot from, if the stream allows it. */
  frame: () => HTMLVideoElement | HTMLImageElement | null;
};

type PlayerProps = {
  camera: Camera;
  onStatus: (s: StreamStatus, detail?: string) => void;
  className?: string;
};

const VIDEO_CLASS = "h-full w-full object-cover";

export const CameraPlayer = forwardRef<PlayerHandle, PlayerProps>(function CameraPlayer(
  { camera, onStatus, className },
  ref,
) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [snapshotTick, setSnapshotTick] = useState(0);
  const status = useRef(onStatus);
  status.current = onStatus;

  useImperativeHandle(ref, () => ({ frame: () => videoRef.current ?? imgRef.current }));

  // Video-based sources: device, HLS, WebRTC (WHEP).
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !["device", "hls", "webrtc"].includes(camera.source)) return;
    let cancelled = false;
    let cleanup = () => {};
    const report = (s: StreamStatus, detail?: string) => !cancelled && status.current(s, detail);
    report("connecting");
    video.onplaying = () => report("live");

    (async () => {
      try {
        if (camera.source === "device") {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: camera.deviceId ? { deviceId: { exact: camera.deviceId } } : true,
            audio: false,
          });
          if (cancelled) return stream.getTracks().forEach((t) => t.stop());
          video.srcObject = stream;
          cleanup = () => stream.getTracks().forEach((t) => t.stop());
        } else if (camera.source === "hls") {
          // Prefer hls.js (frames stay capturable for snapshots); native playback is the
          // fallback for browsers without Media Source support (older iPhones).
          const { default: Hls } = await import("hls.js");
          if (Hls.isSupported()) {
            const hls = new Hls({ lowLatencyMode: true, liveSyncDurationCount: 2 });
            hls.on(Hls.Events.ERROR, (_e, data) => {
              if (data.fatal) report("error", "Stream could not be loaded");
            });
            hls.loadSource(camera.url);
            hls.attachMedia(video);
            cleanup = () => hls.destroy();
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = camera.url;
            video.onerror = () => report("error", "Stream could not be loaded");
          } else {
            return report("error", "HLS isn't supported in this browser");
          }
        } else {
          const pc = new RTCPeerConnection();
          pc.addTransceiver("video", { direction: "recvonly" });
          pc.addTransceiver("audio", { direction: "recvonly" });
          pc.ontrack = (e) => {
            if (e.streams[0]) video.srcObject = e.streams[0];
          };
          pc.onconnectionstatechange = () => {
            if (pc.connectionState === "failed") report("error", "WebRTC connection failed");
          };
          cleanup = () => pc.close();
          await pc.setLocalDescription(await pc.createOffer());
          const res = await fetch(camera.url, {
            method: "POST",
            headers: { "Content-Type": "application/sdp" },
            body: pc.localDescription?.sdp ?? "",
          });
          if (!res.ok) throw new Error(`WHEP server responded ${res.status}`);
          await pc.setRemoteDescription({ type: "answer", sdp: await res.text() });
        }
        await video.play().catch(() => undefined);
      } catch (e) {
        const err = e as DOMException;
        report(
          "error",
          err.name === "NotAllowedError"
            ? "Camera permission was blocked"
            : err.message || "Could not connect",
        );
      }
    })();

    return () => {
      cancelled = true;
      video.onplaying = null;
      video.onerror = null;
      cleanup();
      video.removeAttribute("src");
      video.srcObject = null;
    };
  }, [camera.source, camera.url, camera.deviceId]);

  // Snapshot sources refresh on an interval.
  useEffect(() => {
    if (camera.source !== "snapshot") return;
    const id = setInterval(
      () => setSnapshotTick((t) => t + 1),
      Math.max(1, camera.refreshSeconds) * 1000,
    );
    return () => clearInterval(id);
  }, [camera.source, camera.refreshSeconds]);

  useEffect(() => {
    if (["mjpeg", "snapshot", "embed"].includes(camera.source)) status.current("connecting");
  }, [camera.source, camera.url]);

  if (camera.source === "mjpeg" || camera.source === "snapshot") {
    const src =
      camera.source === "snapshot"
        ? `${camera.url}${camera.url.includes("?") ? "&" : "?"}_t=${snapshotTick}`
        : camera.url;
    return (
      <img
        ref={imgRef}
        src={src}
        alt=""
        onLoad={() => status.current("live")}
        onError={() => status.current("error", "Image stream could not be loaded")}
        className={className ?? VIDEO_CLASS}
      />
    );
  }

  if (camera.source === "embed") {
    return (
      <iframe
        src={camera.url}
        title={camera.name}
        allow="autoplay; fullscreen"
        sandbox="allow-scripts allow-same-origin allow-popups"
        referrerPolicy="no-referrer"
        onLoad={() => status.current("live")}
        className={`${className ?? VIDEO_CLASS} border-0 bg-black`}
      />
    );
  }

  return <video ref={videoRef} muted playsInline autoPlay className={className ?? VIDEO_CLASS} />;
});
