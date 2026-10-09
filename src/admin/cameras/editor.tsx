import { useEffect, useState, type FormEvent } from "react";
import { AlertTriangle, ArrowDown, ArrowUp, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { SOURCE_INFO } from "@/admin/cameras/sources";
import { CameraTile } from "@/admin/cameras/tile";
import { useNow } from "@/admin/hooks";
import { cameras, type CameraInput } from "@/admin/store";
import { CAMERA_PLACEHOLDERS, CAMERA_ZONES, type Camera, type CameraSource } from "@/admin/types";
import { Button, Field, Input, Modal, Select } from "@/admin/ui";

export function CameraEditor({ camera, onClose }: { camera: Camera | null; onClose: () => void }) {
  const now = useNow(1000);
  const [form, setForm] = useState<CameraInput>(() =>
    camera
      ? { ...camera }
      : {
          name: "",
          zone: "Sales floor",
          source: "none",
          url: "",
          deviceId: "",
          refreshSeconds: 2,
          enabled: true,
          placeholder: "counter",
        },
  );
  const [preview, setPreview] = useState<CameraInput | null>(
    camera?.source !== "none" ? { ...form } : null,
  );
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const set = <K extends keyof CameraInput>(k: K, v: CameraInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));
  const info = SOURCE_INFO[form.source];
  const needsUrl = !["none", "device"].includes(form.source);

  useEffect(() => {
    if (form.source !== "device") return;
    void navigator.mediaDevices
      ?.enumerateDevices()
      .then((list) => setDevices(list.filter((d) => d.kind === "videoinput")))
      .catch(() => setDevices([]));
  }, [form.source, preview]);

  const warnings: string[] = [];
  if (
    needsUrl &&
    form.url.startsWith("http://") &&
    typeof location !== "undefined" &&
    location.protocol === "https:"
  )
    warnings.push(
      "This dashboard runs on https, so browsers block http:// streams. Use an https address for the camera bridge.",
    );
  if (needsUrl && /\/\/[^/]*:[^/]*@/.test(form.url))
    warnings.push(
      "This address contains a password. It's saved on this device only — prefer a viewer account with no admin rights.",
    );
  if (needsUrl && /^rtsp:/i.test(form.url))
    warnings.push(
      "Browsers can't play rtsp:// directly. Publish it through your recorder or a bridge (go2rtc, MediaMTX) as HLS or WebRTC.",
    );

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return void toast.error("Name the camera");
    if (needsUrl && !/^https?:\/\//i.test(form.url))
      return void toast.error("Enter the camera's https address");
    cameras.save({ ...form, ...(camera ? { id: camera.id } : {}) });
    toast.success(camera ? "Camera updated" : "Camera added");
    onClose();
  };

  return (
    <Modal
      open
      onOpenChange={(o) => !o && onClose()}
      title={camera ? `Camera · ${camera.name}` : "Add camera"}
      wide
    >
      <form onSubmit={submit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name">
            <Input
              autoFocus={!camera}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="Front entrance"
            />
          </Field>
          <Field label="Area">
            <Select
              value={form.zone}
              onChange={(e) => set("zone", e.target.value as CameraInput["zone"])}
            >
              {CAMERA_ZONES.map((z) => (
                <option key={z}>{z}</option>
              ))}
            </Select>
          </Field>
        </div>

        <Field label="Connection type" hint={info.hint}>
          <Select
            value={form.source}
            onChange={(e) => {
              set("source", e.target.value as CameraSource);
              setPreview(null);
            }}
          >
            {(Object.keys(SOURCE_INFO) as CameraSource[]).map((s) => (
              <option key={s} value={s}>
                {SOURCE_INFO[s].label}
              </option>
            ))}
          </Select>
        </Field>

        {needsUrl && (
          <Field label="Address">
            <Input
              value={form.url}
              onChange={(e) => set("url", e.target.value.trim())}
              placeholder={info.placeholder}
              inputMode="url"
              autoComplete="off"
            />
          </Field>
        )}
        {form.source === "snapshot" && (
          <Field label="Refresh every (seconds)">
            <Input
              type="number"
              min={1}
              max={60}
              value={form.refreshSeconds}
              onChange={(e) =>
                set("refreshSeconds", Math.min(60, Math.max(1, Number(e.target.value) || 2)))
              }
            />
          </Field>
        )}
        {form.source === "device" && (
          <Field
            label="Camera"
            hint={
              devices.some((d) => d.label)
                ? undefined
                : "Press Test to allow camera access and list cameras."
            }
          >
            <Select value={form.deviceId} onChange={(e) => set("deviceId", e.target.value)}>
              <option value="">Default camera</option>
              {devices.map((d, i) => (
                <option key={d.deviceId || i} value={d.deviceId}>
                  {d.label || `Camera ${i + 1}`}
                </option>
              ))}
            </Select>
          </Field>
        )}

        {warnings.map((w) => (
          <p
            key={w}
            className="flex gap-2 rounded-xl bg-amber-500/10 px-3 py-2 text-xs text-amber-100 ring-1 ring-amber-400/25"
          >
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" /> {w}
          </p>
        ))}

        {form.source !== "none" && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-muted-foreground">Preview</p>
              <Button
                size="sm"
                onClick={() => setPreview({ ...form })}
                disabled={needsUrl && !form.url}
              >
                Test connection
              </Button>
            </div>
            {preview ? (
              <CameraTile
                camera={{ ...preview, id: "preview" }}
                now={now}
                onEdit={() => undefined}
              />
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-2xl bg-black/40 text-sm text-muted-foreground ring-1 ring-white/10">
                Press “Test connection” to preview
              </div>
            )}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Placeholder picture" hint="Shown while the camera isn't connected.">
            <Select
              value={form.placeholder}
              onChange={(e) => set("placeholder", e.target.value as CameraInput["placeholder"])}
            >
              {CAMERA_PLACEHOLDERS.map((p) => (
                <option key={p} value={p}>
                  {p.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase())}
                </option>
              ))}
            </Select>
          </Field>
          <label className="flex cursor-pointer items-center gap-3 self-end rounded-xl bg-white/5 px-4 py-2.5 text-sm">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[var(--primary)]"
              checked={form.enabled}
              onChange={(e) => set("enabled", e.target.checked)}
            />
            Show this camera on the wall
          </label>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
          {camera ? (
            <div className="flex gap-1">
              <Button
                tone="danger"
                size="sm"
                onClick={() => {
                  if (!confirm(`Remove ${camera.name}?`)) return;
                  cameras.remove(camera.id);
                  onClose();
                }}
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </Button>
              <Button
                tone="ghost"
                size="sm"
                aria-label="Move earlier"
                onClick={() => cameras.move(camera.id, -1)}
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </Button>
              <Button
                tone="ghost"
                size="sm"
                aria-label="Move later"
                onClick={() => cameras.move(camera.id, 1)}
              >
                <ArrowDown className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <span />
          )}
          <div className="flex gap-2">
            <Button onClick={onClose}>Cancel</Button>
            <Button tone="primary" type="submit">
              {camera ? "Save" : "Add camera"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
