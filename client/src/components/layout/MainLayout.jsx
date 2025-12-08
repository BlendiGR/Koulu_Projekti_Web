import { Outlet } from "react-router-dom";
import NavBar from "/src/components/layout/Navbar/NavBar.jsx";
import Footer from "/src/components/layout/Footer/Footer.jsx";
import { useAuth } from "/src/features/auth/hooks/useAuth.js";
import { useEffect } from "react";
import { Toaster } from "sonner";

const MainLayout = () => {
  const { handleAutoLogin } = useAuth();

  console.log("Mounted!");

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div >
      <NavBar />
      <main className="md:mt-22 mt-17">
        <Outlet />
        <Toaster position="bottom-right" />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
