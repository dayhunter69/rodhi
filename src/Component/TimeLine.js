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
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import Footer from "./Footer";

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

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const VerticalTimeline = ({ events, activeStatus, statusTimestamps }) => {
  const activeIndex = events.findIndex(
    (event) => event.status === activeStatus
  );

  const updatedEvents = events.map((event) => {
    const statusTimestamp = statusTimestamps.find(
      (timestamp) => timestamp.status === event.status
    );

    if (statusTimestamp) {
      return {
        ...event,
        lastUpdatedAt: statusTimestamp.timeStamp,
      };
    }

    return event;
  });

  return (
    <ThemeProvider theme={theme}>
      <Timeline position="alternate">
        {updatedEvents.map((event, index) => (
          <TimelineItem key={index}>
            <TimelineSeparator>
              <TimelineDot
                color={index >= activeIndex ? event.color : "secondary"}
                variant={index >= activeIndex ? "filled" : "outlined"}
              />
              {index !== updatedEvents.length - 1 && (
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
            <TimelineContent sx={{ py: "12px", px: 2 }}>
              <Typography variant="h6" component="span">
                {activeStatus === "canceled" ? "Canceled" : event.name}
              </Typography>
              <Typography variant="body2">
                {event.lastUpdatedAt
                  ? formatTimestamp(event.lastUpdatedAt)
                  : ""}
              </Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </ThemeProvider>
  );
};

VerticalTimeline.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeStatus: PropTypes.string.isRequired,
  statusTimestamps: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.string.isRequired,
      timeStamp: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const TimeLine = () => {
  const location = useLocation();

  const status =
    location.state?.data?.status || location.state?.item?.status || "";
  const statusTimestamps =
    location.state?.data?.statusTimestamps ||
    location.state?.item?.statusTimestamps ||
    [];
  const data = location.state?.data || location.state?.item || {};

  if (!status || !statusTimestamps || !data) {
    return (
      <div>
        <Navbar />
        <p>
          Sorry, there was an error loading the data. Please try again later.
        </p>
      </div>
    );
  }

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
        <p className="text-lg m-1">Category: {data.category || "N/A"}</p>
        <p className="text-lg m-1">Nature: {data.goodsType || "N/A"}</p>
        <p className="text-lg m-1">Product: {data.productName || "N/A"}</p>
        <p className="text-lg m-1">Quantity: {data.quantity || "N/A"}</p>
        <p className="text-lg m-1">Size: {data.size || "N/A"}</p>
        <p className="text-lg m-1">Weight: {data.weight || "N/A"}</p>
        <p className="text-lg m-1">
          Tracking Number: {data.trackingNumber || "N/A"}
        </p>
      </div>
      <VerticalTimeline
        events={events}
        activeStatus={status}
        statusTimestamps={statusTimestamps}
      />
      <Footer />
    </div>
  );
};

export default TimeLine;
