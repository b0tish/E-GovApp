import { Card, CardContent } from "./ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

function ProvinceList({ provinces }) {
  return (
    <>
      {provinces.map((province) => {
        const totalBudget = province.totalBudget || 0;
        const spentBudget = province.spentBudget || 0;
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
              text: `Government Statistics for ${province.name}`,
            },
          },
        };

        return (
          <Card key={province._id} className="mx-2 my-2">
            <CardContent className="text-center">
              {province.name}
              <div className="h-[300px] flex items-center justify-center">
                <Pie data={data} options={options} />
              </div>
              <Link to={`/province/${province._id}/locals`}>Show Locals</Link>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
}

export default ProvinceList;
