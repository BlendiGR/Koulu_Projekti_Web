/**
 * Normalizes a sort parameter into a consistent object format.
 * @param {string} sortOrder - The sort order, either "asc" or "desc".
 * @param {string} sortBy - The field to sort by.
 * @returns {Object} An object representing the sort criteria.
 */
export const normalizeSort = (sortOrder, sortBy) => {
    const normalizedSortOrder = sortOrder ? String(sortOrder).toLowerCase() : undefined;
    const validSortOrder = normalizedSortOrder === "asc" || normalizedSortOrder === "desc" ? normalizedSortOrder : undefined;
    const sortField = sortBy ? String(sortBy) : undefined;

    if (sortField && validSortOrder) {
        return {
            sortField,
            sortOrder: validSortOrder
        };
    }
};