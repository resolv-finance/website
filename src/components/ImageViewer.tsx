'use client';
import { useState } from "react";
import { Logo, ProtectBox, ReturnStolenBox, SwapTokensBox, WalletIcon } from "../images/index"; // Make sure these paths are correct

export function ImageViewer() {
  const [currentImg, setCurrentImg] = useState(ProtectBox);
  const [imgChanged, setImageChanged] = useState(false);

  const imageClickHandler = (newImg: string) => {
    if (newImg === currentImg) {
      return;
    }
    setImageChanged(true);
    window.setTimeout(() => {
      setCurrentImg(newImg);
      setImageChanged(false);
    }, 300);
  };

  return (
    <>
      <div className="rounded-4xl p-6 bg-gradient-to-br from-blue to-green mt-12">
        {/* Use <img> instead of next/image for static export */}
        <img
          src={currentImg}
          alt=""
          className={`bg-white rounded-xl w-full transition-opacity duration-300 ease-linear ${imgChanged ? "opacity-0" : "opacity-100"}`}
        />
      </div>

      <div className="grid grid-cols-3 gap-7 mt-7">
        {/* Protect your crypto section */}
        <div
          className={`rounded-25xl p-8 ${currentImg === ProtectBox ? "bg-gradient-to-br from-blue to-green" : "bg-gray cursor-pointer"}`}
          onClick={() => imageClickHandler(ProtectBox)}
        >
          <div className="w-13 h-12 flex items-center text-center mx-auto md:mx-0">
            {/* Replace next/image with static <img> */}
            <img src="/images/logo.png" alt="Protect your crypto" className="mx-auto w-full" />
          </div>
          <div className="text-3xl mt-4 font-bold hidden md:block">
            Protect your
            <br />
            crypto
          </div>
        </div>

        {/* Swap your tokens section */}
        <div
          className={`rounded-25xl p-8 ${currentImg === SwapTokensBox ? "bg-gradient-to-br from-blue to-green" : "bg-gray cursor-pointer"}`}
          onClick={() => imageClickHandler(SwapTokensBox)}
        >
          <div className="w-10 h-12 flex items-center text-center mx-auto md:mx-0">
            <img src="/images/BlackArrowsIcon.png" alt="Swap your tokens" className="mx-auto w-full" />
          </div>
          <div className="text-3xl mt-4 font-bold hidden md:block">
            Swap your
            <br />
            tokens
          </div>
        </div>

        {/* Return stolen funds section */}
        <div
          className={`rounded-25xl p-8 ${currentImg === ReturnStolenBox ? "bg-gradient-to-br from-blue to-green" : "bg-gray cursor-pointer"}`}
          onClick={() => imageClickHandler(ReturnStolenBox)}
        >
          <div className="w-8 h-12 flex items-center text-center mx-auto md:mx-0">
            <img src="/images/WalletIcon.png" alt="Return stolen funds" className="mx-auto w-full" />
          </div>
          <div className="text-3xl mt-4 font-bold hidden md:block">
            Return stolen
            <br />
            funds
          </div>
        </div>
      </div>
    </>
  );
}
