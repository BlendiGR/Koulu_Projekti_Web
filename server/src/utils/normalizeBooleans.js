/**
 * Normalizes boolean query parameters from strings to actual booleans.
 * @param query - The query object containing parameters.
 * @param fields - An array of field names to normalize.
 * @returns {*}
 */
export const normalizeQueryBooleans = (query, fields = []) => {
    const normalized = { ...query };

    for (const field of fields) {
        if (normalized[field] === "true") {
            normalized[field] = true;
        } else if (normalized[field] === "false") {
            normalized[field] = false;
        }
    }

    return normalized;
};