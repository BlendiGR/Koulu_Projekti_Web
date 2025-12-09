import { useLang } from "/src/hooks/useLang";
import ProductCard from "/src/components/common/ui/ProductCard.jsx";
import { allProducts } from "/src/config/allProducts.js";
import { mostBuyedProducts } from "/src/config/mostBuyedSection.js";

const Menu = () => {
  const { t } = useLang();
  const testloggg = () => {
    console.log("Did it yeah");
  };
  return (
    <div>
      <section className="p-8 mt-20 bg-beige text-center shadow-xl rounded-3xl">
        <h1 className="md:text-5xl text-4xl mb-4 pt-11">{t("menu.title")}</h1>
        <p className="text-gray-700 max-w-xl mx-auto text-lg md:text-xl">
          {t("menu.subheading")}
        </p>

        <div class="flex md:flex-row flex-col justify-center items-center gap-4">
          <button
            onClick={testloggg}
            className="flex justify-center text-center text-white md:text-2xl text-xl font-semibold bg-red-100 py-3 w-full rounded-2xl cursor-pointer active:bg-red-200 hover:bg-red-200 mt-5"
          >
            All
          </button>
          <button
            onClick={testloggg}
            className="flex justify-center text-center text-white md:text-2xl text-xl font-semibold bg-red-100 py-3 w-full rounded-2xl cursor-pointer active:bg-red-200 hover:bg-red-200 mt-5"
          >
            Pizzas
          </button>
          <button
            onClick={testloggg}
            className="flex justify-center text-center text-white md:text-2xl text-xl font-semibold bg-red-100 py-3 w-full rounded-2xl cursor-pointer active:bg-red-200 hover:bg-red-200 mt-5"
          >
            Kebab
          </button>
          <button
            onClick={testloggg}
            className="flex justify-center text-center text-white md:text-2xl text-xl font-semibold bg-red-100 py-3 w-full rounded-2xl cursor-pointer active:bg-red-200 hover:bg-red-200 mt-5"
          >
            Burgers
          </button>
          <button
            onClick={testloggg}
            className="flex justify-center text-center text-white md:text-2xl text-xl font-semibold bg-red-100 py-3 w-full rounded-2xl cursor-pointer active:bg-red-200 hover:bg-red-200 mt-5"
          >
            Salads
          </button>
          <button
            onClick={testloggg}
            className="flex justify-center text-center text-white md:text-2xl text-xl font-semibold bg-red-100 py-3 w-full rounded-2xl cursor-pointer active:bg-red-200 hover:bg-red-200 mt-5"
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
