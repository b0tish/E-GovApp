import React, { useState, useEffect } from "react";

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
    <div className="max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Star New Fiscal year</h2>
      <form onSubmit={handleSubmit}>
        <label className="block font-medium">Level:</label>
        <input
          type="text"
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
          required
          readOnly
        />

        {formData.level !== "National" && (
          <>
            <label className="block font-medium mt-3">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 w-full rounded-md"
              required
              readOnly
            />
          </>
        )}

        <label className="block font-medium mt-3">Date (Year):</label>
        <input
          type="number"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
          required
        />

        <h3 className="mt-4 font-semibold">Estimated Budget</h3>
        {Object.keys(formData.EstimatedBudget).map((key) => (
          <div key={key} className="mt-2">
            <label className="block text-sm capitalize">{key}:</label>
            <input
              type="number"
              name={key}
              value={formData.EstimatedBudget[key]}
              onChange={(e) => handleNestedChange(e, "EstimatedBudget")}
              className="border p-2 w-full rounded-md"
              required
              readOnly={key === "total"}
            />
          </div>
        ))}

        <h3 className="mt-4 font-semibold">Expected Revenue</h3>
        {Object.keys(formData.ExpectedRevenue).map((key) => (
          <div key={key} className="mt-2">
            <label className="block text-sm capitalize">{key}:</label>
            <input
              type="number"
              name={key}
              value={formData.ExpectedRevenue[key]}
              onChange={(e) => handleNestedChange(e, "ExpectedRevenue")}
              className="border p-2 w-full rounded-md"
              required
              readOnly={key === "total"}
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
        <button
          onClick={() => {
            setIsConfirmed(false);
            closeModal();
          }}
          className="mt-4 w-full bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default NewFiscalYear;
