import React from 'react';
import RecordRow from './RecordRow';
import {useLang} from "../../../hooks/useLang.js";

const RecordTable = ({
    items = [],
    fields = [],
    idKey = "id",
    resolver,
    onUpdate,
    onDelete,
    postFile
    }) => {

    const { t } = useLang();
    const cellClass = "px-4 py-3 align-top whitespace-nowrap";

    const getKey = (item, index) => {
        return item?.[idKey] ?? item?.id ?? item?._id ?? index;
    };

    return (
        <div className="overflow-x-auto max-w-full bg-white border rounded">
            <table className="w-full divide-y table-auto">
                <thead className="bg-gray-50">
                    <tr>
                        {fields.map((f) => (
                            <th key={f.name} className="px-3 py-2 text-start text-sm font-semibold uppercase text-slate-600 whitespace-nowrap">
                                {f.label || f.name}
                            </th>
                        ))}
                        <th className="px-3 py-2 text-sm font-semibold uppercase text-slate-600 text-center whitespace-nowrap">{t("admin.common.actions")}</th>
                    </tr>
                </thead>
                <tbody className="divide-y">
                    {items && items.length ? (
                        items.map((item, idx) => (
                            <RecordRow
                                key={getKey(item, idx)}
                                item={item}
                                idKey={idKey}
                                fields={fields}
                                cellClass={cellClass}
                                resolver={resolver}
                                onUpdate={onUpdate}
                                onDelete={onDelete}
                                postFile={postFile}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan={fields.length + 1} className="px-3 py-4 text-sm text-gray-500 text-center">
                                {t("admin.common.noRecords")}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default RecordTable;