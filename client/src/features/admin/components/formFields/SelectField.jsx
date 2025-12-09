import React from 'react';
import FormField from './FormField.jsx';

const SelectField = ({
    name,
    register,
    label,
    options = {},
    disabled = false,
    error,
    wrapperClass = "",
    selectClass = "h-10 p-2 border rounded w-full"
    }) => {
    return (
        <div className={wrapperClass}>
            <FormField label={label} error={error}>
                <select {...register(name)} className={selectClass} disabled={disabled}>
                    {options.map((opt) =>
                        typeof opt === "string" ? (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ) : (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        )
                    )}
                </select>
            </FormField>
        </div>
    );
};

export default SelectField;