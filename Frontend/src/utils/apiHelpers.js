export function getApiBase() {
  const API_BASE = import.meta.env.VITE_API_BASE_URL || import.meta.env.API_BASE_URL || '';
  try {
    if (API_BASE) {
      const envUrl = new URL(API_BASE);
      const frontendOrigin = typeof window !== 'undefined' ? window.location.origin : '';
      if (envUrl.origin === frontendOrigin) {
        console.warn('VITE_API_BASE_URL matches the frontend origin. Ensure this points to the backend API URL (or leave empty to use same origin).');
      }
    }
  } catch (e) {
    // ignore invalid URL
  }
  return API_BASE;
}

export async function parseListResponse(res) {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${res.status} ${res.statusText} - ${text}`);
  }
  const data = await res.json().catch(() => null);
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.media)) return data.media;
  if (Array.isArray(data.reviews)) return data.reviews;
  if (Array.isArray(data.data)) return data.data;
  return [];
}

export async function parseAddResponse(res) {
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch (e) { /* not json */ }
  return { ok: res.ok, status: res.status, data: json || text };
}
