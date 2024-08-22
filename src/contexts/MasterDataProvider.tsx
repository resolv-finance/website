"use client";
import React from "react";
import { useMasterData } from "./../hooks/useMasterData";
import { ICurrency, IMasterChain } from "@/interfaces/apis/master-api";

export type MasterDataContextType = {
  supportedChains: IMasterChain[];
  currencies: ICurrency[];
};

export const MasterDataContext = React.createContext<MasterDataContextType>({
  supportedChains: [],
  currencies: [],
});

export const MasterDataContextProvider = ({ children }: { children: any }) => {
  const { supportedChains, currencies } = useMasterData();

  return (
    <MasterDataContext.Provider
      value={{
        supportedChains,
        currencies,
      }}
    >
      {children}
    </MasterDataContext.Provider>
  );
};
