import { useLang } from "/src/hooks/useLang";
import { useState, useEffect, useMemo } from "react";
import ProductCard from "/src/components/common/ui/ProductCard.jsx";
import ChooseTypeButton from "../components/ChooseTypeButton";
import {useProduct} from "../../../hooks/api";

const Menu = () => {
  const { t } = useLang();
  const {getProducts} = useProduct();

  const [activeButton, setActiveButton] = useState("All");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const menuTypes = ["All", "Foods", "Drinks", "Sides"];

  const apiTypeForButton = useMemo(
      () => ({
        All: undefined, // no type filter
        Foods: "FOOD",
        Drinks: "DRINK",
        Sides: "SIDE",
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
        setError(res.message || "Failed to load products");
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
      <div>
        <section className="p-8 mt-20 bg-beige text-center shadow-xl rounded-3xl">
          <h1 className="md:text-5xl text-4xl mb-4 pt-11 font-bold">
            <span className="">Our </span>
            <span className="text-red-100">Menu</span>
          </h1>
          <p className="text-gray-700 max-w-xl mx-auto text-lg md:text-xl">
            {t("menu.subheading")}
          </p>

          <div className="mt-6 flex flex-wrap justify-center items-center gap-3 max-w-2xl mx-auto">
            {menuTypes.map((type) => (
                <ChooseTypeButton
                    key={type}
                    type={type}
                    activeButton={activeButton}
                    onClick={handleButtonClick}
                />
            ))}
          </div>

          {loading && <p className="mt-6">Loading...</p>}
          {error && <p className="mt-6 text-red-500">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 justify-items-center max-w-6xl mx-auto">
            {products.map((item) => (
                <ProductCard key={item.productId} item={item} />
            ))}
          </div>
        </section>
      </div>
  );
};

export default Menu;