import { Package, Truck, CheckCircle } from "lucide-react";

const steps = [
  {
    key: "PREPARING",
    label: "Preparing",
    sub: "We're cooking your order",
    icon: Package,
  },
  {
    key: "DELIVERING",
    label: "Delivering",
    sub: "On the way to you",
    icon: Truck,
  },
  {
    key: "DELIVERED",
    label: "Delivered",
    sub: "Enjoy your meal!",
    icon: CheckCircle,
  },
];

const OrderStatus = ({ status = "PREPARING" }) => {
  const activeIndex = steps.findIndex((s) => s.key === status);
  let progressPercentage = 0;
  if (status === "PREPARING") {
    progressPercentage = 15;
  } else if (status === "DELIVERING") {
    progressPercentage = 50;
  } else if (status === "DELIVERED") {
    progressPercentage = 100;
  }

  return (
    <div
      className="
        relative w-full max-w-4xl mx-auto mt-10 
        flex flex-col gap-10
        md:flex-row md:items-center md:justify-between
      "
    >
      <div className="hidden md:block p-1 absolute top-6 left-0 w-full h-[3px] bg-gray-300 z-0" />

      <div
        className={`hidden p-1 md:block absolute top-6 left-0 h-[3px] bg-green-100 transition-all duration-500 z-10`}
        style={{ width: `${progressPercentage}%` }}
      />

      <div className="md:hidden absolute left-1/2 top-0 h-full w-[3px] bg-gray-300 z-0 transform -translate-x-1/2" />

      <div
        className="md:hidden absolute left-1/2 top-0 w-[3px] bg-green-600 transition-all duration-500 z-10 transform -translate-x-1/2"
        style={{ height: `${progressPercentage}%` }}
      />

      {steps.map((step, index) => {
        const isActive = index <= activeIndex;
        const Icon = step.icon;

        return (
          <div
            key={step.key}
            className="
              relative flex flex-col items-center text-center 
              md:w-1/3
              bg-beige bg-opacity-80 md:bg-transparent rounded-lg p-2 md:p-0 z-10
            "
          >
            <div
              className={`
                flex items-center justify-center rounded-full mb-2 
                transition-all

                w-10 h-10 text-sm
                sm:w-12 sm:h-12 sm:text-base
                md:w-16 md:h-16 md:text-lg
                ${
                  isActive
                    ? "bg-green-100 text-white shadow-lg scale-110"
                    : "bg-gray-300 text-gray-500"
                }
              `}
            >
              <Icon
                size={index === activeIndex ? 24 : 20}
                className="sm:size-6 md:size-8"
              />
            </div>

            <div
              className={`
                font-medium
                text-sm sm:text-base md:text-lg
                ${isActive ? "text-green-700" : "text-gray-500"}
              `}
            >
              {step.label}
            </div>

            <div className="text-xs sm:text-sm text-gray-400 mt-1">
              {step.sub}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderStatus;
