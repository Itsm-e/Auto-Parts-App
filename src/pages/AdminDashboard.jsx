import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AdminDashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: null,
  }
);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      alert("Unauthorized. Please login again.");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const addProduct = async () => {
  try {
    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    // ✅ Get token
    const token = localStorage.getItem("token");

    await API.post("/products", formData, {
      headers: {
        Authorization: `Bearer ${token}`,  // ✅ FIX
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Product added successfully");

  } catch (error) {
    console.log(error.response?.data || error);
    alert("Error adding product");
  }
};

  const deleteProduct = async (id) => {
    try {
      await API.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
    } catch {
      alert("Delete failed");
    }
  };

  const updateProduct = async () => {
    try {
      await API.put(`/products/${editingProduct._id}`, editingProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEditingProduct(null);
      fetchProducts();
    } catch {
      alert("Update failed");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      brand: "",
      price: "",
      stock: "",
      category: "",
      description: "",
      image: null,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
  <div className="max-w-7xl mx-auto p-8">

      <div className="p-10">

      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <p>Welcome Admin 🚀</p>

      </div>

      {/* Add Product Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 mb-10">
        <h3 className="text-lg font-semibold mb-4">Add Product</h3>

        <div className="grid grid-cols-2 gap-4">
          <input name="name" value={form.name} placeholder="Name" onChange={handleChange} className="border p-2 rounded" />
          <input name="brand" value={form.brand} placeholder="Brand" onChange={handleChange} className="border p-2 rounded" />
          <input name="category" value={form.category} placeholder="Category" onChange={handleChange} className="border p-2 rounded" />
          <input name="stock" value={form.stock} placeholder="Stock" onChange={handleChange} className="border p-2 rounded" />
        </div>

        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
          className="border p-2 rounded w-full mt-4"
        />

        <input
          input
          type="file"
          onChange={(e) =>
          setForm({ ...form, image: e.target.files[0] })}
          className="mt-4"
        />

        <button 
        onClick={addProduct}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">
        Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white shadow rounded p-6">
        <h3 className="text-lg font-semibold mb-4">All Products</h3>

        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th>Name</th>
              <th>Brand</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((item) => (
              <tr key={item._id} className="border-b">
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.stock}</td>
                <td className="space-x-2">
                  <button
                    onClick={() => setEditingProduct(item)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-lg font-semibold mb-4">Edit Product</h3>

            <input
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <input
              value={editingProduct.brand}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, brand: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <input
              value={editingProduct.stock}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, stock: e.target.value })
              }
              className="border p-2 w-full mb-3"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setEditingProduct(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateProduct}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
    

  );
}

export default AdminDashboard;