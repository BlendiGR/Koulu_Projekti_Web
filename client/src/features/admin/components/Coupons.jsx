import {useCoupon} from "../../../hooks/api";
import RecordContainer from "./RecordContainer.jsx";
import RecordTable from "./RecordTable.jsx";
import { useLang } from "../../../hooks/useLang.js";
import InputField from "./formFields/InputField.jsx";
import Checkbox from "./formFields/Checkbox.jsx";
import Submit from "./formFields/Submit.jsx";
import {couponAdminSchema} from "../../../schemas/couponSchema.js";

const Coupons = () => {
    const { getCoupons, createCoupon, deleteCoupon } = useCoupon();
    const { t } = useLang();

    const fields = [
        { name: "code", label: t("admin.coupons.code"), type: "input" },
        { name: "discount", label: t("admin.coupons.discount"), type: "number" },
        { name: "isActive", label: t("admin.coupons.active"), type: "checkbox" },
    ];

    const createDefaults = {
        code: "",
        discount: "",
        isActive: true,
    };

    const getCouponsForContainer = async (params) => {
        return getCoupons(params);
    };

    return (
        <RecordContainer
            title={t("admin.coupons.title") || "Coupons"}
            getItems={getCouponsForContainer}
            createItem={(values, token) => createCoupon(values, token)}
            updateItem={null} // no update endpoint yet
            deleteItem={(id, token) => deleteCoupon(id, token)}
            allowCreate={true}
            createSchema={couponAdminSchema}
            paginate={false}
            createDefaultValues={createDefaults}
            renderCreate={({ register, handleCreate, errors, submitting }) => (
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">{t("admin.coupons.addCoupon") || "Add coupon"}</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <InputField name="code" register={register} error={errors?.code} label={t("admin.coupons.code") || "Code"}/>
                        <InputField name="discount" register={register} error={errors?.discount} label={t("admin.coupons.discount") || "Discount %"} type="number"/>
                        <Checkbox name="isActive" register={register} label={t("admin.coupons.active") || "Active"}/>
                        <Submit disabled={submitting} text={submitting ? t("admin.common.creating") || "Creating..." : t("admin.common.create") || "Create"}/>
                    </form>
                </div>
            )}
            renderList={({ items, loading, onDelete }) => (
                <>
                    {loading ? (
                        <p>{t("admin.common.loading") || "Loading..."}</p>
                    ) : (
                        <RecordTable
                            items={items}
                            fields={fields}
                            idKey="id"
                            resolver={couponAdminSchema}
                            onUpdate={null}
                            onDelete={onDelete}
                        />
                    )}
                </>
            )}
        />
    );
};

export default Coupons;