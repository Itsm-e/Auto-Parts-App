import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import SearchIcon from "@mui/icons-material/Search";

function Navbar({ setSearchTerm }) {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="bg-black text-white sticky top-0 z-50 shadow-md">
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
    <link to="/"><h1 className="text-2xl font-bold tracking-wide">
       \ō͡≡o˞̶  PARAS ENTERPRISES
    </h1></link>


    <ul className="nav-links">

  <li className="search-item">
  <div className="search-container">

  <SearchIcon className="search-icon" />

  <input
  type="text"
  placeholder="Search car parts..."
  className="search-input"
  onChange={(e) => setSearchTerm(e.target.value)}
/>

</div>
</li>

</ul>

    <div className="space-x-8 text-lg">
      <Link to="/" className="hover:text-yellow-400 transition">
        Products
      </Link>

      {!token && (
        <Link to="/login" className="hover:text-yellow-400 transition">
          Admin
        </Link>
      )}

      <Link to="/about" style={{color:"white"}}>
        About Us
      </Link>

      {token && (
        <>
          <Link to="/admin" className="hover:text-yellow-400 transition">
            Dashboard
          </Link>
          <button
            onClick={logout}
            className="bg-red-500 px-4 py-1 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </>
      )}
    </div>
  </div>
</div>
  );
}

export default Navbar;