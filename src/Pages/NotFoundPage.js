import React from "react";
import Navbar from "../Component/Navbar";
import { Link } from "react-router-dom";
function NotFoundPage() {
  return (
    <div>
      <Navbar />
      <div
        class=" mt-[100px] mx-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded  text-center"
        role="alert"
      >
        <span class="block sm:inline">404: Page Not Found</span>
      </div>
      <Link to={"/"}>
        <div className="flex justify-center mt-8">
          <button className="bg-rodhi-red hover:bg-rodhi-blue text-white font-bold py-2 px-4 rounded">
            Back to Homepage
          </button>
        </div>
      </Link>
      );
    </div>
  );
}

export default NotFoundPage;
