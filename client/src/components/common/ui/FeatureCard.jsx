const FeatureCard = ({ icon, title, text, glow }) => {
  return (
    <div className="bg-beige p-10 rounded-3xl flex flex-col items-center text-center">
      <div className={`p-5 rounded-full ${glow} mb-4`}>{icon}</div>
      <p className="text-xl font-medium mb-2">{title}</p>
      <p className="text-gray-600 max-w-[260px]">{text}</p>
    </div>
  );
};

export default FeatureCard;
