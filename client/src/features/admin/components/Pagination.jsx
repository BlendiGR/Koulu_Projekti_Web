import React from 'react';
import {useLang} from "../../../hooks/useLang.js";

const Pagination = ({
    currentPage = 1,
    pageSize = 10,
    total = 0,
    onPageChange = () => {},
    onPageSizeChange = () => {},
    }) => {

    const {t} = useLang();
    const totalPages = Math.max(1, Math.ceil(total / pageSize));

    const setPage = (p) => {
        const page = Math.min(Math.max(1, Math.floor(p)), totalPages);
        if (page !== currentPage) onPageChange(page);
    };

    return (
        <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
                <button
                    className="px-2 py-1 border rounded disabled:opacity-50"
                    onClick={() => setPage(1)}
                    disabled={currentPage === 1}
                >
                    «
                </button>
                <button
                    className="px-2 py-1 border rounded disabled:opacity-50"
                    onClick={() => setPage(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    ‹ {t("admin.common.previousPage")}
                </button>
            </div>

            <div className="px-3">
                {t("admin.common.page")}{" "}
                <input
                    type="number"
                    value={currentPage}
                    onChange={(e) => setPage(Number(e.target.value || 1))}
                    className="w-16 px-2 py-1 border rounded text-center"
                    min={1}
                    max={totalPages}
                />{" "}
                {t("admin.common.of")} {totalPages}
            </div>

            <div className="flex items-center gap-1">
                <button
                    className="px-2 py-1 border rounded disabled:opacity-50"
                    onClick={() => setPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    {t("admin.common.nextPage")} ›
                </button>
                <button
                    className="px-2 py-1 border rounded disabled:opacity-50"
                    onClick={() => setPage(totalPages)}
                    disabled={currentPage === totalPages}
                >
                    »
                </button>
            </div>

            <div className="ml-auto flex items-center gap-2">
                <label className="text-xs text-gray-600">{t("admin.common.perPage")}</label>
                <select
                    value={pageSize}
                    onChange={(e) => onPageSizeChange(Number(e.target.value))}
                    className="px-2 py-1 border rounded"
                >
                    {[10, 20, 50, 100].map((n) => (
                        <option key={n} value={n}>
                            {n}
                        </option>
                    ))}
                </select>
                <div className="text-xs text-gray-500">
                    {total} item{total !== 1 ? "s" : ""}
                </div>
            </div>
        </div>
    );
};

export default Pagination;