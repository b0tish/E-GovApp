import { Card, CardContent } from "./ui/card";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Link } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

function ProvinceList({ provinces, setProvinces }) {
  const handleProvinceDelete = async (provinceId) => {
    try {
      console.log("This is the province list id:", provinceId);
      const response = await fetch(
        `http://localhost:5000/province/${provinceId}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        setProvinces((prevProvinces) =>
          prevProvinces.filter((province) => province._id !== provinceId),
        );
      } else {
        console.error("Error deleting province: ", response.status);
      }
    } catch (error) {
      console.error("Error");
    }
  };

  const handleProvinceUpdate = async (provinceId) => {
    console.log(provinceId);
    try {
      const response = await fetch(
        `http://localhost:5000/province/${provinceId}`,
        {
          method: "PUT",
        },
      );

      if (response.ok) {
        setProvinces((prevProvinces) =>
          prevProvinces.filter((province) => province._id !== provinceId),
        );
      } else {
        console.error("Error deleting province: ", response.status);
      }
    } catch (error) {
      console.error("Error");
    }
  };

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
              <span className="flex flex-row-reverse">
                <button onClick={() => handleProvinceDelete(province._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                    />
                  </svg>
                </button>

                <button onClick={() => handleProvinceUpdate(province._id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                </button>
              </span>

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
