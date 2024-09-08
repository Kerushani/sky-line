"use client";

import React from "react";
import Widget from "@/components/Widget";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  BarElement
);

export default function Home() {
  // Sample data for the pie chart
  const pieData = {
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
        data: [10, 20, 30, 15, 10, 15], // Replace with actual data
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

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
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

  // Sample data for the line chart - will connect db
  const lineData = {
    labels: ["Today", "Tomorrow", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Temperature",
        data: [22, 24, 26, 23, 25, 27, 28], // Replace with actual data
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "Rainfall",
        data: [0, 1, 0, 2, 1, 0, 1], // Replace with actual data
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (context.parsed.y !== null) {
              label += `: ${context.parsed.y}`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Days",
        },
      },
      y: {
        title: {
          display: true,
          text: "Value",
        },
        ticks: {
          callback: function (value) {
            return value + "°C"; // Append unit for temperature
          },
        },
      },
    },
  };

  const delayLineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Delta Airlines",
        data: [12, 18, 14, 20, 16, 22, 26, 20, 18, 30, 24, 28], // Replace with actual data
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
      {
        label: "United Airlines",
        data: [15, 20, 18, 25, 20, 25, 30, 22, 24, 32, 28, 35], // Replace with actual data
        borderColor: "#36a2eb",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
      {
        label: "American Airlines",
        data: [18, 22, 20, 30, 25, 28, 35, 30, 26, 36, 30, 40], // Replace with actual data
        borderColor: "#cc65fe",
        backgroundColor: "rgba(204, 101, 254, 0.2)",
        fill: true,
      },
    ],
  };

  const delayLineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (context.parsed.y !== null) {
              label += `: ${context.parsed.y} minutes`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Average Delay (minutes)",
        },
      },
    },
  };

  // Sample data for the bar chart (Total Delays)
  const totalDelaysData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Total Delays",
        data: [150, 200, 250, 180, 300, 220, 280, 260, 240, 320, 270, 330], // Replace with actual data
        backgroundColor: "#ffce56",
      },
    ],
  };

  const totalDelaysOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (context.parsed.y !== null) {
              label += `: ${context.parsed.y} minutes`;
            }
            return label;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Total Delays (minutes)",
        },
      },
    },
  };

  //currently working on connecting db for this -- schema is already made -- just using sample data to get frontend going in the meantime
  const flights = [
    {
      name: "Delta Airlines Flight 123",
      number: "DL123",
      startCity: "New York",
      destinationCity: "Los Angeles",
      departure: "08:30 AM",
    },
    {
      name: "United Airlines Flight 456",
      number: "UA456",
      startCity: "San Francisco",
      destinationCity: "Chicago",
      departure: "09:15 AM",
    },
    {
      name: "American Airlines Flight 789",
      number: "AA789",
      startCity: "Miami",
      destinationCity: "Dallas",
      departure: "10:00 AM",
    },
    {
      name: "Southwest Airlines Flight 101",
      number: "SW101",
      startCity: "Houston",
      destinationCity: "New York",
      departure: "11:20 AM",
    },
    {
      name: "JetBlue Flight 202",
      number: "JB202",
      startCity: "Boston",
      destinationCity: "San Juan",
      departure: "12:30 PM",
    },
    {
      name: "Alaska Airlines Flight 303",
      number: "AS303",
      startCity: "Seattle",
      destinationCity: "San Diego",
      departure: "01:45 PM",
    },
    {
      name: "Spirit Airlines Flight 404",
      number: "NK404",
      startCity: "Orlando",
      destinationCity: "Las Vegas",
      departure: "02:10 PM",
    },
    {
      name: "Frontier Airlines Flight 505",
      number: "F9 505",
      startCity: "Denver",
      destinationCity: "Phoenix",
      departure: "03:25 PM",
    },
    {
      name: "Allegiant Air Flight 606",
      number: "G4 606",
      startCity: "Tampa",
      destinationCity: "Atlanta",
      departure: "04:00 PM",
    },
    {
      name: "Sun Country Airlines Flight 707",
      number: "SY 707",
      startCity: "Minneapolis",
      destinationCity: "Miami",
      departure: "05:15 PM",
    },
    {
      name: "Hawaiian Airlines Flight 808",
      number: "HA 808",
      startCity: "Honolulu",
      destinationCity: "San Francisco",
      departure: "06:30 PM",
    },
    {
      name: "KLM Flight 909",
      number: "KL 909",
      startCity: "Amsterdam",
      destinationCity: "New York",
      departure: "07:00 PM",
    },
    {
      name: "Lufthansa Flight 1010",
      number: "LH 1010",
      startCity: "Frankfurt",
      destinationCity: "Chicago",
      departure: "08:15 PM",
    },
    {
      name: "British Airways Flight 1111",
      number: "BA 1111",
      startCity: "London",
      destinationCity: "Los Angeles",
      departure: "09:30 PM",
    },
    {
      name: "Air Canada Flight 1212",
      number: "AC 1212",
      startCity: "Toronto",
      destinationCity: "Vancouver",
      departure: "10:00 PM",
    },
    {
      name: "Qatar Airways Flight 1313",
      number: "QR 1313",
      startCity: "Doha",
      destinationCity: "New York",
      departure: "11:20 PM",
    },
    {
      name: "Emirates Flight 1414",
      number: "EK 1414",
      startCity: "Dubai",
      destinationCity: "Los Angeles",
      departure: "12:45 AM",
    },
    {
      name: "Singapore Airlines Flight 1515",
      number: "SQ 1515",
      startCity: "Singapore",
      destinationCity: "San Francisco",
      departure: "01:00 AM",
    },
    {
      name: "Japan Airlines Flight 1616",
      number: "JL 1616",
      startCity: "Tokyo",
      destinationCity: "Seattle",
      departure: "02:15 AM",
    },
    {
      name: "Cathay Pacific Flight 1717",
      number: "CX 1717",
      startCity: "Hong Kong",
      destinationCity: "Los Angeles",
      departure: "03:00 AM",
    },
    {
      name: "Turkish Airlines Flight 1818",
      number: "TK 1818",
      startCity: "Istanbul",
      destinationCity: "Chicago",
      departure: "04:30 AM",
    },
    {
      name: "Austrian Airlines Flight 1919",
      number: "OS 1919",
      startCity: "Vienna",
      destinationCity: "New York",
      departure: "05:15 AM",
    },
  ];

  return (
    <>
      <div className="pl-32 pb-4 text-blue-700 text-2xl font-bold">
        Welcome!
      </div>
      <div className="h-screen flex">
        <div className="w-1/2 pl-32 pr-2 bg-gray-100 overflow-auto grid gap-2">
          <Widget title="Flight Delays">
            <Line data={delayLineData} options={delayLineOptions} />
            <Bar data={totalDelaysData} options={totalDelaysOptions} />
          </Widget>
        </div>
        <div className="w-1/4 pr-2 gap-2 bg-gray-100 gap-2 overflow-auto max-h-[calc(100vh-5rem)] grid grid-rows-2">
          <Widget
            title="Passenger Demographic of Flight AMX274"
            className="flex flex-col space-y-4"
          >
            <Pie data={pieData} options={pieOptions} />
          </Widget>
          <Widget
            title="Local Weather"
            className="row-span-5 bg-blue-50 border-blue-200"
          >
            <div className="flex flex-col space-y-4 p-4">
              <div className="flex items-center space-x-4">
                {/* <img
                  src="/path-to-weather-icon.png" // Replace with actual path
                  alt="Weather Icon"
                  className="w-16 h-16"
                /> */}
                <div className="flex flex-col text-blue-700">
                  <h3 className="text-2xl font-bold">Sunny</h3>
                  <div className="text-lg">25°C</div>
                </div>
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <h4 className="font-semibold border-b-2 border-blue-700 pb-1 mb-2">
                    Current Conditions
                  </h4>
                  <p>Temperature: 25°C</p>
                  <p>Feels Like: 27°C</p>
                  <p>Humidity: 60%</p>
                  <p>Wind: 15 km/h</p>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold border-b-2 border-blue-700 pb-1 mb-2">
                    Location
                  </h4>
                  <p>City: New York</p>
                  <p>Country: USA</p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-blue-700 mb-4">
                  7-Day Forecast
                </h4>
                <Line data={lineData} options={lineOptions} />
              </div>

              <div className="text-blue-700">
                <h4 className="font-semibold border-b-2 border-blue-700 pb-1 mb-2">
                  Flights Affected
                </h4>
                <div>Air Can AC3224</div>
                <div>Air FX FX3984</div>
                <div>Air Ruby RC4203</div>
              </div>
            </div>
          </Widget>
        </div>
        <Widget title="Upcoming Flights">
          <div className="space-y-4">
            {flights.map((flight, idx) => (
              <div
                key={idx}
                className="flex items-center pb-4 border-b border-gray-300"
              >
                <div className="ml-4 flex-1">
                  <div className="font-bold">{flight.name}</div>
                  <div>Flight Number: {flight.number}</div>
                  <div>Start City: {flight.startCity}</div>
                  <div>Destination City: {flight.destinationCity}</div>
                  <div>Departure: {flight.departure}</div>
                </div>
              </div>
            ))}
          </div>
        </Widget>
      </div>
    </>
  );
}
