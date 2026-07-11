export function getBasePath(): string {
  return process.env.NEXT_PUBLIC_BASE_PATH || "";
}

export function assetUrl(path: string): string {
  const base = getBasePath();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}
