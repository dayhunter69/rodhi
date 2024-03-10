import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const TimelineItem = ({ status, date, active }) => (
  <div className="relative mb-8">
    <div className="flex items-center mb-2">
      <div className="absolute left-4 top-0 bottom-0 flex items-center">
        {/* Vertical line */}
        <div
          className={`h-full w-1 bg-gray-300 ${active ? "bg-black" : ""}`}
          style={{ marginLeft: "-0.5px" }}
        ></div>
      </div>
      <div className="ml-6">
        <div
          className={`text-sm font-medium ${
            active ? "text-black" : "text-gray-900"
          }`}
        >
          {status}
        </div>
        <div className="text-sm text-gray-500">{date}</div>
      </div>
    </div>
  </div>
);

const VerticalTimeline = ({ events, activeStatus }) => (
  <div className="mx-auto max-w-2xl mt-[80px]">
    {events.map((event, index) => (
      <TimelineItem
        key={index}
        status={event.status}
        date={event.date}
        active={event.status === activeStatus}
      />
    ))}
  </div>
);

const TimeLine = ({ activeStatus }) => {
  const location = useLocation();

  // Extract status from location state
  const status =
    location.state?.data?.status ||
    location.state?.item?.status ||
    location.state;
  const data = location.state?.data || location.state?.item;
  console.log(data);
  console.log(status);
  const events = [
    { status: "paymentPending", date: "2024-02-20" },
    { status: "paymentComplete", date: "2024-02-21" },
    { status: "waitingToReceiveAtWarehouse", date: "2024-02-22" },
    { status: "arrivedAtWarehouse", date: "2024-02-23" },
    { status: "toShipment", date: "2024-02-24" },
    { status: "canceled", date: "2024-02-25" },
  ];

  return (
    <div>
      <Navbar />
      <button
        className="mt-[80px] bg-rodhi-red hover:bg-rodhi-blue text-white font-bold py-2 px-4 rounded"
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
      <div className="px-4 py-4 rounded-2xl bg-gray-100 shadow-md flex-grow-1 basis-1/3">
        <h2 className="text-2xl font-bold">Product Details:</h2>
        {/* Render Shipment Details from the first object */}
        <p className="text-lg m-1">Category: {data.category || "N/A"}</p>
        <p className="text-lg m-1">Nature: {data.goodsType || "N/A"}</p>
        <p className="text-lg m-1">Product: {data.productName || "N/A"}</p>
        <p className="text-lg m-1">Quantity: {data.flightDate || "N/A"}</p>
        <p className="text-lg m-1">Size: {data.flightDate || "N/A"}</p>
        <p className="text-lg m-1">Weight: {data.weight || "N/A"}</p>
        <p className="text-lg m-1">
          Tracking Number: {data.trackingNumber || "N/A"}
        </p>
      </div>
      <VerticalTimeline events={events} activeStatus={activeStatus || status} />
    </div>
  );
};

export default TimeLine;
