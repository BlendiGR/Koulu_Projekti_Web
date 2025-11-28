export const fetchData = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const json = await res.json();

    if (!res.ok) {
      return {
        success: false,
        error: json.error || {
          message: json.message || "Unknown error",
          code: json.code || "UNKNOWN",
          details: json.details || null,
        },
      };
    }

    return {
      success: true,
      data: json,
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
