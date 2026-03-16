export const ADMIN_TOKEN = import.meta.env.VITE_ADMIN_TOKEN || null;

export const IS_ADMIN = (() => {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);
  return params.get("admin") === "true";
})();