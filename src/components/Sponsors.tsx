import React from "react";
import uiucicon from "../assets/icons/uiuc.svg";
import orangedaoicon from "../assets/icons/orangedao.svg";
import uchicagoicon from "../assets/icons/uchicago.svg";
import ocaventuresicon from "../assets/icons/ocaventures.svg";
import Image from "next/image";

const Sponsors = () => {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
      <div className="max-w-screen-2xl mx-auto px-4">
        <div className="flex w-full bg-stoneGray rounded-[5rem] ring ring-stoneGrayDark ring-1 p-8 overflow-x-auto">
          <div className="flex flex-nowrap w-full justify-between gap-8 items-center min-w-max">
            <div className="shrink-0">
              Backed by world-class
              <br />
              investors, including
            </div>
            <Image src={uiucicon} alt="UIUC" className="sm:h-auto w-auto h-6" />
            <Image
              src={orangedaoicon}
              alt="Orange DAO"
              className="sm:h-auto w-auto h-6"
            />
            <Image
              src={uchicagoicon}
              alt="University of Chicago"
              className="sm:h-auto w-auto h-6"
            />
            <Image
              src={ocaventuresicon}
              alt="OCA Ventures"
              className="sm:h-auto w-auto h-6"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
