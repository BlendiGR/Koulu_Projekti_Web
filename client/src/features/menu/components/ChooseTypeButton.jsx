const ChooseTypeButton = ({ type, activeButton, onClick }) => {
  const isActive = activeButton === type;

  return (
    <button
      onClick={() => onClick(type)}
      className={`flex justify-center text-center md:text-2xl text-xl font-semibold py-3 w-full rounded-2xl cursor-pointer hover:bg-red-50 mt-5 border-2 ${
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
