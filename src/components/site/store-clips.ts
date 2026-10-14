// Short, silent store clips in public/media (720p H.264, made from the originals in
// media-originals/ with ffmpeg). Shown with <StoreVideo>.

export type StoreClip = {
  src: string;
  poster: string;
  /** Seconds, for the schema.org VideoObject. */
  duration: number;
};

export const CLIPS = {
  accessoryWall: {
    src: "/media/accessory-wall.mp4",
    poster: "/media/accessory-wall.webp",
    duration: 12,
  },
  jblSpeakers: { src: "/media/jbl-speakers.mp4", poster: "/media/jbl-speakers.webp", duration: 4 },
  storeInterior: {
    src: "/media/store-interior.mp4",
    poster: "/media/store-interior.webp",
    duration: 6,
  },
} satisfies Record<string, StoreClip>;

export type ClipKey = keyof typeof CLIPS;

// When the clips were added to the site (schema.org uploadDate).
const CLIPS_ADDED = "2026-10-13";

/** schema.org VideoObject for a store clip, so it can appear in video search. */
export function clipSchema(
  clip: ClipKey,
  name: string,
  description: string,
  absoluteUrl: (p: string) => string,
) {
  const c = CLIPS[clip];
  return {
    "@type": "VideoObject",
    "@id": absoluteUrl(`${c.src}#video`),
    name,
    description,
    thumbnailUrl: absoluteUrl(c.poster),
    contentUrl: absoluteUrl(c.src),
    uploadDate: CLIPS_ADDED,
    duration: `PT${c.duration}S`,
    width: 1280,
    height: 720,
  };
}
