'use client';
import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { BlackArrowsIcon, Logo, ProtectBox, ReturnStolenBox, SwapTokensBox, WalletIcon } from "../images/index";

export function ImageViewer() {
  const [currentImg, setCurrentImg] = useState(ProtectBox);
  const [imgChanged, setImageChanged] = useState(false);

  const imageClickHandler = (newImg: StaticImageData) => {
    if (newImg === currentImg) {
      return
    }
    setImageChanged(true);
    window.setTimeout(() => {
      setCurrentImg(newImg);
      setImageChanged(false);
    }, 300);
  };

  return <>
    <div className="rounded-4xl p-8 bg-gradient-to-br from-blue to-green mt-8">
      <Image src={currentImg} alt="" className={`w-full transition-opacity duration-300 ease-linear ${imgChanged ? "opacity-0" : "opacity-100"}`} />
    </div>

    <div className="grid grid-cols-3 gap-8 mt-8">
      <div className={`rounded-4xl p-8 ${currentImg === ProtectBox ? "bg-gradient-to-br from-blue to-green" : "bg-gray cursor-pointer"}`} onClick={() => imageClickHandler(ProtectBox)}>
        <div className="w-12 h-12 flex items-center text-center mx-auto md:mx-0">
          <Image src={Logo} alt="Protect your crypto" className="mx-auto w-full" />
        </div>
        <div className="text-3xl mt-4 font-bold hidden md:block">
          Protect your
          <br />
          crypto
        </div>
      </div>

      <div className={`rounded-4xl p-8 ${currentImg === SwapTokensBox ? "bg-gradient-to-br from-blue to-green" : "bg-gray cursor-pointer"}`} onClick={() => imageClickHandler(SwapTokensBox)}>
        <div className="w-12 h-12 flex items-center text-center mx-auto md:mx-0">
          <Image src={BlackArrowsIcon} alt="Swap your tokens" className="mx-auto w-full" />
        </div>
        <div className="text-3xl mt-4 font-bold hidden md:block">
          Swap your
          <br />
          tokens
        </div>
      </div>

      <div className={`rounded-4xl p-8 ${currentImg === ReturnStolenBox ? "bg-gradient-to-br from-blue to-green" : "bg-gray cursor-pointer"}`} onClick={() => imageClickHandler(ReturnStolenBox)}>
        <div className="w-12 h-12 flex items-center text-center mx-auto md:mx-0">
          <Image src={WalletIcon} alt="Swap your tokens" className="mx-auto w-full" />
        </div>
        <div className="text-3xl mt-4 font-bold hidden md:block">
          Return stolen
          <br />
          funds
        </div>
      </div>
    </div>
  </>
}