import Widget from "@/components/Widget";

export default function Page() {
  return (
    <div className="flex">
      <main className="flex-1 p-6 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Top Row: 3 smaller widgets */}
          <div className="col-span-1">
            <Widget title="Flight Delays">
              <div>Graph of delays</div>
            </Widget>
          </div>
          <div className="col-span-1">
            <Widget title="Flight Cancellations">
              <div>Graph of cancellations</div>
            </Widget>
          </div>
          <div className="col-span-1">
            <Widget title="Upcoming Flights">
              <div>List of upcoming flights</div>
            </Widget>
          </div>
          <div className="col-span-1">
            <Widget title="Local Weather">
              <div>Weather data and forecast</div>
            </Widget>
          </div>
          <div className="col-span-1">
            <Widget title="Recent Notifications">
              <div>List of recent notifications</div>
            </Widget>
          </div>
        </div>
      </main>
    </div>
  );
}
