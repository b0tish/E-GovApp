import React, { useState } from "react";

function AddLocalForm({ onClose, provinces, setLocals }) {
  const [name, setName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [spentBudget, setSpentBudget] = useState("");
  const [provinceId, setProvinceId] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/province/${provinceId}/local`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, totalBudget, spentBudget }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newLocal = await response.json();
      setLocals((prevLocals) => [...prevLocals, newLocal]);
      onClose();
    } catch (error) {
      console.error("Error adding local:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add New Local</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="provinceId"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Province:
            </label>
            <select
              id="provinceId"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={provinceId}
              onChange={(e) => setProvinceId(e.target.value)}
            >
              <option value="">Select a Province</option>
              {provinces.map((province) => (
                <option key={province._id} value={province._id}>
                  {province.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="totalBudget"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Total Budget:
            </label>
            <input
              type="number"
              id="totalBudget"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={totalBudget}
              onChange={(e) => setTotalBudget(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="spentBudget"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Spent Budget:
            </label>
            <input
              type="number"
              id="spentBudget"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={spentBudget}
              onChange={(e) => setSpentBudget(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Local
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddLocalForm;
