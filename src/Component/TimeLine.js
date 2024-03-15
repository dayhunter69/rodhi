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
  const activeIndex = events.findIndex(
    (event) => event.status === activeStatus
  );

  return (
    <Timeline position="alternate">
      {events.map((event, index) => (
        <TimelineItem key={index}>
          <TimelineSeparator>
            <TimelineDot
              color={index >= activeIndex ? event.color : "secondary"}
            />
            {index !== events.length - 1 && <TimelineConnector />}
          </TimelineSeparator>
          <TimelineContent>
            {activeStatus === "canceled" ? "Canceled" : event.name}
          </TimelineContent>
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
    { status: "delivered", color: "#2ecc71", name: "Delivered" }, // Emerald
    { status: "deliveredPartial", color: "#3498db", name: "Out for Delivery" }, // Sky Blue
    {
      status: "arrivedAtKTMWarehouse",
      color: "#9b59b6",
      name: "Arrived at KTM Warehouse",
    }, // Amethyst
    { status: "delayAtCustoms", color: "#e74c3c", name: "Delay at Customs" }, // Alizarin
    {
      status: "arrivedAtCustoms",
      color: "#f1c40f",
      name: "Arrived at Customs",
    }, // Sunflower
    { status: "flightDelay", color: "#1abc9c", name: "Flight Delay" }, // Turquoise
    { status: "readyForFlight", color: "#e67e22", name: "Ready for Flight" }, // Carrot
    {
      status: "scheduleForFlight",
      color: "#34495e",
      name: "Schedule for Flight",
    }, // Wet Asphalt
    { status: "toShipment", color: "#95a5a6", name: "To Shipment" }, // Concrete
    {
      status: "arrivedAtWarehouse",
      color: "#27ae60",
      name: "Arrived at Warehouse",
    }, // Nephritis
    {
      status: "waitingToReceiveAtWarehouse",
      color: "#f39c12",
      name: "Waiting to Receive at Warehouse",
    }, // Orange
    { status: "paymentComplete", color: "#16a085", name: "Payment Complete" }, // Green Sea
    { status: "paymentPending", color: "#d35400", name: "Payment Pending" }, // Pumpkin
  ];

  return (
    <div>
      <Navbar />
      <ArrowBackIcon
        className="w-10 hover:bg-slate-200 rounded-full mt-[70px] ml-2 cursor-pointer"
        sx={{ width: 20, height: 20 }}
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
