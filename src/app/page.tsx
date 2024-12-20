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
import { TwitterLogo, LinkedinLogo, DiscordLogo } from "@phosphor-icons/react";
import { XLogo } from "@phosphor-icons/react/dist/ssr";
import { v4 as uuidv4 } from "uuid";  // For generating session IDs

const inter = Inter({ subsets: ["latin"] });

interface SessionData {
  sessionId: string;
  timestamp: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmId: string;
  utmContent: string;
  pageReferrer: string;
  isWalletConnected: boolean;
  walletAddress: string | null;
  isReturningUser: boolean;
  isReturningVisitor: boolean;
}

function HomeComponent() {
  const [email, setEmail] = useState<string>("");
  const [isWalletConnected, setIsWalletConnected] = useState<boolean>(false);
  const [isReturningUser, setIsReturningUser] = useState<boolean>(false);
  const [referralCode, setReferralCode] = useState<string>("");
  const [freeMonths, setFreeMonths] = useState<number>(3);

  const { address } = useAccount();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('v:1.2.0')  //version number for tracking builds

    // Step 1: Capture UTM parameters from the URL
    const utmSource = searchParams.get("utm_source") || "direct";
    const utmMedium = searchParams.get("utm_medium") || "none";
    const utmCampaign = searchParams.get("utm_campaign") || "none";
    const utmId = searchParams.get("utm_id") || "";
    const utmContent = searchParams.get("utm_content") || "";
    const pageReferrer = document.referrer || "";

    const sessionId = localStorage.getItem("sessionId") || uuidv4();
    const isReturningVisitor = !!localStorage.getItem("sessionId"); // True if sessionId is already in localStorage

    localStorage.setItem("sessionId", sessionId);
    localStorage.setItem("utm_source", utmSource);
    localStorage.setItem("utm_medium", utmMedium);
    localStorage.setItem("utm_campaign", utmCampaign);
    localStorage.setItem("utm_id", utmId);
    localStorage.setItem("utm_content", utmContent);

    sendSessionData({
      sessionId,
      timestamp: new Date().toISOString(),
      utmSource,
      utmMedium,
      utmCampaign,
      utmId,
      utmContent,
      pageReferrer,
      isWalletConnected: false,
      walletAddress: null,
      isReturningUser,
      isReturningVisitor
    });


    const urlReferredByCode = searchParams.get("referredBy");
    if (urlReferredByCode) {
      localStorage.setItem("referredBy", urlReferredByCode);
    }
  }, [searchParams]);

  useEffect(() => {
    if (address) {
      setIsWalletConnected(true);
      checkIfWalletExists();  // Check if user is returning when a wallet is connected
    } else {
      setIsWalletConnected(false);
    }
  }, [address]);

  const checkIfWalletExists = async () => {
    if (!address) return;

    const options = { walletAddress: address };
    try {
      const response = await axios.post(`${REFERRAL_TRACKER_URL}/checkIfWalletExists`, options);

      if (response.status === 200 || response.status === 201) {
        const bodyObject = JSON.parse(response.data.body);
        
        if (bodyObject.returnData.walletExists) {
          setIsReturningUser(true);  // Set as returning user
        } else {
          setIsReturningUser(false);
        }

        setReferralCode(bodyObject.returnData.referralCode);
        setFreeMonths(bodyObject.returnData.freeMonths);
        setEmail(bodyObject.returnData.email);
        
        // Resend session data after check
        sendSessionData({
          sessionId: localStorage.getItem("sessionId") || uuidv4(),
          timestamp: new Date().toISOString(),
          utmSource: localStorage.getItem("utm_source") || "direct",
          utmMedium: localStorage.getItem("utm_medium") || "none",
          utmCampaign: localStorage.getItem("utm_campaign") || "none",
          utmId: localStorage.getItem("utm_id") || "",
          utmContent: localStorage.getItem("utm_content") || "",
          pageReferrer: document.referrer || "",
          isWalletConnected: true,
          walletAddress: address,
          isReturningUser: bodyObject.returnData.walletExists,
          isReturningVisitor: true
        });
      }
    } catch (error) {
      console.error("Error fetching referral code:", error);
    }
  };

  const sendSessionData = async (data: SessionData) => {
    try {
      await axios.post("https://dkq9ddk2fc.execute-api.us-east-1.amazonaws.com/Prod/ad-tracking-landing-page", data);
      console.log("Session data sent successfully");
    } catch (error) {
      console.error("Error sending session data:", error);
    }
  };



  return (
    <div>
      <head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-H8RWV4CDQD"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-H8RWV4CDQD');
            `,
          }}
        />
      </head>
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
          Become an early adopter and connect your wallet to get 3 months in
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

        <div className="rounded-4xl p-12 bg-blue mt-11">
          <div className="bg-black rounded-full w-17 h-17 flex items-center text-center">
            <Image src={ArrowsIcon} alt="" className="mx-auto w-8" />
          </div>
          <div className="text-7xl mt-7 font-bold">
            <h1>Zero liability fraud protection</h1>
            <p className="text-base leading-snug font-normal mt-4">
              Theft happens, even to the best of us. One mistake shouldn&apos;t
              cost you everything. We make sure it doesn&apos;t.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <div className="rounded-4xl p-12 bg-green">
            <div className="bg-black rounded-full w-17 h-17 flex items-center text-center">
              <Image src={CheckIcon} alt="" className="mx-auto w-8" />
            </div>
            <div className="text-6xl mt-6 font-bold">
              <h1>A decentralized vault</h1>
              <p className="text-base leading-snug font-normal mt-4">
                Forget blind trust. Our multi-sig contract with distributed
                signing keys secures your funds without you ever having to worry
                about being rugged.
              </p>
            </div>
          </div>
          <div className="rounded-4xl p-12 bg-gray">
            <div className="bg-black rounded-full w-17 h-17 flex items-center text-center">
              <Image src={ShieldIcon} alt="" className="mx-auto w-6" />
            </div>
            <div className="text-6xl mt-6 font-bold">
              <h1>And a decentralized jury system</h1>
              <p className="text-base leading-snug font-normal mt-4">
                Trusted insurance companies, on-chain forensic investigators,
                and security pros ensure every case gets a fair review.
              </p>
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
              Wrap your ERC-20s and recieve pTokens in exchange. A recoverable
              alternative backed by your deposit.
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
            <div className="text-10xl font-bold mt-6">File a claim</div>
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
              Once the Resolvrs verify the fraud, your funds are sent to your
              designated recovery wallet.
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
        {/* Other sections */}
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
      <footer className="my-24 container px-6 relative">
        <div className="flex items-center">
          <Image src={Logo} alt="Resolv" className="w-f-logo" />
          <span className="text-6xl font-bold text-black pl-2">Resolv</span>
        </div>
        <div className="absolute bottom-0 right-6 flex space-x-4">
          <a
            href="https://twitter.com/resolvcrypto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <XLogo
              size={24}
              weight="fill"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            />
          </a>
          <a
            href="https://www.linkedin.com/company/resolvcrypto"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinLogo
              size={24}
              weight="fill"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            />
          </a>
          <a
            href="https://discord.gg/ZJAbCKCW"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DiscordLogo
              size={24}
              weight="fill"
              className="text-gray-500 hover:text-gray-700 transition-colors"
            />
          </a>
        </div>
      </footer>
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
