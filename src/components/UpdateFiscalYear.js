import React, { useState, useEffect } from "react";

const UpdateFiscalYear = ({ closeModal, setIsConfirmed, data }) => {
  const budgetId = data._id; 
  const [formData, setFormData] = useState({
    level: data.level || "National",
    name: data.name || "",
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

    // Ensure that only numbers are entered, even though type is text
    const sanitizedValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters

    setFormData((prev) => {
      const updatedCategory = {
        ...prev[category],
        [name]: sanitizedValue, // Ensure it's always a valid number
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
         // Include budgetId in URL
         method: "PUT", // Change to PUT for updating
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
    <div className="max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Update Budget</h2>
      <form onSubmit={handleSubmit}>
        <label className="block font-medium">Level:</label>
        <input
          type="text"
          value={formData.level}
          className="border p-2 w-full rounded-md"
          readOnly
        />

        {formData.level !== "National" && (
          <>
            <label className="block font-medium mt-3">Name:</label>
            <input
              type="text"
              value={formData.name}
              className="border p-2 w-full rounded-md"
              readOnly
            />
          </>
        )}

        <label className="block font-medium mt-3">Date (Year):</label>
        <input
          type="text"
          value={formData.date}
          className="border p-2 w-full rounded-md"
          readOnly
        />

        {[
          "EstimatedBudget",
          "CurrentExpenditure",
          "ExpectedRevenue",
          "CurrentRevenue",
        ].map((category) => (
          <div key={category} className="mt-4">
            <h3 className="font-semibold">
              {category.replace(/([A-Z])/g, " $1").trim()}
            </h3>

            {/* Total Field on Top */}
            <label className="block text-sm font-semibold mt-2">Total:</label>
            <input
              type="text"
              name="total"
              value={formData[category].total}
              className="border p-2 w-full rounded-md bg-gray-100"
              readOnly
            />

            {/* Other Inputs Below */}
            {Object.keys(formData[category])
              .filter((key) => key !== "total")
              .map((key) => (
                <div key={key} className="mt-2">
                  <label className="block text-sm capitalize">{key}:</label>
                  <input
                    type="text"
                    name={key}
                    value={formData[category][key]}
                    onChange={(e) => handleNestedChange(e, category)}
                    className="border p-2 w-full rounded-md"
                    required
                  />
                </div>
              ))}
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={closeModal}
          className="mt-4 w-full bg-gray-400 text-white p-2 rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateFiscalYear;
