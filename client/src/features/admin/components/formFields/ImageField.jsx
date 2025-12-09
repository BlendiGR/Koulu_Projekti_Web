import React from 'react';
import {useState, useEffect} from 'react';

const ImageField = ({
    name = "imageUrl",
    register,
    label,
    error,
    onFileChange,
    disabled = false,
    uploading = false,
    previewUrl = null,
    accept = "image/*",
    wrapperClass = "grid grid-cols-2 gap-4",
    inputClass = "p-2 border rounded w-full",
    previewClass = "max-h-32 w-full h-auto object-contain border rounded"
    }) => {

    const [localPreview, setLocalPreview] = useState(null);

    useEffect(() => {
        return () => {
            if (localPreview) URL.revokeObjectURL(localPreview);
        };
    }, [localPreview]);

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];

        if (!file) return;
        if (localPreview) URL.revokeObjectURL(localPreview);

        const url = URL.createObjectURL(file);
        setLocalPreview(url);

        if (typeof onFileChange === "function") {
            onFileChange(e);
        }
    }

    return (
        <div className={wrapperClass}>
            <div>
                {label && <label className="block text-sm font-medium mb-1">{label}</label>}
                <input type="file" accept={accept} onChange={handleFileChange} disabled={disabled} className={inputClass} />
                {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
            </div>

            {(previewUrl || localPreview) && (
                <img src={previewUrl || localPreview} alt="preview" className={previewClass} />
            )}

            {error && <p className="text-red-500 text-sm">{error.message || String(error)}</p>}

            {/* hidden value kept in form state */}
            <input type="hidden" {...register(name)} />
        </div>
    );
};

export default ImageField;