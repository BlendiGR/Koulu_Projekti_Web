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

const RecordRow = ({ item = {}, idKey = "id", fields = [], cellClass = "", resolver, onUpdate, onDelete, postFile }) => {
    const { t } = useLang();
    const defaultValues = fields.reduce((acc, f) => {
        acc[f.name] = item[f.name] ?? f.default ?? "";
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
    const [error, setError] = useState(null);

    const startEdit = () => {
        setError(null);
        reset(defaultValues);
        setEditing(true);
    };

    const cancelEdit = () => {
        setEditing(false);
        setError(null);
        reset(defaultValues);
    };

    const handleFileChange = async (name, e) => {
        const file = e.target.files && e.target.files[0];
        if (!file || !postFile) return;
        setUploading(true);
        const res = await postFile(file);
        setUploading(false);
        if (res && res.success) {
            const payload = res.data && res.data.data !== undefined ? res.data.data : res.data;
            const url = payload?.url || (payload && payload.url) || null;
            if (url) setValue(name, url, { shouldValidate: true, shouldDirty: true });
        } else {
            setError(res?.error?.message || t("admin.common.uploadFail") || "Upload failed");
        }
    };

    const onSubmit = async (values) => {
        setError(null);
        if (uploading) {
            setError(t("admin.common.waitForUpload") || "Wait for upload");
            return;
        }
        setSubmitting(true);
        try {
            const id = item[idKey];
            const res = await onUpdate(id, values);
            setSubmitting(false);
            if (res && res.success) {
                setEditing(false);
            } else {
                setError(res?.error?.message || t("admin.common.updateFail") || "Update failed");
            }
        } catch (err) {
            setSubmitting(false);
            setError(err?.message || "Update failed");
        }
    };

    const handleDelete = async () => {
        if (!confirm(t("admin.common.confirmDelete") || "Delete this record?")) return;
        const id = item[idKey];
        const res = await onDelete(id);
        if (!(res && res.success)) {
            setError(res?.error?.message || t("admin.common.deleteFail") || "Delete failed");
        }
    };

    const renderCell = (f) => {
        const value = item[f.name];
        if (editing) {
            // render input components when editing
            const common = { name: f.name, register, error: errors[f.name], wrapperClass: "" };
            switch (f.type) {
                case "select":
                    return (
                        <td className={cellClass}>
                            <SelectField {...common} options={f.options || []} selectClass="w-full p-1 border rounded" />
                        </td>
                    );
                case "textarea":
                    return (
                        <td className={cellClass}>
                            <TextArea {...common} inputClass="w-full p-1 border rounded" />
                        </td>
                    );
                case "checkbox":
                    return (
                        <td className={cellClass}>
                            <Checkbox {...common} wrapperClass="items-center" />
                        </td>
                    );
                case "image":
                    return (
                        <td className={cellClass}>
                            <ImageField
                                {...common}
                                onFileChange={(e) => handleFileChange(f.name, e)}
                                uploading={uploading}
                                previewUrl={watch(f.name) || item[f.name]}
                                inputClass="w-full p-1"
                                previewClass="w-20 h-14 object-cover rounded"
                            />
                        </td>
                    );
                default:
                    return (
                        <td className={cellClass}>
                            <InputField {...common} inputClass="w-full p-1 border rounded" />
                        </td>
                    );
            }
        }

        // read-only display
        switch (f.type) {
            case "image":
                return (
                    <td className={cellClass}>
                        {value ? <img src={value} alt={f.label || f.name} className="w-20 h-14 object-cover rounded" /> : <span className="text-sm text-gray-500">—</span>}
                    </td>
                );
            case "checkbox":
                return <td className={cellClass}>{value ? "Yes" : "No"}</td>;
            case "textarea":
                return <td className={cellClass}><span className="text-sm text-gray-700">{String(value || "").slice(0, 80)}{String(value || "").length > 80 ? "…" : ""}</span></td>;
            default:
                return <td className={cellClass}><span className="text-sm text-gray-700">{value ?? "—"}</span></td>;
        }
    };

    return (
        <tr>
            {fields.map((f) => renderCell(f))}
            <td className="px-3 py-2 text-right">
                {!editing ? (
                    <div className="inline-flex gap-2">
                        <button type="button" title={t("admin.common.edit")} onClick={startEdit} className="p-2 bg-blue-600 text-white rounded text-sm rounded-full">
                            <Pencil size={20} />
                        </button>
                        <button type="button" title={t("admin.common.delete")} onClick={handleDelete} className="p-2 bg-red-600 text-white rounded text-sm rounded-full">
                            <Trash size={20} />
                        </button>
                    </div>
                ) : (
                    <div className="inline-flex gap-2">
                        <button type="button" title={submitting ? t("admin.common.saving") : t("admin.common.save")} onClick={handleSubmit(onSubmit)} disabled={uploading || submitting} className="p-2 bg-green-600 text-white rounded text-sm rounded-full">
                            <Save size={20} />
                        </button>
                        <button type="button" title={t("admin.common.cancel")} onClick={cancelEdit} className="p-2 bg-gray-300 rounded text-sm rounded-full">
                            <CircleX size={20} />
                        </button>
                    </div>
                )}
                {error && <div className="mt-1 text-xs text-red-600">{error}</div>}
            </td>
        </tr>
    );
};

export default RecordRow;