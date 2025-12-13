export function getApiBase() {
  const apiUrl = import.meta.env.VITE_API_BASE_URL;

  if (!apiUrl) {
    console.warn('VITE_API_BASE_URL is not set. Using default http://localhost:1000');
    return 'http://localhost:1000';
  }

  return apiUrl;
}

export async function parseListResponse(response) {
  if (!response.ok) {
    console.error(`API error: ${response.status} ${response.statusText}`);
    return null;
  }

  try {
    return await response.json();
  } catch (err) {
    console.error('Failed to parse response JSON:', err);
    return null;
  }
}

export async function parseAddResponse(response) {
  try {
    const data = await response.json();
    return {
      ok: response.ok,
      data,
      status: response.status
    };
  } catch (err) {
    console.error('Failed to parse response JSON:', err);
    return {
      ok: false,
      data: null,
      status: response.status,
      error: err.message
    };
  }
}
