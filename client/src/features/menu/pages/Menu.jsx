import { useLang } from "/src/hooks/useLang";
import { useState, useEffect, useMemo } from "react";
import ProductCard from "/src/components/common/ui/ProductCard.jsx";
import ChooseTypeButton from "../components/ChooseTypeButton";
import {useProduct} from "../../../hooks/api";

const Menu = () => {
  const { t } = useLang();
  const {getProducts} = useProduct();

  const [activeButton, setActiveButton] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const menuTypes = ["all", "foods", "drinks", "sides"];

  const apiTypeForButton = useMemo(
      () => ({
        all: undefined, // no type filter
        foods: "FOOD",
        drinks: "DRINK",
        sides: "SIDE",
      }),
      []
  );

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      const type = apiTypeForButton[activeButton];

      const params = {
        isActive: true,
        ...(type ? { type } : {}),
      };

      const res = await getProducts(params);

      if (!res.success) {
        setError(res.message || t("menu.error"));
        setProducts([]);
      } else {
        setProducts(res.data.data );
      }

      setLoading(false);
    };

    fetchProducts();
  }, [activeButton]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
      <div className="min-h-[calc(100vh-15rem)]">
        <section className="p-8 mt-20 bg-beige text-center rounded-3xl">
          <h1 className="md:text-5xl text-4xl mb-4 pt-11 font-bold">
            <span className="">{t("menu.our")} </span>
            <span className="text-red-100">{t("menu.menu")}</span>
          </h1>
          <p className="text-gray-700 max-w-xl mx-auto text-lg md:text-xl">
            {t("menu.subheading")}
          </p>

          <div className="mt-6 flex flex-wrap justify-center items-center gap-3 max-w-2xl mx-auto">
            {menuTypes.map((type) => (
                <ChooseTypeButton
                    key={type}
                    type={type}
                    label={t(`menu.filter.${type}`)}
                    activeButton={activeButton}
                    onClick={handleButtonClick}
                />
            ))}
          </div>

          {loading && <p className="mt-6">{t("menu.loading")}</p>}
          {error && <p className="mt-6 text-red-500">{error}</p>}

          <div className="mt-10 max-w-5xl mx-auto grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((item) => (
                <ProductCard key={item.productId} item={item} />
            ))}
          </div>
        </section>
      </div>
  );
};

export default Menu;