const RedButton = ({
  children,
  onClick,
  fullWidth = false,
  size = "md",
  className = "",
  disabled = false,
  type = "button",
  ...rest
}) => {
  const sizeClasses = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-5",
    lg: "py-4 px-6 font-semibold",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${fullWidth ? "w-full" : ""}
        ${sizeClasses[size]}
        bg-red-100 
        hover:bg-red-200 
        active:bg-red-200
        text-white 
        rounded-xl 
        shadow-lg 
        active:scale-101 
        transition-all
        duration-200
        cursor-pointer
        disabled:opacity-50 
        disabled:cursor-not-allowed
        disabled:active:scale-100
        ${className}
      `}
      {...rest}
    >
      {children}
    </button>
  );
};

export default RedButton;
