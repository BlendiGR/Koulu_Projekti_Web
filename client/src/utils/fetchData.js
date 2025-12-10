export const fetchData = async (url, options = {}) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  try {
    const res = await fetch(url, options);

    if (res.status === 204) {
      return { success: true, data: null };
    }

    const contentLength = res.headers.get("content-length");
    const contentType = res.headers.get("content-type") || "";
    const hasBody = contentLength === null || Number(contentLength) > 0; // some servers omit content-length
    const isJson = contentType.toLowerCase().includes("application/json");

    let json = null;
    if (hasBody && isJson) {
      try {
        json = await res.json();
      } catch {
        json = null;
      }
    }

    if (!res.ok) {
      const errPayload = (json && (json.error || json)) || {};
      return {
        success: false,
        error: {
          message: errPayload.message || "Unknown error",
          code: errPayload.code || "UNKNOWN",
          details: errPayload.details || null,
        },
      };
    }

    // Success: return parsed data or null
    return {
      success: true,
      data: json && json.data !== undefined ? json.data : json,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        message: err.message || "Network error",
        code: "NETWORK_ERROR",
        details: null,
      },
    };
  }
};