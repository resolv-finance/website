import React from "react";
import uiucicon from "../assets/icons/uiuc.svg?url";
import orangedaoicon from "../assets/icons/orangedao.svg?url";
import uchicagoicon from "../assets/icons/uchicago.svg?url";
import ocaventuresicon from "../assets/icons/ocaventures.svg?url";
import Image from "next/image";

const Sponsors = () => {
  return (
    <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw]">
      <div className="max-w-screen-2xl mx-auto px-16">
        <div className="flex w-full bg-stoneGray rounded-[5rem] ring ring-stoneGrayDark ring-1 p-8">
          <div className="flex w-full gap-8 h-8 items-center justify-around">
            <div className="shrink-0">
              Backed by world-class
              <br />
              investors, including
            </div>
            <Image src={uiucicon} alt="UIUC" />
            <Image src={orangedaoicon} alt="Orange DAO" />
            <Image src={uchicagoicon} alt="University of Chicago" />
            <Image src={ocaventuresicon} alt="OCA Ventures" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
