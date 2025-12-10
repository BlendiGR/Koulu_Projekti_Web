import {useState} from 'react';
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
    inputClass = "h-10 p-2 border rounded w-full",
    showToggle = false,
    defaultValue
    }) => {

    const [visible, setVisible] = useState(true);
    const isPassword = type === "password" && showToggle;
    const isNumber = type === "number";

    const registered = register
        ? register(name, isNumber ? { valueAsNumber: true } : undefined)
        : {};

    const inputProps = {
        type: isPassword ? (visible ? "text" : "password") : type,
        disabled,
        placeholder,
        defaultValue,
        ...registered,
        className: inputClass,
    };

    return (
        <div className={wrapperClass}>
            <FormField label={label} error={error}>
                {isPassword ? (
                    <div className="relative">
                        <input {...inputProps} />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-2 text-xs text-gray-600"
                            onClick={() => setVisible((v) => !v)}
                            tabIndex={-1}
                        >
                            {visible ? "Hide" : "Show"}
                        </button>
                    </div>
                ) : (
                    <input {...inputProps} />
                )}
            </FormField>
        </div>
    );
};

export default InputField;