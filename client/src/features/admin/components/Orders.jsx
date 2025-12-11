import {useState} from "react";
import {useOrder} from "../../../hooks/api";
import RecordContainer from "./RecordContainer.jsx";
import RecordTable from "./RecordTable.jsx";
import {useLang} from "../../../hooks/useLang.js";
import SortBar from "./SortBar.jsx";

const Orders = () => {
    const {getOrdersAdmin, updateOrder} = useOrder();
    const {t} = useLang();

    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const statusOptions = [
        { value: "PREPARING", label: t("admin.orders.statusPreparing") },
        { value: "DELIVERING", label: t("admin.orders.statusDelivering") },
        { value: "DELIVERED", label: t("admin.orders.statusDelivered") },
    ];

    const fields = [
        { name: "orderId", label: t("admin.orders.id"), type: "read-only" },
        { name: "status", label: t("admin.orders.status"), type: "select", options: statusOptions },
        { name: "cost", label: t("admin.orders.cost"), type: "read-only" },
        { name: "items", label: t("admin.orders.items"), type: "read-only" },
        { name: "createdAt", label: t("admin.orders.createdAt"), type: "read-only" },
        { name: "email", label: t("admin.orders.email"), type: "read-only" },
        { name: "phone", label: t("admin.orders.phone"), type: "read-only" },
        { name: "destinationAddress", label: t("admin.orders.destinationAddress"), type: "read-only" },
        { name: "completedAt", label: t("admin.orders.completedAt"), type: "read-only" },
    ];

    return (
        <RecordContainer
            title={t("admin.orders.title")}
            getItems={getOrdersAdmin}
            createItem={null}
            updateItem={(id, values, token) => updateOrder(id, values, token)}
            deleteItem={null}
            allowCreate={false}
            createSchema={null}
            createDefaultValues={{}}
            renderCreate={null}
            renderList={({ items, loading, onUpdate, fetchPage, pageSize, setPage }) => (
                <>
                    <SortBar
                        options={[
                            { value: "status", label: t("admin.orders.status") },
                            { value: "createdAt", label: t("admin.orders.createdAt") },
                            { value: "cost", label: t("admin.orders.cost") },
                        ]}
                        value={{ sortBy, sortOrder }}
                        onChange={({ sortBy: newSortBy, sortOrder: newSortOrder }) => {
                            const sb = newSortBy || "";
                            const so = newSortOrder || "asc";
                            setSortBy(sb);
                            setSortOrder(so);
                            setPage(1);
                            fetchPage(1, pageSize, { sortBy: sb, sortOrder: so });
                        }}
                    />

                    {loading ? (
                        <p>{t("admin.common.loading")}</p>
                    ) : (
                        <RecordTable
                            items={items}
                            fields={fields}
                            idKey="orderId"
                            resolver={null}
                            onUpdate={onUpdate}
                            onDelete={null}
                        />
                    )}
                </>
            )}
        />
    );
};

export default Orders;