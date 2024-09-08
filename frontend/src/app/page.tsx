"use client";

import React from "react";
import Widget from "@/components/Widget";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default function Home() {
  //data for pie chart - will have to bring this over to the db
  const data = {
    labels: [
      "Age 18-24",
      "Age 25-34",
      "Age 35-44",
      "Age 45-54",
      "Age 55-64",
      "Age 65+",
    ],
    datasets: [
      {
        label: "Passenger Demographic",
        data: [10, 20, 30, 15, 10, 15],
        backgroundColor: [
          "#ff6384",
          "#36a2eb",
          "#cc65fe",
          "#ffce56",
          "#4bc0c0",
          "#f77825",
        ],
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context: { label: string; parsed: any; }) {
            let label = context.label || "";
            if (context.parsed) {
              label += `: ${context.parsed}%`;
            }
            return label;
          },
        },
      },
    },
  };
  return (
    <>
      <div className="pl-32 pb-4">Welcome!</div>
      <div className="h-screen flex">
        <div className="w-1/2 pl-32 pr-2 bg-gray-100 overflow-auto grid gap-2 grid-rows-2">
          <Widget title="Flight Delays" className="row-span-2">
            <div>Graph of delays</div>
          </Widget>
        </div>
        <div className="w-1/4 pr-2 gap-2 bg-gray-100 gap-2 overflow-auto max-h-[calc(100vh-5rem)] grid grid-rows-2">
          <Widget
            title="Passenger Demographic of Flight AMX401"
            className="flex flex-col space-y-4"
          >
            <Pie data={data} options={options} />
          </Widget>
          <Widget title="Local Weather" className="row-span-5">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <img
                  src="/path-to-weather-icon.png"
                  alt="Weather Icon"
                  className="w-16 h-16"
                />
                <div className="flex flex-col">
                  <h3 className="text-2xl font-bold">Sunny</h3>
                  <div className="text-lg">25°C</div>
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <h4 className="font-semibold">Current Conditions</h4>
                  <p>Temperature: 25°C</p>
                  <p>Feels Like: 27°C</p>
                  <p>Humidity: 60%</p>
                  <p>Wind: 15 km/h</p>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold">Location</h4>
                  <p>City: New York</p>
                  <p>Country: USA</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Forecast</h4>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: 7 }).map((_, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="font-bold">Day {idx + 1}</div>
                      <img
                        src="/path-to-day-icon.png"
                        alt={`Day ${idx + 1} Icon`}
                        className="w-12 h-12"
                      />
                      <div>High: {25 + idx}°C</div>
                      <div>Low: {15 + idx}°C</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Flights Affected</h4>
                <ul className="list-disc pl-5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <li key={idx}>Flight {idx + 1}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Widget>
        </div>
        <Widget title="Upcoming Flights">
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center pb-4 border-b border-gray-300"
              >
                <div className="ml-4 flex-1">
                  <div className="font-bold">Flight Name {idx + 1}</div>
                  <div>Flight Number {idx + 1}</div>
                  <div>Start City: {idx + 1}</div>
                  <div>Destination City: {idx + 1}</div>
                  <div>Departure: 10:00 AM</div>
                </div>
              </div>
            ))}
          </div>
        </Widget>
      </div>
    </>
  );
}
