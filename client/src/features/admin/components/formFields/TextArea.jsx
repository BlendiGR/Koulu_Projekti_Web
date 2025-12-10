import React from 'react';
import FormField from './FormField.jsx';

const TextArea = ({
    name,
    register,
    label,
    placeholder,
    disabled = false,
    error,
    rows = 4,
    wrapperClass = "col-span-1 md:col-span-2",
    inputClass = "p-2 border rounded w-full"
    }) => {
    return (
        <div className={wrapperClass}>
            <FormField label={label} error={error}>
                <textarea
                    {...register(name)}
                    placeholder={placeholder}
                    rows={rows}
                    disabled={disabled}
                    className={inputClass}/>
            </FormField>
        </div>
    );
};

export default TextArea;