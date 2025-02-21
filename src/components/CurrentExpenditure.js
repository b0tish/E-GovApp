import React, { useEffect, useState } from "react";

const CurrentExpenditure = ({ data }) => {
  const [generatedText, setGeneratedText] = useState("");

  useEffect(() => {
    const generateText = () => {
      const TB = data.CurrentExpenditure.total;
      const CE = data.CurrentExpenditure.capitalExpenditure;
      const RE = data.CurrentExpenditure.recurrentExpenditure;
      const FE = data.CurrentExpenditure.financialExpenditure;
      const description = `As of today, a total of ${TB} Lakh has been spent for the Current Expenditure in this fiscal year. 
      Of this amount, ${CE} (${((CE * 100) / TB).toFixed(2)}%) Lakh has been utilized for Capital Expenditure, reflecting investments in infrastructure and development projects that are crucial for economic growth. 
      Additionally, ${RE} (${((RE * 100) / TB).toFixed(2)}%) Lakh has been expended on Recurrent Expenditure, which ensures the smooth operation of ongoing public services and programs. 
      Finally, ${FE} (${((FE * 100) / TB).toFixed(2)}%) Lakh has been allocated for Financial Expenditure, supporting the necessary fiscal management and stability required for sustainable governance.`;
      setGeneratedText(description);
    };
    if (data) {
      generateText();
    }
  }, [data]);

  return (
    <div className="group bg-white rounded-lg shadow-lg p-6 mb-4 transition duration-300 ease-in-out hover:!bg-black hover:!text-white hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b-2 group-hover:!text-blue-400 border-blue-300 pb-2">
        📌 Current Expenditure
      </h3>
      <div className="space-y-2">
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Total:
          </strong>{" "}
          {data.CurrentExpenditure.total} Lakh
        </p>
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Capital Expenditure:
          </strong>{" "}
          {data.CurrentExpenditure.capitalExpenditure} Lakh
        </p>
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Recurrent Expenditure:
          </strong>{" "}
          {data.CurrentExpenditure.recurrentExpenditure} Lakh
        </p>
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Financial Expenditure:
          </strong>{" "}
          {data.CurrentExpenditure.financialExpenditure} Lakh
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

export default CurrentExpenditure;
