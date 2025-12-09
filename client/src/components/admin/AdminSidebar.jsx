import { NavLink } from "react-router-dom";

const links = [
  { label: "Dashboard", to: "/admin" },
  { label: "Products", to: "/admin/products" },
  { label: "Orders", to: "/admin/orders" },
  { label: "Users", to: "/admin/users" },
  { label: "Reviews", to: "/admin/reviews" },
];

const AdminSidebar = () => {
  return (
    <aside className="w-56 p-4 border-r">
      <h3 className="font-bold mb-4">Admin</h3>
      <nav className="flex flex-col gap-2">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `px-3 py-2 rounded ${isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-gray-100"}`
            }
            end={l.to === "/admin"}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;