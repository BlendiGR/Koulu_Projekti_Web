import React from 'react';
import FormField from './FormField.jsx';

const InputField = ({
    name,
    register,
    label,
    placeholder,
    error,
    type = "text",
    disabled = false,
    wrapperClass = "",
    inputClass = "h-10 p-2 border rounded w-full"
    }) => {
    return (
        <div className={wrapperClass}>
            <FormField label={label} error={error}>
                <input
                    type={type}
                    disabled={disabled}
                    placeholder={placeholder}
                    {...register(name)}
                    className={inputClass}
                />
            </FormField>
        </div>
    );
};

export default InputField;