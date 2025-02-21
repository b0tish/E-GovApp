import React, { useEffect, useState } from "react";


const dashboardData = [
  {
    date: 2080,
    EstimatedBudget: {
      totalBudget: 1000000, // in Lakh
      capitalExpenditure: 400000,
      recurrentExpenditure: 500000,
      financialExpenditure: 100000,
    },
    ExpectedRevenue: {
      total: 800000,
      taxRevenue: 600000,
      nonTax: 100000,
      grants: 50000,
      other: 50000,
    },
    CurrentExpenditure: {
      total: 300000,
      capitalExpenditure: 100000,
      recurrentExpenditure: 150000,
      financialExpenditure: 50000,
    },
    CurrentRevenue: {
      total: 400000,
      taxRevenue: 300000,
      nonTax: 50000,
      grants: 30000,
      other: 20000,
    },
  },
  {
    date: 2081,
    EstimatedBudget: {
      totalBudget: 1100000,
      capitalExpenditure: 450000,
      recurrentExpenditure: 550000,
      financialExpenditure: 100000,
    },
    ExpectedRevenue: {
      total: 850000,
      taxRevenue: 650000,
      nonTax: 100000,
      grants: 50000,
      other: 50000,
    },
    CurrentExpenditure: {
      total: 320000,
      capitalExpenditure: 110000,
      recurrentExpenditure: 160000,
      financialExpenditure: 50000,
    },
    CurrentRevenue: {
      total: 420000,
      taxRevenue: 310000,
      nonTax: 55000,
      grants: 30000,
      other: 25000,
    },
  },
];

const NationalTracking = () => {

  const [selectedYear, setSelectedYear] = useState(
    Math.max(...dashboardData.map((item) => item.date))
  );  
  const [data,setData]=useState(null);

   useEffect(() => {
    const selectedData = dashboardData.find((item) => item.date === selectedYear);
    setData(selectedData);
  }, [selectedYear]);

  if (!data) {
    return <div>Loading...</div>;
  }
 
 
  // Use the first element from dashboardData for demonstration

  return (
    <div className="container mx-auto pb-10 px-4 lg:!px-16 font-poppins ">
      <div className="text-center flex flex-col items-center">
        <div className="emblem w-[15%] md:w-[8%] mb-2">
          <img src="/emblem.png" alt="emblem" className="w-[100%]"></img>
        </div>
        <h2 className="text-base md:text-2xl font-bold mb-4">
          Welcome to the National Financial Dashboard
        </h2>
      </div>

      {/* Fiscal Year Selection */}
      <div className="fiscalYear flex justify-between px-2 lg:!px-10">
        <div className="text-center flex flex-col items-center justify-center mb-4">
          <label className="font-semibold" htmlFor="selectYear">
            Select Fiscal Year:
          </label>
          <select
            className="selectYear mt-2 p-2 rounded-lg border-2 border-black hover:ring-2 hover:ring-black hover:!bg-red-100 trasnsition duration-300 all ease-in-out"
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            id="selectYear"
          >
            {dashboardData.map((data) => (
              <option key={data.date} value={data.date}>
                {data.date}/{data.date + 1}
              </option>
            ))}
          </select>
        </div>

        <div className="text-center flex flex-col items-center justify-center mb-4 text-base">
          <label className="font-semibold" htmlFor="newYear">
            Start New Fiscal Year:
          </label>
          <button
            value="Start"
            className="mt-2 py-2 px-4 rounded-lg bg-white border-2 border-black  hover:ring-2 hover:ring-black hover:!bg-red-100 trasnsition duration-300 all ease-in-out"
            id="newYear"
          >
            Start
          </button>
        </div>
      </div>

      {/* Estimated Budget */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-1">📌Estimated Budget</h3>
        <p>
          <strong>Total Budget:</strong> {data.EstimatedBudget.totalBudget} Lakh
        </p>
        <p>
          <strong>Capital Expenditure:</strong>{" "}
          {data.EstimatedBudget.capitalExpenditure} Lakh
        </p>
        <p>
          <strong>Recurrent Expenditure:</strong>{" "}
          {data.EstimatedBudget.recurrentExpenditure} Lakh
        </p>
        <p>
          <strong>Financial Expenditure:</strong>{" "}
          {data.EstimatedBudget.financialExpenditure} Lakh
        </p>
      </div>

      {/* Expected Revenue */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-1">📌Expected Revenue</h3>
        <p>
          <strong>Total:</strong> {data.ExpectedRevenue.total} Lakh
        </p>
        <p>
          <strong>Tax Revenue:</strong> {data.ExpectedRevenue.taxRevenue} Lakh
        </p>
        <p>
          <strong>Non-Tax Revenue:</strong> {data.ExpectedRevenue.nonTax} Lakh
        </p>
        <p>
          <strong>Grants:</strong> {data.ExpectedRevenue.grants} Lakh
        </p>
        <p>
          <strong>Other:</strong> {data.ExpectedRevenue.other} Lakh
        </p>
      </div>

      {/* Current Expenditure */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-1">📌Current Expenditure</h3>
        <p>
          <strong>Total:</strong> {data.CurrentExpenditure.total} Lakh
        </p>
        <p>
          <strong>Capital Expenditure:</strong>{" "}
          {data.CurrentExpenditure.capitalExpenditure} Lakh
        </p>
        <p>
          <strong>Recurrent Expenditure:</strong>{" "}
          {data.CurrentExpenditure.recurrentExpenditure} Lakh
        </p>
        <p>
          <strong>Financial Expenditure:</strong>{" "}
          {data.CurrentExpenditure.financialExpenditure} Lakh
        </p>
      </div>

      {/* Current Revenue */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-1">📌Current Revenue</h3>
        <p>
          <strong>Total:</strong> {data.CurrentRevenue.total} Lakh
        </p>
        <p>
          <strong>Tax Revenue:</strong> {data.CurrentRevenue.taxRevenue} Lakh
        </p>
        <p>
          <strong>Non-Tax Revenue:</strong> {data.CurrentRevenue.nonTax} Lakh
        </p>
        <p>
          <strong>Grants:</strong> {data.CurrentRevenue.grants} Lakh
        </p>
        <p>
          <strong>Other:</strong> {data.CurrentRevenue.other} Lakh
        </p>
      </div>
    </div>
  );
};

export default NationalTracking;