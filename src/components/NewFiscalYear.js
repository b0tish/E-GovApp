import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaMoneyBillWave, FaArrowRight } from "react-icons/fa"; // Importing icons

const NewFiscalYear = ({ closeModal, setIsConfirmed, data }) => {
  const [formData, setFormData] = useState({
    level: data.level || "National",
    name: data.name || "",
    date: "",
    EstimatedBudget: {
      total: "",
      capitalExpenditure: "",
      recurrentExpenditure: "",
      financialExpenditure: "",
    },
    ExpectedRevenue: {
      total: "",
      taxRevenue: "",
      nonTax: "",
      grants: "",
      other: "",
    },
  });

  const calculateTotal = (category) => {
    const { total, ...rest } = category;
    return {
      total: Object.values(rest).reduce(
        (acc, val) => acc + Number(val || 0),
        0
      ),
      ...rest,
    };
  };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      EstimatedBudget: calculateTotal(prev.EstimatedBudget),
      ExpectedRevenue: calculateTotal(prev.ExpectedRevenue),
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, category) => {
    const { name, value } = e.target;
    const sanitizedValue = value.replace(/[^0-9]/g, "");

    setFormData((prev) => {
      const updatedCategory = {
        ...prev[category],
        [name]: sanitizedValue,
      };
      return {
        ...prev,
        [category]: calculateTotal(updatedCategory),
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/addbudget", {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      alert("Budget added successfully: " + data.message);
      closeModal();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-center mb-4">
        Start New Fiscal Year
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <FaArrowRight className="text-blue-600 mr-2" />
          <label className="block font-medium">Level:</label>
        </div>
        <input
          type="text"
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="border border-gray-300 bg-gray-100 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          required
          readOnly
        />

        {formData.level !== "National" && (
          <div className="space-y-1">
            <label className="block font-medium">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 bg-gray-100 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              required
              readOnly
            />
          </div>
        )}

        <div className="space-y-1">
          <div className="flex items-center">
            <FaCalendarAlt className="text-blue-600 mr-2" />
            <label className="block font-medium">Date (Year):</label>
          </div>
          <input
            type="number"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <h3 className="mt-4 font-semibold text-lg border-b pb-2">
          Estimated Budget
        </h3>
        {Object.keys(formData.EstimatedBudget).map((key) => (
          <div key={key} className="mt-2">
            <label className="block text-sm capitalize">{key}:</label>
            <input
              type="number"
              name={key}
              value={formData.EstimatedBudget[key]}
              onChange={(e) => handleNestedChange(e, "EstimatedBudget")}
              className={`border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${key === "total" ? "bg-gray-100" : ""}`}
              required
              readOnly={key === "total"}
            />
          </div>
        ))}

        <h3 className="mt-4 font-semibold text-lg border-b pb-2">
          Expected Revenue
        </h3>
        {Object.keys(formData.ExpectedRevenue).map((key) => (
          <div key={key} className="mt-2">
            <label className="block text-sm capitalize">{key}:</label>
            <input
              type="number"
              name={key}
              value={formData.ExpectedRevenue[key]}
              onChange={(e) => handleNestedChange(e, "ExpectedRevenue")}
              className={`border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300 ${key === "total" ? "bg-gray-100" : ""}`}
              required
              readOnly={key === "total"}
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
        >
          <FaMoneyBillWave className="mr-2" />
          Submit
        </button>
        <button
          type="button"
          onClick={() => {
            setIsConfirmed(false);
            closeModal();
          }}
          className="mt-2 w-full bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition duration-200"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewFiscalYear;
