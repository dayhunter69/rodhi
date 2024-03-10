import React from "react";
import Navbar from "./Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function OrderTable() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleViewMore = (item) => {
    navigate("/status", {
      replace: true,
      state: { data: item },
    });
  };

  if (!location.state.data || !location.state) {
    return (
      <div>
        <div
          className="mt-[80px] mb-8 mx-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
          role="alert"
        >
          <span className="block sm:inline">No Valid Data Available</span>
        </div>
      </div>
    );
  }

  const responseData = location.state.data;

  // Get the first object from the response data
  const firstObject = responseData[0];

  // Get the order items from the response data
  const orderItems = Object.values(responseData).filter(
    (item) => typeof item === "object" && item.hasOwnProperty("orderArrayID")
  );
  return (
    <div className="w-full mt-[80px]">
      <Navbar />
      <button
        className="mt-[80px] bg-rodhi-red hover:bg-rodhi-blue text-white font-bold py-2 px-4 rounded"
        onClick={() => window.history.back()}
      >
        Go Back
      </button>
      <h1 className="text-rodhi-red text-[2rem] font-semibold text-center w-full mx-auto">
        Shipment Details
      </h1>
      <main className="p-5 h-min" id="customers_table">
        <section className="w-full rounded-lg shadow p-3">
          <div className="p-3">
            <div className="flex flex-col gap-8 overflow-auto justify-evenly sm:flex-row sm:justify-evenly">
              <div className="px-4 py-4 rounded-2xl bg-gray-100 shadow-md flex-grow-1 basis-1/3">
                <h2 className="text-2xl font-bold">Client Details:</h2>
                <p className="text-lg m-1">{responseData.fullName}</p>
                <p className="text-lg m-1">{responseData.phone}</p>
              </div>
              <div className="px-4 py-4 rounded-2xl bg-gray-100 shadow-md flex-grow-1 basis-1/3">
                <h2 className="text-2xl font-bold">Shipment Details:</h2>
                {/* Render Shipment Details from the first object */}
                <p className="text-lg m-1">
                  Country of Import: {firstObject.countryToImport}
                </p>
                <p className="text-lg m-1">
                  Flight Date: {firstObject.flightDate}
                </p>
                <p className="text-lg m-1">Weight: {firstObject.weight}</p>
              </div>
              <div className="px-4 py-4 rounded-2xl bg-gray-100 shadow-md flex-grow-1 basis-1/3">
                <h2 className="text-2xl font-bold">CRM Details:</h2>
                {/* Render CRM Details from the first object */}
                <p className="text-lg m-1">{firstObject.assignedToFullName}</p>
                <p className="text-lg m-1">{firstObject.assignedToPhone}</p>
              </div>
            </div>

            {/* Render the table */}
            <div className="overflow-auto rounded-lg shadow mt-5">
              <table className="w-full">
                <thead className="bg-gray-50 border-b-2 border-gray-200">
                  <tr>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Category
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Product
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Quantity
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Status
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      Last Updated
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-left">
                      More
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {/* Render order items */}
                  {orderItems.map((item, index) => (
                    <tr key={index}>
                      <td className="p-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.category}
                      </td>
                      <td className="p-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.productName}
                      </td>
                      <td className="p-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.quantity}
                      </td>
                      <td className="p-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.status}
                      </td>
                      <td className="p-3 text-sm text-gray-900 whitespace-nowrap">
                        {item.lastUpdatedAt}
                      </td>
                      <td className="p-3 text-sm text-gray-900 whitespace-nowrap">
                        <button
                          onClick={() => handleViewMore(item)}
                          className="bg-rodhi-red hover:bg-rodhi-blue p-2 rounded-md text-white"
                        >
                          View More
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Link to={"/"}>
        <div className="flex justify-center mt-8">
          <button className="bg-rodhi-red hover:bg-rodhi-blue text-white font-bold py-2 px-4 rounded">
            Back to Homepage
          </button>
        </div>
      </Link>
    </div>
  );
}

export default OrderTable;
