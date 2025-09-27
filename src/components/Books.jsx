import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function BookTable() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);

  const handleIncrement = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleDecrement = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };

  const showData = () => {
    axios.post(`http://localhost:3000/read/product`)
      .then((res) => setBooks(res.data))
      .catch((err) => console.error("Error loading books:", err));
  };

  const deleteProduct = (id) => {
    axios.delete(`http://localhost:3000/delete/product/${id}`)
      .then(() => {
        alert("Deleted successfully");
        showData();
      })
      .catch((error) => {
        console.error("There was an error deleting the product!", error);
      });
  };

  const searchData = (event) => {
    const key = event.target.value;
    if (key) {
      axios.post(`http://localhost:3000/search/book/${key}`)
        .then((res) => setBooks(res.data))
        .catch((err) => console.error("Error searching books:", err));
    } else {
      showData();
    }
  };

  useEffect(() => {
    showData();
  }, [page]);

  return (
    <div className="p-6">
      <div className="flex justify-between mb-10">
        <h2 className="text-2xl font-bold mb-4 text-orange-600">Book List</h2>
        <input
          onChange={searchData}
          className="w-80 pl-4 rounded-lg text-2xl"
          type="search"
          placeholder="Search book..."
        />
      </div>
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-orange-100">
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">Image</th>
            <th className="border p-2">Product Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book, index) => (
              <tr key={book._id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">
                  <img className="w-20" src={`http://localhost:3000/allImg/${book.prImg}`} alt={book.name} />
                </td>
                <td className="border p-2">{book.name}</td>
                <td className="border p-2">{book.quantity}</td>
                <td className="border p-2">${book.price}</td>
                <td className="border p-2">{book.category}</td>
                <td className="border p-2">{book.status}</td>
                <td className="border p-2 space-x-4">
                  <Link to={`/update/book/${book._id}`}>
                    <i className="fa-solid fa-pen-to-square text-blue-600 cursor-pointer"></i>
                  </Link>
                  <i onClick={() => deleteProduct(book._id)} className="fa-solid fa-trash text-red-600 cursor-pointer"></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-500">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex gap-5 rounded-lg absolute top-5 right-[40%]">
        <button onClick={handleDecrement} className="bg-slate-950 text-white text-2xl px-12 py-5 rounded-lg">
          Previous
        </button>
        <button onClick={handleIncrement} className="bg-blue-950 text-white text-2xl px-12 py-5 rounded-lg">
          Next
        </button>
      </div>
    </div>
  );
}

export default BookTable;