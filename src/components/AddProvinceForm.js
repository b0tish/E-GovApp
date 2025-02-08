import React, { useState } from "react";

function AddProvinceForm({ onClose, setProvinces }) {
  const [name, setName] = useState("");
  const [totalBudget, setTotalBudget] = useState("");
  const [spentBudget, setSpentBudget] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/province", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          totalBudget: Number(totalBudget),
          spentBudget: Number(spentBudget),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newProvince = await response.json();
      setProvinces((prevProvinces) => [...prevProvinces, newProvince]);
      onClose();
    } catch (error) {
      console.error("Error adding province:", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-lg font-semibold mb-4">Add New Province</h2>
        <form onSubmit={handleSubmit}>
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
              Add Province
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

export default AddProvinceForm;
