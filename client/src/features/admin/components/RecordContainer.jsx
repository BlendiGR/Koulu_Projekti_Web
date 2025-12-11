import {useState, useEffect, useCallback, useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from "@hookform/resolvers/zod";
import {useLang} from "../../../hooks/useLang.js";
import Pagination from "./Pagination.jsx";
import {showSuccess, showError} from "../../../utils/toast.jsx";

const RecordContainer = ({
    title,
    getItems,
    createItem,
    updateItem,
    deleteItem,
    createSchema = null,
    createDefaultValues = {},
    children,
    allowCreate = false,
    renderCreate,
    renderList,
    paginate = true,
    }) => {

    const {t} = useLang();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const resolvedFormSchema = useMemo(() => {
        if (!createSchema) return null;
        return typeof createSchema === "function" ? createSchema(t) : createSchema;
    }, [createSchema, t]);
    const form = useForm({
        resolver: resolvedFormSchema ? zodResolver(resolvedFormSchema) : undefined,
        defaultValues: createDefaultValues,
    });
    const { register, handleSubmit, reset, setValue, getValues, formState: { errors } } = form;

    const [showCreate, setShowCreate] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);

    const fetchPage = useCallback(async (p = page, size = pageSize, extra = {}) => {
        setLoading(true);
        try {
            const res = await getItems({ take: size, skip: (p - 1) * size, ...extra });
            setLoading(false);
            if (!res || !res.success) {
                const msg = res?.error?.message || t("admin.common.failedToFetch");
                showError(msg);
                setError(msg);
                return;
            }
            const payload = res.data;
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
            const msg = err?.message || t("admin.common.failedToFetch");
            setLoading(false);
            showError(msg);
            setError(msg);
        }
    }, [getItems, page, pageSize, t]);

    useEffect(() => {
        fetchPage(page, pageSize);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageSize]);

    const onUpdate = useCallback(async (id, values) => {
        const token = localStorage.getItem("token");
        const res = await updateItem(id, values, token);
        if (res && res.success) await fetchPage(page, pageSize);
        return res;
    }, [updateItem, fetchPage, page, pageSize]);

    const onDelete = useCallback(async (id) => {
        const token = localStorage.getItem("token");
        const res = await deleteItem(id, token);
        if (res && res.success) await fetchPage(page, pageSize);
        return res;
    }, [deleteItem, fetchPage, page, pageSize]);

    const onCreate = useCallback(async (values) => {
        console.log("onCreate values:", values, "keys:", Object.keys(values));
        // console.log("onCreate getValues():", getValues(), "imageUrl:", getValues("imageUrl"));

        setError(null);
        setSuccess(null);
        setSubmitting(true);
        const token = localStorage.getItem("token");
        try {
            const res = await createItem(values, token);
            setSubmitting(false);
            if (res && res.success) {
                const msg = t("admin.common.created");
                showSuccess(msg);
                setSuccess(msg);
                reset(createDefaultValues);
                setShowCreate(false);
                await fetchPage(page, pageSize);
            } else {
                const msg = res?.error?.message || t("admin.common.createFail");
                showError(msg);
                setError(msg);
            }
        } catch (err) {
            const msg = err?.message || t("admin.common.createFail");
            setSubmitting(false);
            showError(msg);
            setError(msg);
        }
    }, [createItem, t, reset, createDefaultValues, fetchPage, page, pageSize]);

    const handleCreate = useCallback(
        (event) => {
            // let RHF handle preventDefault + validation + onCreate
            return handleSubmit(onCreate)(event);
        },
        [handleSubmit, onCreate]
    );

    const context = {
        // list/context
        items,
        loading,
        paginate,
        page,
        pageSize,
        total,
        setPage,
        setPageSize,
        fetchPage,
        onUpdate,
        onDelete,
        onCreate,
        // create form/context
        register,
        setValue,
        handleCreate,
        errors,
        submitting,
        error,
        success,
        reset,
    };

    return (
        <section className="p-4 border rounded bg-white">
            <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
                {title && <h2 className="text-xl font-semibold mb-2">{title}</h2>}
                {(allowCreate && renderCreate) ? (
                    <div className="mb-3">
                        <button
                            type="button"
                            onClick={() => setShowCreate(s => !s)}
                            className="px-3 py-2 bg-blue-600 text-white rounded"
                        >
                            {showCreate ? t("admin.common.cancel") : t("admin.common.addNew")}
                        </button>
                    </div>
                ) : null}
            </div>

            {showCreate ? renderCreate(context) : null}
            {renderList ? renderList(context) : null}
            {children ? children(context) : null}

            {(paginate && total) > 0 && (
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