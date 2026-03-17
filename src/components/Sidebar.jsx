import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-60 bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <ul className="space-y-4">
        <li>
          <Link to="/admin" className="hover:text-yellow-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/products" className="hover:text-yellow-400">
            Products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;