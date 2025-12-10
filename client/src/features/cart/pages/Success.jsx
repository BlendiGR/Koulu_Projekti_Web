import { useLang } from "/src/hooks/useLang.js";
import RedButton from "/src/components/common/ui/RedButton.jsx";
import { CircleCheckBig } from "lucide-react";
import { useParams, useNavigate } from "react-router";

const Success = () => {
  const { t } = useLang();
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <div className="flex items-center text-center justify-center h-[calc(100vh-5rem)]">
      <div className="flex flex-col items-center gap-4">
        <span className="p-7 rounded-full bg-green-light">
          <CircleCheckBig size={100} color="green" />
        </span>
        <h1 className="md:text-5xl text-4xl pt-3 font-extrabold">
          {t("success.titleOne")} <span className="text-red-100">{t("success.titleTwo")}</span>
        </h1>
        <p className="text-sm md:text-xl mb-2 text-center font-medium text-gray-600">
          {t("success.subtitle")}
        </p>
        <RedButton
          className="mt-4 md:text-2xl w-[50%] font-semibold"
          onClick={() => navigate("/orders/" + orderId)}
        >
          {t("success.trackOrder")}
        </RedButton>
        <button 
          onClick={() => navigate("/")}
          className="bg-beige hover:bg-gray-100 active:bg-gray-300 text-black rounded-xl shadow-sm active:scale-101 transition-all duration-200 cursor-pointer md:text-2xl py-3 px-5 w-[50%]"
        >
          {t("success.home")}
        </button>
      </div>
    </div>
  );
};

export default Success;
