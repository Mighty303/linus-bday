/**
 * Prepend Vite's base URL to a public asset path.
 * Works both locally (`/`) and on GitHub Pages (`/linus-bday/`).
 */
export function asset(path) {
  const base = import.meta.env.BASE_URL;
  // Remove leading slash from path to avoid double-slash
  const clean = path.startsWith("/") ? path.slice(1) : path;
  return `${base}${clean}`;
}
