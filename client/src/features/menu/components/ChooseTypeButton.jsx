const ChooseTypeButton = ({ type, activeButton, onClick }) => {
  const isActive = activeButton === type;

  return (
    <button
      onClick={() => onClick(type)}
      className={`flex flex-shrink justify-center text-center text-md font-semibold py-3 px-4 w-fit rounded-2xl cursor-pointer hover:bg-red-50 border-2 ${
        isActive
          ? "bg-red-100 text-white border-red-100 hover:bg-red-100"
          : "bg-white text-red-100 border-red-100"
      }`}
    >
      {type}
    </button>
  );
};

export default ChooseTypeButton;