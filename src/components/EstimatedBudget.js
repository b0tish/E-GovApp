import React, { useEffect, useState } from "react";

const EstimatedBudget = ({ data }) => {
  const [generatedText, setGeneratedText] = useState("");

  useEffect(() => {
    const generateText = () => {
      const TB = data.EstimatedBudget.totalBudget;
      const CE = data.EstimatedBudget.capitalExpenditure;
      const RE = data.EstimatedBudget.recurrentExpenditure;
      const FE = data.EstimatedBudget.financialExpenditure;
      const description = `The Estimated Budget for this fiscal year reflects a total allocation of ${TB} Lakh. 
      This includes ${CE} (${((CE * 100) / TB).toFixed(2)}%) Lakh designated for Capital Expenditure, aimed at enhancing infrastructure and development projects. 
      Additionally, ${RE} (${((RE * 100) / TB).toFixed(2)}%) Lakh is allocated for Recurrent Expenditure, ensuring the smooth operation of ongoing services and programs. 
      Finally, ${FE} (${((FE * 100) / TB).toFixed(2)}%) Lakh is set aside for Financial Expenditure, which supports fiscal management and stability.`;
      setGeneratedText(description);
    };
    if (data) {
      generateText();
    }
  }, [data]);

  return (
    <div className="group bg-white rounded-lg shadow-lg p-6 mb-4 transition duration-300 ease-in-out hover:!bg-black hover:!text-white hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b-2 group-hover:!text-blue-400 border-blue-300 pb-2">
        📌 Estimated Budget
      </h3>
      <div className="space-y-2">
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Total Budget:
          </strong>{" "}
          {data.EstimatedBudget.totalBudget} Lakh
        </p>
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Capital Expenditure:
          </strong>{" "}
          {data.EstimatedBudget.capitalExpenditure} Lakh
        </p>
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Recurrent Expenditure:
          </strong>{" "}
          {data.EstimatedBudget.recurrentExpenditure} Lakh
        </p>
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Financial Expenditure:
          </strong>{" "}
          {data.EstimatedBudget.financialExpenditure} Lakh
        </p>
      </div>

      <div className="mt-4 border-t border-gray-300 pt-4">
        <p className="text-lg font-semibold">
          <strong>Summary</strong>
        </p>
        <p>{generatedText}</p>
      </div>
    </div>
  );
};

export default EstimatedBudget;
