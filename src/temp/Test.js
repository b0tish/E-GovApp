import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const PercentageBarChart = () => {
  // Sample data for the percentage bar chart
  const data = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Part Covered",
        data: [60, 80, 40, 90], // Represents the part covered for each month
        backgroundColor: "rgba(54, 162, 235, 1)", // Solid blue color for the part
        // For a covered effect, we can use a negative value
        borderWidth: 1, // Width of the border (optional)
      },
      {
        label: "Total",
        data: [100, 100, 100, 100], // Represents the whole total for each month
        backgroundColor: "rgba(255, 99, 132, 0.6)", // Red color for total
      },
    ],
  };

  const options = {
    scales: {
      x: {
        stacked: true, // Enable stacking
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Percentage Bar Chart",
      },
    },
  };

  return (
    <div style={{ width: "600px", height: "400px" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default PercentageBarChart;
