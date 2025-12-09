import { Link } from "react-router-dom";

const AdminIndex = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/admin/products" className="p-4 border rounded hover:shadow">
          Manage Products
        </Link>
        <Link to="/admin/orders" className="p-4 border rounded hover:shadow">
          Manage Orders
        </Link>
        <Link to="/admin/users" className="p-4 border rounded hover:shadow">
          Manage Users
        </Link>
        <Link to="/admin/reviews" className="p-4 border rounded hover:shadow">
          Manage Reviews
        </Link>
      </div>
    </div>
  );
};

export default AdminIndex;