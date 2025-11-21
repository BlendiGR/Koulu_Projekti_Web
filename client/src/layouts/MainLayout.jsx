import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar.jsx";
import Footer from "../components/footer/Footer.jsx";
import { NAV_LINKS } from "../config/navigation.js";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <NavBar navLinks={NAV_LINKS} />
      <main className="mt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
