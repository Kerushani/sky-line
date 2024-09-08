"use client";

import React from "react";
import Widget from "@/components/Widget";

export default function Home() {
  return (
    <>
      <div className="h-screen flex">
        <div className="w-1/4 pl-36 bg-gray-100 overflow-auto grid grid-rows-2">
          <Widget title="Flight Delays" className="col-span-2">
            <div>Graph of delays</div>
          </Widget>
          <Widget title="Flight Cancellations">
            <div>Graph of cancellations</div>
          </Widget>
        </div>
        <div className="w-1/4 px-6 pb-6 bg-gray-100 overflow-auto grid grid-rows-2">
          <Widget title="Flight Delays" className="col-span-2">
            <div>Graph of delays</div>
          </Widget>
          <Widget title="Local Weather">
            <div>Weather data and forecast</div>
          </Widget>
        </div>
        <div className="w-1/4 px-6 pb-6 bg-gray-100 overflow-auto grid grid-rows-2">
          <Widget title="Flight Delays" className="col-span-2">
            <div>Graph of delays</div>
          </Widget>
          <Widget title="Local Weather">
            <div>Weather data and forecast</div>
          </Widget>
        </div>
        <Widget title="Upcoming Flights">
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, idx) => (
              <div
                key={idx}
                className="flex items-center p-4 border-b border-gray-300"
              >
                <img
                  src="/path/to/image.jpg"
                  alt="Flight"
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="ml-4 flex-1">
                  <div className="font-bold">Flight Name {idx + 1}</div>
                  <div>Flight Number {idx + 1}</div>
                  <div>Start: City {idx + 1}</div>
                  <div>Destination: City {idx + 1}</div>
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
