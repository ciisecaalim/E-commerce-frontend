import { useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router'
import HeaderBookStore from "./Header";

function CustomerRegistrationForm() {
  const [customerName, setCustomerName] = useState("");
  const [gmail, setGmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("")
  const [password, setPassword] = useState("")

  const [active, setActive] = useState("customer")

  const navigate = useNavigate()

  function handleInsert (e) {
    e.preventDefault()
    const url = active === "customer" ? "http://localhost:3000/create/customer" : "http://localhost:3000/create/admin"
    const pyload = active === "customer" ? { name:customerName,     email:gmail,         phone:phone,         address:address,   password:password} : {name: customerName,    email:gmail, password:password}
    axios.post(url, pyload)
  .then((res) => {
    // if admin, save to localStorage
    if (active === "admin") {
      localStorage.setItem("admin", JSON.stringify(res.data));
      
    navigate("/dash");
    }
    else{
    navigate("/")
  }
    toast.success(`${active} successfully`);
  })
  .catch((error) => {
    if (error) {
      toast.error("This email is already registered");
    }
  });

  }
  return ( <div> 

<HeaderBookStore />

    <form className="max-w-md mx-auto p-6 mt-28 bg-white rounded-xl shadow-md space-y-4">

     <div className="flex gap-5 text-2xl">
  <button onClick={() => setActive("customer")} className={`px-12 py-3 rounded-lg ${active === "customer" ? "bg-blue-500 text-white" : "border border-black text-black"}`}> Customer</button>

  <button onClick={() => setActive("admin")} className={`px-12 py-3 rounded-lg ${ active === "admin" ? "bg-blue-500 text-white" : "border border-black text-black" }`}> Admin
  </button>
</div>


      <h2 className="text-2xl font-bold text-center mb-4 text-orange-600">

       {active === "customer" ? " Customer Registration" : "Customer Admin"}
      </h2>

      <div>
        <label className="block mb-1 font-medium">{active === "customer" ? "Customer Nmae" : "Admin Name"}</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          name="customerName"
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Gmail</label>
        <input
          type="email"
          name="gmail"
          className="w-full border border-gray-300 rounded p-2"
          required
           value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
      </div>

      <div style={{display: active !== "customer" ? "none" : ""}}>
        <label className="block mb-1 font-medium">Phone</label>
        <input
          type="tel"
          name="phone"
          className="w-full border border-gray-300 rounded p-2"
          required
           value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

       
        <div style={{display: "active" !== "customer" ? "none" : ""}}>
        <label className="block mb-1 font-medium">Address</label>
        <input
          type="text"
          name="address"
          className="w-full border border-gray-300 rounded p-2"
          required
           value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

 <div>
        <label className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          name="password"
          className="w-full border border-gray-300 rounded p-2"
          required
           value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>



      <button
        type="submit"
        className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
      onClick={(e) => handleInsert(e)}
      >
    {active === "customer" ? "    Register Customer" : "    Register Admin"}
      </button>
    </form>
    </div>
  );
}

export default CustomerRegistrationForm;
