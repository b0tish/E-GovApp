import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { defaults} from "chart.js";


defaults.maintainAspectRatio =false;
defaults.responsive=true;
defaults.plugins.legend.position="bottom"

const EstimatedBudget = ({ data }) => {
  const [generatedText, setGeneratedText] = useState("");
   const [pieData, setPieData] = useState(null);

  useEffect(() => {
    const generateText = () => {
      const totalBudget = data.EstimatedBudget.totalBudget;
      const capitalExpenditure = data.EstimatedBudget.capitalExpenditure;
      const recurrentExpenditure = data.EstimatedBudget.recurrentExpenditure;
      const financialExpenditure = data.EstimatedBudget.financialExpenditure;
      const description = `The Estimated Budget for this fiscal year reflects a total allocation of ${totalBudget} Lakh. 
      This includes ${capitalExpenditure} (${((capitalExpenditure * 100) / totalBudget).toFixed(2)}%) Lakh designated for Capital Expenditure, aimed at enhancing infrastructure and development projects. 
      Additionally, ${recurrentExpenditure} (${((recurrentExpenditure * 100) / totalBudget).toFixed(2)}%) Lakh is allocated for Recurrent Expenditure, ensuring the smooth operation of ongoing services and programs. 
      Finally, ${financialExpenditure} (${((financialExpenditure * 100) / totalBudget).toFixed(2)}%) Lakh is set aside for Financial Expenditure, which supports fiscal management and stability.`;
      setGeneratedText(description);
    };
    if (data) {
      const budgetData = Object.entries(data.EstimatedBudget)
        .filter(([key]) => key !== "totalBudget") // Exclude 'total'
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
        📌 Estimated Budget
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="col-span-2 space-y-8">
          <p className="text-lg">
            <strong className="text-blue-600 ">Total Budget:</strong>{" "}
            {data.EstimatedBudget.totalBudget} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Capital Expenditure:</strong>{" "}
            {data.EstimatedBudget.capitalExpenditure} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Recurrent Expenditure:</strong>{" "}
            {data.EstimatedBudget.recurrentExpenditure} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Financial Expenditure:</strong>{" "}
            {data.EstimatedBudget.financialExpenditure} Lakh
          </p>

          <div className="mt-4 border-t border-gray-300 pt-4 hidden lg:!block">
            <p className="text-lg font-semibold">
              <strong>Summary</strong>
            </p>
            <p>{generatedText}</p>
          </div>
        </div>
        <div className="col-span-3">
          {pieData && (
            <Pie
              data={pieData}
              options={{
                plugins: {
                  title: { display: true, text: "Budget Estimation Breakdown" },
                },
              }}
            />
          )}
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

export default EstimatedBudget;
