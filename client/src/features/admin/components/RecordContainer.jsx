import {useState, useEffect, useCallback} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {useLang} from "../../../hooks/useLang.js";
import Pagination from "./Pagination.jsx";

const RecordContainer = ({
    title,
    getItems,
    createItem,
    updateItem,
    deleteItem,
    postFile,
    createSchema = null,
    createDefaultValues = {},
    children,
    renderCreate,
    renderList
    }) => {

    const {t} = useLang();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);
    const form = useForm({
        resolver: createSchema ? zodResolver(createSchema) : undefined,
        defaultValues: createDefaultValues,
    });
    const { register, handleSubmit, reset, setValue, formState: { errors } } = form;

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [total, setTotal] = useState(0);

    const fetchPage = useCallback(async (p = page, size = pageSize, extra = {}) => {
        console.warn("fetchpage params: ", p, size);
        setLoading(true);
        try {
            const res = await getItems({ take: size, skip: (p - 1) * size, ...extra });
            setLoading(false);
            if (!res || !res.success) {
                setError(res?.error?.message || "Failed to fetch");
                return;
            }
            let payload = res.data;
            if (!Array.isArray(payload)) {
                if (payload && Array.isArray(payload.data)) {
                    setItems(payload.data);
                    if (typeof payload.total === "number") setTotal(payload.total);
                    else if (typeof payload.count === "number") setTotal(payload.count);
                    else setTotal(payload.data.length);
                } else {
                    setItems([]);
                    setTotal(0);
                }
            } else {
                setItems(payload);
                setTotal(payload.length);
            }
        } catch (err) {
            setLoading(false);
            setError(err?.message || "Failed to fetch");
        }
    }, [getItems, page, pageSize]);

    useEffect(() => {
        console.error("[DEBUG] RecordContainer useEffect mount", { page, pageSize }); // loud visible log
        fetchPage(page, pageSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize]);

    const handleFileChange = async (e, fieldName = "imageUrl") => {
        if (!postFile) return;
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        setUploading(true);
        const token = localStorage.getItem("token");
        const res = await postFile(file, token);
        setUploading(false);
        if (res && res.success) {
            const payload = res.data && res.data.data !== undefined ? res.data.data : res.data;
            const url = payload?.url || (payload && payload.url) || null;
            if (url) {
                setValue(fieldName, url, { shouldValidate: true, shouldDirty: true });
                setPreviewUrl(url);
            }
        } else {
            setError(res?.error?.message || t("admin.common.uploadFail"));
        }
    };

    const onUpdate = async (id, values) => {
        const token = localStorage.getItem("token");
        const res = await updateItem(id, values, token);
        if (res && res.success) await fetchPage(page, pageSize);
        return res;
    };

    const onDelete = async (id) => {
        const token = localStorage.getItem("token");
        const res = await deleteItem(id, token);
        if (res && res.success) await fetchPage(page, pageSize);
        return res;
    };

    const handleCreate = async (values) => {
        setError(null);
        setSuccess(null);
        if (uploading) {
            setError(t("admin.common.waitForUpload") || "Wait for file upload to finish");
            return;
        }
        setSubmitting(true);
        const token = localStorage.getItem("token");
        try {
            const res = await createItem(values, token);
            setSubmitting(false);
            if (res && res.success) {
                setSuccess(t("admin.common.created") || "Created");
                reset(createDefaultValues);
                setPreviewUrl(null);
                await fetchPage(page, pageSize);
            } else {
                setError(res?.error?.message || t("admin.common.createFail") || "Create failed");
            }
        } catch (err) {
            setSubmitting(false);
            setError(err?.message || t("admin.common.createFail") || "Create failed");
        }
    };

    const context = {
        // list/context
        items,
        loading,
        page,
        pageSize,
        total,
        setPage,
        setPageSize,
        fetchPage,
        onUpdate,
        onDelete,
        // create form/context
        register,
        handleCreate: handleSubmit(handleCreate),
        handleFileChange,
        uploading,
        previewUrl,
        setPreviewUrl,
        errors,
        submitting,
        error,
        success,
        reset,
    };

    return (
        <section className="p-4 border rounded bg-white">
            {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
            {renderCreate ? renderCreate(context) : null}
            {renderList ? renderList(context) : null}
            {children ? children(context) : null}

            {total > 0 && (
                <div className="mt-4">
                    <Pagination
                        currentPage={page}
                        pageSize={pageSize}
                        total={total}
                        onPageChange={(p) => setPage(p)}
                        onPageSizeChange={(size) => {
                            setPageSize(size);
                            setPage(1);
                        }}
                    />
                </div>
            )}
        </section>
    );
};

export default RecordContainer;