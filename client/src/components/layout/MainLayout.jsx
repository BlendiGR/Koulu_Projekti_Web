import { Outlet } from "react-router-dom";
import NavBar from "/src/components/layout/Navbar/NavBar.jsx";
import Footer from "/src/components/layout/Footer/Footer.jsx";
import { useAuth } from "/src/features/auth/hooks/useAuth.js";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { useLocation } from "react-router";

const MainLayout = () => {
  const { handleAutoLogin } = useAuth();
    const location = useLocation();

  console.log("Mounted!");

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div >
      <NavBar />
      <main className={location.pathname === "/" ? "" : "mt-17 md:mt-22"}>
        <Outlet />
        <Toaster position="bottom-right" />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
