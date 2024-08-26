"use client";

import "@rainbow-me/rainbowkit/styles.css";
import React, { useContext, useEffect, useState } from "react";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { MasterDataContext } from "./MasterDataProvider";
import { SUPPORTED_CHAINS } from "@/utils/constants";
import { _chains } from "@rainbow-me/rainbowkit/dist/config/getDefaultConfig";

export function WalletContextProvider({ children }: { children?: any }) {
  const [chainConfig, setChainConfig] = useState<_chains>([baseSepolia]);
  const { supportedChains } = useContext(MasterDataContext);

  const configureChains = () => {
    const chains = [];
    for (const chain of supportedChains) {
      if (chain.chainId === SUPPORTED_CHAINS.BASE_SEPOLIA) {
        chains.push(baseSepolia);
      }
    }
    setChainConfig(chains as unknown as _chains);
  };

  useEffect(() => {
    if (supportedChains.length) {
      configureChains();
    }
  }, [supportedChains]);

  const config = getDefaultConfig({
    appName: "Resolv",
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID as string,
    chains: chainConfig,
    ssr: true,
  });

  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode>
          <div className="flex relative items-start h-screen overflow-hidden justify-between pt-8 px-8 sm:pr-16 sm:pl-8">
            {children}
          </div>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
