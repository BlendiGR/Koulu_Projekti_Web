import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar.jsx";
import Footer from "../components/footer/Footer.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useEffect } from "react";

const MainLayout = () => {
  const { handleAutoLogin } = useAuth();

  console.log("Mounted!");

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div>
      <NavBar />
      <main className="mt-22">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
