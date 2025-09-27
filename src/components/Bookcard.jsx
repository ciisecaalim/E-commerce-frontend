import React, { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import axios from "axios";

function BookCard() {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("");

  // Store product in localStorage
  const handleStoreData = (data) => {
    const newData = JSON.parse(localStorage.getItem("product")) || [];
    const existId = newData.some((item) => item._id === data._id);

    if (!existId) {
      newData.push(data);
      localStorage.setItem("product", JSON.stringify(newData));
    }
  };

  // Fetch products
  useEffect(() => {
    axios
      .post("http://localhost:3000/read/product", { category })
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching product:", err));
  }, [category]);

  return (
    <div className="flex flex-col md:flex-row gap-10 px-6 md:px-20 py-10">
      {/* Sidebar Categories */}
      <div className="md:w-1/4 bg-white shadow-md rounded-lg p-6 h-fit">
        <h1 className="mb-6 text-xl font-bold text-gray-800 border-b pb-3">
          Select Category
        </h1>

        {["Smart Phones", "Laptops", "Tv", "Desktop"].map((cat) => (
          <label
            key={cat}
            className="flex items-center gap-3 cursor-pointer mb-4"
          >
            <input
              type="radio"
              value={cat}
              checked={category === cat}
              onChange={() => setCategory(cat)}
              name="category"
              className="accent-green-600 w-4 h-4"
            />
            <span className="text-gray-700 text-sm">{cat}</span>
          </label>
        ))}
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        {data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-4 flex flex-col"
              >
                {/* Product Image */}
                <div className="h-52 w-full overflow-hidden rounded mb-4">
                  <img
                    src={`http://localhost:3000/allImg/${item.prImg}`}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>

                {/* Product Info */}
                <h2 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-1">
                  {item.name}
                </h2>
                <p
                  className={`text-xs font-medium mb-2 ${
                    item.status === "available"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {item.status}
                </p>

                {/* Price + Add Button */}
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-green-600 font-bold text-sm">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => handleStoreData(item)}
                    disabled={item.status !== "available"}
                    className={`px-3 py-2 text-xs rounded flex items-center gap-1 font-medium transition ${
                      item.status === "available"
                        ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                        : "bg-gray-300 text-gray-600 cursor-not-allowed"
                    }`}
                  >
                    <FaShoppingCart className="text-xs" />
                    Add
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 py-20">
            <img
              src="https://cdn-icons-png.flaticon.com/512/4076/4076501.png"
              alt="No Data"
              className="w-28 mb-4 opacity-70"
            />
            <h2 className="text-lg font-semibold">No Products Found</h2>
            <p className="text-sm text-gray-400">
              Please select another category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookCard;
