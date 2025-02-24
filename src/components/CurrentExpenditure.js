import React, { useEffect, useState } from "react";
import { Bar,Doughnut } from "react-chartjs-2";
import { defaults} from "chart.js";

defaults.maintainAspectRatio = false;
defaults.responsive=true;
defaults.plugins.legend.position="bottom";
defaults.scales = {
  x: {
    stacked: true, // Enable stacking on the x-axis
  },
}

const CurrentExpenditure = ({ data }) => {
  const [generatedText, setGeneratedText] = useState("");
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);

  useEffect(() => {
    const generateText = () => {
      const totalExpenditure = data.CurrentExpenditure.total;
      const capitalExpenditure = data.CurrentExpenditure.capitalExpenditure;
      const recurrentExpenditure = data.CurrentExpenditure.recurrentExpenditure;
      const financialExpenditure = data.CurrentExpenditure.financialExpenditure;
      const description = `As of today, a total of ${totalExpenditure} Lakh has been spent for the Current Expenditure in this fiscal year. 
      Of this amount, ${capitalExpenditure} (${((capitalExpenditure * 100) / totalExpenditure).toFixed(2)}%) Lakh has been utilized for Capital Expenditure, reflecting investments in infrastructure and development projects that are crucial for economic growth. 
      Additionally, ${recurrentExpenditure} (${((recurrentExpenditure * 100) / totalExpenditure).toFixed(2)}%) Lakh has been expended on Recurrent Expenditure, which ensures the smooth operation of ongoing public services and programs. 
      Finally, ${financialExpenditure} (${((financialExpenditure * 100) / totalExpenditure).toFixed(2)}%) Lakh has been allocated for Financial Expenditure, supporting the necessary fiscal management and stability required for sustainable governance.`;
      setGeneratedText(description);
    };
   if (data) {
     const expectedData = Object.entries(data.EstimatedBudget).map(
       ([key, value]) => ({
         label: key.replace(/([A-Z])/g, " $1").trim(), // Convert camelCase to readable format
         value: value,
       })
     );
     const currentData = Object.entries(data.CurrentExpenditure).map(
       ([key, value]) => ({
         label: key.replace(/([A-Z])/g, " $1").trim(), // Convert camelCase to readable format
         value: value,
       })
     );
     setPieData({
       labels: currentData
         .filter((item) => item.label !== "total")
         .map((item) => item.label), // Extract labels dynamically
       datasets: [
         {
           data: currentData
             .filter((item) => item.label !== "total")
             .map((item) => item.value), // Extract values dynamically
           backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384", "#43FBC9"],
           hoverBackgroundColor: ["#2196F3", "#FFC107", "#F44336", "#42EAC9"],
           hoverOffset: 4,
         },
       ],
     });
     setBarData({
       labels: expectedData.map((item) => item.label),
       datasets: [
         {
           label: "Current Revenue",
           data: currentData.map((item) => item.value), // Represents the whole total for each month
           backgroundColor: "rgba(255, 99, 132,1)", // Red color for total
         },
         {
           label: "Expected Revenue",
           data: expectedData.map((item) => item.value), // Represents the part covered for each month
           backgroundColor: "rgba(54, 162, 235, 1)", // Solid blue color for the part
         },
       ],
     });
     generateText();
   }
  }, [data]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-4 transition duration-300 ease-in-out hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b-2  border-blue-300 pb-2">
        📌 Current Expenditure
      </h3>
      <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
        <div className="col-span-4 space-y-8">
          <p className="text-lg">
            <strong className="text-blue-600 ">Total:</strong>{" "}
            {data.CurrentExpenditure.total} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Capital Expenditure:</strong>{" "}
            {data.CurrentExpenditure.capitalExpenditure} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Recurrent Expenditure:</strong>{" "}
            {data.CurrentExpenditure.recurrentExpenditure} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Financial Expenditure:</strong>{" "}
            {data.CurrentExpenditure.financialExpenditure} Lakh
          </p>

          <div className="mt-10 border-t border-gray-300 pt-4 hidden lg:!block">
            <p className="text-lg font-semibold">
              <strong>Summary</strong>
            </p>
            <p>{generatedText}</p>
          </div>
        </div>
        <div className="flex flex-col col-span-7 min-h-[600px]">
          <div className="h-[100%]">
            {" "}
            {pieData && (
              <Doughnut
                data={pieData}
                options={{
                  plugins: {
                    title: { display: true, text: "Current Expenditure Breakdown" },
                  },
                }}
              />
            )}
          </div>
          <div className="h-[100%]">
            {" "}
            {barData && (
              <Bar
                data={barData}
                options={{
                  plugins: {
                    title: {
                      display: true,
                      text: "Estimated Budget vs Current Expenditure Breakdown",
                    },
                  },
                }}
              />
            )}
          </div>
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

export default CurrentExpenditure;
