import { useState, useEffect } from "react";
import API from "../api";
import EditProductModal from "./EditProductModal";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await API.get("/products");
    setProducts(res.data);
  };

  const deleteProduct = async (id) => {
    await API.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    fetchProducts();
  };

  return (
    <div className="bg-white shadow rounded p-5">
      <h2 className="text-lg font-semibold mb-4">Products</h2>

      <table className="w-full border-collapse">
  <thead>
    <tr className="bg-gray-200 text-left">
      <th className="p-3">Name</th>
      <th className="p-3">Brand</th>
      <th className="p-3">Stock</th>
      <th className="p-3">Actions</th>
    </tr>
  </thead>

  <tbody>
    {products.map((item) => (
      <tr
        key={item._id}
        className="border-b hover:bg-gray-50 transition"
      >
        <td className="p-3">{item.name}</td>
        <td className="p-3">{item.brand}</td>
        <td className="p-3">
          <span
            className={`px-3 py-1 rounded-full text-sm ${
              item.stock > 5
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {item.stock}
          </span>
        </td>
        <td className="p-3 space-x-2">
          <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
            Edit
          </button>
          <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          close={() => setSelectedProduct(null)}
          refresh={fetchProducts}
        />
      )}
    </div>
  );
};

export default ProductTable;