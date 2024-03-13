import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineContent from "@mui/lab/TimelineContent";

const VerticalTimeline = ({ events, activeStatus }) => {
  console.log(activeStatus);
  return (
    <Timeline position="alternate">
      {events.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot
              color={event.status === activeStatus ? "primary" : "secondary"}
            />
            {index !== events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>{event.status}</TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};

const TimeLine = () => {
  const location = useLocation();

  // Extract status from location state
  const status =
    location.state?.data?.status ||
    location.state?.item?.status ||
    location.state;
  const data = location.state?.data || location.state?.item;
  console.log("Data: ", data);
  console.log("Status: ", status);
  const events = [
    { status: "canceled" },
    { status: "toShipment" },
    { status: "arrivedAtWarehouse" },
    { status: "waitingToReceiveAtWarehouse" },
    { status: "paymentComplete" },
    { status: "paymentPending" },
  ];

  return (
    <div>
      <Navbar />
      <ArrowBackIcon
        className="w-10 hover:bg-slate-200 rounded-full mt-[70px] ml-2"
        onClick={() => window.history.back()}
      />
      <div className="px-4 py-4 rounded-2xl bg-gray-100 shadow-md flex-grow-1 basis-1/3">
        <h2 className="text-2xl font-bold">Product Details:</h2>
        {/* Render Shipment Details from the first object */}
        <p className="text-lg m-1">Category: {data.category || "N/A"}</p>
        <p className="text-lg m-1">Nature: {data.goodsType || "N/A"}</p>
        <p className="text-lg m-1">Product: {data.productName || "N/A"}</p>
        <p className="text-lg m-1">Quantity: {data.quantity || "N/A"}</p>{" "}
        {/* Use correct property for quantity */}
        <p className="text-lg m-1">Size: {data.size || "N/A"}</p>{" "}
        {/* Use correct property for size */}
        <p className="text-lg m-1">Weight: {data.weight || "N/A"}</p>
        <p className="text-lg m-1">
          Tracking Number: {data.trackingNumber || "N/A"}
        </p>
      </div>
      <VerticalTimeline events={events} activeStatus={status} />
    </div>
  );
};

export default TimeLine;
