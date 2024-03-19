import React from "react";
import img2 from "../Assets/syncLogo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black mt-[3.5rem]">
      {/* Copyright */}
      <div className="flex flex-col mx-auto justify-center w-full mt-4 text-center text-lg">
        <p>Powered by Rodhi Sync.</p>
        <img src={img2} alt="rodhi-logo" className="w-[100px] mx-auto mt-3" />
      </div>
    </footer>
  );
};

export default Footer;
