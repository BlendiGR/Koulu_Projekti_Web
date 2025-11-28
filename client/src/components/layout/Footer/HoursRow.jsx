import { Clock } from "lucide-react";

const HoursRow = ({ label, time }) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="p-3 rounded-full bg-green-light">
        <Clock className="text-green-100" size={30} />
      </div>
      <p className="text-left">
        {label} <br />
        <span className="text-green-100 font-bold">{time}</span>
      </p>
    </div>
  );
};

export default HoursRow;
