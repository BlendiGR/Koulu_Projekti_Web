import { Outlet } from "react-router-dom";
import NavBar from "../components/navbar/NavBar.jsx";
import Footer from "../components/footer/Footer.jsx";

export default function MainLayout() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="md:mt-[92px] mt-[68px]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
