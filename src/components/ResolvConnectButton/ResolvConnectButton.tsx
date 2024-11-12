"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useContext, useState, useRef, useLayoutEffect } from "react";
import "./ResolvConnectButton.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useAccount, useDisconnect } from 'wagmi';
import axios from 'axios';
import Image from "../../../node_modules/next/image";
import { REFERRAL_TRACKER_URL } from "@/utils/constants";
import { v4 as uuidv4 } from "uuid";  


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

const ResolvConnectButton = ({ styles, icon }: { styles: string, icon?: string }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [doesWalletExist, setDoesWalletExist] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [ipAddress, setIpAddress] = useState<string | null>(null);
  const [referredBy, setReferredBy] = useState<string | null>(null);
  const account = useAccount();
  const { address } = account
  const { disconnect } = useDisconnect()

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));

    // Check for 'referredBy' in localStorage
    const referralCode = localStorage.getItem('referredBy');
    if (referralCode) {
      setReferredBy(referralCode); // Store the referral code if present
    }
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      // Check if user is logged in (you might want to use a more robust method)
      const userToken = localStorage.getItem('userToken');
      setIsLoggedIn(!!userToken);
    };

    checkLoginStatus();
  }, []);

  const [shouldCheckWallet, setShouldCheckWallet] = useState(false);
  const prevAddressRef = useRef<string | undefined>();

  useLayoutEffect(() => {
    if (address !== prevAddressRef.current) {
      prevAddressRef.current = address;
      setShouldCheckWallet(true);
    }
  }, [address]);


  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      }
    };

    fetchIpAddress();
  }, []);

  useEffect(() => {
    const checkWalletExists = async () => {
      if (address) {
        try {

          const sessionId = localStorage.getItem("sessionId") || uuidv4();
          const adSource = localStorage.getItem("utm_id"); // Retrieve utm_id as adSource from localStorage

          const payload = {
            walletAddress: address,
            ipAddress,
            sessionId,    // Pass sessionId
            adSource,     // Pass adSource
            referredBy: referredBy || undefined, // Optional referredBy if present
          };


          if (referredBy) {
            payload.referredBy = referredBy;
            localStorage.setItem("freeMonths", "6"); ///would like to remove this line and just do the check on the reload
          }

          const response = await axios.post(
            `${REFERRAL_TRACKER_URL}/wallet-referral-system`,
            payload
          );

          const { exists } = response.data;
          setDoesWalletExist(exists);

          if (!exists) {
            localStorage.setItem('walletAddress', address);
          }

          // Send Google Analytics event for wallet connection
          window.gtag('event', 'wallet_connection', {
            event_category: 'User Actions',
            event_label: 'Wallet Connected',
            value: 1,
          });
        } catch (error) {
          console.error('Error checking wallet:', error);
          disconnect();
        }
      } else {
        console.log('Address not available yet');
      }
    };


    checkWalletExists();
    setShouldCheckWallet(false);
  }, [shouldCheckWallet, address, disconnect]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted;
        const connected =
          ready &&
          account &&
          chain
        return (
          <div
            className="connect-button"
            {...(!ready && {
              "data-ready": false,
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={cn(styles, "flex gap-2")}
                  >
                    <div className="h-[50%] flex items-center"> {/* Container for the icon */}
                      {icon && <Image
                        src={icon!}
                        alt="icon"
                        className="h-full w-auto transform rotate-12" // Make height 100% of parent (which is 80% of button height)
                      />}
                    </div>
                    Connect Wallet
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div className="flex gap-[12px]">
                  <button
                    onClick={openAccountModal}
                    type="button"
                    className="flex justify-center w-fit bg-stone-200 rounded-full py-2 px-4"
                  >
                    {account.displayName}
                    {account.displayBalance && !isMobile
                      ? ` (${account.displayBalance})`
                      : ""}
                  </button>
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="hidden sm:flex sm:items-center"
                  >
                    {chain.hasIcon && (
                      <div
                        className={`bg-${chain?.iconBackground} w-[12px] h-[12px] rounded-full overflow-hidden mr-[4px]`}
                      >
                        {chain.iconUrl && (
                          <img
                            className="w-[12px] h-[12px]"
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default ResolvConnectButton;
