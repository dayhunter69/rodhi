import React, { useState } from "react";
import img from "../Assets/rodhi-logo.png";

const Navbar = () => {
  let Links = [
    { name: "Home", link: "https://rodhisources.com/" },
    { name: "About", link: "https://rodhisources.com/about/" },
    { name: "Services", link: "https://rodhisources.com/services/" },
    { name: "Our Blogs", link: "https://rodhisources.com/blogs/" },
    { name: "Contact", link: "https://rodhisources.com/contact/" },
    { name: "Community", link: "http://connect.rodhigroup.com/" },
    { name: "Import Mastery", link: "https://rodhisources.com/rim/" },
  ];

  let [open, setOpen] = useState(false);

  return (
    <div className="shadow-md w-full fixed top-0 left-0 z-[99999]">
      <div className="md:flex items-center justify-between bg-white py-4">
        <div className="font-bold text-2xl cursor-pointer flex items-center font-[Poppins]">
          <a className="w-[100px] pl-5" href="https://rodhisources.com/">
            <img src={img} alt="HomePage" className="w-auto h-auto" />
          </a>
        </div>

        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"}></ion-icon>
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 bg-white absolute md:static md:z-auto z-[-1] w-full md:w-auto md:pl-0 text-center transition-all duration-500 ease-in ${
            open ? "top-20 " : "top-[-490px]"
          } mx-auto`}
        >
          {Links.map((link) => (
            <li
              key={link.name}
              className="justify-center items-center md:ml-4 font-medium text-md md:my-0 my-7"
            >
              <a
                href={link.link}
                className="text-rodhi-red hover:text-rodhi-blue duration-500 px-3 text-center"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
