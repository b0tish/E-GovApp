import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent } from "../components/ui/card";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function LocalList() {
  const { provinceId } = useParams();
  const [locals, setLocals] = useState([]);

  useEffect(() => {
    const fetchLocals = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/province/${provinceId}/locals`,
        );

        const data = await response.json();
        setLocals(data);
      } catch (error) {
        console.error("Error fetching locals:", error);
        setLocals([]);
      }
    };

    fetchLocals();
  }, [provinceId]);

  return (
    <div className="flex flex-wrap justify-center">
      {locals.length > 0 ? (
        <>
          {locals.map((local) => {
            const totalBudget = local.totalBudget || 0;
            const spentBudget = local.spentBudget || 0;
            const remainingBudget = totalBudget - spentBudget;

            const data = {
              labels: ["Total Budget", "Spent Budget", "Remaining Budget"],
              datasets: [
                {
                  data: [totalBudget, spentBudget, remainingBudget],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.8)",
                    "rgba(54, 162, 235, 0.8)",
                    "rgba(255, 206, 86, 0.8)",
                  ],
                  borderWidth: 1,
                },
              ],
            };

            const options = {
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
                title: {
                  display: true,
                  text: `Government Statistics for `,
                },
              },
            };

            return (
              <Card key={local._id} className="mx-2 my-2">
                <CardContent className="text-center">
                  {local.name}
                  <div className="h-[300px] flex items-center justify-center">
                    <Pie data={data} options={options} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </>
      ) : (
        <p>No locals found for this province.</p>
      )}
    </div>
  );
}

export default LocalList;
