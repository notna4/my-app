import React from "react";
import { Chart, registerables } from "chart.js";

import { Line, Pie, Radar, Bar, Scatter } from "react-chartjs-2";
import "./App.css";
Chart.register(...registerables);
interface TemperatureData {
  temperatures: number[];
}

const TemperatureStats: React.FC<TemperatureData> = ({ temperatures }) => {
  // Calculate statistics
  const minTemperature = Math.min(...temperatures);
  const maxTemperature = Math.max(...temperatures);
  const averageTemperature =
    temperatures.reduce((acc, curr) => acc + curr, 0) / temperatures.length;

  // Data for charts
  const lineChartData = {
    labels: Array.from({ length: temperatures.length }, (_, i) => i + 1),
    datasets: [
      {
        label: "Temperature",
        data: temperatures,
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "rgba(75,192,192,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  const pieChartData = {
    labels: ["Min Temperature", "Max Temperature", "Average Temperature"],
    datasets: [
      {
        data: [minTemperature, maxTemperature, averageTemperature],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  const radarChartData = {
    labels: ["Min Temperature", "Max Temperature", "Average Temperature"],
    datasets: [
      {
        label: "Temperature",
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        pointBackgroundColor: "rgba(255,99,132,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,99,132,1)",
        data: [minTemperature, maxTemperature, averageTemperature],
      },
    ],
  };

  const scatterChartData = {
    datasets: [
      {
        label: "Temperature",
        data: temperatures.map((temp, index) => ({ x: index + 1, y: temp })),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  // Data for grouped bar chart
  const groupedBarChartData = {
    labels: ["Temperature"],
    datasets: [
      {
        label: "Min Temperature",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 99, 132, 0.4)",
        hoverBorderColor: "rgba(255, 99, 132, 1)",
        data: [minTemperature],
      },
      {
        label: "Max Temperature",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.4)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
        data: [maxTemperature],
      },
      {
        label: "Average Temperature",
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(255, 206, 86, 0.4)",
        hoverBorderColor: "rgba(255, 206, 86, 1)",
        data: [averageTemperature],
      },
    ],
  };

  return (
    <div className="charts">
      <div className="chart">
        <Line data={lineChartData} />
      </div>
      <div className="chart">
        <Pie data={pieChartData} />
      </div>
      <div className="chart">
        <Radar data={radarChartData} />
      </div>
      <div className="chart">
        <Scatter data={scatterChartData} />
      </div>
      <div className="chart">
        <Bar data={groupedBarChartData} />
      </div>
    </div>
  );
};

export default TemperatureStats;
