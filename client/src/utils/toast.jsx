import {toast} from "sonner";

const wrap = (content, className) =>
    typeof content === "string" ? (
        <span className={`md:text-xl text-lg ${className || ""}`}>{content}</span>
    ) : (
        content
    );

export const showSuccess = (content) => toast.success(wrap(content, "text-green-600"));
export const showError = (content) => toast.error(wrap(content, "text-red-200 font-semibold"));
export const showInfo = (content) => toast(wrap(content));
export const showRaw = (jsx) => toast(jsx);