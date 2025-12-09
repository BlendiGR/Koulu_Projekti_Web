import React from 'react';

const FormField = ({label, children, error, className = ""}) => {
    return (
        <div className={className + " *:placeholder:opacity-75"}>
            {label && <label className="block text-sm font-medium mb-1">{label}</label>}
            {children}
            {error && (
                <p className="text-red-500 text-sm mt-1">{error.message || String(error)}</p>
            )}
        </div>
    );
};

export default FormField;