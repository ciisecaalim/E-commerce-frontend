import { useState } from "react"


function AddOrder() {
  const [custName,setCustName] = useState("")
  const [address,setAddress] = useState("")
  const [number,setNumber] = useState("")
  const [status,setStatus] = useState("")
  const [book,setBook] = useState("")

  console.log(status)

  

  return (
    <form
      action="/submit-book"
      method="POST"
      encType="multipart/form-data"
      className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-orange-600">
        Register a order
      </h2>

      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          value={custName}
          onChange={(e) => setCustName(e.target.value)}
          name="bookName"
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">address</label>
        <input
          type="text"
          name="author"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">number</label>
        <input
          type="text"
          name="category"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">status ($)</label>
        <select className="w-80 h-10 border-2 border-gray-400" value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">select status</option>
            <option value="Unpiad">Unpiad</option>
            <option value="Piad">Piad</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Books</label>
        <select className="w-80 h-10 border-2 border-gray-400" value={book} onChange={(e) => setBook(e.target.value)}>
            <option value="">choose book</option>
            <option value="">Histry</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
      >
        Register Order
      </button>
    </form>
  );
}

export default AddOrder;
