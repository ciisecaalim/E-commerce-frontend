import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SidenavList from "./sideNavList";
import axios from "axios";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0);
  const [topCustomer, setTopCustomer] = useState([])


  const HandleTopCustomer = () => {
    axios.get("http://localhost:3000/getTopCustomer/order").then((res) => {
      setTopCustomer(res.data)
    })
  }

  const handleIsOpen = () => setIsOpen(true);
  const handleIsClose = () => setIsOpen(false);

  const handleLogOut = () => {
    localStorage.clear();
  };

  const handleTotal = async () => {
    try {
      const res = await axios.get("http://localhost:3000/getIncome/order");
      setTotalIncome(res.data[0]?.totalIncome || 0);
    } catch (err) {
      console.error("Error fetching total income:", err);
    }
  };

  useEffect(() => {
    handleTotal();
    HandleTopCustomer()
  }, []);  
  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        style={{ width: isOpen ? "6%" : "20%" }}
        className="bg-blue-900 h-screen relative transition-all duration-300 ease-in-out"
      >
        <div className="flex p-2 relative">
          <i
            style={{ display: isOpen ? "block" : "" }}
            onClick={handleIsClose}
            className="text-white fa-solid fa-chevron-left hidden absolute right-2"
          ></i>

          <i
            style={{ display: isOpen ? "none" : "" }}
            onClick={handleIsOpen}
            className="text-white ml-0 fa-solid fa-chevron-right absolute right-2"
          ></i>
        </div>

        {/* Sidebar Links */}
        <div className="pt-20 flex flex-col gap-y-6 px-4">
          <Link to="/dash">
            <SidenavList icon="fa-home" title="Dashboard" />
          </Link>
          <Link to="/dash/books">
            <SidenavList icon="fa-book" title="Books" />
          </Link>
          <Link to="/dash/add-book">
            <SidenavList icon="fa-plus" title="Add Book" />
          </Link>
          <Link to="/dash/customers">
            <SidenavList icon="fa-user" title="Customers" />
          </Link>
          <Link to="/dash/orders">
            <SidenavList icon="fa-shopping-cart" title="Orders" />
          </Link>
          <Link to="/dash/addOrder">
            <SidenavList icon="fa-shopping-cart" title="Add Orders" />
          </Link>
          <Link to="/dash/reports">
            <SidenavList icon="fa-chart-bar" title="Reports" />
          </Link>
          <Link to="/dash/settings">
            <SidenavList icon="fa-cog" title="Settings" />
          </Link>
          <Link to="/loginDash" onClick={handleLogOut}>
            <SidenavList icon="fa-key" title="Log Out" />
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="w-full p-10 bg-gray-100 ">
        <div className="bg-yellow-500 w-72 h-32 text-white text-3xl text-center rounded-lg p-6">
          <h1 className="font-semibold">Total Amount is</h1>
          <h1 className="font-semibold mt-2 text-4xl">${totalIncome}</h1>
        </div>

      <table className="mt-28 rounded-lg">
  <thead className="bg-yellow-600 rounded-full text-white">
    <tr>
      <th className="px-12 py-4 text-3xl">Customer</th>
      <th className="px-12 py-4 text-3xl">Total Spent</th>
      <th className="px-12 py-4 text-3xl">Total Orders</th>
    </tr>
  </thead>
  <tbody>
    {topCustomer.map((item, index) => (
      <tr key={index}>
        <td className="px-12 py-4 text-3xl">{item.customer}</td>
        <td className="px-12 py-4 text-3xl">{item.totalSpent}</td>
        <td className="px-12 py-4 text-3xl">${item.orderCount}</td>
      </tr>
    ))}
  </tbody>
</table>


      </div>
    </div>
  );
}

export default Sidebar;
