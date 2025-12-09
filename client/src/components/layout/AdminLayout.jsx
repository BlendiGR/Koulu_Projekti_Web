import { Outlet } from "react-router-dom";
import NavBar from "/src/components/layout/Navbar/NavBar.jsx";
import AdminSidebar from "/src/components/admin/AdminSidebar.jsx";
import { useAuth } from "/src/features/auth/hooks/useAuth.js";
import { useEffect } from "react";

const AdminLayout = () => {
  const { handleAutoLogin } = useAuth();

  useEffect(() => {
    handleAutoLogin();
  }, []);

  return (
    <div>
      <NavBar />
      <main className="md:mt-22 mt-17 flex">
        <AdminSidebar />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;