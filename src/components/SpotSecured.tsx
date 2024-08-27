import React from "react";
import Image from "next/image";
import checkmarkIcon from "../assets/icons/checkmark.svg";

const SpotSecured = () => {
  return (
    <div className="relative sm:h-[64px] sm:px-4 sm:py-2 p-6 bg-gradient-to-r from-[#D1FFE7] to-[#D0EAFF] shadow-resolv-button rounded-full text-sm flex items-center gap-2 space-x-2 transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] focus:outline-none">
      <div className="h-1/3 flex items-center">
        <Image
          src={checkmarkIcon!}
          alt="icon"
          className="h-full w-auto transform" // Make height 100% of parent (which is 80% of button height)
        />
      </div>
      Spot Secured
    </div>
  );
};

export default SpotSecured;
