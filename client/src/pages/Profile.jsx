// client/src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useAuth } from "/src/features/auth/hooks/useAuth";
import { useOrder, useUser } from "/src/hooks/api";
import { useLang } from "/src/hooks/useLang";

export default function Profile() {
  const { user, setUser } = useAuth();
  const { getOrdersByUser } = useOrder();
  const { updateUser } = useUser();
  const { t } = useLang();

  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState(null);

  const [isEditing, setIsEditing] = useState(false);
  const [formFirstName, setFormFirstName] = useState("");
  const [formLastName, setFormLastName] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formPasswordConfirm, setFormPasswordConfirm] = useState("");
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      try {
        setOrdersLoading(true);
        const data = await getOrdersByUser();
        setOrders(data || []);
        setOrdersError(null);
      } catch (err) {
        setOrders([]);
        setOrdersError(err.message || t("profile.errors.fetchOrders"));
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);


  const displayName = user.username || "";
  const email = user.email;
  const role = user.role;

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  const formatStatusLabel = (status) => {
    switch (status) {
      case "DELIVERED":
        return t("profile.status.delivered");
      case "DELIVERING":
        return t("profile.status.delivering");
      case "PREPARING":
        return t("profile.status.preparing");
      default:
        return status;
    }
  };

  const getStatusClassName = (status) => {
    if (status === "DELIVERED") {
      return "bg-[rgba(46,204,113,0.15)] text-[#2ecc71] px-2 py-0.5 rounded-full text-xs font-medium";
    }
    if (status === "DELIVERING") {
      return "bg-[rgba(241,196,15,0.15)] text-[#c27d00] px-2 py-0.5 rounded-full text-xs font-medium";
    }
    return "bg-[rgba(0,0,0,0.05)] text-[var(--color-black-200)] px-2 py-0.5 rounded-full text-xs font-medium";
  };

  const handleEditClick = () => {
    setIsEditing(true);
    const parts = displayName.split(" ").filter(Boolean);
    const first = parts[0] || "";
    const last = parts.slice(1).join(" ") || "";
    setFormFirstName(first);
    setFormLastName(last);
    setFormPassword("");
    setFormPasswordConfirm("");
    setFormError(null);
    setFormSuccess(null);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setFormError(null);
    setFormSuccess(null);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    const trimmedFirst = formFirstName.trim();
    const trimmedLast = formLastName.trim();

    if (!trimmedFirst) {
      setFormError(t("profile.errors.emptyFirstName"));
      return;
    }
    if (!trimmedLast) {
      setFormError(t("profile.errors.emptyLastName"));
      return;
    }

    if (formPassword && formPassword.length < 8) {
      setFormError(t("profile.errors.shortPassword"));
      return;
    }

    if (formPassword && formPassword !== formPasswordConfirm) {
      setFormError(t("profile.errors.passwordMismatch"));
      return;
    }

    const combinedUsername = `${trimmedFirst} ${trimmedLast}`.trim();

    const payload = {};
    if (combinedUsername !== displayName) payload.username = combinedUsername;
    if (formPassword) payload.password = formPassword;

    if (Object.keys(payload).length === 0) {
      setFormError(t("profile.errors.nothingToUpdate"));
      return;
    }

    try {
      setIsSaving(true);
      const res = await updateUser(user.userId, payload);

      if (!res.success)
        throw new Error(res.error?.message || t("profile.errors.updateFailed"));

      setUser(res.data);
      setFormSuccess(t("profile.success"));
      setIsEditing(false);
    } catch (err) {
      setFormError(err.message || t("profile.errors.updateFailed"));
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-[960px] mx-auto pt-12 pb-24 px-4 bg-beige">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-6 text-[var(--color-black-200)]">
          {t("profile.title")}
        </h1>

        <div
          className="w-24 h-24 rounded-full mx-auto mb-3 text-white font-semibold text-xl flex items-center justify-center shadow-xl"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #ffb199, var(--color-red-100))",
          }}
        >
          {initials || "U"}
        </div>

        <h2 className="text-lg font-semibold text-[var(--color-black-200)]">
          {displayName}
        </h2>

        <p className="text-sm text-[var(--color-gray-200)]">{email}</p>
      </div>

      <div className="flex flex-col gap-6">
        <section className="bg-[var(--color-white)] rounded-xl p-6 shadow-xl border border-[rgba(0,0,0,0.04)]">
          <h3 className="font-semibold text-lg mb-4">{t("profile.info")}</h3>

          {!isEditing ? (
            <>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-black-200)]/70">
                    {t("profile.nameLabel")}
                  </span>
                  <span className="font-medium">{displayName}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-black-200)]/70">
                    {t("profile.emailLabel")}
                  </span>
                  <span className="font-medium break-all">{email}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-[var(--color-black-200)]/70">
                    {t("profile.roleLabel")}
                  </span>
                  <span className="font-medium">{role}</span>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  onClick={handleEditClick}
                  className="bg-[var(--color-red-100)] hover:bg-[var(--color-red-200)] text-white px-6 py-2 rounded-full text-sm transition"
                >
                  {t("profile.editButton")}
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-4 mt-1">
              <div className="flex flex-col gap-1 text-sm">
                <label className="text-[var(--color-black-200)]/80">
                  {t("profile.firstNameLabel")}
                </label>
                <input
                  type="text"
                  value={formFirstName}
                  onChange={(e) => setFormFirstName(e.target.value)}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-red-100)]"
                />
              </div>

              <div className="flex flex-col gap-1 text-sm">
                <label className="text-[var(--color-black-200)]/80">
                  {t("profile.lastNameLabel")}
                </label>
                <input
                  type="text"
                  value={formLastName}
                  onChange={(e) => setFormLastName(e.target.value)}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-red-100)]"
                />
              </div>

              <div className="flex flex-col gap-1 text-sm">
                <label className="text-[var(--color-black-200)]/80">
                  {t("profile.newPasswordLabel")}
                </label>
                <input
                  type="password"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-red-100)]"
                  placeholder={t("profile.passwordPlaceholder")}
                />
              </div>

              <div className="flex flex-col gap-1 text-sm">
                <label className="text-[var(--color-black-200)]/80">
                  {t("profile.confirmPasswordLabel")}
                </label>
                <input
                  type="password"
                  value={formPasswordConfirm}
                  onChange={(e) => setFormPasswordConfirm(e.target.value)}
                  className="w-full border border-[rgba(0,0,0,0.12)] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-red-100)]"
                />
              </div>

              {formError && (
                <p className="text-sm text-red-600 mt-1">{formError}</p>
              )}
              {formSuccess && (
                <p className="text-sm text-green-600 mt-1">{formSuccess}</p>
              )}

              <div className="flex justify-end gap-3 mt-2">
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-5 py-2 rounded-full text-sm border border-[rgba(0,0,0,0.12)] text-[var(--color-black-200)] hover:bg-[rgba(0,0,0,0.03)] transition"
                  disabled={isSaving}
                >
                  {t("profile.cancelButton")}
                </button>
                <button
                  type="submit"
                  className="bg-[var(--color-red-100)] hover:bg-[var(--color-red-200)] text-white px-6 py-2 rounded-full text-sm transition disabled:opacity-70"
                  disabled={isSaving}
                >
                  {isSaving ? t("profile.saving") : t("profile.saveButton")}
                </button>
              </div>
            </form>
          )}
        </section>

        <section className="bg-[var(--color-white)] rounded-xl p-6 shadow-xl border border-[rgba(0,0,0,0.04)]">
          <h3 className="font-semibold text-lg mb-4">
            {t("profile.orderHistoryTitle")}
          </h3>

          {ordersLoading ? (
            <p className="text-sm text-[var(--color-gray-200)]">
              {t("profile.loadingOrders")}
            </p>
          ) : ordersError ? (
            <p className="text-sm text-red-600">{ordersError}</p>
          ) : orders.length === 0 ? (
            <p className="text-sm text-[var(--color-gray-200)]">
              {t("profile.noOrders")}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead className="border-b border-[rgba(0,0,0,0.05)]">
                  <tr className="text-[var(--color-black-200)]/60">
                    <th className="py-2 text-left">
                      {t("profile.table.orderId")}
                    </th>
                    <th className="py-2 text-left">
                      {t("profile.table.date")}
                    </th>
                    <th className="py-2 text-left">
                      {t("profile.table.total")}
                    </th>
                    <th className="py-2 text-left">
                      {t("profile.table.status")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.orderId}>
                      <td className="py-2">#{order.orderId}</td>
                      <td className="py-2">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString(
                              "fi-FI"
                            )
                          : "-"}
                      </td>
                      <td className="py-2">{order.cost} €</td>
                      <td className="py-2">
                        <span className={getStatusClassName(order.status)}>
                          {formatStatusLabel(order.status)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
