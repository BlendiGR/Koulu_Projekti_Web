import React from 'react';
import {useLang} from "../../../hooks/useLang.js";
import {ArrowUp, ArrowDown} from "lucide-react";

const SortBar = ({
    options = [],
    value = {},
    onChange
    }) => {

    const {t} = useLang();

    const {sortBy = "", sortOrder = "asc"} = value || {};

    const handleFieldChange = (e) => {
        const newSortBy = e.target.value || "";
        onChange && onChange({sortBy: newSortBy, sortOrder});
    };

    const toggleOrder = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        onChange && onChange({sortBy, sortOrder: newOrder});
    };

    return (
        <div className="flex items-center gap-2 mb-3">
            <div className="flex flex-col">
                <label className="text-sm font-medium">{t("admin.common.sort")}</label>
                <div className="flex items-center gap-2 mt-1">
                    <select
                        className="p-2 border rounded"
                        value={sortBy || ""}
                        onChange={handleFieldChange}
                    >
                        <option value="">--</option>
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        onClick={toggleOrder}
                        className="px-2 py-1 border rounded"
                        aria-pressed={sortOrder === "desc"}
                        title={`Toggle direction (currently ${sortOrder})`}
                    >
                        {sortOrder === "asc" ? (<ArrowUp />) : (<ArrowDown />)}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SortBar;