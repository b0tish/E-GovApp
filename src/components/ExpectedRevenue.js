import React, { useEffect, useState } from "react";

const ExpectedRevenue = ({ data }) => {
  const [generatedText, setGeneratedText] = useState("");

  useEffect(() => {
    const generateText = () => {
      const Total = data.ExpectedRevenue.total;
      const TR = data.ExpectedRevenue.taxRevenue;
      const NT = data.ExpectedRevenue.nonTax;
      const Grants = data.ExpectedRevenue.grants;
      const others = data.ExpectedRevenue.other;
      const description = `The Expected Revenue for this fiscal year amounts to a total of ${Total} Lakh. 
      This includes ${TR} (${((TR * 100) / Total).toFixed(2)}%) Lakh from Tax Revenue, which plays a crucial role in funding public services and infrastructure. 
      Additionally, ${NT} (${((NT * 100) / Total).toFixed(2)}%) Lakh is generated from Non-Tax Revenue, contributing to the government's financial resources through various fees and charges. 
      Grants amount to ${Grants} (${((Grants * 100) / Total).toFixed(2)}%) Lakh, reflecting external support aimed at specific projects and initiatives. 
      Finally, ${others} (${((others * 100) / Total).toFixed(2)}%) Lakh is classified as Other Receipts, encompassing various income streams that supplement the overall revenue collection.`;
      setGeneratedText(description);
    };
    if (data) {
      generateText();
    }
  }, [data]);

  return (
    <div className="group bg-white rounded-lg shadow-lg p-6 mb-4 transition duration-300 ease-in-out hover:!bg-black hover:!text-white hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b-2 group-hover:!text-blue-400 border-blue-300 pb-2">
        📌 Expected Revenue
      </h3>
      <div className="space-y-2">
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Total:
          </strong>{" "}
          {data.ExpectedRevenue.total} Lakh
        </p>
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Tax Revenue:
          </strong>{" "}
          {data.ExpectedRevenue.taxRevenue} Lakh
        </p>
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Non-Tax Revenue:
          </strong>{" "}
          {data.ExpectedRevenue.nonTax} Lakh
        </p>
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Grants:
          </strong>{" "}
          {data.ExpectedRevenue.grants} Lakh
        </p>
        <p className="text-lg">
          <strong className="text-blue-600 group-hover:!text-blue-400">
            Other:
          </strong>{" "}
          {data.ExpectedRevenue.other} Lakh
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

export default ExpectedRevenue;
