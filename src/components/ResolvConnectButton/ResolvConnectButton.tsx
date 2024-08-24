"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useContext, useState } from "react";
import "./ResolvConnectButton.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { WalletContext } from "@/contexts/WalletContextProvider";
import { useAccount, useBalance } from 'wagmi';
import axios from 'axios'; // Make sure to install axios if not already installed

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ResolvConnectButton = ({styles} : {styles: string}) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [doesWalletExist, setDoesWalletExist] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { address } = useAccount();

  useEffect(() => {
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const checkLoginStatus = () => {
      // Check if user is logged in (you might want to use a more robust method)
      const userToken = localStorage.getItem('userToken');
      setIsLoggedIn(!!userToken);
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const checkWalletExists = async () => {
      if (address) {
        try {
          const response = await axios.post('/api/checkIfWalletExists', { walletAddress: address });
          const { exists } = response.data;
          setDoesWalletExist(exists);
          if (!exists) {
            localStorage.setItem('walletAddress', address);
          }
        } catch (error) {
          console.error('Error checking wallet:', error);
        }
      }
    };

    checkWalletExists();
  }, [address]);

  return (
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
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            className="connect-button"
            {...(!ready && {
              "aria-hidden": true,
              "data-ready": false,
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className={cn(styles, "")}
                  >
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
