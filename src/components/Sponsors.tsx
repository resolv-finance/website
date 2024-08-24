import React from "react";
import uiucicon from "../assets/icons/uiuc.svg?url";
import orangedaoicon from "../assets/icons/orangedao.svg?url";
import uchicagoicon from "../assets/icons/uchicago.svg?url";
import ocaventuresicon from "../assets/icons/ocaventures.svg?url";
import Image from "../../node_modules/next/image";

const Sponsors = () => {
  return (
    <div className="flex w-full bg-stoneGray rounded-[5rem] ring ring-stoneGrayDark ring-1 p-8">
      <div className="flex gap-8 h-8 items-center">
        <div className="shrink-0">
          Backed by world-class
          <br />
          investors, including
        </div>
        <Image src={uiucicon!} alt="" />
        <Image src={orangedaoicon!} alt="" />
        <Image src={uchicagoicon!} alt="" />
        <Image src={ocaventuresicon!} alt="" />
      </div>
    </div>
  );
};

export default Sponsors;
