"use client";

import React from "react";
import Widget from "@/components/Widget";

export default function Home() {
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
          <Widget title="Passenger Demographic of Flight ###">
            <div>No info yet</div>
          </Widget>
          <Widget title="Local Weather" className="row-span-5">
            <div>Weather data and forecast</div>
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
