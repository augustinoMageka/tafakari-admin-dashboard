import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SalesChart({
  title,
  labels,
  dataa = [7, 6, 3, 4, 2, 1, 5],
}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        display: false,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        // label: "Dataset 1",
        data: dataa,
        backgroundColor: "rgba(20, 128, 128, 0.8)",
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} width={"50%"} height={"40%"} />
    </div>
  );
}
