import { useLang } from "/src/hooks/useLang";
import { useState } from "react";
import ProductCard from "/src/components/common/ui/ProductCard.jsx";
import ChooseTypeButton from "../components/ChooseTypeButton";
import {
  allProducts,
  pizzas,
  burgers,
  kebab,
  salad,
  drinks,
} from "/src/config/allProducts.js";

const Menu = () => {
  const { t } = useLang();
  const [activeButton, setActiveButton] = useState("All");

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  const menuTypes = ["All", "Pizzas", "Kebab", "Burgers", "Salads", "Drinks"];
  return (
    <div>
      <section className="p-8 mt-20 bg-beige text-center shadow-xl rounded-3xl">
        <h1 className="md:text-5xl text-4xl mb-4 pt-11">
          <span className="">Our </span>
          <span className="text-red-100">Menu</span>
        </h1>
        <p className="text-gray-700 max-w-xl mx-auto text-lg md:text-xl">
          {t("menu.subheading")}
        </p>

        <div className="flex md:flex-row flex-col justify-center items-center gap-4 max-w-2xl mx-auto">
          {menuTypes.map((type) => (
            <ChooseTypeButton
              key={type}
              type={type}
              activeButton={activeButton}
              onClick={handleButtonClick}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 justify-items-center">
          {allProducts.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Menu;
