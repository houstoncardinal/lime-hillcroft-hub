export function isRequestConnectionError(error: unknown): boolean {
  return error instanceof Error && /^(Failed to fetch|NetworkError when attempting to fetch resource\.?|Load failed|Network request failed)$/i.test(error.message.trim());
}