const Spinner = ({
  size = 32,
  ringColor = "#f3f4f6",
  spinColor = "red-100",
  thickness = 4,
  className = "",
  ...rest
}) => {
  const px = `${size}px`;
  const border = `${thickness}px`;

  return (
    <div
      className={`relative inline-block ${className}`}
      style={{ width: px, height: px }}
      {...rest}
    >
      <div
        className="w-full h-full rounded-full border-solid"
        style={{
          borderWidth: border,
          borderColor: ringColor,
        }}
      />

      <div
        className="absolute inset-0 rounded-full border-solid animate-spin"
        style={{
          borderWidth: border,
          borderTopColor: spinColor,
          borderRightColor: "transparent",
          borderBottomColor: "transparent",
          borderLeftColor: "transparent",
        }}
      />
    </div>
  );
};

export default Spinner;
