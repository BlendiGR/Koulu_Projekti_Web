import { useLang } from "../../../hooks/useLang.js";
import { useAnnouncement } from "../../../hooks/api";
import RecordContainer from "./RecordContainer.jsx";
import RecordTable from "./RecordTable.jsx";
import InputField from "./formFields/InputField.jsx";
import TextArea from "./formFields/TextArea.jsx";
import Checkbox from "./formFields/Checkbox.jsx";
import Submit from "./formFields/Submit.jsx";
import { announcementSchema } from "../../../schemas/announcementSchema.js";

const Announcement = () => {
    const { t } = useLang();
    const { getAnnouncementsAdmin, updateAnnouncement } = useAnnouncement();

    // Fields config for RecordTable
    const fields = [
        { name: "title", label: t("admin.announcement.title") || "Title", type: "input" },
        { name: "message", label: t("admin.announcement.message") || "Message", type: "textarea" },
        { name: "isActive", label: t("admin.announcement.active") || "Active", type: "checkbox" },
    ];

    // Default values for editing
    const defaultValues = {
        title: "",
        message: "",
        isActive: true,
    };

    const getAnnouncementForContainer = async () => {
        const token = localStorage.getItem("token");
        const res = await getAnnouncementsAdmin(token);
        if (!res.success) return res;
        const item = res.data || null;
        return {
            success: true,
            data: item ? [item] : [],
        };
    };

    const updateAnnouncementForContainer = async (_id, values, token) => {
        return updateAnnouncement(values, token);
    };

    return (
        <RecordContainer
            title={t("admin.announcement.boxTitle") || "Announcement"}
            getItems={getAnnouncementForContainer}
            createItem={null}
            updateItem={updateAnnouncementForContainer}
            deleteItem={null}
            allowCreate={false}
            createSchema={announcementSchema}
            updateSchema={announcementSchema}
            paginate={false}
            createDefaultValues={defaultValues}
            renderCreate={null} // no create form
            renderList={({ items, loading, onUpdate }) => (
                <>
                    {loading ? (
                        <p>{t("admin.common.loading") || "Loading..."}</p>
                    ) : items.length === 0 ? (
                        <p>{t("admin.announcement.none") || "No announcement configured."}</p>
                    ) : (
                        <RecordTable
                            items={items}
                            fields={fields}
                            idKey="id"
                            resolver={announcementSchema}
                            onUpdate={onUpdate}
                            onDelete={null}
                            // simple inline edit form per row, mirroring other sections if needed
                        />
                    )}
                </>
            )}
            // Optional: a simple inline update form (if RecordTable does not support edit)
            renderUpdate={({ register, handleUpdate, errors, submitting, defaultValues: values }) => (
                <form onSubmit={handleUpdate} className="grid grid-cols-1 gap-3 max-w-2xl mt-4">
                    <InputField name="title" register={register} error={errors?.title} label={t("admin.announcement.title") || "Title"} defaultValue={values?.title}/>
                    <TextArea name="message" register={register} error={errors?.message} label={t("admin.announcement.message") || "Message"} defaultValue={values?.message}/>
                    <Checkbox name="isActive" register={register} label={t("admin.announcement.active") || "Active"} defaultChecked={values?.isActive}/>
                    <Submit disabled={submitting} text={submitting ? (t("admin.common.saving") || "Saving...") : (t("admin.common.save") || "Save")} />
                </form>
            )}
        />
    );
};

export default Announcement;