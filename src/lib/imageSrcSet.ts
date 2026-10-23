/**
 * Responsive image helper.
 *
 * Every photo in /public/images/photos is exported at three widths
 * (400w, 800w, original 1200w) and every dish in /public/images/dishes at
 * two widths (480w, original 900w). Phones then download the small file
 * instead of the full-size one, which is the single biggest win for slow
 * mobile connections.
 */
export function buildSrcSet(src?: string): string | undefined {
  if (!src) return undefined;

  const match = src.match(/^\/images\/(photos|dishes)\/(.+)\.webp$/);
  if (!match) return undefined;

  const [, folder, name] = match;

  // Already a sized variant (e.g. foo-400.webp) — do not nest srcsets.
  if (/-\d+$/.test(name)) return undefined;

  if (folder === 'dishes') {
    return `/images/dishes/${name}-480.webp 480w, ${src} 900w`;
  }

  return `/images/photos/${name}-400.webp 400w, /images/photos/${name}-800.webp 800w, ${src} 1200w`;
}

/**
 * Same as buildSrcSet, but points at the AVIF variants (~50% smaller than WebP).
 * Used inside <picture> so browsers without AVIF support fall back to WebP.
 */
export function buildAvifSrcSet(src?: string): string | undefined {
  if (!src) return undefined;

  const match = src.match(/^\/images\/(photos|dishes)\/(.+)\.webp$/);
  if (!match) return undefined;

  const [, folder, name] = match;
  if (/-\d+$/.test(name)) return undefined;

  if (folder === 'dishes') {
    return `/images/dishes/${name}-480.avif 480w, /images/dishes/${name}-720.avif 720w, /images/dishes/${name}-900.avif 900w`;
  }

  return `/images/photos/${name}-400.avif 400w, /images/photos/${name}-800.avif 800w, /images/photos/${name}-1200.avif 1200w`;
}
