import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {defaults,} from "chart.js";


defaults.maintainAspectRatio =false;
defaults.responsive=true;
defaults.plugins.legend.position="bottom"


const ExpectedRevenue = ({ data }) => {
  const [generatedText, setGeneratedText] = useState("");
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    const generateText = () => {
      const Total = data.ExpectedRevenue.total;
      const taxRevenue = data.ExpectedRevenue.taxRevenue;
      const nonTax = data.ExpectedRevenue.nonTax;
      const Grants = data.ExpectedRevenue.grants;
      const others = data.ExpectedRevenue.other;
      const description = `The Expected Revenue for this fiscal year amounts to a total of ${Total} Lakh. 
      This includes ${taxRevenue} (${((taxRevenue * 100) / Total).toFixed(2)}%) Lakh from Tax Revenue, which plays a crucial role in funding public services and infrastructure. 
      Additionally, ${nonTax} (${((nonTax * 100) / Total).toFixed(2)}%) Lakh is generated from Non-Tax Revenue, contributing to the government's financial resources through various fees and charges. 
      Grants amount to ${Grants} (${((Grants * 100) / Total).toFixed(2)}%) Lakh, reflecting external support aimed at specific projects and initiatives. 
      Finally, ${others} (${((others * 100) / Total).toFixed(2)}%) Lakh is classified as Other Receipts, encompassing various income streams that supplement the overall revenue collection.`;
      setGeneratedText(description);
    };
    if (data) {
       const budgetData = Object.entries(data.ExpectedRevenue)
         .filter(([key]) => key !== "total") // Exclude 'total'
         .map(([key, value]) => ({
           label: key.replace(/([A-Z])/g, " $1").trim(), // Convert camelCase to readable format
           value: value,
         }));

      setPieData({
        labels: budgetData.map((item) => item.label), // Extract labels dynamically
        datasets: [
          {
            data: budgetData.map((item) => item.value), // Extract values dynamically
            backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384"],
            hoverBackgroundColor: ["#2196F3", "#FFC107", "#F44336"],
            hoverOffset: 4,
            },
        ],
      });

      generateText();
    }
  }, [data]);

  return (
    <div className="group bg-white rounded-lg shadow-lg p-6 mb-4 transition duration-300 ease-in-out hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b-2  border-blue-300 pb-2">
        📌 Expected Revenue
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="col-span-2 space-y-8 first">
          <p className="text-lg">
            <strong className="text-blue-600 ">Total:</strong>{" "}
            {data.ExpectedRevenue.total} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Tax Revenue:</strong>{" "}
            {data.ExpectedRevenue.taxRevenue} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Non-Tax Revenue:</strong>{" "}
            {data.ExpectedRevenue.nonTax} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Grants:</strong>{" "}
            {data.ExpectedRevenue.grants} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Other:</strong>{" "}
            {data.ExpectedRevenue.other} Lakh
          </p>

          <div className="mt-4 border-t border-gray-300 pt-4 hidden lg:!block">
            <p className="text-lg font-semibold">
              <strong>Summary</strong>
            </p>
            <p>{generatedText}</p>
          </div>
        </div>
        <div className="col-span-3 min-h-[400px] ">
          {pieData && (<Pie data={pieData} options={{ plugins: { title: { display: true, text: 'Expected Revenue Breakdown' } } }}/>)}
        </div>
      </div>

      <div className="mt-4 border-t border-gray-300 pt-4 block lg:!hidden">
        <p className="text-lg font-semibold">
          <strong>Summary</strong>
        </p>
        <p>{generatedText}</p>
      </div>
    </div>
  );
};

export default ExpectedRevenue;
