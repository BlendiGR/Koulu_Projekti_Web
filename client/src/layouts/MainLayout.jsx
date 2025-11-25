import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar.jsx";
import Footer from "../components/footer/Footer.jsx";
import { useCart } from "../hooks/useCart.js";
import { useEffect } from "react";
import { Toaster } from "sonner";

const MainLayout = () => {
  const { totalItems, readStoredCart, setCartItems } = useCart();

  useEffect(() => {
    const stored = readStoredCart();
  }, []);

  return (
    <div className="min-h-screen">
      <NavBar selectedItems={totalItems} />
      <main className="md:mt-[92px] mt-[68px]">
        <Outlet />
        <Toaster />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
