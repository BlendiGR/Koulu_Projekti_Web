const FeatureCard = ({ icon, title, text, glow }) => {
  return (
    <div className="bg-white p-10 rounded-3xl flex flex-col shadow-md items-center text-center">
      <div className={`p-5 rounded-full ${glow} mb-4`}>{icon}</div>
      <p className="text-xl font-medium mb-2">{title}</p>
      <p className="text-gray-600 max-w-[260px] whitespace-pre-line">{text}</p>
    </div>
  );
};

export default FeatureCard;
