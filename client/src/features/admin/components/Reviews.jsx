import { useState } from "react";
import { useReview } from "../../../hooks/api";
import reviewSchema from "../../../schemas/reviewSchema";
import RecordContainer from "./RecordContainer.jsx";
import RecordTable from "./RecordTable.jsx";
import { useLang } from "../../../hooks/useLang.js";
import TextArea from "./formFields/TextArea.jsx";
import InputField from "./formFields/InputField.jsx";
import SelectField from "./formFields/SelectField.jsx";
import Checkbox from "./formFields/Checkbox.jsx";
import Submit from "./formFields/Submit.jsx";
import SortBar from "./SortBar.jsx";

const Reviews = () => {
    const {getReviews, createReview, updateReview, deleteReview} = useReview();
    const {t} = useLang();

    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const ratingOptions = [
        {value: 1, label: "1"},
        {value: 2, label: "2"},
        {value: 3, label: "3"},
        {value: 4, label: "4"},
        {value: 5, label: "5"}
    ];

    const fields = [
        {name: "rating", label: t("admin.reviews.rating"), type: "select", options: ratingOptions},
        {name: "reviewer", label: t("admin.reviews.username"), type: "input"},
        {name: "review", label: t("admin.reviews.review"), type: "textarea"},
        {name: "isActive", label: t("admin.reviews.active"), type: "checkbox"},
    ];

    const createDefaults = {
        rating: 0,
        reviewer: "",
        review: "",
        isActive: false,
    };

    return (
        <RecordContainer
            title={t("admin.reviews.title")}
            getItems={getReviews}
            createItem={(values, token) => createReview(values, token)}
            updateItem={(id, values, token) => updateReview(id, values, token)}
            deleteItem={(id, token) => deleteReview(id, token)}
            allowCreate={true}
            createSchema={reviewSchema}
            createDefaultValues={createDefaults}
            renderCreate={({ register, handleCreate, errors, submitting }) => (
                <div className="mb-4">
                    <h3 className="font-semibold mb-2">{t("admin.reviews.addReview")}</h3>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <SelectField name="rating" register={register} options={ratingOptions} error={errors.rating} label={t("admin.reviews.rating")} />
                        <InputField name="reviewer" register={register} error={errors.reviewer} label={t("admin.reviews.username")} />
                        <TextArea name="review" register={register} error={errors.review} label={t("admin.reviews.review")} placeholder={t("admin.reviews.reviewPlaceholder")} />
                        <Checkbox name="isActive" register={register} label={t("admin.reviews.active")} />
                        <Submit disabled={submitting} text={submitting ? t("admin.common.creating") : t("admin.common.create")} />
                    </form>
                </div>
            )}
            renderList={({ items, loading, onUpdate, onDelete, fetchPage, pageSize, setPage }) => (
                <>
                    <SortBar
                        options={[
                            { value: "rating", label: t("admin.reviews.rating") },
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
                            idKey="reviewId"
                            resolver={reviewSchema(t)}
                            onUpdate={onUpdate}
                            onDelete={onDelete}
                        />
                    )}
                </>
            )}
        />
    );
};

export default Reviews;