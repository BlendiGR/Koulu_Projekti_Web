import { useLang } from "/src/hooks/useLang.js";
import RedButton from "/src/components/common/ui/RedButton.jsx";
import { CircleCheckBig } from 'lucide-react';
import { useParams, useNavigate } from "react-router";

const Success = () => {
    const { t } = useLang();
    const { orderId } = useParams();
    const navigate = useNavigate();
    
    return (
        <div className ="flex items-center justify-center h-[calc(100vh-5rem)]">
            <div className="flex flex-col items-center gap-4">
                <span className="p-7 rounded-full bg-green-light">
                    <CircleCheckBig size={100} color="green"/>
                </span>
                <h1 className="md:text-5xl text-4xl mb-4">Thank you for <span className="text-red-100">Ordering!</span></h1>
                <p className="text-sm md:text-xl text-center text-gray-600">Your delicious meal is on its way! We've received your order and started preparing it.</p>
                <RedButton className="mt-4 text-2xl w-[50%]" onClick={() => navigate("/orders/" + orderId)}>Track Order</RedButton>
                <button className="bg-beige hover:bg-gray-100 active:bg-gray-200 text-black rounded-xl shadow-lg active:scale-101 transition-all duration-200 cursor-pointer text-2xl py-3 px-5 w-[50%]">Back to Home</button>
            </div>
        </div>
    );
};

export default Success;