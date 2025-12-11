import {useState} from 'react';
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputField from "./formFields/InputField.jsx";
import SelectField from "./formFields/SelectField.jsx";
import TextArea from "./formFields/TextArea.jsx";
import Checkbox from "./formFields/Checkbox.jsx";
import ImageField from "./formFields/ImageField.jsx";
import {useLang} from "../../../hooks/useLang.js";
import {Pencil, Trash, Save, CircleX} from "lucide-react";
import {showError, showSuccess} from "../../../utils/toast.jsx";

const RecordRow = ({item = {}, idKey = "id", fields = [], cellClass = "", resolver, onUpdate, onDelete, postFile }) => {
    const { t } = useLang();
    const defaultValues = fields.reduce((acc, f) => {
        if (f.type === "checkbox") {
            acc[f.name] = Boolean(item[f.name] ?? f.default ?? false);
        } else {
            acc[f.name] = item[f.name] ?? f.default ?? "";
        }
        return acc;
    }, {});

    const form = useForm({
        resolver: resolver ? zodResolver(resolver) : undefined,
        defaultValues,
    });

    const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = form;

    const [editing, setEditing] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const startEdit = () => {
        reset(defaultValues);
        setEditing(true);
    };

    const cancelEdit = () => {
        setEditing(false);
        reset(defaultValues);
    };

    const handleFileChange = async (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file || !postFile) return null;

        setUploading(true);
        const res = await postFile(file);
        setUploading(false);

        if (res && res.success) {
            const payload = res.data && res.data.data !== undefined ? res.data.data : res.data;
            const url = payload?.url || (payload && payload.url) || null;
            if (url) {
                const strUrl = String(url);
                return strUrl;
            }
        } else {
            showError(res?.error?.message || t("admin.common.uploadFail"));
        }
        return null;
    };

    const onSubmit = async (values) => {
        if (uploading) {
            showError(t("admin.common.waitForUpload"));
            return;
        }
        setSubmitting(true);
        try {
            const payload = { ...values };
            fields.forEach(f => {
                if (f.type === "read-only") delete payload[f.name];
            });

            const id = item[idKey];
            const res = await onUpdate(id, payload);
            setSubmitting(false);
            if (res && res.success) {
                setEditing(false);
                showSuccess(t("admin.common.updated"));
            } else {
                showError(res?.error?.message || t("admin.common.updateFail"));
            }
        } catch (err) {
            setSubmitting(false);
            showError(err?.message || t("admin.common.updateFail"));
        }
    };

    const onInvalid = (errs) => {
        const firstKey = Object.keys(errs)[0];
        const msg = errs[firstKey]?.message || t("admin.common.validationFail");
        showError(msg);
    };

    const handleDelete = async () => {
        if (!confirm(t("admin.common.confirmDelete"))) return;
        const id = item[idKey];
        const res = await onDelete(id);
        if (!(res && res.success)) {
            showError(res?.error?.message || t("admin.common.deleteFail"));
        }
    };

    const renderCell = (f, index) => {
        const value = item[f.name];
        const key = f.name ?? index;

        if (editing) {
            // render input components when editing
            const common = { name: f.name, register, error: errors[f.name], wrapperClass: "" };
            switch (f.type) {
                case "select":
                    return (
                        <td key={key} className={cellClass}>
                            <SelectField {...common} options={f.options || []} selectClass="w-full p-1 border rounded" />
                        </td>
                    );
                case "textarea":
                    return (
                        <td key={key} className={cellClass}>
                            <TextArea {...common} inputClass="w-full p-1 border rounded" />
                        </td>
                    );
                case "checkbox":
                    return (
                        <td key={key} className={cellClass}>
                            <Checkbox {...common} wrapperClass="items-center" />
                        </td>
                    );
                case "image":
                    return (
                        <td key={key} className={cellClass}>
                            <ImageField
                                {...common}
                                setValue={setValue}
                                onFileChange={handleFileChange}
                                uploading={uploading}
                                previewUrl={watch(f.name) || item[f.name]}
                                inputClass="w-full p-1"
                                previewClass="w-20 h-14 object-cover rounded"
                            />
                        </td>
                    );
                case "number":
                    return (
                        <td key={key} className={cellClass}>
                            <InputField
                                {...common}
                                inputClass="w-full p-1 border rounded"
                                type="number"
                            />
                        </td>
                    );
                case "read-only":
                    return (
                        <td key={key} className={cellClass}>
                            <span className="text-sm text-gray-700">{value ?? "—"}</span>
                        </td>
                    );
                default:
                    return (
                        <td key={key} className={cellClass}>
                            <InputField {...common} inputClass="w-full p-1 border rounded" />
                        </td>
                    );
            }
        }

        // read-only display
        switch (f.type) {
            case "image":
                return (
                    <td key={key} className={cellClass}>
                        {value ? <img src={value} alt={f.label || f.name} className="w-20 h-14 object-cover rounded" /> : <span className="text-sm text-gray-500">—</span>}
                    </td>
                );
            case "checkbox":
                return <td key={key} className={cellClass}>{value ? t("admin.common.yes") : t("admin.common.no")}</td>;
            case "textarea":
                return <td key={key} className={cellClass}><span className="text-sm text-gray-700">{String(value || "").slice(0, 80)}{String(value || "").length > 80 ? "…" : ""}</span></td>;
            default:
                return <td key={key} className={cellClass}><span className="text-sm text-gray-700">{value ?? "—"}</span></td>;
        }
    };

    return (
        <tr>
            {fields.map((f, index) => renderCell(f, index))}
            <td className="px-3 py-2 text-center">
                {!editing ? (
                    <div className="inline-flex gap-2">
                        {onUpdate && (
                            <button type="button" title={t("admin.common.edit")} onClick={startEdit} className="p-2 bg-blue-600 text-white rounded text-sm rounded-full">
                                <Pencil size={20} />
                            </button>
                        )}
                        {onDelete && (
                            <button type="button" title={t("admin.common.delete")} onClick={handleDelete} className="p-2 bg-red-600 text-white rounded text-sm rounded-full">
                                <Trash size={20} />
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="inline-flex gap-2">
                        <button type="button" title={submitting ? t("admin.common.saving") : t("admin.common.save")} onClick={() => handleSubmit(onSubmit, onInvalid)()} disabled={uploading || submitting} className="p-2 bg-green-600 text-white rounded text-sm rounded-full">
                            <Save size={20} />
                        </button>
                        <button type="button" title={t("admin.common.cancel")} onClick={cancelEdit} className="p-2 bg-gray-300 rounded text-sm rounded-full">
                            <CircleX size={20} />
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
};

export default RecordRow;