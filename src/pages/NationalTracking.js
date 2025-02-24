import React, { useEffect, useState } from "react";
import EstimatedBudget from "../components/EstimatedBudget";
import ExpectedRevenue from "../components/ExpectedRevenue";
import CurrentExpenditure from "../components/CurrentExpenditure";
import CurrentRevenue from "../components/CurrentRevenue";
import FiscalYear from "../components/FiscalYear";


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

      <FiscalYear dashboardData={dashboardData} selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
      <EstimatedBudget data={data}/>
      <CurrentExpenditure data={data}/>
      <ExpectedRevenue data={data}/>
      <CurrentRevenue data={data}/>
    </div>
  );
};

export default NationalTracking;