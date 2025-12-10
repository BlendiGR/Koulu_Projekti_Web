import { useLang } from "/src/hooks/useLang";
import { useState } from "react";
import ProductCard from "/src/components/common/ui/ProductCard.jsx";
import { allProducts } from "/src/config/allProducts.js";
import { mostBuyedProducts } from "/src/config/mostBuyedSection.js";

const Menu = () => {
  const { t } = useLang();
  const [activeButton, setActiveButton] = useState("All");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    console.log("Did it yeah");
  };
  return (
    <div>
      <section className="p-8 mt-20 bg-beige text-center shadow-xl rounded-3xl">
        <h1 className="md:text-5xl text-4xl mb-4 pt-11">{t("menu.title")}</h1>
        <p className="text-gray-700 max-w-xl mx-auto text-lg md:text-xl">
          {t("menu.subheading")}
        </p>

        <div className="flex md:flex-row flex-col justify-center items-center gap-4 max-w-2xl mx-auto">
          <button
            onClick={() => handleButtonClick("All")}
            className={`flex justify-center text-center md:text-2xl text-xl font-semibold py-3 w-full rounded-2xl cursor-pointer hover:bg-red-50 mt-5 border-2 ${
              activeButton === "All"
                ? "bg-red-100 text-white border-red-100 hover:bg-red-100"
                : "bg-white text-red-100 border-red-100 hover:bg-red-50"
            }`}
          >
            All
          </button>
          <button
            onClick={() => handleButtonClick("Pizzas")}
            className={`flex justify-center text-center md:text-2xl text-xl font-semibold py-3 w-full rounded-2xl cursor-pointer  mt-5 border-2 ${
              activeButton === "Pizzas"
                ? "bg-red-100 text-white border-red-100 hover:bg-red-100"
                : "bg-white text-red-100 border-red-100 hover:bg-red-50"
            }`}
          >
            Pizzas
          </button>
          <button
            onClick={() => handleButtonClick("Kebab")}
            className={`flex justify-center text-center md:text-2xl text-xl font-semibold py-3 w-full rounded-2xl cursor-pointer hover:bg-red-50 mt-5 border-2 ${
              activeButton === "Kebab"
                ? "bg-red-100 text-white border-red-100 hover:bg-red-100"
                : "bg-white text-red-100 border-red-100 hover:bg-red-50"
            }`}
          >
            Kebab
          </button>
          <button
            onClick={() => handleButtonClick("Burgers")}
            className={`flex justify-center text-center md:text-2xl text-xl font-semibold py-3 w-full rounded-2xl cursor-pointer hover:bg-red-50 mt-5 border-2 ${
              activeButton === "Burgers"
                ? "bg-red-100 text-white border-red-100 hover:bg-red-100"
                : "bg-white text-red-100 border-red-100 hover:bg-red-50"
            }`}
          >
            Burgers
          </button>
          <button
            onClick={() => handleButtonClick("Salads")}
            className={`flex justify-center text-center md:text-2xl text-xl font-semibold py-3 w-full rounded-2xl cursor-pointer hover:bg-red-50 mt-5 border-2 ${
              activeButton === "Salads"
                ? "bg-red-100 text-white border-red-100 hover:bg-red-100"
                : "bg-white text-red-100 border-red-100 hover:bg-red-50"
            }`}
          >
            Salads
          </button>
          <button
            onClick={() => handleButtonClick("Drinks")}
            className={`flex justify-center text-center md:text-2xl text-xl font-semibold py-3 w-full rounded-2xl cursor-pointer hover:bg-red-50 mt-5 border-2 ${
              activeButton === "Drinks"
                ? "bg-red-100 text-white border-red-100 hover:bg-red-100"
                : "bg-white text-red-100 border-red-100 hover:bg-red-50"
            }`}
          >
            Drinks
          </button>
        </div>

        <div className="flex md:flex-row flex-col justify-center items-center gap-10 mt-10">
          {allProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
        <div className="flex md:flex-row flex-col justify-center items-center gap-10 mt-10">
          {allProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
        <div className="flex md:flex-row flex-col justify-center items-center gap-10 mt-10">
          {mostBuyedProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;
