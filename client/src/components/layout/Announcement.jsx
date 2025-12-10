import { X } from "lucide-react";

const Announcement = ({ data, onDismiss }) => {
    if (!data) return null;
    
    return (
        <div className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-white text-center relative">
            <p className="text-xs md:text-sm font-medium">{data.title}</p>
            <p className="text-xs md:text-sm font-bold">{data.message}</p>
            <button
                onClick={onDismiss}
                className="absolute text-white right-2 p-1 hover:bg-red-200 rounded-full transition-colors"
                aria-label="Dismiss announcement"
            >
                <X size={16} />
            </button>
        </div>
    );
};

export default Announcement;
