import { fetchData } from "../../utils/fetchData";

export const useAnnouncement = () => {
    const getAnnouncements = async () => {
        const res = await fetchData("/api/v1/announcement", {
            method: "GET",
        });
        if (!res.success) {
            return null;
        }
        return {success: true, data: res.data};
    };

    const getAnnouncementsAdmin = async (token) => {
        const res = await fetchData("/api/v1/announcement/admin", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.success) return res;

        return {success: true, data: res.data};
    }

    const updateAnnouncement = async (announcement, token) => {
        const res = await fetchData("/api/v1/announcement", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(announcement),
        });
        if (!res.success) return res;

        return {success: true, data: res.data};
    };

    return {
        getAnnouncements,
        getAnnouncementsAdmin,
        updateAnnouncement,
    };
};