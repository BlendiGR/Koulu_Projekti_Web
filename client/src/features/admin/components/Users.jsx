import { useState } from "react";
import { useUser } from "../../../hooks/api";
import RecordContainer from "./RecordContainer.jsx";
import RecordTable from "./RecordTable.jsx";
import { useLang } from "../../../hooks/useLang.js";
import InputField from "./formFields/InputField.jsx";
import SelectField from "./formFields/SelectField.jsx";
import Checkbox from "./formFields/Checkbox.jsx";
import Submit from "./formFields/Submit.jsx";
import SortBar from "./SortBar.jsx";

const Users = () => {
    const {getUsers, createUserAdmin, updateUserAdmin, deleteUser} = useUser();
    const {t} = useLang();

    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const roleOptions = [
        { value: "ADMIN", label: t("admin.users.roleAdmin") },
        { value: "CUSTOMER", label: t("admin.users.roleCustomer") },
    ];

    const fields = [
        { name: "userId", label: t("admin.users.id"), type: "read-only" },
        { name: "username", label: t("admin.users.username"), type: "input" },
        { name: "role", label: t("admin.users.role"), type: "select", options: roleOptions },
        { name: "email", label: t("admin.users.email"), type: "input" },
        { name: "isActive", label: t("admin.users.active"), type: "checkbox" },
    ];

    const createDefaults = {
        username: "",
        role: "CUSTOMER",
        email: "",
        isActive: true,
    };

    return (
        <RecordContainer
            title={t("admin.users.title")}
            getItems={getUsers}
            createItem={(values, token) => createUserAdmin(values, token)}
            updateItem={(id, values, token) => updateUserAdmin(id, values, token)}
            deleteItem={(id) => deleteUser(id)}
            allowCreate={false} // for now, just allow user creation via registration. admins can then edit roles/status.
            createSchema={null} // use registration schema if needed
            createDefaultValues={createDefaults}
            renderCreate={({ register, handleCreate, errors, submitting }) => (
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">{t("admin.users.addUser")}</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <InputField name="username" register={register} error={errors?.username} label={t("admin.users.username")}/>
                        <SelectField name="role" register={register} options={roleOptions} error={errors?.role} label={t("admin.users.role")}/>
                        <InputField name="email" register={register} error={errors?.email} label={t("admin.users.email")}/>
                        <Checkbox name="isActive" register={register} label={t("admin.users.active")}/>
                        <Submit disabled={submitting} text={submitting ? t("admin.common.creating") : t("admin.common.create")}/>
                    </form>
                </div>
            )}
            renderList={({ items, loading, onUpdate, onDelete, fetchPage, pageSize, setPage }) => (
                <>
                    <SortBar
                        options={[
                            { value: "username", label: t("admin.users.username") },
                            { value: "email", label: t("admin.users.email") },
                            { value: "role", label: t("admin.users.role") },
                        ]}
                        value={{ sortBy, sortOrder }}
                        onChange={({ sortBy: newSortBy, sortOrder: newSortOrder }) => {
                            setSortBy(newSortBy || "");
                            setSortOrder(newSortOrder || "asc");
                            setPage(1);
                            fetchPage(1, pageSize, { sortBy: newSortBy, sortOrder: newSortOrder });
                        }}
                    />

                    {loading ? (
                        <p>{t("admin.common.loading")}</p>
                    ) : (
                        <RecordTable
                            items={items}
                            fields={fields}
                            idKey="userId"
                            resolver={null}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    )}
                </>
            )}
        />
    );
};

export default Users;