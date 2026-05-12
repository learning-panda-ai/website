/** Canonical site origin for metadata, sitemap, robots, and JSON-LD. */
export function getSiteUrl(): string {
  return (
    process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, "") ??
    "https://learningpanda.ai"
  );
}
