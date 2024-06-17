import React from 'react';
import Navbar from './Navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Footer from './Footer';
import ReactGA from 'react-ga4';
function OrderTable() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleViewMore = (item) => {
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
    navigate('/status', {
      replace: false,
      state: { data: item, initialOrderID: location.state.initialOrderID },
    });
  };

  if (!location.state || !location.state.data) {
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
  let subOrderIndex;
  if (location.state.subOrderIndex === 0) {
    subOrderIndex = 0;
  } else if (location.state.subOrderIndex) {
    subOrderIndex = location.state.subOrderIndex;
  } else {
    subOrderIndex = null;
  }

  // Get the first object from the response data
  const firstObject = responseData[0];

  // Get the order items from the response data
  const orderItems = Object.values(responseData).filter(
    (item) => typeof item === 'object' && item.hasOwnProperty('orderArrayID')
  );

  // Render all order items if subOrderIndex is null
  const filteredOrderItems =
    subOrderIndex === null
      ? orderItems
      : orderItems.filter((item, index) => index === subOrderIndex);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) {
      return 'Pending';
    }
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };
  const convertCamelCaseToNormalCase = (camelCaseString) => {
    // Add a space before each uppercase letter and capitalize the first letter
    return camelCaseString
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, (str) => str.toUpperCase());
  };

  let printShipment;
  console.log(firstObject.shipmentMethod);
  if (firstObject.shipmentMethod === 'Air') {
    printShipment = true;
  } else {
    printShipment = false;
  }

  const navigateHome = () => {
    navigate('/');
  };
  return (
    <div className="w-full mt-[80px]">
      <Navbar />
      <ArrowBackIcon
        className="w-10 hover:bg-slate-200 rounded-full cursor-pointer"
        sx={{ width: 20, height: 20 }}
        onClick={() => window.history.back()}
      />
      <h1 className="text-rodhi-red text-[2rem] font-semibold text-center w-full mx-auto">
        Shipment Details
      </h1>
      {printShipment && (
        <h2 className="text-rodhi-red text-[1.5rem] font-semibold text-center w-full mx-auto">
          Shipment Number: {localStorage.getItem('prettyOrderID')}
        </h2>
      )}
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
                <p className="text-lg m-1">{firstObject.assignedToFullName}</p>
                <p className="text-lg m-1">
                  <a
                    className="text-rodhi-blue hover:text-rodhi-red"
                    href={'tel:' + firstObject.assignedToPhone}
                  >
                    {firstObject.assignedToPhone}
                  </a>
                  <a
                    href={'https://wa.me/' + firstObject.assignedToPhone}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon />
                  </a>
                </p>
              </div>
            </div>

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
                  {filteredOrderItems.map((item, index) => (
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
                        {convertCamelCaseToNormalCase(item.status)}
                      </td>
                      <td className="p-3 text-sm text-gray-900 whitespace-nowrap">
                        {formatDate(item.lastUpdatedAt)}
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

      <div className="flex justify-center mt-8 sm:mb-[135px]">
        <button
          className="w-[13rem] bg-rodhi-red hover:bg-rodhi-blue text-white font-bold py-2 px-4 rounded"
          onClick={navigateHome}
        >
          Back to Homepage
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default OrderTable;
