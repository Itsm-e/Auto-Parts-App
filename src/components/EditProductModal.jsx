import { useState } from "react";
import API from "../api";

const EditProductModal = ({ product, close, refresh }) => {
  const [form, setForm] = useState(product);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProduct = async () => {
    await API.put(`/products/${product._id}`, form, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    refresh();
    close();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          className="w-full border p-2 mb-3"
        />

        <div className="flex justify-between">
          <button
            onClick={close}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={updateProduct}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;