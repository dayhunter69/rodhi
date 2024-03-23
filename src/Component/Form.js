import React, { useState } from "react";
import Navbar from "./Navbar";
import OrderTable from "./OrderTable";
import { useNavigate } from "react-router-dom";
import helpImage from "../Assets/Message.png";
import Footer from "./Footer";

function Form() {
  const [prettyOrderID, setPrettyOrderID] = useState("");
  const [phone, setPhone] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const convertPrettyOrderID = (prettyOrderID) => {
    // Remove all spaces from the input string
    const trimmedInput = prettyOrderID.replace(/\s/g, "");

    let convertedID = "";

    // Convert the input and check strings to the same case (lowercase in this case)
    const lowercaseTrimmedInput = trimmedInput.toLowerCase();
    const rgoCheckString = "rgo-";

    // Check if the input starts with "rgo-" (case-insensitive)
    if (lowercaseTrimmedInput.startsWith(rgoCheckString)) {
      const slicedInput = trimmedInput.slice(4);

      for (const char of slicedInput) {
        if (/[A-Z]/.test(char)) {
          convertedID += char.charCodeAt(0) - 65;
        } else {
          convertedID += char;
        }
      }
    } else {
      for (const char of trimmedInput) {
        if (/[A-Z]/.test(char)) {
          convertedID += char.charCodeAt(0) - 65;
        } else {
          convertedID += char;
        }
      }
    }

    const lastChar = convertedID.slice(-1);
    const isLastCharAlphabet = /[A-Z]/.test(lastChar);
    const endsWithHyphen = convertedID.endsWith("-");

    if (isLastCharAlphabet && !endsWithHyphen) {
      convertedID += "-" + (lastChar.charCodeAt(0) - 65);
    }
    return convertedID;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        prettyOrderID: convertPrettyOrderID(prettyOrderID),
        phone,
      };

      const response = await fetch(
        "https://rodhisync.rangaoffice.com/api/v1/orders/thirdPartyAPI",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        }
      );

      if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse && jsonResponse.data) {
          setResponseData(jsonResponse);
          setError("");
          navigate("/orderdetail", {
            replace: false,
            state: { data: jsonResponse.data },
          });
        } else {
          setError("Invalid order ID or phone number");
          setResponseData(null);
        }
      } else {
        throw new Error("Request failed");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(
        "Uh-oh! Something went wrong. It seems there's an error with your shipment or registered mobile number."
      );
      setResponseData(null);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full flex flex-col mt-[6rem]">
        <h1 className="text-rodhi-red text-2xl font-semibold text-center">
          Track Your Shipment
        </h1>
        <h3 className="w-full py-1 text-center font-normal text-[1.1rem] text-black">
          Track your shipment using the shipment number and your registered
          mobile number.
        </h3>
        <div className="mt-5 h-auto border border-gray-300 rounded-lg p-8 mb-8 flex flex-col items-center justify-center w-11/12 mx-auto">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col items-center"
          >
            <input
              type="text"
              value={prettyOrderID}
              placeholder="Shipment Number (Eg: RGO-123)"
              autoComplete="off"
              onChange={(e) => setPrettyOrderID(e.target.value)}
              className="w-11/12 md:w-7/12 px-4 py-2 mb-7 border border-gray-300 rounded-md"
            />

            <input
              type="tel"
              value={phone}
              placeholder="Your Phone Number"
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="off"
              className="w-11/12 md:w-7/12 px-4 py-2 mb-7 border border-gray-300 rounded-md"
            />

            <button
              type="submit"
              className="w-2/5 md:w-3/12 items-center bg-red-600 text-white py-2 mx-10 rounded-md hover:bg-blue-900"
            >
              Track
            </button>
          </form>
        </div>

        <div className="response-container">
          {error && (
            <div
              class="mb-8 mx-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center"
              role="alert"
            >
              <span class="block sm:inline">{error}</span>
            </div>
          )}
          {responseData && !error && <OrderTable data={responseData} />}
        </div>

        {/* horizontal border */}

        <div className="flex flex-col mx-auto text-center">
          <h3 className="text-rodhi-red text-xl">Need Help?</h3>
          <p>
            Call us at:{" "}
            <a
              className="text-rodhi-blue hover:text-rodhi-red"
              href="tel:+9779801359733"
            >
              9801359733
            </a>
          </p>
          <p>(10 AM - 5 PM, Sun-Fri) </p>
        </div>
      </div>
      <div className="w-[80%] justify-center mx-auto">
        <div className="mt-8 w-full border-t justify-center mx-auto border-gray-400 opacity-80 mb-8"></div>

        <div className="flex flex-row">
          <div className="w-1/3 font-medium text-md">
            <h3>Can't find your shipment number?</h3>
          </div>
          <div className="w-2/3">
            <ul className="list-disc pl-5 pb-0">
              <li>
                Your Shipment number is in the confirmation SMS on your mobile.
              </li>
              <li>
                If you didn't receive it, connect with your Client Relationship
                Manager (CRM)
              </li>
            </ul>
            <div className="w-full md:w-2/3 mx ml-3">
              <img
                src={helpImage}
                alt="HomePage"
                className="w-full mx-auto ml-3 mt-3"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 w-full border-t justify-center mx-auto border-gray-400 opacity-80 mb-8"></div>
        <div className="flex flex-row">
          <div className="w-1/3 font-medium text-md">
            <h3>What is a Registered Mobile Number?</h3>
          </div>
          <div className="w-2/3">
            <ul className="list-disc pl-5">
              <li>
                It's the mobile number you use to communicate with our Client
                Relationship Manager(CRM) and where you receive all SMS updates
                about your inquiries and shipments.
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 w-full border-t justify-center mx-auto border-gray-400 opacity-80 mb-8"></div>
        <div className="flex flex-row">
          <div className="w-1/3 font-medium text-md">
            <h3>Can I update my registered mobile number?</h3>
          </div>
          <div className="w-2/3">
            <ul className="list-disc pl-5">
              <li>
                Yes, you can, Please feel free to reach out to your Client
                Relationship Manager(CRM) for assistance.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Form;
