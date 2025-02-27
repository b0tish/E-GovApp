import React, { useState, useEffect } from "react";
import { FaCalendarAlt, FaMoneyBillWave, FaArrowRight } from "react-icons/fa"; // Importing icons

const UpdateFiscalYear = ({ closeModal, setIsConfirmed, data }) => {
  const budgetId = data._id;
  const [formData, setFormData] = useState({
    level: data.level || "National",
    name: data.name || undefined,
    date: data.date || "",
    EstimatedBudget: {
      total: data.EstimatedBudget.total,
      capitalExpenditure: data.EstimatedBudget.capitalExpenditure,
      recurrentExpenditure: data.EstimatedBudget.recurrentExpenditure,
      financialExpenditure: data.EstimatedBudget.financialExpenditure,
    },
    CurrentExpenditure: {
      total: data.CurrentExpenditure.total,
      capitalExpenditure: data.CurrentExpenditure.capitalExpenditure,
      recurrentExpenditure: data.CurrentExpenditure.recurrentExpenditure,
      financialExpenditure: data.CurrentExpenditure.financialExpenditure,
    },
    ExpectedRevenue: {
      total: data.ExpectedRevenue.total,
      taxRevenue: data.ExpectedRevenue.taxRevenue,
      nonTax: data.ExpectedRevenue.nonTax,
      grants: data.ExpectedRevenue.grants,
      other: data.ExpectedRevenue.other,
    },
    CurrentRevenue: {
      total: data.CurrentRevenue.total,
      taxRevenue: data.CurrentRevenue.taxRevenue,
      nonTax: data.CurrentRevenue.nonTax,
      grants: data.CurrentRevenue.grants,
      other: data.CurrentRevenue.other,
    },
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      EstimatedBudget: calculateTotal(prev.EstimatedBudget),
      CurrentExpenditure: calculateTotal(prev.CurrentExpenditure),
      ExpectedRevenue: calculateTotal(prev.ExpectedRevenue),
      CurrentRevenue: calculateTotal(prev.CurrentRevenue),
    }));
  }, []);

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
      const response = await fetch(
        `http://localhost:5000/updatebudget/${budgetId}`,
        {
          credentials: "include",
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      alert("Budget updated successfully: " + result.message);
      closeModal();
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-300">
      <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
        Update Budget
      </h2>
      <form onSubmit={handleSubmit}>
        <FaArrowRight className="text-blue-600 mr-2" />
        <label className="block font-medium text-gray-600">Level:</label>
        <input
          type="text"
          value={formData.level}
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none bg-gray-100"
          readOnly
        />

        {formData.level !== "National" && (
          <>
            <label className="block font-medium mt-3 text-gray-600">
              Name:
            </label>
            <input
              type="text"
              value={formData.name}
              className="border border-gray-300 p-2 w-full rounded-md focus:outline-none bg-gray-100"
              readOnly
            />
          </>
        )}

        <FaCalendarAlt className="text-blue-600 mr-2" />
        <label className="block font-medium mt-3 text-gray-600">
          Date (Year):
        </label>
        <input
          type="text"
          value={formData.date}
          className="border border-gray-300 p-2 w-full rounded-md focus:outline-none bg-gray-100"
          readOnly
        />

        {[
          "EstimatedBudget",
          "CurrentExpenditure",
          "ExpectedRevenue",
          "CurrentRevenue",
        ].map((category) => (
          <div key={category} className="mt-4">
            <h3 className="font-semibold text-lg text-gray-800">
              {category.replace(/([A-Z])/g, " $1").trim()}
            </h3>

            <label className="block text-sm font-semibold mt-2 text-gray-600">
              Total:
            </label>
            <input
              type="text"
              name="total"
              value={formData[category].total}
              className="border border-gray-300 p-2 w-full rounded-md bg-gray-100"
              readOnly
            />

            {Object.keys(formData[category])
              .filter((key) => key !== "total")
              .map((key) => (
                <div key={key} className="mt-2">
                  <label className="block text-sm capitalize text-gray-600">
                    {key}:
                  </label>
                  <input
                    type="text"
                    name={key}
                    value={formData[category][key]}
                    onChange={(e) => handleNestedChange(e, category)}
                    className="border border-gray-300 p-2 w-full rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    required
                  />
                </div>
              ))}
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition duration-200 flex items-center justify-center"
        >
          <FaMoneyBillWave className="mr-2" />
          Update
        </button>
        <button
          onClick={closeModal}
          className="mt-2 w-full bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500 transition duration-200"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateFiscalYear;
