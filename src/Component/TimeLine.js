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
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#808080",
      contrastText: "#ffffff",
    },
    delivered: {
      main: "#2ecc71",
      contrastText: "#ffffff",
    },
    deliveredPartial: {
      main: "#3498db",
      contrastText: "#ffffff",
    },
    arrivedAtKTMWarehouse: {
      main: "#9b59b6",
      contrastText: "#ffffff",
    },
    delayAtCustoms: {
      main: "#e74c3c",
      contrastText: "#ffffff",
    },
    arrivedAtCustoms: {
      main: "#f1c40f",
      contrastText: "#000000",
    },
    flightDelay: {
      main: "#1abc9c",
      contrastText: "#ffffff",
    },
    readyForFlight: {
      main: "#e67e22",
      contrastText: "#ffffff",
    },
    scheduleForFlight: {
      main: "#34495e",
      contrastText: "#ffffff",
    },
    toShipment: {
      main: "#95a5a6",
      contrastText: "#000000",
    },
    arrivedAtWarehouse: {
      main: "#27ae60",
      contrastText: "#ffffff",
    },
    waitingToReceiveAtWarehouse: {
      main: "#f39c12",
      contrastText: "#000000",
    },
    paymentComplete: {
      main: "#16a085",
      contrastText: "#ffffff",
    },
    paymentPending: {
      main: "#d35400",
      contrastText: "#ffffff",
    },
    success: {
      main: "#4caf50",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#b3b3b3",
      contrastText: "#000000",
    },
    completeConnector: {
      main: "#000000",
      contrastText: "#ffffff",
    },
    incompleteConnector: {
      main: "#c9c5c5",
      contrastText: "#000000",
    },
  },
});

const VerticalTimeline = ({ events, activeStatus }) => {
  console.log(activeStatus);
  const activeIndex = events.findIndex(
    (event) => event.status === activeStatus
  );
  console.log("Active Index:", activeIndex);

  return (
    <ThemeProvider theme={theme}>
      <Timeline position="alternate">
        {events.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot
                color={index >= activeIndex ? event.color : "secondary"}
                variant={index >= activeIndex ? "filled" : "outlined"}
              />
              {index !== events.length - 1 && (
                <TimelineConnector
                  sx={{
                    bgcolor:
                      index >= activeIndex
                        ? theme.palette.completeConnector.main
                        : theme.palette.incompleteConnector.main,
                  }}
                />
              )}
            </TimelineSeparator>
            <TimelineContent>
              {activeStatus === "canceled" ? "Canceled" : event.name}
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </ThemeProvider>
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
    { status: "delivered", color: "delivered", name: "Delivered" },
    {
      status: "deliveredPartial",
      color: "deliveredPartial",
      name: "Out for Delivery",
    },
    {
      status: "arrivedAtKTMWarehouse",
      color: "arrivedAtKTMWarehouse",
      name: "Arrived at KTM Warehouse",
    },
    {
      status: "delayAtCustoms",
      color: "delayAtCustoms",
      name: "Delay at Customs",
    },
    {
      status: "arrivedAtCustoms",
      color: "arrivedAtCustoms",
      name: "Arrived at Customs",
    },
    { status: "flightDelay", color: "flightDelay", name: "Flight Delay" },
    {
      status: "readyForFlight",
      color: "readyForFlight",
      name: "Ready for Flight",
    },
    {
      status: "scheduleForFlight",
      color: "scheduleForFlight",
      name: "Schedule for Flight",
    },
    { status: "toShipment", color: "toShipment", name: "To Shipment" },
    {
      status: "arrivedAtWarehouse",
      color: "arrivedAtWarehouse",
      name: "Arrived at Warehouse",
    },
    {
      status: "waitingToReceiveAtWarehouse",
      color: "waitingToReceiveAtWarehouse",
      name: "Waiting to Receive at Warehouse",
    },
    {
      status: "paymentComplete",
      color: "paymentComplete",
      name: "Payment Complete",
    },
    {
      status: "paymentPending",
      color: "paymentPending",
      name: "Payment Pending",
    },
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
