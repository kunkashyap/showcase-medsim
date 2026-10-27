const DEFAULT_BASE = "/assets";

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

export function getAssetsBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_ASSETS_BASE_URL ?? DEFAULT_BASE;
  const trimmed = raw.trim();
  if (!trimmed) return DEFAULT_BASE;
  return trimTrailingSlash(trimmed);
}

/** Prefix a relative asset path from models.json with the public assets base URL. */
export function assetUrl(path: string): string {
  const normalized = path.replace(/^\/+/, "");
  return `${getAssetsBaseUrl()}/${normalized}`;
}
