import React, { useState } from "react";


const Testy = () => {
  const [formData, setFormData] = useState({
    level: "National",
    name: "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (e, category) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [name]: value,
      },
    }));
  };

 const handleSubmit = async (e) => {
   e.preventDefault();
   try {
     const response = await fetch("http://localhost:5000/addbudget", {
       method: "POST",
       headers: {
         "Content-Type": "application/json",
       },
       body: JSON.stringify(formData), // Convert formData to a JSON string
     });

     if (!response.ok) {
       throw new Error(`HTTP error! status: ${response.status}`); // Throw an error if response is not OK
     }

     const data = await response.json(); // Parse the JSON response
     alert("Budget added successfully: " + data.message);
   } catch (error) {
     console.error("Error submitting form", error);
   }
 };

  return (
    <div className="max-w-lg mx-auto p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Budget</h2>
      <form onSubmit={handleSubmit}>
        <label className="block font-medium">Level:</label>
        <select
          name="level"
          value={formData.level}
          onChange={handleChange}
          className="border p-2 w-full rounded-md"
        >
          {["National", "Province", "Local", "Ministry"].map((lvl) => (
            <option key={lvl} value={lvl}>
              {lvl}
            </option>
          ))}
        </select>

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
            />
          </div>
        ))}

        <button
          type="submit"
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Testy;
