"use client";

import { useState, useEffect, Suspense } from "react";
import { useAccount } from "wagmi";
import { useSearchParams } from "next/navigation";
import axios from "axios";
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
import WalletIcon from "../assets/icons/wallet.svg";
import Sponsors from "@/components/Sponsors";
import SpotSecured from "@/components/SpotSecured";
import { ProfileDropdown } from "@/components/ProfileDropdown";
import { REFERRAL_TRACKER_URL } from "@/utils/constants";

const inter = Inter({ subsets: ["latin"] });

function HomeComponent() {
  const [email, setEmail] = useState<string>("");
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>("");
  const [freeMonths, setFreeMonths] = useState<number>(3);

  const { address } = useAccount();
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlReferralCode = searchParams.get("referralCode");
    console.log("Referral code:", urlReferralCode);
    if (urlReferralCode) {
      localStorage.setItem("referralCode", urlReferralCode);
    }
  }, [searchParams]);

  useEffect(() => {
    if (address) {
      setIsWalletConnected(true);
      fetchReferralCode();
    } else {
      setIsWalletConnected(false);
    }
  }, [address]);

  const fetchReferralCode = async () => {
    if (!address) return;

    const storedReferralCode = localStorage.getItem("referralCode");

    const options = {
      walletAddress: address,
      referredBy: storedReferralCode || undefined,
    };

    console.log("Sending request with options", options);

    try {
      const response = await axios.post(
        `${REFERRAL_TRACKER_URL}/wallet-referral-system`,
        options
      );

      if (response.status === 200 || response.status === 201) {
        const bodyObject = JSON.parse(response.data.body);
        console.log(bodyObject);
        setReferralCode(bodyObject.referralCode);
        setFreeMonths(bodyObject.freeMonths);

        // Clear the stored referral code after successful signup
        localStorage.removeItem("referralCode");
      }
    } catch (error) {
      console.error("Error fetching referral code:", error);
    }
  };

  return (
    <div>
      <header className="flex justify-between w-full max-w-[900px] mx-auto px-10">
        <div className="flex items-center">
          <Image src={Logo} alt="Resolv" className="w-h-logo" />
          <span className="pl-2 text-3xl font-bold text-black">Resolv</span>
        </div>
        {isWalletConnected ? (
          <ProfileDropdown
            email={email}
            onEmailChange={setEmail}
            referralCode={referralCode}
            freeMonths={freeMonths}
          />
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
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="flex justify-center w-fit border border-2 border-black rounded-full py-2 px-4"
                  >
                    <div className="h-[50%] flex items-center"> </div>
                    Connect Wallet
                  </button>
                </div>
              );
            }}
          </ConnectButton.Custom>
        )}
      </header>

      <div className="container px-10 md:px-0 mt-24">
        {isWalletConnected && (
          <div className="flex items-center justify-center mb-2">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-green-200 rounded-full blur-sm"></div>
              <SpotSecured />
            </div>
          </div>
        )}

        <h1 className="md:text-[4rem] text-10xl font-bold text-center leading-extra-tight mb-8">
          Put stolen crypto
          <br />
          back in your wallet.
        </h1>
        <h2
          className={`${inter.className} text-center mb-16 font-regular text-2xl`}
        >
          Become an early adopter and connect your wallet to get $250,000 in
          free protection upon release.
        </h2>

        {isWalletConnected == false && (
          <div className="flex items-center justify-center mb-16">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-green-200 rounded-full blur-sm"></div>
              <ResolvConnectButton
                icon={WalletIcon}
                styles="relative h-[64px] px-6 py-3 bg-gradient-to-r from-[#D1FFE7] to-[#D0EAFF] shadow-resolv-button rounded-full text-gray-800 font-semibold flex items-center space-x-2 shadow-md transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:translate-y-[1px] hover:shadow-none focus:outline-none"
              />
            </div>
          </div>
        )}

        {isWalletConnected && !email && <EmailInput onEmailSubmit={setEmail} />}

        <Sponsors />

        <div className="flex items-center justify-center m-28">
          <span className="font-medium text-3xl pr-2">Explore</span>
          <Image src={CircleArrowIcon} alt="" className="w-explore" />
        </div>

        <h2 className="sm:text-6xl text-8xl mt-18 font-semibold">
          Cold storage safety, hot wallet ease. Our Protection Protocol&#8482;
          offers:
        </h2>

        {/* Other sections */}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeComponent />
    </Suspense>
  );
}
