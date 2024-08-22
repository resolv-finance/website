"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import "./ResolvConnectButton.css";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const ResolvConnectButton = ({styles} : {styles: string}) => {
  let isMobile = false;

  useEffect(() => {
    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }, []);

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
                    className={cn(styles, "flex justify-center w-fit border border-2 border-black rounded-full py-2 px-4")}
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
