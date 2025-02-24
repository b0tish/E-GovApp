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


const CurrentRevenue = ({ data }) => {
  const [generatedText, setGeneratedText] = useState("");
  const [pieData, setPieData] = useState(null);
  const [barData, setBarData] = useState(null);

  useEffect(() => {
    const generateText = () => {
      const totalExpected = data.ExpectedRevenue.total;
      const Total = data.CurrentRevenue.total;
      const taxRevenue = data.CurrentRevenue.taxRevenue;
      const nonTaxRevenue = data.CurrentRevenue.nonTax;
      const Grants = data.CurrentRevenue.grants;
      const others = data.CurrentRevenue.other;
      const percentageOfTotalExpected = ((Total * 100) / totalExpected).toFixed(
        2
      );

      const description = `As of now, the total revenue collected amounts to ${Total} Lakh, which is ${percentageOfTotalExpected}% of the expected revenue for this fiscal year. 
      This includes ${taxRevenue} (${((taxRevenue * 100) / Total).toFixed(2)}%) Lakh from Tax Revenue, which plays a crucial role in funding public services and infrastructure. 
      Additionally, ${nonTaxRevenue} (${((nonTaxRevenue * 100) / Total).toFixed(2)}%) Lakh is generated from Non-Tax Revenue, contributing to the government's financial resources through various fees and charges. 
      Grants amount to ${Grants} (${((Grants * 100) / Total).toFixed(2)}%) Lakh, reflecting external support aimed at specific projects and initiatives. 
      Finally, ${others} (${((others * 100) / Total).toFixed(2)}%) Lakh is classified as Other Receipts, encompassing various income streams that supplement the overall revenue collection.`;
      setGeneratedText(description);
    };
    if (data) {

      const expectedData = Object.entries(data.ExpectedRevenue)
        .map(([key, value]) => ({
          label: key.replace(/([A-Z])/g, " $1").trim(), // Convert camelCase to readable format
          value: value,
        }));
        const currentData =Object.entries(data.CurrentRevenue).map(([key, value]) => ({
          label: key.replace(/([A-Z])/g, " $1").trim(), // Convert camelCase to readable format
          value: value,
        }));
        setPieData({
          labels: currentData.filter((item) => item.label !== "total").map((item) => item.label), // Extract labels dynamically
          datasets: [
            {
              data: currentData.filter((item) => item.label !== "total").map((item) => item.value), // Extract values dynamically
              backgroundColor: ["#36A2EB", "#FFCE56", "#FF6384","#43FBC9"],
              hoverBackgroundColor: ["#2196F3", "#FFC107", "#F44336","#42EAC9"],
              hoverOffset: 4,
            },
          ],
        });
      setBarData({
        labels:expectedData.map((item)=>item.label),
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
    <div className="group bg-white rounded-lg shadow-lg p-6 mb-4 transition duration-300 ease-in-out hover:shadow-xl">
      <h3 className="text-xl font-semibold mb-4 text-blue-600 border-b-2  border-blue-300 pb-2">
        📌 Current Revenue
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-11 gap-4">
        <div className=" col-span-4 space-y-8">
          <p className="text-lg">
            <strong className="text-blue-600 ">Total:</strong>{" "}
            {data.CurrentRevenue.total} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Tax Revenue:</strong>{" "}
            {data.CurrentRevenue.taxRevenue} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Non-Tax Revenue:</strong>{" "}
            {data.CurrentRevenue.nonTax} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Grants:</strong>{" "}
            {data.CurrentRevenue.grants} Lakh
          </p>
          <p className="text-lg">
            <strong className="text-blue-600 ">Other:</strong>{" "}
            {data.CurrentRevenue.other} Lakh
          </p>

          <div className="mt-10 border-t border-gray-300 pt-4 hidden lg:!block">
            <p className="text-lg font-semibold">
              <strong>Summary</strong>
            </p>
            <p>{generatedText}</p>
          </div>
        </div>

        <div className="col-span-7 flex flex-col min-h-[600px]">
          <div className="h-[100%]">
            {" "}
            {pieData && (
              <Doughnut
                data={pieData}
                options={{
                  plugins: {
                    title: { display: true, text: "Current Revenue Breakdown" },
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
                      text: "Expected vs Current Revenue",
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

export default CurrentRevenue;
