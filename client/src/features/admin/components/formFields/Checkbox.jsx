import React from 'react';
import FormField from './FormField.jsx';

const Checkbox = ({
    name,
    register,
    label,
    disabled = false,
    error,
    wrapperClass = "flex items-center gap-2",
    }) => {
    return (
        <div className={wrapperClass}>
            <input type="checkbox" {...register(name)} disabled={disabled} />
            <FormField label={null} error={error}>
                <span className="text-sm">{label}</span>
            </FormField>
        </div>
    );
};

export default Checkbox;