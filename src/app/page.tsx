"use client";

import Image from "next/image";
import {
  ArrowsIcon,
  CheckIcon,
  CircleArrowIcon,
  CongratsBox,
  GoodNewsBox,
  Logo,
  ResolvButton,
  ShieldIcon,
} from "../images/index";
import { Accordion } from "@/components/Accordion";
import { ImageViewer } from "@/components/ImageViewer";
import { EmailInput } from "@/components/EmailInput";
import { Inter } from "next/font/google";
import ResolvConnectButton from "@/components/ResolvConnectButton/ResolvConnectButton";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import WalletIcon from "../assets/icons/wallet.svg?url";
import Sponsors from "@/components/Sponsors";
import { useAccount } from "wagmi";
import { useState, useEffect, useRef } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const account = useAccount();
  const { address } = account;
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  let storedAddress = useRef<string | null>(null);

  useEffect(() => {
    storedAddress.current = localStorage.getItem("walletAddress");
    console.log(account);
  }, []);

  useEffect(() => {
    if (!address) {
      if (storedAddress.current) {
        setIsWalletConnected(true);
      } else {
        setIsWalletConnected(false);
      }
    } else {
      setIsWalletConnected(true);
    }
  }, [address]);

  useEffect(() => {
    if (!address) {
      localStorage.removeItem("walletAddress");
      setIsWalletConnected(false);
    }
  }, [address]);

  return (
    <div>
      <header className="flex justify-between w-full max-w-[900px] mx-auto px-10">
        <div className="flex items-center">
          <Image src={Logo} alt="Resolv" className="w-h-logo" />
          <span className="pl-2 text-3xl font-bold text-black">Resolv</span>
        </div>
        {address ? (
          <ResolvConnectButton styles="flex justify-center w-fit border border-2 border-black rounded-full py-2 px-4" />
        ) : (
          <ConnectButton.Custom>
            {({
              account,
              chain,
              openAccountModal,
              openChainModal,
              openConnectModal,
              authenticationStatus,
              mounted,
            }) => {
              // Note: If your app doesn't use authentication, you
              // can remove all 'authenticationStatus' checks
              const ready = mounted && authenticationStatus !== "loading";
              const connected =
                ready &&
                account &&
                chain &&
                (!authenticationStatus ||
                  authenticationStatus === "authenticated");

              return (
                <div
                  {...(!ready && {
                    "aria-hidden": true,
                  })}
                >
                  {(() => {
                    return (
                      <button onClick={openConnectModal} type="button">
                        {storedAddress.current || "Connect Wallet"}
                      </button>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        )}
      </header>

      <div className="container px-10 md:px-0">
        <h1 className="md:text-[4rem] text-10xl font-bold text-center leading-extra-tight mt-24">
          Put stolen crypto
          <br />
          back in your wallet.
        </h1>
        <h2
          className={`${inter.className} text-center mt-6 font-regular text-2xl`}
        >
          Become and early adopter and connect your wallet to get $250,000 in
          free protection upon release.
        </h2>

        {isWalletConnected == false && (
          <div className="flex items-center justify-center mt-8">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-green-200 rounded-full blur-sm"></div>
              <ResolvConnectButton
                icon={WalletIcon}
                styles="relative h-[64px] px-6 py-3 bg-gradient-to-r from-[#D1FFE7] to-[#D0EAFF] shadow-resolv-button rounded-full text-gray-800 font-semibold flex items-center space-x-2 shadow-md transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:translate-y-[1px] hover:shadow-none focus:outline-none"
              />
            </div>
          </div>
        )}

        {isWalletConnected == true && <EmailInput />}

        <div className="w-screen px-16 absolute left-0 my-10">
          <Sponsors />
        </div>

        <div className="flex items-center justify-center mt-24">
          <span className="font-medium text-3xl pr-2">Explore</span>
          <Image src={CircleArrowIcon} alt="" className="w-explore" />
        </div>

        <h2 className="text-6xl mt-18 font-semibold">
          Let&apos;s cut right to the chase.
          <br />
          No confusing crypto lingo.
        </h2>

        <div className="rounded-4xl p-12 bg-blue mt-11">
          <div className="bg-black rounded-full w-17 h-17 flex items-center text-center">
            <Image src={ArrowsIcon} alt="" className="mx-auto w-8" />
          </div>
          <div className="text-7xl mt-7 font-bold">
            Your funds returned,
            <br />
            even <span className="text-blue-dark">after</span> being stolen.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-4xl p-12 bg-green">
            <div className="bg-black rounded-full w-17 h-17 flex items-center text-center">
              <Image src={CheckIcon} alt="" className="mx-auto w-8" />
            </div>
            <div className="text-7xl mt-6 font-bold">
              Simple onboarding.
              <br />
              Peaceful <span className="text-blue-dark">protection</span>.
            </div>
          </div>

          <div className="rounded-4xl p-12 bg-gray">
            <div className="bg-black rounded-full w-17 h-17 flex items-center text-center">
              <Image src={ShieldIcon} alt="" className="mx-auto w-6" />
            </div>
            <div className="text-7xl mt-6 font-bold">
              Your security is our
              <br />
              <span className="text-blue-dark">top priority</span>.
            </div>
          </div>
        </div>

        <h2 className="text-7xl mt-28 font-semibold">
          All controlled from a simple dashboard that even your{" "}
          <span className="text-blue-dark">grandma</span> can use.
        </h2>

        <ImageViewer />

        <div className="grid md:grid-cols-2 md:gap-8 mt-28 items-center">
          <div className="py-8 pl-4 md:order-2">
            <div className="rounded-3xl bg-gradient-to-br from-blue to-green py-2 px-6 font-bold inline-block text-xl">
              Step 1
            </div>
            <div className="text-10xl font-bold mt-6">
              Protect
              <br />
              your tokens
            </div>
            <div className="text-lg mt-5">
              In seconds, your ERC-20 tokens
              <br />
              will be protected from being
              <br />
              stolen.
            </div>
          </div>

          <div className="rounded-4xl p-6 flex items-center bg-gray h-98">
            <div className="image-container bg-white h-full w-full rounded-4xl flex items-center">
              <Image
                src={CongratsBox}
                alt=""
                className="mx-auto bg-white rounded-2xl w-69"
              />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-8 mt-24 items-center">
          <div className="py-8 pl-4">
            <div className="rounded-3xl bg-gradient-to-br from-blue to-green py-2 px-6 font-bold inline-block text-xl">
              Step 2
            </div>
            <div className="text-10xl font-bold mt-6">
              Submit
              <br />a dispute
            </div>
            <div className="text-lg mt-5">
              We hope you don&apos;t get your funds
              <br />
              stolen, but if you do, simply Resolv
              <br />
              the transaction.
            </div>
          </div>

          <div className="rounded-4xl pr-8 py-20 flex items-center bg-gray h-98">
            <Image src={ResolvButton} alt="" />
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-8 mt-24 items-center">
          <div className="py-8 pl-4 md:order-2">
            <div className="rounded-3xl bg-gradient-to-br from-blue to-green py-2 px-6 font-bold inline-block text-xl">
              Step 3
            </div>
            <div className="text-10xl font-bold mt-6">
              Get your
              <br />
              crypto back
            </div>
            <div className="text-lg mt-5">
              Once the Resolvrs have viewed the case and voted in your favor,
              your funds will be returned to a wallet of your choosing.
            </div>
          </div>

          <div className="rounded-4xl p-16 flex items-center bg-gray h-98">
            <Image
              src={GoodNewsBox}
              alt=""
              className="mx-auto bg-white rounded-2xl w-fit"
            />
          </div>
        </div>
      </div>

      <div className="w-full bg-blue mt-28">
        <div className="container grid lg:grid-cols-2 items-center">
          <div className="pt-8 pl-8 lg:pb-8 lg:pr-8">
            <div className="text-9xl font-bold">Frequently asked questions</div>
            <div className="font-medium mt-6">
              We get it. It&apos;s a lot to take in.
              <br />
              Hope these FAQ&apos;s help.
            </div>
          </div>

          <Accordion />
        </div>
      </div>

      <footer className="my-24 container px-6">
        <div className="flex items-center">
          <Image src={Logo} alt="Resolv" className="w-f-logo" />
          <span className="text-6xl font-bold text-black pl-2">Resolv</span>
        </div>
      </footer>
    </div>
  );
}
