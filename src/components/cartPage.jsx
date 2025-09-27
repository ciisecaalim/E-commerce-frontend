import { useEffect, useState } from "react";
import HeaderBookStore from "./Header";
import axios from "axios";

function CartPage() {

  const [product, setProduct] = useState([]);
  console.log(product)
  
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem("product")) || [];  
    const upadeData = getData.map(item => ({
      ...item, quantity: 1, maxQuantity: item.quantity
    }));
    setProduct(upadeData);
  }, []);

  const handleIncrement = (id) => {
    setProduct(prd => prd.map(item => item._id === id ? {
      ...item, quantity: item.quantity < item.maxQuantity ? item.quantity + 1 : item.quantity
    } : item));
  };

const custumer = localStorage.getItem("customer");

let customerOrder = "";

if (custumer) {
  const parsed = JSON.parse(custumer);
  customerOrder = parsed.customer?.name || ""; // sax loo akhrinayo magaca
  console.log("Customer name:", customerOrder);
}

const handleOrder = () => {
  if (!customerOrder) {
    alert("Please enter customer name before placing order.");
    return;
  }

  axios.post("http://localhost:3000/create/order", {
    customer: customerOrder, // sax loo dirayo magaca
    products: product.map(item => ({
      productId: item._id,
      quantity: item.quantity
    }))
  })
  .then((res) => {
    if (res.data.error) {
      alert(res.data.error);
    } else {
      alert("success order");
      // clear cart kadib order si uu u muuqdo in la dhameystiray
      localStorage.removeItem("product");
      setProduct([]);
    }
  })
  .catch(error => console.log(error));
};


  const handleDecrement = (id) => {
    setProduct(prd => prd.map(item => item._id === id ? {
      ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1
    } : item));
  };

  const totalPrice = product.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);

  const handleDelete = (id) => {
    const removeData = product.filter((item) => String(item._id) !== String(id));
    localStorage.setItem("product", JSON.stringify(removeData));
    setProduct(removeData);
  };

  return (
    <>
      <HeaderBookStore />
      <div className="bg-gray-100 min-h-screen py-10 px-4">
        <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg flex flex-col lg:flex-row overflow-hidden">
          {/* Left: Cart Items */}
          <div className="w-full lg:w-2/3 p-6">
            <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

            <div className="hidden md:flex gap-36 text-gray-600 font-medium border-b pb-3 mb-4">
              <span>PRODUCT DETAILS</span>
              <span>QUANTITY</span>
              <span>PRICE</span>
              <span>TOTAL</span>
            </div>

            {product.length > 0 ? (
              product.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row justify-between items-center py-4 border-b">
                  {/* Product Details */}
                  <div className="flex items-center gap-4 w-full md:w-40">
                    <img src={`http://localhost:3000/allImg/${item.prImg}`} alt="" className="w-20 h-20 object-contain" />
                    <div>
                      <h4 className="font-medium text-lg">{item.name}</h4>
                      <p className="text-sm text-purple-600">{item.category}</p>
                      <button onClick={() => handleDelete(item._id)} className="text-red-500 text-sm mt-1">Remove</button>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="mt-4 md:mt-0 flex items-center gap-2">
                    <button onClick={() => handleDecrement(item._id)} className="bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded">−</button>
                    <span className="font-semibold">{item.quantity}</span>
                    <button onClick={() => handleIncrement(item._id)} className="bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded">+</button>
                  </div>

                  {/* Price */}
                  <div className="mt-4 md:mt-0 text-gray-700">£{item.price}</div>

                  {/* Total per item */}
                  <div className="mt-4 md:mt-0 text-gray-700">£{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">Your cart is empty.</p>
            )}
          </div>

          {/* Right: Order Summary */}
          <div className="w-full lg:w-1/3 bg-gray-50 p-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2 text-gray-700">
              <span>ITEMS</span>
              <span>{product.length}</span>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600">SHIPPING</label>
              <select className="w-full border px-3 py-2 mt-1">
                <option>Choose delivery option</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="text-sm text-gray-600">PROMO CODE</label>
              <div className="flex gap-2 mt-1">
                <input type="text" placeholder="Enter your code" className="border px-3 py-2 flex-1" />
                <button className="bg-red-400 text-white px-4">APPLY</button>
              </div>
            </div>

            <div className="flex justify-between font-semibold text-gray-800 border-t pt-3 mb-6">
              <span>TOTAL COST</span>
              <span>£{totalPrice.toFixed(2)}</span> {/* Calculate total cost */}
            </div>

            <button onClick={handleOrder} className="w-full bg-purple-600 text-white py-3 rounded shadow hover:bg-purple-700">
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;