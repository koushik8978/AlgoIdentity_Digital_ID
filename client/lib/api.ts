export const apiBase = (import.meta as any).env?.VITE_API_URL || "/api";

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${apiBase}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `Request failed: ${res.status}`);
  }
  return res.json();
}

export async function apiGet<T>(path: string, params?: Record<string, string | number | boolean>) {
  const url = new URL(`${apiBase}${path}`, window.location.origin);
  if (params) Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`);
  return res.json() as Promise<T>;
}
