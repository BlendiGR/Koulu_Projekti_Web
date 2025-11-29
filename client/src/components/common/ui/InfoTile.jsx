const InfoTile = ({ icon, title, text }) => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-4">
      <div className="p-3 bg-white rounded-full shadow">{icon}</div>
      <div className="text-center lg:text-left whitespace-pre-line text-gray-600">
        <p className="font-medium text-black">{title}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default InfoTile;
