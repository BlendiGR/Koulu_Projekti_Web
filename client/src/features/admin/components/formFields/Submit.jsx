import React from 'react';

const Submit = ({
    text = "Submit",
    disabled = false,
    wrapperClass = "",
    buttonClass = "bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
    }) => {
    return (
        <div className={wrapperClass}>
            <button className={buttonClass} type="submit" disabled={disabled}>
                {text}
            </button>
        </div>
    );
};

export default Submit;