import {
  FacebookIcon,
  InstagramIcon,
  MapPinIcon,
  PhoneCallIcon,
  TwitterIcon,
} from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="bg-gray-700 p-4 md:px-16 lg:px-32 text-white flex flex-col mt-30">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between mb-8">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start md:w-1/3 mb-4 md:mb-0 gap-6">
          <h1 className="!text-5xl md:text-4xl font-bold text-red-600 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            Foodel
          </h1>
          <p className="text-gray-200 w-2/3 md:w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            obcaecati eos nobis, ea doloremque vero laborum aperiam ut! Id
            commodi et accusantium accusamus voluptatibus amet odio
            exercitationem maiores iure enim!
          </p>
          <div className="flex space-x-4 text-red-600">
            <FacebookIcon className="hover:text-red-400 transition-colors duration-200 cursor-pointer" />
            <TwitterIcon className="hover:text-red-400 transition-colors duration-200 cursor-pointer" />
            <InstagramIcon className="hover:text-red-400 transition-colors duration-200 cursor-pointer" />
          </div>
        </div>
        {/* Middle Section */}
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 gap-6">
          <h2 className="text-2xl text-red-600 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            COMPANY
          </h2>
          <ul className="text-gray-200">
            <li className="mb-2 cursor-pointer hover:text-red-400">Home</li>
            <li className="mb-2 cursor-pointer hover:text-red-400">About</li>
            <li className="mb-2 cursor-pointer hover:text-red-400">Delivery</li>
            <li className="mb-2 cursor-pointer hover:text-red-400">
              Privacy policy
            </li>
          </ul>
        </div>
        {/* Right Section */}
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 gap-6">
          <h2 className="text-2xl text-red-600 font-semibold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">
            CONTACT
          </h2>
          <ul className="text-gray-200">
            <li className="flex gap-2 mb-4">
              <PhoneCallIcon className="text-red-600" size={22} />
              +1 (555) 123-4567
            </li>
            <li className="flex gap-2">
              <MapPinIcon className="text-red-600" size={22} />
              123 Food St, Flavor Town, USA
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center text-gray-400">
        Copyright &copy; 2025 Foodel - All Rights Reserved
      </p>
    </div>
  );
};

export default Footer;
