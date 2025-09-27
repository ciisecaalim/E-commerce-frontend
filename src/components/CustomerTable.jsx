import { useEffect, useState } from "react";
import axios from "axios";
import { data, Link, useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";

function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  function readAll () {
      axios.get("http://localhost:3000/read/customer")
      .then((res) => setCustomers(res.data))
  }

  function deleteCustomers (id) {
    axios.delete(`http://localhost:5000/delete/customer/${id}`).then(() =>{
      toast.success("deleted successfully")
      readAll()
    })
  }

  useEffect(() => {
  
   readAll()
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-orange-600">Customer List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-orange-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Customer Name</th>
            <th className="border p-2">Gmail</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Data</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={customer._id} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{customer.name}</td>
              <td className="border p-2">{customer.email}</td>
              <td className="border p-2">{customer.phone}</td>
              <td className="border p-2">{customer.address}</td>
              <td className="border p-2">{new Date(customer.createdAt).toDateString()}</td>
              <td className="border p-2 space-x-4">
                
               
                <Link to={`/update/customer/${customer._id}`}> <i className="fa-solid fa-pen-to-square text-blue-600 cursor-pointer"></i></Link>
                <i onClick={() => deleteCustomers(customer._id)} className="fa-solid fa-trash text-red-600 cursor-pointer"></i>
              </td>
            </tr>
          ))}
          {customers.length === 0 && (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No customers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerTable;
